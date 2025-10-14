import { Category_Tree } from '../RestModels/Category_Tree';

export function category_tree(): Category_Tree {
	return {
		id: 0, 
		child_category_id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		depth: 0, 
		parent_category_id: 0, 
		path: null, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
