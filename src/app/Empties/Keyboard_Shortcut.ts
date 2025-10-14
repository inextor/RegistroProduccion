import { Keyboard_Shortcut } from '../RestModels/Keyboard_Shortcut';

export function keyboard_shortcut(): Keyboard_Shortcut {
	return {
		id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		key_combination: '', 
		name: '', 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
