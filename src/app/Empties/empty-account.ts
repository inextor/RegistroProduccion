import { Account } from '../RestModels/Account';

export function emptyAccount(): Account {
  const now = new Date().toISOString();
  return {
    id: 0,
    status: 'ACTIVE',
    balance: 0.00,
    created: now,
    created_by_user_id: 0,
    currency_id: 'MXN',
    is_main: 0,
    updated: now,
    updated_by_user_id: 0,
    user_id: 0,
  };
}
