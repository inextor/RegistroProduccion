export interface Commanda {
  id: number;
  commanda_type_id: number;
  has_sound: any;
  name: string;
  order_display_preferences: 'ALL_ORDERS' | 'COMMANDA_TYPE_ORDERS' | 'COMMANDA_TYPE_ORDERS';
  print_preferences: 'ONLY_DISPLAY' | 'PRINT_PARTIAL' | 'FULL_PRINT' | 'PRINT_ONLY_NEW_ITEMS' | 'ONLY_DISPLAY';
  printer_ip: string | null;
  printer_port: string | null;
  store_id: number;
}


