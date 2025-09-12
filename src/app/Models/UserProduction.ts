import { Item } from './Item';

export interface ProductionItem {
  item: Item;
  qty: number;
  price: number;
  total: number;
}

export interface ProductionByDate {
  date: string;
  items: ProductionItem[];
  total_amount: number;
}

export interface UserProduction {
  user: any;
  dates: ProductionByDate[];
  total_amount: number;
}
