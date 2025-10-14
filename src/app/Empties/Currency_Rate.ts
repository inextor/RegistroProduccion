import { Currency_Rate } from '../RestModels/Currency_Rate';

export function currency_rate(): Currency_Rate {
	return {
		id: 0, 
		currency_id: 'MXN', 
		rate: 0, 
		store_id: 0, 
	};
}
