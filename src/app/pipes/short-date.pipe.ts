import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate',
  standalone: true
})
export class ShortDatePipe implements PipeTransform {

  private readonly months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  transform(value: Date | string): string {
    if (!value) {
      return '';
    }

    let date: Date;
    if (typeof value === 'string') {
      // Replace space with T to make it compatible with ISO 8601
      const isoString = value.replace(' ', 'T');
      date = new Date(isoString);
    } else {
      date = value;
    }

    if (isNaN(date.getTime())) {
      return '';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = this.months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
