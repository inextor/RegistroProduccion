import { Production_Area } from '../RestModels/Production_Area';

export function production_area(): Production_Area {
	return {
		id: 0, 
		created: new Date(), 
		name: '', 
		status: 'ACTIVE', 
		store_id: 0, 
		updated: new Date(), 
	};
}
