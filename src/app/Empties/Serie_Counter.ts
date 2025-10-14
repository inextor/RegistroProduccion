import { Serie_Counter } from '../RestModels/Serie_Counter';

export function serie_counter(): Serie_Counter {
	return {
		id: '', 
		counter: '', 
		created: new Date(), 
		updated: new Date(), 
	};
}
