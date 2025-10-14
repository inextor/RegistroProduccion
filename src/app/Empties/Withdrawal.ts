import { Withdrawal } from '../RestModels/Withdrawal';

export function withdrawal(): Withdrawal {
	return {
		id: 0, 
		amount: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		currency: '', 
		device_time: new Date(), 
		note: '', 
		updated: new Date(), 
	};
}
