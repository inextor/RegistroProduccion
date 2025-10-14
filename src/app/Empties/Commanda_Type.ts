import { Commanda_Type } from '../RestModels/Commanda_Type';

export function commanda_type(): Commanda_Type {
	return {
		id: 0, 
		created: new Date(), 
		name: '', 
		updated: new Date(), 
	};
}
