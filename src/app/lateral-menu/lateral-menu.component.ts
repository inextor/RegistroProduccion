import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lateral-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent {

  constructor(private rest_service: RestService, private router: Router) { }

  logout() {
    this.rest_service.logout();
    this.router.navigate(['/login']);
  }

}
