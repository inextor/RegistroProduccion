import { Production_Area_Item } from '../RestModels/Production_Area_Item';

export function production_area_item(): Production_Area_Item {
	return {
		id: 0, 
		created: new Date(), 
		item_id: 0, 
		production_area_id: 0, 
		status: 'ACTIVE', 
		updated: new Date(), 
	};
}
