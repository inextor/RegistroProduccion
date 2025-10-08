export interface Commanda {
  id: number;
  commanda_type_id: number;
  has_sound: number;
  name: string;
  order_display_preferences: string | null;
  print_preferences: string | null;
  printer_ip: string | null;
  printer_port: string | null;
  store_id: number;
}


