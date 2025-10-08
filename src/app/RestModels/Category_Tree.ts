export interface Category_Tree {
  id: number;
  child_category_id: number;
  created_by_user_id: number;
  created: string | Date;
  depth: number;
  parent_category_id: number;
  path: string | null;
  updated_by_user_id: number;
  updated: string;
}


