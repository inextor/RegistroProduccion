import { Role } from '../RestModels/Role';

export function emptyRole(): Role {
  return {
			created: new Date(),
			created_by_user_id: 0,
			id: 0,
			name: '',
			updated: new Date(),
			updated_by_user_id: 0
		}
}
