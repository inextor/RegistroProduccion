import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { Rest } from '../classes/Rest';
import { Account } from '../Models/Account';
import { SearchObject } from '../classes/SearchObject';

@Component({
  selector: 'app-list-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list-account.component.html',
  styleUrl: './list-account.component.css'
})
export class ListAccountComponent implements OnInit {
  rest_account: Rest;
  rest_user: Rest;
  accounts: Account[] = [];
  user_map: Map<number, any> = new Map();
  is_loading: boolean = false;
  search_text: string = '';
  selected_user_id: number | '' = '';
  users: any[] = [];

  constructor(public rest_service: RestService, private route: ActivatedRoute) {
    this.rest_account = new Rest(rest_service, 'account');
    this.rest_user = new Rest(rest_service, 'user');
  }

  ngOnInit(): void {
    // Check for user_id in query params
    this.route.queryParamMap.subscribe(params => {
      const userIdParam = params.get('user_id');
      if (userIdParam) {
        this.selected_user_id = Number(userIdParam);
      }

      this.loadUsers();
      this.loadAccounts();
    });
  }

  async loadUsers(): Promise<void> {
    try {
      const response = await this.rest_user.search({ limit: 999999 });
      this.users = response.data || [];

      // Create user map for quick lookup
      for (const user of this.users) {
        this.user_map.set(user.id, user);
      }
    } catch (error: any) {
      console.error('Error loading users:', error);
      this.rest_service.showError('Error al cargar usuarios: ' + (error.message || error));
    }
  }

  async loadAccounts(): Promise<void> {
    this.is_loading = true;
    try {
      const search = new SearchObject<Account>(['id', 'user_id', 'name', 'balance', 'currency_id', 'status', 'is_main']);

      // Filter by user if selected
      if (this.selected_user_id !== '') {
        search.eq.user_id = this.selected_user_id;
      }

      // Filter by name if search text provided
      if (this.search_text.trim()) {
        search.lk.name = this.search_text.trim();
      }

      search.limit = 999999;
      search.sort_order = ['id_DESC'];

      const response = await this.rest_account.search(search);
      this.accounts = response.data || [];

      console.log('Accounts loaded:', this.accounts);
    } catch (error: any) {
      console.error('Error loading accounts:', error);
      this.rest_service.showError('Error al cargar cuentas: ' + (error.message || error));
      this.accounts = [];
    } finally {
      this.is_loading = false;
    }
  }

  getUserName(user_id: number): string {
    const user = this.user_map.get(user_id);
    return user ? user.name : 'Usuario desconocido';
  }

  onSearch(): void {
    this.loadAccounts();
  }

  onFilterChange(): void {
    this.loadAccounts();
  }
}
