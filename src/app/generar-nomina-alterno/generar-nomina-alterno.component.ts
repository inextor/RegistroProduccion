import { Component, OnInit } from '@angular/core';
import { RestProduction } from '../RestClases/RestProduction';
import { RestService } from '../rest.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestConsumption } from '../RestClases/RestConsumption';
import { ShortDatePipe } from '../app/pipes/short-date.pipe';

@Component({
  selector: 'app-generar-nomina-alterno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ShortDatePipe],
  templateUrl: './generar-nomina-alterno.component.html',
  styleUrls: ['./generar-nomina-alterno.component.css']
})
export class GenerarNominaAlternoComponent implements OnInit {

  rest_production: RestProduction;
  rest_consumption: RestConsumption;
  production_area_list: any[] = [];
  production_area_id: number | '' = '';
  production_info_list: any[] = [];
  consumption_info_list: any[] = [];
  produccionPorDia: any[] = [];
  start_date: string = '';
  end_date: string = '';
  totalesPorProducto: any[] = [];

  constructor(public rest_service: RestService, public route: ActivatedRoute) {
    this.rest_production = new RestProduction(rest_service);
    this.rest_consumption = new RestConsumption(rest_service);
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


	let production_search = {...search_params};
	let consumed_search = {...search_params};

    if (this.start_date) {
        production_search['produced>~'] = this.start_date;
		consumed_search['consumed>~'] = this.start_date;

    }

    if (this.end_date) {
        production_search['produced<~'] = this.end_date;
		consumed_search['consumed<~'] = this.start_date;
    }


    Promise.all([
      this.rest_production.searchProductionInfo(production_search),
      this.rest_consumption.searchConsumptionInfo(consumed_search)
    ])
      .then(([production_info, consumption_info]) => {
        this.production_info_list = production_info;
        this.consumption_info_list = consumption_info;
        this.agruparYCalcularTotales();
      })
      .catch((error) => {
        this.rest_service.showError(error);
      });
  }

  agruparYCalcularTotales() {
    const produccionMap = new Map<string, { producto: string, dia: string, piezas: number, kgs: number, merma: number }>();
    const totalesMap = new Map<string, { producto: string, piezas: number, kgs: number, merma: number }>();

    for (const pi of this.production_info_list) {
      const item = pi.item;
      const dia = new Date(pi.production.produced).toLocaleDateString();
      const claveDia = `${item.name}-${dia}`;

      let produccionDia = produccionMap.get(claveDia);
      if (!produccionDia) {
        produccionDia = { producto: item.name, dia, piezas: 0, kgs: 0, merma: 0 };
        produccionMap.set(claveDia, produccionDia);
      }

      let totalProducto = totalesMap.get(item.name);
      if (!totalProducto) {
        totalProducto = { producto: item.name, piezas: 0, kgs: 0, merma: 0 };
        totalesMap.set(item.name, totalProducto);
      }

      produccionDia.piezas += pi.production.alternate_qty;
      produccionDia.kgs += pi.production.qty;
      produccionDia.merma += pi.production.merma_qty;

      totalProducto.piezas += pi.production.alternate_qty;
      totalProducto.kgs += pi.production.qty;
      totalProducto.merma += pi.production.merma_qty;
    }

    this.produccionPorDia = Array.from(produccionMap.values());
    this.totalesPorProducto = Array.from(totalesMap.values());
  }
}
