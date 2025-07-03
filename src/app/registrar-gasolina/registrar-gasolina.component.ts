import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../rest.service';
import { RestProduction } from '../RestClases/RestProduction';
import { GetEmpty } from '../RestClases/GetEmpty';

@Component({
  selector: 'app-registrar-gasolina',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-gasolina.component.html',
  styleUrls: ['./registrar-gasolina.component.css']
})
export class RegistrarGasolinaComponent implements OnInit {
  production_areas: any[] = [];
  selected_production_area_id: number | undefined;
  total_cost: number | '' = '';
  is_loading = false;
  error_message: string | null = null;
  production: RestProduction;
  store = GetEmpty.store();

  constructor(public rest_service: RestService) {
    this.production = new RestProduction(rest_service);
  }

  ngOnInit(): void {
    this.loadProductionAreas();
  }

  async loadProductionAreas(): Promise<void> {
    const currentStore = this.rest_service.getStore();

    if (currentStore && currentStore.id) {
      this.is_loading = true;
      this.error_message = null;
      try {
        const areas = await this.production.getProductionAreas(currentStore.id);
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

  async onGuardar(): Promise<any> {
    if (!this.selected_production_area_id) {
      alert('Por favor seleccione un área de producción');
      return;
    }

    if (this.total_cost === '' || this.total_cost <= 0) {
      alert('Por favor ingrese un costo total válido');
      return;
    }

    console.log('Guardar button clicked');

    let zero = (x: number) => x < 10 ? '0' + x : x;
    let date = new Date();
    let lote = this.store.code + '-' + date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate());

    let data = {
      production: {
        lote,
        item_id: 1, // Assuming a default item_id for gasoline, or it needs to be selected
        production_area_id: this.selected_production_area_id,
        store_id: this.store.id,
        qty: this.total_cost, // Using qty for total_cost
        alternate_qty: 0, // Not used for total cost
        control: "1" // Not used for total cost
      }
    };

    this.production.addProduction(data).then(response => {
      console.log('Gasoline entry added:', response);
      alert('Registro de gasolina guardado exitosamente!');
      this.total_cost = ''; // Clear the input after saving
    }).catch(error => {
      this.rest_service.showError(error);
    });
  }
}
