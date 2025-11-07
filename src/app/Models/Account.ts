export interface Account {
	id: number;
	balance: number;
	created: string;
	created_by_user_id: number;
	is_main: boolean | null;
	currency_id: string;
	name: string;
	status: 'ACTIVE' | 'DELETED';
	updated: string;
	updated_by_user_id: number;
	user_id: number;
}
