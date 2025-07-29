import { Consumption } from './Consumption';
import { Consumption_User } from './Consumption_User';
import { Production_Area } from './Production_Area';

export interface ConsumptionInfo
{
	consumption: Consumption;
	production_area: Production_Area;
	users: any[];
}
