import { Item_Recipe } from '../RestModels/Item_Recipe';

export function item_recipe(): Item_Recipe {
	return {
		id: 0, 
		created: new Date(), 
		item_id: 0, 
		parent_item_id: 0, 
		portion_qty: 0, 
		print_on_recipe: 'NO', 
		updated: new Date(), 
	};
}
