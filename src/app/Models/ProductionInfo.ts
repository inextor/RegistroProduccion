import { Item } from "./Item";
import { Production } from "./Production";
import { Production_Area } from "./Production_Area";
import { Production_User } from "./Production_User";
import { User } from "./User";

export interface ProductionInfo
{
	production:Production;
	production_area: Production_Area | null;
	item:Item;
	category:any;
	users:Production_User[];
}
