import { Item } from "../Models/Item";
import { Item_Attribute } from "../Models/Item_Attribute";

export interface ItemInfo {
	category: any;
    item: Item;
	attributes: Item_Attribute[];
}
