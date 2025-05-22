import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';

@Component({
	selector: 'app-registrar-produccion',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './registrar-produccion.component.html',
	styleUrls: ['./registrar-produccion.component.css']
})
export class RegistrarProduccionComponent implements OnInit {
	production_areas: any[] = [];
	is_loading = false;
	error_message: string | null = null;

	search_term: string = '';
	filtered_production_areas: any[] = [];
	show_autocomplete = false;
	selected_production_area: any = null; // To store the selected area object

	constructor(private restService: RestService, private elementRef: ElementRef) {}

	ngOnInit(): void {
		this.loadProductionAreas();
	}

	async loadProductionAreas(): Promise<void> {
		const currentStore = this.restService.getStore();
		if (currentStore && currentStore.id) {
			this.is_loading = true;
			this.error_message = null;
			try {
				const areas = await this.restService.getProductionAreas(currentStore.id);
				this.production_areas = areas.data || areas;
				console.log('Production areas loaded:', this.production_areas);
			} catch (error: any) {
				this.error_message = `Failed to load production areas: ${error.message}`;
				console.error(this.error_message, error);
				this.production_areas = [];
			} finally {
				this.is_loading = false;
			}
		} else {
			this.error_message = 'Store information is not available. Cannot load production areas.';
			console.warn(this.error_message);
			this.production_areas = [];
		}
	}

	filterProductionAreas(): void {
		if (this.search_term.trim() === '') {
			this.filtered_production_areas = [];
			this.show_autocomplete = false;
			return;
		}
		this.filtered_production_areas = this.production_areas.filter(area =>
			area.name && area.name.toLowerCase().includes(this.search_term.toLowerCase())
		);
		this.show_autocomplete = this.filtered_production_areas.length > 0;
	}

	selectProductionArea(area: any): void {
		this.selected_production_area = area;
		this.search_term = area.name;
		this.show_autocomplete = false;
		this.filtered_production_areas = [];
		console.log('Selected production area:', area);
	}

	onSearchFocus(): void {
		if (this.search_term.trim() !== '' && this.filtered_production_areas.length > 0) {
				this.show_autocomplete = true;
		}
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: Event): void {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.show_autocomplete = false;
		}
	}

	onGuardar(): void {
		console.log('Guardar button clicked');
		// Implement save logic here, potentially using this.selected_production_area
	}
}
