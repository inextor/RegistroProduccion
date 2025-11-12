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

  // New account modal
  is_modal_open: boolean = false;
  new_account: Partial<Account> = {
    name: '',
    user_id: 0,
    currency_id: 'MXN',
    is_main: 0,
    balance: 0
  };

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

      // Filter by user if selected from query params
      if (this.selected_user_id !== '') {
        search.eq.user_id = this.selected_user_id;
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

  openModal(): void {
    this.new_account = {
      name: '',
      user_id: this.selected_user_id !== '' ? this.selected_user_id : 0,
      currency_id: 'MXN',
      is_main: 0,
      balance: 0
    };
    this.is_modal_open = true;
  }

  closeModal(): void {
    this.is_modal_open = false;
    this.new_account = {
      name: '',
      user_id: 0,
      currency_id: 'MXN',
      is_main: 0,
      balance: 0
    };
  }

  async saveAccount(): Promise<void> {
    try {
      // Validate required fields
      if (!this.new_account.name || !this.new_account.name.trim()) {
        this.rest_service.showError('El nombre de la cuenta es requerido');
        return;
      }

      if (!this.new_account.user_id || this.new_account.user_id === 0) {
        this.rest_service.showError('Debe seleccionar un usuario');
        return;
      }

      const account_to_save = {
        name: this.new_account.name.trim(),
        user_id: this.new_account.user_id,
        currency_id: this.new_account.currency_id || 'MXN',
        is_main: this.new_account.is_main || 0,
        balance: this.new_account.balance || 0,
        status: 'ACTIVE' as const
      };

      await this.rest_account.create(account_to_save);
      this.rest_service.showSuccess('Cuenta creada exitosamente');
      this.closeModal();
      this.loadAccounts();
    } catch (error: any) {
      console.error('Error creating account:', error);
      this.rest_service.showError('Error al crear la cuenta: ' + (error.message || error));
    }
  }
}
