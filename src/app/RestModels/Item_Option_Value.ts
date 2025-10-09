export interface Item_Option_Value {
  id: number;
  charge_type: 'OPTIONAL' | 'INCLUDED' | 'EXTRA_CHARGE';
  extra_price: number;
  item_id: number;
  item_option_id: number | null;
  max_extra_qty: number;
  portion_amount: number;
  price: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
}


