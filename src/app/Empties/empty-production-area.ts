import { Production_Area } from '../RestModels/Production_Area';

export function emptyProductionArea(): Production_Area {
  return {
			created: new Date(),
			id:0,
			store_id: 0,
			name:'',
			status:'ACTIVE',
			updated: new Date(),
		}
}
