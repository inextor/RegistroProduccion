import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
	name: 'localDate',
	standalone: true
})
export class LocalDatePipe implements PipeTransform {

	transform(value: any, format: string = 'medium'): any {
		if (value) {
			let date: Date;
			if (typeof value === 'string') {
				// Replace space with T to make it compatible with ISO 8601
				const isoDateString = value.replace(' ', 'T');
				return new Date(isoDateString);
			}
		}
		return value;
	}
}
