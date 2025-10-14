import { Notification_Token } from '../RestModels/Notification_Token';

export function notification_token(): Notification_Token {
	return {
		id: 0, 
		user_id: 0, 
		provider: '', 
		token: '', 
		created: new Date(), 
		updated: new Date(), 
		status: 'ACTIVE', 
	};
}
