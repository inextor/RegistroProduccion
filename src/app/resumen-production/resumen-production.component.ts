import { Component } from '@angular/core';
import { RestService } from '../rest.service';
import { RestProduction } from '../RestClases/RestProduction';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resumen-production',
  standalone: true,
  templateUrl: './resumen-production.component.html',
  styleUrl: './resumen-production.component.css'
})
export class ResumenProductionComponent {
  rest_production: RestProduction;

  constructor(public rest_service: RestService, public route: ActivatedRoute, router: Router) {
    this.rest_production = new RestProduction(rest_service);
  }
}
