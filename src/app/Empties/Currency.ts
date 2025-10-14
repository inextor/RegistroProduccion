import { Currency } from '../RestModels/Currency';

export function currency(): Currency {
	return {
		id: '', 
		created: new Date(), 
		name: '', 
		updated: new Date(), 
	};
}
