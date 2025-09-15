import { Component, Input } from '@angular/core';
import { UserProduction } from '../Models/UserProduction';
import { CommonModule } from '@angular/common';
import { ShortDatePipe } from '../pipes/short-date.pipe';

@Component({
  selector: 'app-user-production-detail',
  standalone: true,
  imports: [CommonModule, ShortDatePipe],
  templateUrl: './user-production-detail.component.html',
  styleUrls: ['./user-production-detail.component.css']
})
export class UserProductionDetailComponent {
  @Input() user_production!: UserProduction;
}