export interface Category {
  id: number;
  available_online: 'YES' | 'NO' | 'YES';
  background: string;
  code: string | null;
  created_by_user_id: number | null;
  created: string | Date;
  default_clave_prod_serv: string | null;
  display_status: 'NORMAL' | 'HIDDEN' | 'NORMAL';
  image_id: number | null;
  image_style: 'COVER' | 'CONTAIN' | 'CONTAIN';
  name: string;
  shadow_color: string;
  sort_weight: number;
  text_color: string;
  text_style: 'NEVER' | 'CENTER' | 'DOWN' | 'CENTER';
  type: string | null;
  updated_by_user_id: number | null;
  updated: string | Date;
}


