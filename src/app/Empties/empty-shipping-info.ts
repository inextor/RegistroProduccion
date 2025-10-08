import { ShippingInfo } from '../RestModels/ShippingInfo';

export function emptyShippingInfo(): ShippingInfo {
  return {
			shipping: GetEmpty.shipping(),
			items: []
		};
}
