import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RestService } from '../rest.service';
import { ProductionAreaInfo } from '../ComplexModels/ProductionAreaInfo';
import { RestProduction } from '../RestClases/RestProduction';
import { User } from '../Models/User';

@Component({
  selector: 'app-list-estados-cuenta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-estados-cuenta.component.html',
  styleUrls: ['./list-estados-cuenta.component.css']
})
export class ListEstadosCuentaComponent implements OnInit {
  production_areas: ProductionAreaInfo[] = [];
  is_loading = false;
  error_message: string | null = null;

  selected_area: ProductionAreaInfo | null = null;
  users_of_selected_area: User[] = [];

  private rest_production: RestProduction;

  constructor(public rest_service: RestService) {
    this.rest_production = new RestProduction(rest_service);
  }

  ngOnInit(): void {
    this.loadProductionAreas();
  }

  async loadProductionAreas(): Promise<void> {
    this.is_loading = true;
    this.error_message = null;
    try {
      this.production_areas = await this.rest_production.searchProductionAreaInfo({ limit: 999999 });
    } catch (error: any) {
      this.error_message = `Error al cargar las áreas de producción: ${error.message}`;
      console.error(this.error_message, error);
    } finally {
      this.is_loading = false;
    }
  }

  async onAreaClick(area: ProductionAreaInfo): Promise<void> {
    this.selected_area = area;
    this.is_loading = true;
    this.error_message = null;
    try {
      this.users_of_selected_area = await this.rest_production.getUsersFromProductionArea(area.production_area.id);
    } catch (error: any) {
      this.error_message = `Error al cargar los usuarios: ${error.message}`;
      console.error(this.error_message, error);
    } finally {
      this.is_loading = false;
    }
  }

  closeModal(): void {
    this.selected_area = null;
    this.users_of_selected_area = [];
  }
}