export interface Consumption {
	id: number;
	item_id: number;
	qty: number;
	production_area_id: number | null;
	consumed_by_user_id: number | null;
	store_id: number;
	price:Number;
	description: string | null;
	status: 'ACTIVE' | 'DELETED';
	created: string;
	created_by_user_id: number;
	updated: string;
	updated_by_user_id: number;
}
