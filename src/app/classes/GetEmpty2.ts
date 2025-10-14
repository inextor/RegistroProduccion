import { Account } from '../RestModels/Account';
import { Address } from '../RestModels/Address';
import { Album } from '../RestModels/Album';
import { Album_Image } from '../RestModels/Album_Image';
import { Answer } from '../RestModels/Answer';
import { Attachment } from '../RestModels/Attachment';
import { Attribute } from '../RestModels/Attribute';
import { Bank_Account } from '../RestModels/Bank_Account';
import { Bank_Movement } from '../RestModels/Bank_Movement';
import { Bank_Movement_Bill } from '../RestModels/Bank_Movement_Bill';
import { Bank_Movement_Order } from '../RestModels/Bank_Movement_Order';
import { Batch_Record } from '../RestModels/Batch_Record';
import { Bill } from '../RestModels/Bill';
import { Billing_Data } from '../RestModels/Billing_Data';
import { Box } from '../RestModels/Box';
import { Box_Content } from '../RestModels/Box_Content';
import { Brand } from '../RestModels/Brand';
import { Cart_Item } from '../RestModels/Cart_Item';
import { Cash_Close } from '../RestModels/Cash_Close';
import { Cash_Count } from '../RestModels/Cash_Count';
import { Cashier_Withdrawal } from '../RestModels/Cashier_Withdrawal';
import { Category } from '../RestModels/Category';
import { Category_Store } from '../RestModels/Category_Store';
import { Category_Tree } from '../RestModels/Category_Tree';
import { Category_Type } from '../RestModels/Category_Type';
import { Check_In } from '../RestModels/Check_In';
import { Check_In_Raw } from '../RestModels/Check_In_Raw';
import { Commanda } from '../RestModels/Commanda';
import { Commanda_Type } from '../RestModels/Commanda_Type';
import { Consumption } from '../RestModels/Consumption';
import { Consumption_User } from '../RestModels/Consumption_User';
import { Currency } from '../RestModels/Currency';
import { Currency_Rate } from '../RestModels/Currency_Rate';
import { Delivery_Assignment } from '../RestModels/Delivery_Assignment';
import { Ecommerce } from '../RestModels/Ecommerce';
import { Ecommerce_Item } from '../RestModels/Ecommerce_Item';
import { Ecommerce_Item_Profile } from '../RestModels/Ecommerce_Item_Profile';
import { Ecommerce_Item_Role } from '../RestModels/Ecommerce_Item_Role';
import { Ecommerce_Role_Item } from '../RestModels/Ecommerce_Role_Item';
import { Ecommerce_User } from '../RestModels/Ecommerce_User';
import { File_Type } from '../RestModels/File_Type';
import { Form } from '../RestModels/Form';
import { Fund } from '../RestModels/Fund';
import { Image } from '../RestModels/Image';
import { Ingredient } from '../RestModels/Ingredient';
import { Installment } from '../RestModels/Installment';
import { Item } from '../RestModels/Item';
import { Item_Attachment } from '../RestModels/Item_Attachment';
import { Item_Attribute } from '../RestModels/Item_Attribute';
import { Item_Exception } from '../RestModels/Item_Exception';
import { Item_Image } from '../RestModels/Item_Image';
import { Item_Option } from '../RestModels/Item_Option';
import { Item_Option_Value } from '../RestModels/Item_Option_Value';
import { Item_Points } from '../RestModels/Item_Points';
import { Item_Recipe } from '../RestModels/Item_Recipe';
import { Item_Store } from '../RestModels/Item_Store';
import { Keyboard_Shortcut } from '../RestModels/Keyboard_Shortcut';
import { Labels } from '../RestModels/Labels';
import { Ledger } from '../RestModels/Ledger';
import { Ledger_Category } from '../RestModels/Ledger_Category';
import { Ledger_Detail } from '../RestModels/Ledger_Detail';
import { Merma } from '../RestModels/Merma';
import { Notification_Token } from '../RestModels/Notification_Token';
import { Offer } from '../RestModels/Offer';
import { Order } from '../RestModels/Order';
import { Order_Item } from '../RestModels/Order_Item';
import { Order_Item_Cost } from '../RestModels/Order_Item_Cost';
import { Order_Item_Exception } from '../RestModels/Order_Item_Exception';
import { Order_Item_Response } from '../RestModels/Order_Item_Response';
import { Order_Item_Serial } from '../RestModels/Order_Item_Serial';
import { Order_Offer } from '../RestModels/Order_Offer';
import { Pallet } from '../RestModels/Pallet';
import { Pallet_Content } from '../RestModels/Pallet_Content';
import { Payment } from '../RestModels/Payment';
import { Paypal_Access_Token } from '../RestModels/Paypal_Access_Token';
import { Paypal_Order } from '../RestModels/Paypal_Order';
import { Payroll } from '../RestModels/Payroll';
import { Payroll_Concept } from '../RestModels/Payroll_Concept';
import { Payroll_Value } from '../RestModels/Payroll_Value';
import { Period } from '../RestModels/Period';
import { Pharos_Credentials } from '../RestModels/Pharos_Credentials';
import { Pharos_Payment_Request } from '../RestModels/Pharos_Payment_Request';
import { Points_Log } from '../RestModels/Points_Log';
import { Post } from '../RestModels/Post';
import { Preferences } from '../RestModels/Preferences';
import { Price } from '../RestModels/Price';
import { Price_List } from '../RestModels/Price_List';
import { Price_Log } from '../RestModels/Price_Log';
import { Price_Type } from '../RestModels/Price_Type';
import { Printer } from '../RestModels/Printer';
import { Process } from '../RestModels/Process';
import { Process_Status } from '../RestModels/Process_Status';
import { Product } from '../RestModels/Product';
import { Production } from '../RestModels/Production';
import { Production_Area } from '../RestModels/Production_Area';
import { Production_Area_Item } from '../RestModels/Production_Area_Item';
import { Production_User } from '../RestModels/Production_User';
import { Profile } from '../RestModels/Profile';
import { Purchase } from '../RestModels/Purchase';
import { Purchase_Detail } from '../RestModels/Purchase_Detail';
import { Push_Notification } from '../RestModels/Push_Notification';
import { Question } from '../RestModels/Question';
import { Question_Choice } from '../RestModels/Question_Choice';
import { Quote } from '../RestModels/Quote';
import { Quote_Item } from '../RestModels/Quote_Item';
import { Quote_Request } from '../RestModels/Quote_Request';
import { Requisition } from '../RestModels/Requisition';
import { Requisition_Item } from '../RestModels/Requisition_Item';
import { Reservation } from '../RestModels/Reservation';
import { Reservation_Item } from '../RestModels/Reservation_Item';
import { Reservation_Item_Assign } from '../RestModels/Reservation_Item_Assign';
import { Reservation_Item_Serial } from '../RestModels/Reservation_Item_Serial';
import { Response } from '../RestModels/Response';
import { Return_Assignment } from '../RestModels/Return_Assignment';
import { Returned_Item } from '../RestModels/Returned_Item';
import { Returns } from '../RestModels/Returns';
import { Role } from '../RestModels/Role';
import { Role_Item_Price } from '../RestModels/Role_Item_Price';
import { Sat_Factura } from '../RestModels/Sat_Factura';
import { Sat_Response } from '../RestModels/Sat_Response';
import { Serial } from '../RestModels/Serial';
import { Serial_Image } from '../RestModels/Serial_Image';
import { Serial_Log } from '../RestModels/Serial_Log';
import { Serie_Counter } from '../RestModels/Serie_Counter';
import { Session } from '../RestModels/Session';
import { Shipping } from '../RestModels/Shipping';
import { Shipping_Item } from '../RestModels/Shipping_Item';
import { Stock_Alert } from '../RestModels/Stock_Alert';
import { Stock_Record } from '../RestModels/Stock_Record';
import { Stocktake } from '../RestModels/Stocktake';
import { Stocktake_Item } from '../RestModels/Stocktake_Item';
import { Stocktake_Scan } from '../RestModels/Stocktake_Scan';
import { Storage } from '../RestModels/Storage';
import { Storage_Item } from '../RestModels/Storage_Item';
import { Storage_Serial } from '../RestModels/Storage_Serial';
import { Storage_Type } from '../RestModels/Storage_Type';
import { Store } from '../RestModels/Store';
import { Store_Bank_Account } from '../RestModels/Store_Bank_Account';
import { Store_Sale_Report } from '../RestModels/Store_Sale_Report';
import { Table } from '../RestModels/Table';
import { Task } from '../RestModels/Task';
import { Task_Comment } from '../RestModels/Task_Comment';
import { Ticket } from '../RestModels/Ticket';
import { Unidad_Medida_Sat } from '../RestModels/Unidad_Medida_Sat';
import { User } from '../RestModels/User';
import { User_Attachment } from '../RestModels/User_Attachment';
import { User_Extra_Fields } from '../RestModels/User_Extra_Fields';
import { User_Permission } from '../RestModels/User_Permission';
import { Withdrawal } from '../RestModels/Withdrawal';
import { Work_Log } from '../RestModels/Work_Log';
import { Work_Log_Rules } from '../RestModels/Work_Log_Rules';
import { Workshift } from '../RestModels/Workshift';

import { account } from '../Empties/Account';
import { address } from '../Empties/Address';
import { album } from '../Empties/Album';
import { album_image } from '../Empties/Album_Image';
import { answer } from '../Empties/Answer';
import { attachment } from '../Empties/Attachment';
import { attribute } from '../Empties/Attribute';
import { bank_account } from '../Empties/Bank_Account';
import { bank_movement } from '../Empties/Bank_Movement';
import { bank_movement_bill } from '../Empties/Bank_Movement_Bill';
import { bank_movement_order } from '../Empties/Bank_Movement_Order';
import { batch_record } from '../Empties/Batch_Record';
import { bill } from '../Empties/Bill';
import { billing_data } from '../Empties/Billing_Data';
import { box } from '../Empties/Box';
import { box_content } from '../Empties/Box_Content';
import { brand } from '../Empties/Brand';
import { cart_item } from '../Empties/Cart_Item';
import { cash_close } from '../Empties/Cash_Close';
import { cash_count } from '../Empties/Cash_Count';
import { cashier_withdrawal } from '../Empties/Cashier_Withdrawal';
import { category } from '../Empties/Category';
import { category_store } from '../Empties/Category_Store';
import { category_tree } from '../Empties/Category_Tree';
import { category_type } from '../Empties/Category_Type';
import { check_in } from '../Empties/Check_In';
import { check_in_raw } from '../Empties/Check_In_Raw';
import { commanda } from '../Empties/Commanda';
import { commanda_type } from '../Empties/Commanda_Type';
import { consumption } from '../Empties/Consumption';
import { consumption_user } from '../Empties/Consumption_User';
import { currency } from '../Empties/Currency';
import { currency_rate } from '../Empties/Currency_Rate';
import { delivery_assignment } from '../Empties/Delivery_Assignment';
import { ecommerce } from '../Empties/Ecommerce';
import { ecommerce_item } from '../Empties/Ecommerce_Item';
import { ecommerce_item_profile } from '../Empties/Ecommerce_Item_Profile';
import { ecommerce_item_role } from '../Empties/Ecommerce_Item_Role';
import { ecommerce_role_item } from '../Empties/Ecommerce_Role_Item';
import { ecommerce_user } from '../Empties/Ecommerce_User';
import { file_type } from '../Empties/File_Type';
import { form } from '../Empties/Form';
import { fund } from '../Empties/Fund';
import { image } from '../Empties/Image';
import { ingredient } from '../Empties/Ingredient';
import { installment } from '../Empties/Installment';
import { item } from '../Empties/Item';
import { item_attachment } from '../Empties/Item_Attachment';
import { item_attribute } from '../Empties/Item_Attribute';
import { item_exception } from '../Empties/Item_Exception';
import { item_image } from '../Empties/Item_Image';
import { item_option } from '../Empties/Item_Option';
import { item_option_value } from '../Empties/Item_Option_Value';
import { item_points } from '../Empties/Item_Points';
import { item_recipe } from '../Empties/Item_Recipe';
import { item_store } from '../Empties/Item_Store';
import { keyboard_shortcut } from '../Empties/Keyboard_Shortcut';
import { labels } from '../Empties/Labels';
import { ledger } from '../Empties/Ledger';
import { ledger_category } from '../Empties/Ledger_Category';
import { ledger_detail } from '../Empties/Ledger_Detail';
import { merma } from '../Empties/Merma';
import { notification_token } from '../Empties/Notification_Token';
import { offer } from '../Empties/Offer';
import { order } from '../Empties/Order';
import { order_item } from '../Empties/Order_Item';
import { order_item_cost } from '../Empties/Order_Item_Cost';
import { order_item_exception } from '../Empties/Order_Item_Exception';
import { order_item_response } from '../Empties/Order_Item_Response';
import { order_item_serial } from '../Empties/Order_Item_Serial';
import { order_offer } from '../Empties/Order_Offer';
import { pallet } from '../Empties/Pallet';
import { pallet_content } from '../Empties/Pallet_Content';
import { payment } from '../Empties/Payment';
import { paypal_access_token } from '../Empties/Paypal_Access_Token';
import { paypal_order } from '../Empties/Paypal_Order';
import { payroll } from '../Empties/Payroll';
import { payroll_concept } from '../Empties/Payroll_Concept';
import { payroll_value } from '../Empties/Payroll_Value';
import { period } from '../Empties/Period';
import { pharos_credentials } from '../Empties/Pharos_Credentials';
import { pharos_payment_request } from '../Empties/Pharos_Payment_Request';
import { points_log } from '../Empties/Points_Log';
import { post } from '../Empties/Post';
import { preferences } from '../Empties/Preferences';
import { price } from '../Empties/Price';
import { price_list } from '../Empties/Price_List';
import { price_log } from '../Empties/Price_Log';
import { price_type } from '../Empties/Price_Type';
import { printer } from '../Empties/Printer';
import { process } from '../Empties/Process';
import { process_status } from '../Empties/Process_Status';
import { product } from '../Empties/Product';
import { production } from '../Empties/Production';
import { production_area } from '../Empties/Production_Area';
import { production_area_item } from '../Empties/Production_Area_Item';
import { production_user } from '../Empties/Production_User';
import { profile } from '../Empties/Profile';
import { purchase } from '../Empties/Purchase';
import { purchase_detail } from '../Empties/Purchase_Detail';
import { push_notification } from '../Empties/Push_Notification';
import { question } from '../Empties/Question';
import { question_choice } from '../Empties/Question_Choice';
import { quote } from '../Empties/Quote';
import { quote_item } from '../Empties/Quote_Item';
import { quote_request } from '../Empties/Quote_Request';
import { requisition } from '../Empties/Requisition';
import { requisition_item } from '../Empties/Requisition_Item';
import { reservation } from '../Empties/Reservation';
import { reservation_item } from '../Empties/Reservation_Item';
import { reservation_item_assign } from '../Empties/Reservation_Item_Assign';
import { reservation_item_serial } from '../Empties/Reservation_Item_Serial';
import { response } from '../Empties/Response';
import { return_assignment } from '../Empties/Return_Assignment';
import { returned_item } from '../Empties/Returned_Item';
import { returns } from '../Empties/Returns';
import { role } from '../Empties/Role';
import { role_item_price } from '../Empties/Role_Item_Price';
import { sat_factura } from '../Empties/Sat_Factura';
import { sat_response } from '../Empties/Sat_Response';
import { serial } from '../Empties/Serial';
import { serial_image } from '../Empties/Serial_Image';
import { serial_log } from '../Empties/Serial_Log';
import { serie_counter } from '../Empties/Serie_Counter';
import { session } from '../Empties/Session';
import { shipping } from '../Empties/Shipping';
import { shipping_item } from '../Empties/Shipping_Item';
import { stock_alert } from '../Empties/Stock_Alert';
import { stock_record } from '../Empties/Stock_Record';
import { stocktake } from '../Empties/Stocktake';
import { stocktake_item } from '../Empties/Stocktake_Item';
import { stocktake_scan } from '../Empties/Stocktake_Scan';
import { storage } from '../Empties/Storage';
import { storage_item } from '../Empties/Storage_Item';
import { storage_serial } from '../Empties/Storage_Serial';
import { storage_type } from '../Empties/Storage_Type';
import { store } from '../Empties/Store';
import { store_bank_account } from '../Empties/Store_Bank_Account';
import { store_sale_report } from '../Empties/Store_Sale_Report';
import { table } from '../Empties/Table';
import { task } from '../Empties/Task';
import { task_comment } from '../Empties/Task_Comment';
import { ticket } from '../Empties/Ticket';
import { unidad_medida_sat } from '../Empties/Unidad_Medida_Sat';
import { user } from '../Empties/User';
import { user_attachment } from '../Empties/User_Attachment';
import { user_extra_fields } from '../Empties/User_Extra_Fields';
import { user_permission } from '../Empties/User_Permission';
import { withdrawal } from '../Empties/Withdrawal';
import { work_log } from '../Empties/Work_Log';
import { work_log_rules } from '../Empties/Work_Log_Rules';
import { workshift } from '../Empties/Workshift';

export class GetEmpty2 {
	static account(): Account { return account(); }
	static address(): Address { return address(); }
	static album(): Album { return album(); }
	static album_image(): Album_Image { return album_image(); }
	static answer(): Answer { return answer(); }
	static attachment(): Attachment { return attachment(); }
	static attribute(): Attribute { return attribute(); }
	static bank_account(): Bank_Account { return bank_account(); }
	static bank_movement(): Bank_Movement { return bank_movement(); }
	static bank_movement_bill(): Bank_Movement_Bill { return bank_movement_bill(); }
	static bank_movement_order(): Bank_Movement_Order { return bank_movement_order(); }
	static batch_record(): Batch_Record { return batch_record(); }
	static bill(): Bill { return bill(); }
	static billing_data(): Billing_Data { return billing_data(); }
	static box(): Box { return box(); }
	static box_content(): Box_Content { return box_content(); }
	static brand(): Brand { return brand(); }
	static cart_item(): Cart_Item { return cart_item(); }
	static cash_close(): Cash_Close { return cash_close(); }
	static cash_count(): Cash_Count { return cash_count(); }
	static cashier_withdrawal(): Cashier_Withdrawal { return cashier_withdrawal(); }
	static category(): Category { return category(); }
	static category_store(): Category_Store { return category_store(); }
	static category_tree(): Category_Tree { return category_tree(); }
	static category_type(): Category_Type { return category_type(); }
	static check_in(): Check_In { return check_in(); }
	static check_in_raw(): Check_In_Raw { return check_in_raw(); }
	static commanda(): Commanda { return commanda(); }
	static commanda_type(): Commanda_Type { return commanda_type(); }
	static consumption(): Consumption { return consumption(); }
	static consumption_user(): Consumption_User { return consumption_user(); }
	static currency(): Currency { return currency(); }
	static currency_rate(): Currency_Rate { return currency_rate(); }
	static delivery_assignment(): Delivery_Assignment { return delivery_assignment(); }
	static ecommerce(): Ecommerce { return ecommerce(); }
	static ecommerce_item(): Ecommerce_Item { return ecommerce_item(); }
	static ecommerce_item_profile(): Ecommerce_Item_Profile { return ecommerce_item_profile(); }
	static ecommerce_item_role(): Ecommerce_Item_Role { return ecommerce_item_role(); }
	static ecommerce_role_item(): Ecommerce_Role_Item { return ecommerce_role_item(); }
	static ecommerce_user(): Ecommerce_User { return ecommerce_user(); }
	static file_type(): File_Type { return file_type(); }
	static form(): Form { return form(); }
	static fund(): Fund { return fund(); }
	static image(): Image { return image(); }
	static ingredient(): Ingredient { return ingredient(); }
	static installment(): Installment { return installment(); }
	static item(): Item { return item(); }
	static item_attachment(): Item_Attachment { return item_attachment(); }
	static item_attribute(): Item_Attribute { return item_attribute(); }
	static item_exception(): Item_Exception { return item_exception(); }
	static item_image(): Item_Image { return item_image(); }
	static item_option(): Item_Option { return item_option(); }
	static item_option_value(): Item_Option_Value { return item_option_value(); }
	static item_points(): Item_Points { return item_points(); }
	static item_recipe(): Item_Recipe { return item_recipe(); }
	static item_store(): Item_Store { return item_store(); }
	static keyboard_shortcut(): Keyboard_Shortcut { return keyboard_shortcut(); }
	static labels(): Labels { return labels(); }
	static ledger(): Ledger { return ledger(); }
	static ledger_category(): Ledger_Category { return ledger_category(); }
	static ledger_detail(): Ledger_Detail { return ledger_detail(); }
	static merma(): Merma { return merma(); }
	static notification_token(): Notification_Token { return notification_token(); }
	static offer(): Offer { return offer(); }
	static order(): Order { return order(); }
	static order_item(): Order_Item { return order_item(); }
	static order_item_cost(): Order_Item_Cost { return order_item_cost(); }
	static order_item_exception(): Order_Item_Exception { return order_item_exception(); }
	static order_item_response(): Order_Item_Response { return order_item_response(); }
	static order_item_serial(): Order_Item_Serial { return order_item_serial(); }
	static order_offer(): Order_Offer { return order_offer(); }
	static pallet(): Pallet { return pallet(); }
	static pallet_content(): Pallet_Content { return pallet_content(); }
	static payment(): Payment { return payment(); }
	static paypal_access_token(): Paypal_Access_Token { return paypal_access_token(); }
	static paypal_order(): Paypal_Order { return paypal_order(); }
	static payroll(): Payroll { return payroll(); }
	static payroll_concept(): Payroll_Concept { return payroll_concept(); }
	static payroll_value(): Payroll_Value { return payroll_value(); }
	static period(): Period { return period(); }
	static pharos_credentials(): Pharos_Credentials { return pharos_credentials(); }
	static pharos_payment_request(): Pharos_Payment_Request { return pharos_payment_request(); }
	static points_log(): Points_Log { return points_log(); }
	static post(): Post { return post(); }
	static preferences(): Preferences { return preferences(); }
	static price(): Price { return price(); }
	static price_list(): Price_List { return price_list(); }
	static price_log(): Price_Log { return price_log(); }
	static price_type(): Price_Type { return price_type(); }
	static printer(): Printer { return printer(); }
	static process(): Process { return process(); }
	static process_status(): Process_Status { return process_status(); }
	static product(): Product { return product(); }
	static production(): Production { return production(); }
	static production_area(): Production_Area { return production_area(); }
	static production_area_item(): Production_Area_Item { return production_area_item(); }
	static production_user(): Production_User { return production_user(); }
	static profile(): Profile { return profile(); }
	static purchase(): Purchase { return purchase(); }
	static purchase_detail(): Purchase_Detail { return purchase_detail(); }
	static push_notification(): Push_Notification { return push_notification(); }
	static question(): Question { return question(); }
	static question_choice(): Question_Choice { return question_choice(); }
	static quote(): Quote { return quote(); }
	static quote_item(): Quote_Item { return quote_item(); }
	static quote_request(): Quote_Request { return quote_request(); }
	static requisition(): Requisition { return requisition(); }
	static requisition_item(): Requisition_Item { return requisition_item(); }
	static reservation(): Reservation { return reservation(); }
	static reservation_item(): Reservation_Item { return reservation_item(); }
	static reservation_item_assign(): Reservation_Item_Assign { return reservation_item_assign(); }
	static reservation_item_serial(): Reservation_Item_Serial { return reservation_item_serial(); }
	static response(): Response { return response(); }
	static return_assignment(): Return_Assignment { return return_assignment(); }
	static returned_item(): Returned_Item { return returned_item(); }
	static returns(): Returns { return returns(); }
	static role(): Role { return role(); }
	static role_item_price(): Role_Item_Price { return role_item_price(); }
	static sat_factura(): Sat_Factura { return sat_factura(); }
	static sat_response(): Sat_Response { return sat_response(); }
	static serial(): Serial { return serial(); }
	static serial_image(): Serial_Image { return serial_image(); }
	static serial_log(): Serial_Log { return serial_log(); }
	static serie_counter(): Serie_Counter { return serie_counter(); }
	static session(): Session { return session(); }
	static shipping(): Shipping { return shipping(); }
	static shipping_item(): Shipping_Item { return shipping_item(); }
	static stock_alert(): Stock_Alert { return stock_alert(); }
	static stock_record(): Stock_Record { return stock_record(); }
	static stocktake(): Stocktake { return stocktake(); }
	static stocktake_item(): Stocktake_Item { return stocktake_item(); }
	static stocktake_scan(): Stocktake_Scan { return stocktake_scan(); }
	static storage(): Storage { return storage(); }
	static storage_item(): Storage_Item { return storage_item(); }
	static storage_serial(): Storage_Serial { return storage_serial(); }
	static storage_type(): Storage_Type { return storage_type(); }
	static store(): Store { return store(); }
	static store_bank_account(): Store_Bank_Account { return store_bank_account(); }
	static store_sale_report(): Store_Sale_Report { return store_sale_report(); }
	static table(): Table { return table(); }
	static task(): Task { return task(); }
	static task_comment(): Task_Comment { return task_comment(); }
	static ticket(): Ticket { return ticket(); }
	static unidad_medida_sat(): Unidad_Medida_Sat { return unidad_medida_sat(); }
	static user(): User { return user(); }
	static user_attachment(): User_Attachment { return user_attachment(); }
	static user_extra_fields(): User_Extra_Fields { return user_extra_fields(); }
	static user_permission(): User_Permission { return user_permission(); }
	static withdrawal(): Withdrawal { return withdrawal(); }
	static work_log(): Work_Log { return work_log(); }
	static work_log_rules(): Work_Log_Rules { return work_log_rules(); }
	static workshift(): Workshift { return workshift(); }
}