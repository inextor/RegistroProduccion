import { Post } from '../RestModels/Post';

export function post(): Post {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		images_ids: '', 
		post: '', 
		title: '', 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
