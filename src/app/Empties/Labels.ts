import { Labels } from '../RestModels/Labels';

export function labels(): Labels {
	return {
		id: 0, 
		store: '', 
		production_area: '', 
		ingredients: '', 
		created: new Date(), 
		updated: new Date(), 
	};
}
