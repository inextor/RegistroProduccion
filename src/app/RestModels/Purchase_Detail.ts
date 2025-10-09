export interface Purchase_Detail {
  id: number;
  created: string | Date;
  description: string | null;
  item_id: number;
  purchase_id: number;
  qty: number;
  serial_number: string | null;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  stock_status: 'PENDING' | 'ADDED_TO_STOCK' | 'PENDING';
  total: number;
  unitary_price: number;
  updated: string | Date;
}


