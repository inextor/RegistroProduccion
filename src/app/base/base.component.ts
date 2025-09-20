import { Component } from '@angular/core';
import { RestService, ErrorMessage } from '../rest.service';

@Component({
  template: ''
})
export class BaseComponent {
  public is_loading: boolean = false;

  constructor(public rest: RestService) {}

  public showError(error: any, auto_hide: boolean = true): void {
    this.is_loading = false;
    if (error instanceof ErrorMessage) {
      this.rest.showErrorMessage(error);
      return;
    }
    let str_error = this.rest.getErrorString(error);
    this.rest.showErrorMessage(new ErrorMessage(str_error, 'alert-danger', auto_hide));
  }

  public showSuccess(message: string): void {
    this.is_loading = false;
    this.rest.showErrorMessage(new ErrorMessage(message, 'alert-success', true));
  }
}
