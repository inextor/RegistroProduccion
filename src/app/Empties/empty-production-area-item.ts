import { Production_Area_Item } from '../RestModels/Production_Area_Item';

export function emptyProductionAreaItem(): Production_Area_Item {
  return {
			created: new Date(),
			id:0,
			item_id: 0,
			production_area_id: 0,
			status: 'ACTIVE',
			updated: new Date(),
		}
}
