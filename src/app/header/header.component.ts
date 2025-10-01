import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  constructor(private router: Router, private rest_service: RestService) {}

  toggleMenu() {
    this.menuToggle.emit();
  }

  logout() {
    this.rest_service.logout();
    this.router.navigate(['/login']);
  }
}
