import { Process } from '../RestModels/Process';

export function process(): Process {
	return {
		id: 0, 
		category_id: null, 
		created: new Date(), 
		generator_type: 'ON_DEMAN', 
		item_id: null, 
		json_tags: null, 
		name: '', 
		production_area_id: 0, 
		status: 'ACTIVE', 
		updated: new Date(), 
	};
}
