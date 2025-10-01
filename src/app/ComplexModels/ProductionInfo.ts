import { Item } from "../Models/Item";
import { Production } from "../Models/Production";
import { Production_Area } from "../Models/Production_Area";
import { Production_User } from "../Models/Production_User";

export interface ProductionInfo
{
	production:Production;
	production_area: Production_Area | null;
	item:Item;
	category:any;
	users:Production_User[];
}
