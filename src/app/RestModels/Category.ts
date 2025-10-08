export interface Category {
  id: number;
  available_online: string | null;
  background: string;
  code: string | null;
  created_by_user_id: number | null;
  created: string | Date;
  default_clave_prod_serv: string | null;
  display_status: string | null;
  image_id: number | null;
  image_style: string | null;
  name: string;
  shadow_color: string;
  sort_weight: number;
  text_color: string;
  text_style: string | null;
  type: string | null;
  updated_by_user_id: number | null;
  updated: string;
}


