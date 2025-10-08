export interface Shipping_Item {
  id: number;
  box_id: number | null;
  created: string | Date;
  item_id: number | null;
  pallet_id: number | null;
  qty: number | null;
  received_qty: number | null;
  requisition_item_id: number | null;
  serial_number: string | null;
  shipping_id: number;
  shrinkage_qty: number | null;
  updated: string | Date;
}


