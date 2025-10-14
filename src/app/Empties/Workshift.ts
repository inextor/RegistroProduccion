import { Workshift } from '../RestModels/Workshift';

export function workshift(): Workshift {
	return {
		id: 0, 
		created: new Date(), 
		duration: '', 
		name: 0, 
		start_time: '', 
		updated: new Date(), 
	};
}
