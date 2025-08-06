import { Component, OnInit } from '@angular/core';
import { RestProduction } from '../RestClases/RestProduction';
import { RestService } from '../rest.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generar-nomina-alterno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './generar-nomina-alterno.component.html',
  styleUrls: ['./generar-nomina-alterno.component.css']
})
export class GenerarNominaAlternoComponent implements OnInit {

  rest_production: RestProduction;
  production_area_list: any[] = [];
  production_area_id: number | '' = '';
  production_info_list: any[] = [];
  start_date: string = '';
  end_date: string = '';
  totalesPorProducto: any[] = [];

  constructor(public rest_service: RestService, public route: ActivatedRoute) {
    this.rest_production = new RestProduction(rest_service);
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.start_date = params.get('start_date') || '';
      this.end_date = params.get('end_date') || '';
      this.production_area_id = params.get('production_area_id') || '';
    });

    this.rest_production.getAllProductionAreas()
      .then((data: any) => {
        this.production_area_list = data;
      });

    if (this.production_area_id && this.start_date && this.end_date) {
        this.searchProductionAreaData();
    }
  }

  searchProductionAreaData() {
    this.production_info_list = [];
    this.totalesPorProducto = [];

    const search_params: any = {
        'production_area_id': this.production_area_id,
        'status': 'ACTIVE',
        'limit': 99999
    };

    if (this.start_date) {
        search_params['created>~'] = this.start_date;
    }

    if (this.end_date) {
        search_params['created<~'] = this.end_date;
    }

    this.rest_production.searchProductionInfo(search_params)
      .then((production_info) => {
        this.production_info_list = production_info;
        this.calcularTotalesPorProducto();
      })
      .catch((error) => {
        this.rest_service.showError(error);
      });
  }

  calcularTotalesPorProducto() {
    const totalesMap = new Map<string, { producto: string, piezas: number, kgs: number, merma_piezas: number, merma_kgs: number }>();

    for (const pi of this.production_info_list) {
      const item = pi.item;
      let total = totalesMap.get(item.name);

      if (!total) {
        total = {
          producto: item.name,
          piezas: 0,
          kgs: 0,
          merma_piezas: 0,
          merma_kgs: 0
        };
        totalesMap.set(item.name, total);
      }

      if (item.name.toLowerCase().includes('muerta')) {
        total.merma_piezas += pi.production.alternate_qty;
        total.merma_kgs += pi.production.qty;
      } else {
        total.piezas += pi.production.alternate_qty;
        total.kgs += pi.production.qty;
      }
    }
    this.totalesPorProducto = Array.from(totalesMap.values());
  }
}
