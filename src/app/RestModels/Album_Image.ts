export interface Album_Image {
  id: number;
  album_id: number | null;
  image_id: number | null;
  created: string | Date | null;
  created_by_user_id: number;
  description: string | null;
  item_id: number | null;
  title: string | null;
  updated: string | Date | null;
  updated_by_user_id: number;
}


