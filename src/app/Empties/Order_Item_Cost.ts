import { Order_Item_Cost } from '../RestModels/Order_Item_Cost';

export function order_item_cost(): Order_Item_Cost {
	return {
		id: 0, 
		child_items_cost: 0, 
		cost: 0, 
		created: new Date(), 
		ingredients_cost: 0, 
		item_cost: 0, 
		item_id: 0, 
		name: '', 
		order_id: 0, 
		order_item_id: 0, 
		qty: 0, 
		sale_profit: 0, 
		sale_total: 0, 
		store_id: 0, 
		total: 0, 
	};
}
