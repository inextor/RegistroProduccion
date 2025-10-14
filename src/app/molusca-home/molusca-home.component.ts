import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-molusca-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './molusca-home.component.html',
  styleUrl: './molusca-home.component.css'
})
export class MoluscaHomeComponent {

	constructor(public rest_service: RestService) {
	}
}
