import { Push_Notification } from '../RestModels/Push_Notification';

export function push_notification(): Push_Notification {
	return {
		id: 0, 
		app_path: null, 
		body: '', 
		created: new Date(), 
		icon_image_id: null, 
		link: null, 
		object_id: null, 
		object_type: '', 
		priority: 'normal', 
		push_notification_id: null, 
		read_status: 'PENDING', 
		response: null, 
		sent_status: null, 
		title: '', 
		updated: new Date(), 
		user_id: 0, 
	};
}
