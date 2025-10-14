import { Sat_Factura } from '../RestModels/Sat_Factura';

export function sat_factura(): Sat_Factura {
	return {
		id: 0, 
		system_cancelled_timestamp: null, 
		billing_data_id: null, 
		created_by_user_id: null, 
		created: new Date(), 
		folio: null, 
		order_id: null, 
		payment_id: null, 
		pdf_attachment_id: null, 
		request: null, 
		serie: null, 
		transaccion: null, 
		type: null, 
		updated_by_user_id: null, 
		updated: new Date(), 
		uuid: null, 
		xml_attachment_id: null, 
		cancelado_por_sat: null, 
		solicitud_cancelacion_sat_timestamp: null, 
	};
}
