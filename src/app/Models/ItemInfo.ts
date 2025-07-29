import { Item } from "./Item";
import { Item_Attribute } from "./Item_Attribute";

export interface ItemInfo {
	category: any;
    item: Item;
	attributes: Item_Attribute[];
}
