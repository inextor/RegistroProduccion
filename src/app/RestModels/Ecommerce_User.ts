export interface Ecommerce_User {
  id: number;
  ecommerce_id: number;
  user_id: number;
  created: string | Date;
  type: 'ECOMMERCE_ADMIN' | 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_USER';
  updated: string | Date;
  created_by_user_id: number | null;
  updated_by_user_id: number | null;
}


