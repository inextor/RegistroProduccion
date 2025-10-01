import { Production_Area } from "../Models/Production_Area";

export interface ProductionAreaInfo
{
	production_area: Production_Area;
	users: any[]; //User[];
	store: any; //Store;
}
