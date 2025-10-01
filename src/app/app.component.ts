import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RestService } from './rest.service';
import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { ConfirmationService } from './services/confirmation.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastErrorComponent } from './toast-error/toast-error.component';
import { environment } from '../environments/environment';

import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LateralMenuComponent, NgIf, FormsModule, ToastErrorComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  is_menu_open = true;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public rest_service: RestService,
    public confirmation_service: ConfirmationService
  ) {
    console.log('Environment', environment.name);
  }

  confirmation_note_label: string = '';
  confirmation_note_required: boolean = false;
  confirmation_note: string = '';

  ngOnInit(): void {
    if (localStorage.getItem('session')) {
      //this.router.navigate(['/registrar-produccion']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleMenu() {
    this.is_menu_open = !this.is_menu_open;
  }

  title = 'myapp';
}
