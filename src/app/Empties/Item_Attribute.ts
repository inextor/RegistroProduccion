import { Item_Attribute } from '../RestModels/Item_Attribute';

export function item_attribute(): Item_Attribute {
	return {
		id: 0, 
		attribute_id: 0, 
		created_by_user_id: 0, 
		item_id: 0, 
		created: new Date(), 
		updated_by_user_id: 0, 
		updated: new Date(), 
		value: '', 
	};
}
