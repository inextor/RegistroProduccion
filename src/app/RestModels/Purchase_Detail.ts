export interface Purchase_Detail {
  id: number;
  created: string | Date;
  description: string | null;
  item_id: number;
  purchase_id: number;
  qty: number | null;
  serial_number: string | null;
  status: string | null;
  stock_status: string | null;
  total: number;
  unitary_price: number | null;
  updated: string;
}


