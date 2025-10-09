export interface File_Type {
  id: number;
  content_type: string;
  created: string | Date;
  extension: string | null;
  image_id: number | null;
  is_image: 'NO' | 'YES';
  name: string;
  updated: string | Date;
}


