import { Consumption } from "../Models/Consumption";
import { Production_Area } from "../Models/Production_Area";

export interface ConsumptionInfo
{
	consumption: Consumption;
	production_area: Production_Area;
	users: any[];
}
