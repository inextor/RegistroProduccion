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
  productionAreas: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  searchTerm: string = '';
  filteredProductionAreas: any[] = [];
  showAutocomplete = false;
  selectedProductionArea: any = null; // To store the selected area object

  constructor(private restService: RestService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.loadProductionAreas();
  }

  async loadProductionAreas(): Promise<void> {
    const currentStore = this.restService.getStore();
    if (currentStore && currentStore.id) {
      this.isLoading = true;
      this.errorMessage = null;
      try {
        // Assuming the API returns an array of objects, each with at least a 'name' property
        const areas = await this.restService.getProductionAreas(currentStore.id);
        this.productionAreas = areas.data || areas; // Adjust if areas are nested under a 'data' property
        console.log('Production areas loaded:', this.productionAreas);
      } catch (error: any) {
        this.errorMessage = `Failed to load production areas: ${error.message}`;
        console.error(this.errorMessage, error);
        this.productionAreas = []; // Ensure it's an empty array on error
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Store information is not available. Cannot load production areas.';
      console.warn(this.errorMessage);
      this.productionAreas = [];
    }
  }

  filterProductionAreas(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredProductionAreas = [];
      this.showAutocomplete = false;
      return;
    }
    this.filteredProductionAreas = this.productionAreas.filter(area =>
      area.name && area.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.showAutocomplete = this.filteredProductionAreas.length > 0;
  }

  selectProductionArea(area: any): void {
    this.selectedProductionArea = area;
    this.searchTerm = area.name; // Update input with selected area name
    this.showAutocomplete = false;
    this.filteredProductionAreas = []; // Clear suggestions
    console.log('Selected production area:', area);
    // You can now use this.selectedProductionArea for further actions
  }

  onSearchFocus(): void {
    if (this.searchTerm.trim() !== '' && this.filteredProductionAreas.length > 0) {
        this.showAutocomplete = true;
    }
  }

  // Hide autocomplete when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showAutocomplete = false;
    }
  }

  onGuardar(): void {
    console.log('Guardar button clicked');
    // Implement save logic here, potentially using this.selectedProductionArea
  }
}
