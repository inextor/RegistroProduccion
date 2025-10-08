import { ItemInfo } from '../RestModels/ItemInfo';

export function emptyItemInfo(): ItemInfo {
  return {
			item: GetEmpty.item(),
			category: null,
			price: undefined,
			prices: [],
			options: [],
			exceptions: [],
			records: [],
			stock_record: undefined,
			serials: [],
			item_options: []
		};
}
