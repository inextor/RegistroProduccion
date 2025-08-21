/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.7-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: POS_mollusca
-- ------------------------------------------------------
-- Server version	11.4.7-MariaDB-0ubuntu0.25.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `currency_id` varchar(3) NOT NULL DEFAULT 'MXN',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_unique` (`user_id`),
  KEY `account_created_by_user_id` (`created_by_user_id`),
  KEY `account_updated_by_user_id` (`updated_by_user_id`),
  CONSTRAINT `account_created_by_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `account_updated_by_user_id` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `account_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci COMMENT='Almacena el saldo de la cuenta financiera de cada usuario.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` text DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  `country` varchar(40) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` text DEFAULT NULL,
  `lat` decimal(9,6) DEFAULT NULL,
  `lng` decimal(9,6) DEFAULT NULL,
  `name` varchar(120) NOT NULL,
  `note` text DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `rfc` varchar(60) DEFAULT NULL,
  `sat_regimen_capital` varchar(60) DEFAULT NULL,
  `sat_regimen_fiscal` varchar(4) DEFAULT NULL,
  `sat_uso_cfdi` varchar(5) DEFAULT NULL,
  `state` varchar(40) DEFAULT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `suburb` varchar(60) DEFAULT NULL,
  `type` enum('BILLING','SHIPPING','BILLING_AND_SHIPPING') NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `album_created_by_user_id` (`created_by_user_id`),
  KEY `album_updated_by_user_id` (`updated_by_user_id`),
  CONSTRAINT `album_created_by_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `album_updated_by_user_id` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer_choice_id` smallint(6) DEFAULT NULL,
  `answer_number` int(11) DEFAULT NULL,
  `answer_text` text DEFAULT NULL,
  `question_id` int(11) NOT NULL,
  `response_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `response_id` (`response_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`response_id`) REFERENCES `response` (`id`) ON DELETE CASCADE,
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attachment`
--

DROP TABLE IF EXISTS `attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_type` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `file_type_id` int(11) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `original_filename` varchar(255) NOT NULL,
  `size` bigint(20) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `uploader_user_id` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uploader_user_id` (`uploader_user_id`),
  CONSTRAINT `attachment_ibfk_1` FOREIGN KEY (`uploader_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attribute`
--

DROP TABLE IF EXISTS `attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(25) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bank_account`
--

DROP TABLE IF EXISTS `bank_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(40) NOT NULL,
  `alias` varchar(40) NOT NULL,
  `bank_rfc` varchar(14) DEFAULT NULL,
  `bank` varchar(40) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency` varchar(3) NOT NULL,
  `email` text DEFAULT NULL,
  `is_a_payment_method` enum('NO','YES') NOT NULL,
  `name` text NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bank_account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bank_movement`
--

DROP TABLE IF EXISTS `bank_movement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_movement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount_received` decimal(10,3) NOT NULL COMMENT 'Es la cantidad Recibida o que pago el cajero, no se debe tomar en cuenta en los calculos solo es informativo, y sirve en la impresion de tickets\r\n\r\nEjemplo si el cajero le pagaron una venta por 150 con un billete de \r\n200, aqui va 200',
  `bank_account_id` int(11) DEFAULT NULL,
  `card_ending` varchar(20) DEFAULT NULL,
  `client_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL COMMENT 'En la moneda que el cajero lo recibe, \r\nSi es Pesos Sera MXN, SI recibio DOLARES Sera USD, \r\nSi la orden esta en pesos pero recibe en USD aqui va USD.',
  `exchange_rate` decimal(10,5) NOT NULL DEFAULT 1.00000,
  `invoice_attachment_id` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `origin_bank_name` varchar(100) DEFAULT NULL,
  `paid_date` datetime DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `provider_user_id` int(11) DEFAULT NULL,
  `receipt_attachment_id` int(11) DEFAULT NULL,
  `received_by_user_id` int(11) DEFAULT NULL COMMENT 'Es el usuario quien recibe el dinero,\r\nEn caso de de que el tipo sea expense, es quien hace el pago.',
  `reference` text DEFAULT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `total` decimal(10,3) NOT NULL COMMENT 'Es la cantidad que el cajero tiene que recibir o pagar, \r\n\r\nEjemplo si el cajero le pagaron una venta de 150 pesos\r\ncon un billete de 200, aqui va 150;',
  `transaction_type` enum('CASH','CREDIT_CARD','DEBIT_CARD','CHECK','COUPON','TRANSFER','DISCOUNT','RETURN_DISCOUNT','PAYPAL') NOT NULL,
  `type` enum('expense','income') NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `receive_by_user_id` (`received_by_user_id`),
  KEY `client_user_id` (`client_user_id`),
  KEY `receipt_attachment_id` (`receipt_attachment_id`),
  KEY `invoice_attachment_id` (`invoice_attachment_id`),
  KEY `bank_account_id` (`bank_account_id`),
  KEY `bank_movement_ibfk_7` (`payment_id`),
  KEY `bank_movement_ibfk_8` (`provider_user_id`),
  CONSTRAINT `bank_movement_ibfk_1` FOREIGN KEY (`client_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bank_movement_ibfk_2` FOREIGN KEY (`client_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bank_movement_ibfk_3` FOREIGN KEY (`invoice_attachment_id`) REFERENCES `attachment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bank_movement_ibfk_4` FOREIGN KEY (`receipt_attachment_id`) REFERENCES `attachment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bank_movement_ibfk_6` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bank_movement_ibfk_7` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bank_movement_ibfk_8` FOREIGN KEY (`provider_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bank_movement_bill`
--

DROP TABLE IF EXISTS `bank_movement_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_movement_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL COMMENT 'Cantidad pagada equivalente en la moneda de la orden Ejemplo, La Orden es en Pesos, Se pago en dolares, Aqui va la cantidad en pesos. ',
  `bank_movement_id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_amount` decimal(10,3) NOT NULL COMMENT 'Cantidad que se pago con el tipo de moneda que se especifico, Ejemplo. La orden es en pesos pero se pago con dolares, aqui va la cantidad en dolares ',
  `currency_id` varchar(3) NOT NULL,
  `exchange_rate` decimal(10,3) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `bank_movement_bill_ibfk_1` (`bill_id`),
  KEY `bank_movement_id` (`bank_movement_id`),
  CONSTRAINT `bank_movement_bill_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `bank_movement_bill_ibfk_2` FOREIGN KEY (`bank_movement_id`) REFERENCES `bank_movement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bank_movement_order`
--

DROP TABLE IF EXISTS `bank_movement_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_movement_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,3) NOT NULL COMMENT 'Cantidad pagada equivalente en la moneda de la orden	\r\n\r\nEjemplo, La Orden es en Pesos, Se pago en dolares, Aqui va la cantidad en pesos.',
  `bank_movement_id` int(11) NOT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_amount` decimal(10,3) NOT NULL COMMENT 'Cantidad que se pago con el tipo de moneda que se especifico,\r\n\r\nEjemplo. La orden es en pesos pero se pago con dolares, aqui va la cantidad en dolares',
  `currency_id` varchar(3) NOT NULL COMMENT 'Tipo de moneda con el que se esta haciendo el pago.\r\n\r\nPor ejemplo Si la orden es en pesos MXN y el pago que se esta haciendo es en dolares, el valor que aqui debe llevar es USD',
  `exchange_rate` decimal(10,5) NOT NULL DEFAULT 1.00000 COMMENT 'Tipo de cambio, entre el tipo de moneda de la orden y el tipo de moneda que se recibio en el pago',
  `order_id` int(11) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `bank_movement_id` (`bank_movement_id`),
  KEY `order_id` (`order_id`),
  KEY `bank_movement_order_ibfk_4` (`currency_id`),
  CONSTRAINT `bank_movement_order_ibfk_1` FOREIGN KEY (`bank_movement_id`) REFERENCES `bank_movement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bank_movement_order_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bank_movement_order_ibfk_4` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `batch_record`
--

DROP TABLE IF EXISTS `batch_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text DEFAULT NULL,
  `is_current` tinyint(4) DEFAULT 1,
  `item_id` int(11) NOT NULL,
  `batch` varchar(60) NOT NULL,
  `expiration_date` date DEFAULT NULL,
  `movement_qty` decimal(10,3) NOT NULL,
  `movement_type` enum('POSITIVE','NEGATIVE','ADJUSTMENT') NOT NULL,
  `order_item_id` int(11) DEFAULT NULL,
  `previous_qty` decimal(10,3) NOT NULL,
  `production_item_id` int(11) DEFAULT NULL,
  `purchase_detail_id` int(11) DEFAULT NULL,
  `qty` decimal(10,3) NOT NULL COMMENT 'Debe ser en la unidad de medida de la organizacion, definidio en la tabla item alq eu hace referencia en item_id',
  `shipping_item_id` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `stock_record_id` int(11) DEFAULT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `is_current` (`is_current`,`item_id`),
  UNIQUE KEY `is_current_2` (`is_current`,`item_id`,`batch`,`store_id`),
  KEY `batch_record_item_id` (`item_id`),
  KEY `batch_record_store_id` (`store_id`),
  CONSTRAINT `batch_record_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `batch_record_store_id` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accepted_status` enum('PENDING','ACCEPTED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `amount_paid` decimal(10,2) NOT NULL DEFAULT 0.00,
  `aproved_by_user_id` int(11) DEFAULT NULL,
  `bank_account_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL DEFAULT 'MXN',
  `due_date` date DEFAULT NULL,
  `folio` varchar(50) DEFAULT NULL,
  `invoice_attachment_id` int(11) DEFAULT NULL,
  `name` text NOT NULL,
  `note` text DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `paid_by_user_id` int(11) DEFAULT NULL,
  `paid_date` date DEFAULT NULL,
  `paid_status` enum('PENDING','PAID') NOT NULL,
  `paid_to_bank_account_id` int(11) DEFAULT NULL,
  `pdf_attachment_id` int(11) DEFAULT NULL,
  `provider_user_id` int(11) DEFAULT NULL,
  `purchase_id` int(11) DEFAULT NULL,
  `receipt_attachment_id` int(11) DEFAULT NULL,
  `status` enum('DELETED','ACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `store_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `bill_ibfk_1` (`provider_user_id`),
  KEY `bill_ibfk_2` (`pdf_attachment_id`),
  KEY `bill_ibfk_3` (`receipt_attachment_id`),
  KEY `bill_ibfk_4` (`invoice_attachment_id`),
  KEY `bill_ibfk_5` (`organization_id`),
  KEY `bill_ibfk_6` (`bank_account_id`),
  KEY `paid_by_user_id` (`paid_by_user_id`),
  KEY `purchase_id` (`purchase_id`),
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billing_data`
--

DROP TABLE IF EXISTS `billing_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` text DEFAULT NULL,
  `city` varchar(80) DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` text DEFAULT NULL,
  `porcentaje_ISR` decimal(10,5) NOT NULL DEFAULT 0.00000,
  `precision` tinyint(4) NOT NULL DEFAULT 2,
  `razon_social` varchar(100) DEFAULT NULL,
  `regimen_capital` varchar(60) DEFAULT NULL,
  `regimen_fiscal` varchar(3) DEFAULT NULL,
  `remaining_credits` int(11) NOT NULL DEFAULT 0,
  `rfc` text NOT NULL,
  `state` varchar(80) DEFAULT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `usuario` varchar(60) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `box`
--

DROP TABLE IF EXISTS `box`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `box` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `production_item_id` int(11) DEFAULT NULL,
  `serial_number_range_end` int(11) DEFAULT NULL,
  `serial_number_range_start` int(11) DEFAULT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `store_id` int(11) DEFAULT NULL,
  `type_item_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `box_ibfk_1` (`type_item_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `box_ibfk_1` FOREIGN KEY (`type_item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `box_ibfk_3` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `box_content`
--

DROP TABLE IF EXISTS `box_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `box_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `box_id` int(11) NOT NULL,
  `initial_qty` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `serial_number_range_end` int(11) DEFAULT NULL,
  `serial_number_range_start` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `box_content_ibfk_1` (`box_id`),
  KEY `box_content_ibfk_2` (`item_id`),
  CONSTRAINT `box_content_ibfk_1` FOREIGN KEY (`box_id`) REFERENCES `box` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `box_content_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `brand_ibfk_1` (`image_id`),
  CONSTRAINT `brand_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `session_id` varchar(16) DEFAULT NULL,
  `type` enum('IN_CART','BUY_LATER') NOT NULL DEFAULT 'IN_CART',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`item_id`),
  KEY `item_id` (`item_id`),
  KEY `session_id` (`session_id`),
  CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cash_close`
--

DROP TABLE IF EXISTS `cash_close`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cash_close` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cash_on_hand` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Este se utiliza para el calculo, Timestamp de cuando se cierra el corte',
  `end` datetime NOT NULL COMMENT 'Hora de la dispositivo del cajero, No es una hora fiable, para hacer las cuentas solo sirve para imprimir el ticket',
  `note` text DEFAULT NULL,
  `other_currencies` decimal(20,10) NOT NULL DEFAULT 0.0000000000 COMMENT 'deben ser en el tipo de moneda de la sucursal',
  `since` timestamp NULL DEFAULT NULL COMMENT 'Hora del sistema desde que se empieza hacer el conteo del corte de caja >=',
  `start` datetime NOT NULL COMMENT 'Hora de la dispositivo del cajero, No es una hora fiable, para hacer las cuentas solo sirve para imprimir',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `cash_close_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cashier_withdrawal`
--

DROP TABLE IF EXISTS `cashier_withdrawal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cashier_withdrawal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,3) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL,
  `store_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cashier_withdrawal_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cashier_withdrawal_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `available_online` enum('YES','NO') NOT NULL DEFAULT 'YES',
  `background` varchar(12) NOT NULL DEFAULT 'transparent',
  `code` varchar(20) DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `default_clave_prod_serv` varchar(10) DEFAULT NULL,
  `display_status` enum('NORMAL','HIDDEN') NOT NULL DEFAULT 'NORMAL',
  `image_id` int(11) DEFAULT NULL,
  `image_style` enum('COVER','CONTAIN') NOT NULL DEFAULT 'CONTAIN',
  `name` varchar(80) NOT NULL,
  `shadow_color` varchar(12) NOT NULL DEFAULT '#000000',
  `sort_weight` int(11) NOT NULL DEFAULT 10,
  `text_color` varchar(60) NOT NULL DEFAULT '#FFFFFF',
  `text_style` enum('NEVER','CENTER','DOWN') NOT NULL DEFAULT 'CENTER',
  `type` varchar(40) DEFAULT 'PRODUCT',
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category_store`
--

DROP TABLE IF EXISTS `category_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `pos_preference` enum('SHOW','HIDE','DEFAULT') NOT NULL,
  `store_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `store_id` (`store_id`),
  KEY `category_store_preferences_ibfk_3` (`created_by_user_id`),
  KEY `category_store_preferences_ibfk_4` (`updated_by_user_id`),
  CONSTRAINT `category_store_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_store_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_store_ibfk_3` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_store_ibfk_4` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category_tree`
--

DROP TABLE IF EXISTS `category_tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_tree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `child_category_id` int(11) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `depth` int(11) NOT NULL,
  `parent_category_id` int(11) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `parent_category_id` (`parent_category_id`,`child_category_id`),
  KEY `child_category_id` (`child_category_id`),
  CONSTRAINT `category_tree_ibfk_1` FOREIGN KEY (`child_category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_tree_ibfk_2` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category_type`
--

DROP TABLE IF EXISTS `category_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_type` (
  `id` varchar(40) NOT NULL,
  `TYPE` enum('PRODUCT_FOR_SALE','TOOL','RAW_MATERIAL') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `check_in`
--

DROP TABLE IF EXISTS `check_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `check_in` (
  `created_by_user_id` int(11) DEFAULT NULL,
  `current` tinyint(1) NOT NULL DEFAULT 1,
  `date` date DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `end_timestamp` timestamp NULL DEFAULT NULL,
  `start_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by_user_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `workshift_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `check_in_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `check_in_ibfk_2` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `check_in_raw`
--

DROP TABLE IF EXISTS `check_in_raw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `check_in_raw` (
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `check_in_raw_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `check_in_raw_ibfk_2` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commanda`
--

DROP TABLE IF EXISTS `commanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `commanda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commanda_type_id` int(11) NOT NULL,
  `has_sound` tinyint(4) NOT NULL DEFAULT 1,
  `name` varchar(45) NOT NULL,
  `order_display_preferences` enum('ALL_ORDERS','COMMANDA_TYPE_ORDERS') NOT NULL DEFAULT 'COMMANDA_TYPE_ORDERS',
  `print_preferences` enum('ONLY_DISPLAY','PRINT_PARTIAL','FULL_PRINT','PRINT_ONLY_NEW_ITEMS') NOT NULL DEFAULT 'ONLY_DISPLAY',
  `printer_ip` varchar(60) DEFAULT NULL,
  `printer_port` varchar(10) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `commanda_type_id` (`commanda_type_id`),
  CONSTRAINT `commanda_ibfk_1` FOREIGN KEY (`commanda_type_id`) REFERENCES `commanda_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commanda_type`
--

DROP TABLE IF EXISTS `commanda_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `commanda_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(30) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `consumption`
--

DROP TABLE IF EXISTS `consumption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumption` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL COMMENT 'El ítem que fue consumido.',
  `qty` decimal(10,3) NOT NULL COMMENT 'Cantidad del ítem consumido.',
  `production_area_id` int(11) DEFAULT NULL COMMENT 'Área de producción donde se realizó el consumo.',
  `consumed_by_user_id` int(11) DEFAULT NULL COMMENT 'Usuario responsable del consumo. Si es Unico',
  `store_id` int(11) NOT NULL,
  `description` text DEFAULT NULL COMMENT 'Descripción o motivo del consumo.',
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `production_area_id` (`production_area_id`),
  KEY `consumed_by_user_id` (`consumed_by_user_id`),
  KEY `store_id` (`store_id`),
  KEY `consumption_created_by_user_id` (`created_by_user_id`),
  KEY `consumption_updated_by_user_id` (`updated_by_user_id`),
  CONSTRAINT `consumption_consumed_by_user_id` FOREIGN KEY (`consumed_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `consumption_created_by_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `consumption_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `consumption_production_area_id` FOREIGN KEY (`production_area_id`) REFERENCES `production_area` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `consumption_store_id` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `consumption_updated_by_user_id` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Registra los eventos de consumo de ítems.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `consumption_user`
--

DROP TABLE IF EXISTS `consumption_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumption_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL COMMENT 'Moneda del costo, Pesos MXN',
  `price` decimal(10,3) NOT NULL COMMENT 'Precio para posible nomina, si no es necesario dejarlo en 0',
  `consumption_id` int(11) NOT NULL,
  `total` decimal(10,3) NOT NULL COMMENT 'Precio total para posible nomina',
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Registro por grupo, SI es necesario se especifica.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency` (
  `id` varchar(3) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(10) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `currency_rate`
--

DROP TABLE IF EXISTS `currency_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency_rate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency_id` varchar(3) NOT NULL,
  `rate` decimal(15,5) NOT NULL,
  `store_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  KEY `currency_id` (`currency_id`),
  CONSTRAINT `currency_rate_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `currency_rate_ibfk_2` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delivery_assignment`
--

DROP TABLE IF EXISTS `delivery_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_assignment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `reservation_item_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reservation_item_id` (`reservation_item_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `delivery_assignment_ibfk_1` FOREIGN KEY (`reservation_item_id`) REFERENCES `reservation_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `delivery_assignment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ecommerce`
--

DROP TABLE IF EXISTS `ecommerce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerce` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `font_color` varchar(40) DEFAULT NULL,
  `name` varchar(40) NOT NULL,
  `color` varchar(40) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `price_list_id` int(11) NOT NULL,
  `price_type_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `logo_image_id` int(11) DEFAULT NULL,
  `preferences_id` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `preferences_id` (`preferences_id`),
  CONSTRAINT `ecommerce_ibfk_1` FOREIGN KEY (`preferences_id`) REFERENCES `preferences` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ecommerce_item`
--

DROP TABLE IF EXISTS `ecommerce_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerce_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `ecommerce_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_id` (`item_id`,`ecommerce_id`),
  KEY `ecommerce_id` (`ecommerce_id`),
  CONSTRAINT `ecommerce_item_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ecommerce_item_ibfk_2` FOREIGN KEY (`ecommerce_id`) REFERENCES `ecommerce` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ecommerce_user`
--

DROP TABLE IF EXISTS `ecommerce_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerce_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ecommerce_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by_user_id` int(11) DEFAULT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `file_type`
--

DROP TABLE IF EXISTS `file_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_type` varchar(200) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `extension` varchar(20) DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  `is_image` enum('NO','YES') NOT NULL,
  `name` varchar(200) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `file_type_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form`
--

DROP TABLE IF EXISTS `form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `form` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_response_title_required` tinyint(1) DEFAULT 0,
  `responses_allowed` int(11) NOT NULL DEFAULT 1,
  `title` varchar(255) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fund`
--

DROP TABLE IF EXISTS `fund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `fund` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,3) NOT NULL,
  `cashier_hour` datetime NOT NULL COMMENT 'Se usa para imprimir el corte de caja, esta hora no es segura para hacer comparaciones de rango los usuario suelen cambiar las horas de los dispositivos, y se afecta en los cambios de horario anualmente, pero es para la refererencia en el misma linea de tiempo',
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Se usa para hacer los calculos del corte de caja,\r\nesta hora nunca cambia en el servidor',
  `currency_id` varchar(3) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `fund_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_type` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `filename` varchar(255) NOT NULL,
  `height` int(11) NOT NULL,
  `is_private` tinyint(1) NOT NULL DEFAULT 0,
  `original_filename` varchar(255) DEFAULT NULL,
  `size` int(11) NOT NULL,
  `uploader_user_id` int(11) DEFAULT NULL,
  `width` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uploader_user_id` (`uploader_user_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`uploader_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL COMMENT 'es el articulo con el que esta vinculado el cual se le vende al cliente',
  `name` tinytext NOT NULL,
  `order_type` enum('ALL','TOGO','IN_PLACE','PICK_UP','QUICK_SALE') NOT NULL DEFAULT 'ALL',
  `qty` decimal(10,3) NOT NULL,
  `stock_item_id` int(11) NOT NULL COMMENT 'es el articulo en el que se va a descontar del inventario ',
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `ingredient_ibfk_1` (`item_id`),
  KEY `stock_item_id` (`stock_item_id`),
  CONSTRAINT `ingredient_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ingredient_ibfk_2` FOREIGN KEY (`stock_item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci COMMENT='DEPRECATED NO SE USA A ELIMINAR';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `installment`
--

DROP TABLE IF EXISTS `installment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `installment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,3) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `due_date` date NOT NULL,
  `installment_number` smallint(5) unsigned NOT NULL,
  `order_id` int(11) NOT NULL,
  `paid_amount` decimal(10,3) NOT NULL,
  `paid_timestamp` timestamp NULL DEFAULT NULL COMMENT 'Solo se asigna hasta que el pago fue concluido',
  `status` enum('ACTIVE','DELETED') NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `installment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `applicable_tax` enum('DEFAULT','EXEMPT','PERCENT') NOT NULL DEFAULT 'DEFAULT',
  `availability_type` enum('ON_STOCK','BY_ORDER','ALWAYS') NOT NULL DEFAULT 'ALWAYS',
  `background` varchar(12) NOT NULL DEFAULT 'transparent',
  `brand_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `clave_sat` varchar(8) DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `commanda_type_id` int(11) DEFAULT NULL,
  `commission_currency_id` varchar(3) NOT NULL DEFAULT 'MXN',
  `commission_type` enum('NONE','AMOUNT','PERCENT') NOT NULL DEFAULT 'NONE',
  `commission` int(11) NOT NULL DEFAULT 0,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL DEFAULT 'MXN' COMMENT 'deprecated. Multiple currency_ids on the same table',
  `description` text DEFAULT NULL,
  `extra_name` varchar(60) DEFAULT NULL,
  `form_id` int(11) DEFAULT NULL,
  `response_requirement_qty` enum('ONCE_PER_CLIENT','ONCE_PER_SALE','EVERY_ITEM') NOT NULL DEFAULT 'ONCE_PER_SALE',
  `for_reservation` enum('YES','NO') NOT NULL DEFAULT 'NO',
  `has_serial_number` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `ieps_type` enum('RATE','AMOUNT') NOT NULL DEFAULT 'RATE',
  `ieps_value` decimal(7,4) NOT NULL DEFAULT 0.0000 COMMENT 'Dependiendo del valor de ieps_type, si es RATE se tratara de un porcentaje, y si es AMOUNT de la constante definida',
  `image_id` int(11) DEFAULT NULL,
  `image_style` enum('COVER','CONTAIN') NOT NULL DEFAULT 'CONTAIN',
  `json_tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json_tags`)),
  `measurement_unit` varchar(40) DEFAULT NULL COMMENT 'Unidad de Medida de la tienda y las recetas en este tipo de unidad se deben definir todos los movientos dentro de la organizacion',
  `name` text NOT NULL,
  `note_required` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `on_sale` enum('NO','YES') NOT NULL,
  `stock_type` enum('NORMAL','BATCH') NOT NULL DEFAULT 'NORMAL',
  `partial_sale` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `period_type` enum('BY_HOUR','DAILY','WEEKLY','MONTHLY') NOT NULL DEFAULT 'MONTHLY',
  `product_id` int(11) DEFAULT NULL,
  `provider_user_id` int(11) DEFAULT NULL,
  `reference_currency_id` varchar(3) NOT NULL DEFAULT 'MXN',
  `reference_price` decimal(15,5) NOT NULL DEFAULT 0.00000,
  `return_action` enum('RETURN_TO_STOCK','ADD_TO_MERMA','TRANSFORM_INTO_ITEM') NOT NULL DEFAULT 'RETURN_TO_STOCK',
  `shadow_color` varchar(12) NOT NULL DEFAULT '#000000',
  `sort_weight` int(11) NOT NULL DEFAULT 10,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `tax_percent` decimal(6,3) NOT NULL DEFAULT 0.000,
  `text_color` varchar(60) NOT NULL DEFAULT '#FFFFFF',
  `text_style` enum('NEVER','CENTER','DOWN') NOT NULL DEFAULT 'CENTER',
  `unidad_medida_sat_id` varchar(10) NOT NULL DEFAULT 'H87',
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `product_id` (`product_id`),
  KEY `provider_id` (`provider_user_id`),
  KEY `item_ibfk_4` (`brand_id`),
  KEY `category_id` (`category_id`),
  KEY `image_id` (`image_id`),
  KEY `unidad_medida_sat_id` (`unidad_medida_sat_id`),
  KEY `commanda_type_id` (`commanda_type_id`),
  KEY `form_id` (`form_id`),
  CONSTRAINT `item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `item_ibfk_4` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `item_ibfk_5` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `item_ibfk_6` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`),
  CONSTRAINT `item_ibfk_7` FOREIGN KEY (`unidad_medida_sat_id`) REFERENCES `unidad_medida_sat` (`id`),
  CONSTRAINT `item_ibfk_8` FOREIGN KEY (`commanda_type_id`) REFERENCES `commanda_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `item_ibfk_9` FOREIGN KEY (`form_id`) REFERENCES `form` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_attribute`
--

DROP TABLE IF EXISTS `item_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attribute_id` int(11) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `value` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `attribute_id` (`attribute_id`),
  CONSTRAINT `item_attribute_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_attribute_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_exception`
--

DROP TABLE IF EXISTS `item_exception`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_exception` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text NOT NULL,
  `item_id` int(11) NOT NULL,
  `list_as_exception` enum('YES','NO') NOT NULL DEFAULT 'YES',
  `order_type` enum('ALL','TOGO','IN_PLACE','PICK_UP','QUICK_SALE') NOT NULL DEFAULT 'ALL',
  `stock_item_id` int(11) DEFAULT NULL,
  `stock_qty` decimal(10,3) NOT NULL DEFAULT 1.000,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `stock_item_id` (`stock_item_id`),
  CONSTRAINT `item_exception_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_exception_ibfk_2` FOREIGN KEY (`stock_item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_image`
--

DROP TABLE IF EXISTS `item_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `image_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_option`
--

DROP TABLE IF EXISTS `item_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `included_extra_qty` int(11) NOT NULL,
  `included_options` int(11) DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `max_extra_qty` int(11) DEFAULT NULL,
  `max_options` int(11) DEFAULT NULL,
  `min_options` int(11) NOT NULL DEFAULT 0,
  `min_selections` int(11) NOT NULL DEFAULT 0,
  `name` varchar(35) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_option_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_option_value`
--

DROP TABLE IF EXISTS `item_option_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_option_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charge_type` enum('OPTIONAL','INCLUDED','EXTRA_CHARGE') NOT NULL,
  `extra_price` decimal(10,2) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_option_id` int(11) DEFAULT NULL,
  `max_extra_qty` int(11) NOT NULL COMMENT 'En Porciones',
  `portion_amount` decimal(10,3) NOT NULL DEFAULT 1.000,
  `price` decimal(10,3) NOT NULL DEFAULT 0.000,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_id_2` (`item_id`,`item_option_id`),
  KEY `item_option_id` (`item_option_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_option_value_ibfk_4` FOREIGN KEY (`item_option_id`) REFERENCES `item_option` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_option_value_ibfk_5` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_points`
--

DROP TABLE IF EXISTS `item_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL COMMENT 'Si el tipo es "AMOUNT" la cantidad es la que se va acumular por cantidad de articulos vendidos. De lo contrario sera la el porcentaje del total en Pesos o dolares',
  `type` enum('AMOUNT','PERCENT') NOT NULL DEFAULT 'AMOUNT',
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_id` (`item_id`),
  KEY `item_points_fk1` (`item_id`),
  KEY `item_points_fk2` (`updated_by_user_id`),
  KEY `item_points_fk3` (`created_by_user_id`),
  CONSTRAINT `item_points_fk1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_points_fk2` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_points_fk3` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_recipe`
--

DROP TABLE IF EXISTS `item_recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `parent_item_id` int(11) NOT NULL,
  `portion_qty` decimal(12,3) NOT NULL COMMENT 'La cantidad la definida por la unidad de medida definida en item->measurement_unit,',
  `print_on_recipe` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_recipe_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_store`
--

DROP TABLE IF EXISTS `item_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `pos_preference` enum('SHOW','HIDE','DEFAULT') NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `item_store_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_store_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `keyboard_shortcut`
--

DROP TABLE IF EXISTS `keyboard_shortcut`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `keyboard_shortcut` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `key_combination` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `keyboard_shortcut_ibfk_1` (`created_by_user_id`),
  KEY `keyboard_shortcut_ibfk_2` (`updated_by_user_id`),
  CONSTRAINT `keyboard_shortcut_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `keyboard_shortcut_ibfk_2` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `labels`
--

DROP TABLE IF EXISTS `labels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `labels` (
  `id` int(11) NOT NULL,
  `store` varchar(60) NOT NULL DEFAULT 'Sucursal' COMMENT 'Ej, Sucursal, Panaderia, Ferreteria, etc',
  `production_area` varchar(60) NOT NULL DEFAULT 'Grupo de Trabajo' COMMENT 'Grupo de trabajo, Area de produccion, etc',
  `ingredients` varchar(60) NOT NULL DEFAULT 'Ingredientes y Excepciones' COMMENT 'Componentes, ingredientes, Partes',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ledger`
--

DROP TABLE IF EXISTS `ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ledger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `currency_id` varchar(3) NOT NULL,
  `description` text DEFAULT NULL,
  `final_balance` decimal(10,2) NOT NULL COMMENT 'Saldo de la cuenta DESPUÉS de la transacción.',
  `ledger_category_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `previous_balance` decimal(10,2) NOT NULL COMMENT 'Saldo de la cuenta ANTES de la transacción.',
  `source_document_id` varchar(50) DEFAULT NULL COMMENT 'ID (externo/genérico) de un documento relacionado.',
  `source_document_type` varchar(50) DEFAULT NULL COMMENT 'Tipo del documento relacionado (ej. ''external_invoice'').',
  `transaction_type` enum('DEBIT','CREDIT') NOT NULL COMMENT 'DEBIT incrementa el adeudo, CREDIT lo reduce.',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `ledger_category_id` (`ledger_category_id`),
  KEY `order_id` (`order_id`),
  KEY `payment_id` (`payment_id`),
  KEY `ledger_created_by_user_id` (`created_by_user_id`),
  KEY `ledger_updated_by_user_id` (`updated_by_user_id`),
  CONSTRAINT `ledger_account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ledger_category_id` FOREIGN KEY (`ledger_category_id`) REFERENCES `ledger_category` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ledger_created_by_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ledger_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ledger_payment_id` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ledger_updated_by_user_id` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci COMMENT='Registra cada transacción (débito/crédito) para todas las cuentas.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ledger_category`
--

DROP TABLE IF EXISTS `ledger_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ledger_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ledger_category_created_by_user_id` (`created_by_user_id`),
  KEY `ledger_category_updated_by_user_id` (`updated_by_user_id`),
  CONSTRAINT `ledger_category_created_by_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ledger_category_updated_by_user_id` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci COMMENT='Define categorías para los asientos del ledger (ej. Préstamo, Abono).';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ledger_detail`
--

DROP TABLE IF EXISTS `ledger_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ledger_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ledger_id` int(11) NOT NULL COMMENT 'Referencia a la transacción en el ledger.',
  `item_id` int(11) NOT NULL COMMENT 'El ítem que se asigna o se gasta.',
  `description` varchar(255) DEFAULT NULL COMMENT 'Descripción adicional (ej. número de serie).',
  `qty` decimal(10,3) NOT NULL COMMENT 'La cantidad de ítems.',
  `unitary_price` decimal(10,2) NOT NULL COMMENT 'Precio o valor de una sola unidad del ítem.',
  `line_total` decimal(10,2) NOT NULL COMMENT 'El resultado de (qty * unitary_price).',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ledger_id` (`ledger_id`),
  KEY `item_id` (`item_id`),
  KEY `ledger_detail_created_by_user_id` (`created_by_user_id`),
  KEY `ledger_detail_updated_by_user_id` (`updated_by_user_id`),
  CONSTRAINT `ledger_detail_created_by_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ledger_detail_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ledger_detail_ledger_id` FOREIGN KEY (`ledger_id`) REFERENCES `ledger` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ledger_detail_updated_by_user_id` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci COMMENT='Desglose de ítems para una entrada del libro mayor (ledger).';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `merma`
--

DROP TABLE IF EXISTS `merma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `merma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `box_id` int(11) DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `item_id` int(11) NOT NULL,
  `note` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.01,
  `qty` int(11) NOT NULL,
  `shipping_id` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `merma_ibfk_1` (`item_id`),
  KEY `merma_ibfk_2` (`store_id`),
  KEY `shipping_id` (`shipping_id`),
  CONSTRAINT `merma_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `merma_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification_token`
--

DROP TABLE IF EXISTS `notification_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `provider` varchar(20) NOT NULL,
  `token` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`),
  KEY `notification_token_ibfk_1` (`user_id`),
  CONSTRAINT `notification_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `coupon_code` varchar(30) DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text DEFAULT NULL,
  `discount` decimal(10,3) NOT NULL DEFAULT 0.000 COMMENT 'Cuando es un descuento, aplica el cupon y le descuenta 50 pesos sobre el precio.',
  `gift_item_id` int(11) DEFAULT NULL,
  `hour_end` time NOT NULL,
  `hour_start` time NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  `is_cumulative` enum('NO','YES') NOT NULL DEFAULT 'YES',
  `is_valid_friday` tinyint(1) NOT NULL,
  `is_valid_monday` tinyint(1) NOT NULL,
  `is_valid_saturday` tinyint(1) NOT NULL,
  `is_valid_sunday` tinyint(1) NOT NULL,
  `is_valid_thursday` tinyint(1) NOT NULL,
  `is_valid_tuesday` tinyint(1) NOT NULL,
  `is_valid_wednesday` tinyint(1) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `m` int(11) DEFAULT 1 COMMENT 'En oferta 4x3 seria el 2, Seria lo que pagas.4 x el precio de 3',
  `n` int(11) DEFAULT 1 COMMENT 'En oferta 2x1 Seria el 2, Seria lo que te llevas, 2 por el precio de 1',
  `name` varchar(60) NOT NULL DEFAULT '',
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `store_id` int(11) DEFAULT NULL COMMENT 'IF null apply to all stores',
  `tag` varchar(20) DEFAULT NULL,
  `type` enum('PERCENT_DISCOUNT','N_X_M','AMOUNT_DISCOUNT','GIFT','FIXED_PRICE') NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `valid_from` datetime NOT NULL,
  `valid_thru` datetime NOT NULL,
  `qty` decimal(20,5) NOT NULL DEFAULT 0.00000 COMMENT 'Precio fijo el precio sera lo que indique esta propiedad,\r\nCuando sea por porcentaje este sera el porcentaje descontado,\r\nCuando se descuento.\r\nEsta es la propiedad descontada.',
  `price_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `coupon_code` (`coupon_code`),
  KEY `gift_item_id` (`gift_item_id`),
  KEY `item_id` (`item_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  KEY `updated_by_user_id` (`updated_by_user_id`),
  KEY `category_id` (`category_id`),
  KEY `store_id` (`store_id`),
  KEY `offer_price_type_id` (`price_type_id`),
  CONSTRAINT `offer_ibfk_1` FOREIGN KEY (`gift_item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offer_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offer_ibfk_3` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offer_ibfk_4` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offer_ibfk_5` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offer_ibfk_6` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offer_price_type_id` FOREIGN KEY (`price_type_id`) REFERENCES `price_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` text DEFAULT NULL,
  `amount_paid` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'El monto que el cliente ha pagado a la fecha, cundo esta finiquitado este valor debe ser igual al "total"',
  `ares` int(11) NOT NULL DEFAULT 0,
  `authorized_by` varchar(40) DEFAULT NULL,
  `billing_address_id` int(11) DEFAULT NULL,
  `billing_data_id` int(11) DEFAULT NULL,
  `cancellation_reason` text DEFAULT NULL,
  `cancellation_timestamp` timestamp NULL DEFAULT NULL,
  `cancelled_by_user_id` int(11) DEFAULT NULL,
  `cashier_user_id` int(11) DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  `client_name` text DEFAULT NULL,
  `client_user_id` int(11) DEFAULT NULL,
  `closed_by_user_id` int(11) DEFAULT NULL,
  `closed_timestamp` timestamp NULL DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL,
  `delivery_schedule` datetime DEFAULT NULL,
  `delivery_status` enum('PENDING','SENT','DELIVERED','CANCELLED','READY_TO_PICKUP') NOT NULL DEFAULT 'PENDING',
  `delivery_user_id` int(11) DEFAULT NULL,
  `discount_calculated` decimal(20,6) NOT NULL DEFAULT 0.000000,
  `discount` decimal(20,6) NOT NULL DEFAULT 0.000000 COMMENT 'El descuento se descuenta de total, total no incluye el descuento',
  `ecommerce_user_id` int(11) DEFAULT NULL,
  `external_id` varchar(32) DEFAULT NULL,
  `facturacion_code` varchar(30) NOT NULL,
  `facturado` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `facturacion_timestamp` timestamp NULL DEFAULT NULL,
  `first_payment_date` date DEFAULT NULL COMMENT 'Fecha del primer pago',
  `frequency` enum('WEEKLY','MONTHLY','2X_MONTHLY','NONE') NOT NULL DEFAULT 'NONE',
  `guests` int(11) NOT NULL DEFAULT 1 COMMENT 'Numero de comensales',
  `initial_payment` decimal(10,3) NOT NULL DEFAULT 0.000 COMMENT 'Primer pago, Down Payment',
  `installment_amount` decimal(10,3) DEFAULT 0.000 COMMENT 'Cantidad que se tiene que saldar en cada pago',
  `installment_months` int(11) DEFAULT 0 COMMENT 'Cantidad de meses para calcular el numero de pagos necesarios,En base a este cantidad se hace el calculo pero es posible que la cantidad de meses calculada sea menor',
  `installment_round_amount` smallint(6) NOT NULL DEFAULT 0,
  `installments` int(11) DEFAULT NULL COMMENT 'Numero de pagos calculados con el que cliente salda',
  `lat` decimal(9,6) DEFAULT NULL,
  `lng` decimal(9,6) DEFAULT NULL,
  `marked_for_billing` enum('YES','NO') NOT NULL DEFAULT 'NO' COMMENT 'Se usa para facturar las ordenes a credito, si no tiene YES entonces no esta lista',
  `note` text DEFAULT NULL,
  `paid_status` enum('PENDING','PAID','PARTIALLY_PAID') NOT NULL DEFAULT 'PENDING',
  `paid_timetamp` timestamp NULL DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  `price_type_id` int(11) NOT NULL,
  `quote_id` int(11) DEFAULT NULL,
  `sat_codigo_postal` varchar(10) DEFAULT NULL COMMENT 'Corresponde a lugar_de_expedicion',
  `sat_domicilio_fiscal_receptor` varchar(10) NOT NULL DEFAULT '',
  `sat_exchange_rate` decimal(8,5) NOT NULL DEFAULT 1.00000,
  `sat_factura_id` int(11) DEFAULT NULL,
  `sat_forma_pago` varchar(3) NOT NULL DEFAULT '99',
  `sat_ieps` decimal(20,10) NOT NULL DEFAULT 0.0000000000,
  `sat_isr` decimal(20,10) NOT NULL DEFAULT 0.0000000000,
  `sat_pdf_attachment_id` int(11) DEFAULT NULL COMMENT 'deprecated',
  `sat_razon_social` text DEFAULT NULL,
  `sat_receptor_email` text DEFAULT NULL,
  `sat_receptor_rfc` varchar(16) DEFAULT NULL,
  `sat_regimen_capital_receptor` varchar(100) NOT NULL DEFAULT '',
  `sat_regimen_fiscal_receptor` varchar(4) NOT NULL DEFAULT '',
  `sat_serie_consecutive` int(11) DEFAULT NULL,
  `sat_serie` varchar(25) DEFAULT NULL COMMENT 'deprecated',
  `sat_uso_cfdi` varchar(10) DEFAULT NULL,
  `sat_xml_attachment_id` int(11) DEFAULT NULL COMMENT 'deprecated',
  `service_type` enum('TOGO','IN_PLACE','PICK_UP','QUICK_SALE') NOT NULL DEFAULT 'QUICK_SALE',
  `shipping_address_id` int(11) DEFAULT NULL,
  `shipping_cost` decimal(20,6) NOT NULL DEFAULT 0.000000,
  `state` varchar(40) DEFAULT NULL,
  `status` enum('PENDING','CANCELLED','ACTIVE','CLOSED','PENDING_PAUSED') NOT NULL DEFAULT 'PENDING' COMMENT 'Pendiente, la orden se esta tomando, se puede editar y cancelar sin ningun tipo de consideracion, no se a entregado al cliente, no tiene ningun tipo de pago, no se ha preparado\r\nActiva, La orden se esta ejecutando o se ejecuto, cuando ya tiene algun tipo de pago, se mando a credito o ya se entrego, Cancelada, la orden se cancelo, no se toma en cuenta.\r\nCLOSED. La venta ya se cerro, ya no se van agregar mas items, ya se envio pago y/o se metio a credito, De activa puede pasar a cancelada o cerrada pero no a pendiente ni pausada.\r\nDe pausada puede pasar a pendiente y viceversa.\r\nDe pausada puede pasar a cerrada',
  `store_consecutive` int(11) NOT NULL DEFAULT 0,
  `store_id` int(11) NOT NULL,
  `subtotal` decimal(20,6) NOT NULL,
  `suburb` varchar(60) DEFAULT NULL,
  `sync_id` varchar(30) DEFAULT NULL,
  `system_activated` timestamp NULL DEFAULT NULL COMMENT 'Timestamp de cuendo se activo, la orden paso a credito, se pago o se entrego.quiere decir que es una orden en curso que hay repercusiones cancelarla.',
  `table_id` int(11) DEFAULT NULL,
  `tag` varchar(30) DEFAULT NULL,
  `tax_percent` decimal(5,2) NOT NULL DEFAULT 16.00,
  `tax` decimal(20,6) NOT NULL,
  `total` decimal(20,6) NOT NULL COMMENT 'Es el subtotal + tax\r\nno incluye descuentos,\r\n\r\nEjemplo \r\n\r\nSi se vendio un articulo en 100 y le van a dar un descuento de 10 pesos\r\n\r\nAqui va 100, 10 va en descuentos',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `version_created` varchar(17) NOT NULL DEFAULT '220101:0000-0000',
  `version_updated` varchar(17) NOT NULL DEFAULT '220101:0000-0000',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sync_id` (`sync_id`),
  UNIQUE KEY `sat_serie` (`sat_serie`,`sat_serie_consecutive`),
  KEY `created` (`created`),
  KEY `user_id` (`client_user_id`),
  KEY `store_id` (`store_id`),
  KEY `currency_id` (`currency_id`),
  KEY `shipping_address_id` (`shipping_address_id`),
  KEY `cashier_user_id` (`cashier_user_id`),
  KEY `billing_data_id` (`billing_data_id`),
  KEY `price_type_id` (`price_type_id`),
  KEY `quote_id` (`quote_id`),
  KEY `order_ibfk_16` (`table_id`),
  KEY `closed_timestamp` (`closed_timestamp`,`created`),
  KEY `sat_factura_id` (`sat_factura_id`),
  KEY `ecommerce_user_id` (`ecommerce_user_id`),
  CONSTRAINT `order_ibfk_10` FOREIGN KEY (`price_type_id`) REFERENCES `price_type` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_11` FOREIGN KEY (`shipping_address_id`) REFERENCES `address` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_12` FOREIGN KEY (`billing_data_id`) REFERENCES `billing_data` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_13` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_14` FOREIGN KEY (`quote_id`) REFERENCES `quote` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_15` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_16` FOREIGN KEY (`table_id`) REFERENCES `table` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_17` FOREIGN KEY (`sat_factura_id`) REFERENCES `sat_factura` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_18` FOREIGN KEY (`ecommerce_user_id`) REFERENCES `ecommerce_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_7` FOREIGN KEY (`shipping_address_id`) REFERENCES `address` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_8` FOREIGN KEY (`cashier_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commanda_id` int(11) DEFAULT NULL,
  `commanda_status` enum('NOT_DISPLAYED','PENDING','DISMISSED') NOT NULL DEFAULT 'NOT_DISPLAYED',
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `delivered_qty` decimal(20,3) NOT NULL DEFAULT 0.000,
  `delivery_status` enum('PENDING','DELIVERED') NOT NULL DEFAULT 'PENDING',
  `discount_percent` int(11) NOT NULL DEFAULT 0 COMMENT 'Es solo informativo,\r\nSeria el descuento en porcentaje si se le aplico un descuento en porcentaje, El valor del total no correspoderia al real cuando se haga un descuento sobre el total de la venta. No mostrar en la factura pues no coicidiria',
  `discount` decimal(20,7) NOT NULL DEFAULT 0.0000000,
  `exceptions` text DEFAULT NULL,
  `has_separator` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `ieps_calculated` decimal(15,6) NOT NULL DEFAULT 0.000000,
  `ieps_type` enum('RATE','AMOUNT') NOT NULL DEFAULT 'RATE',
  `ieps_value` decimal(7,4) NOT NULL DEFAULT 0.0000 COMMENT 'Es el valor definido al momento de crear la orden articulo, si ieps_type es RATE, sera porcentaje, si es AMOUNT sera la constante definida',
  `id_payment` int(11) DEFAULT NULL,
  `is_free_of_charge` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `is_item_extra` enum('NO','YES') NOT NULL,
  `item_extra_id` int(11) DEFAULT NULL,
  `item_group` bigint(20) NOT NULL COMMENT 'Indice para saber A que item opcional le corresponde el valor, que se esta especificando en la lista de items',
  `item_id` int(11) NOT NULL,
  `item_option_id` int(11) DEFAULT NULL COMMENT 'si el item es una \r\nopcion de otro item, poner aqui el id el item_option, si es el item principal poner null',
  `item_option_qty` int(11) NOT NULL DEFAULT 1 COMMENT 'Si un helado lleva dos porciones de un ingrediente, y son dos elados, aqui va el 2 de las porciones de la opcion 2.',
  `note` text DEFAULT NULL,
  `offer_id` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `original_unitary_price` decimal(20,7) NOT NULL DEFAULT 0.0000000 COMMENT 'Este valor siempre es fijo sale directamente del precio',
  `paid_qty` int(11) NOT NULL DEFAULT 0 COMMENT 'Cuantos elementos se pagaron no es el total, es el numero de items en porciones o sets',
  `preparation_status` enum('PENDING','IN_PREPARATION','READY','DELIVERED') NOT NULL DEFAULT 'PENDING',
  `price_id` int(11) DEFAULT NULL,
  `qty` decimal(12,3) NOT NULL COMMENT 'El total de todo el item Por ejemple Si un elado lleva dos porciones de un ingrediente pero son dos elados qty de las porciones tiene que ser 4 aqui en el caso de las porciones y 4 cuando es el item maestro el helado. Ver item_option_qty',
  `reservation_item_id` int(11) DEFAULT NULL,
  `return_required` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `stock_status` enum('IN_STOCK','STOCK_REMOVED') NOT NULL DEFAULT 'IN_STOCK' COMMENT 'STOCK_REMOVED deberia ser stock_processed',
  `subtotal` decimal(20,7) NOT NULL DEFAULT 0.0000000,
  `system_preparation_ended` timestamp NULL DEFAULT NULL,
  `system_preparation_started` timestamp NULL DEFAULT NULL,
  `tax_included` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `tax` decimal(20,7) NOT NULL DEFAULT 0.0000000,
  `total` decimal(20,7) NOT NULL DEFAULT 0.0000000,
  `type` enum('NORMAL','REFUND') NOT NULL DEFAULT 'NORMAL' COMMENT 'Normal a normal item to be charge,\r\nREFUND a order item to be refunded, not to be delivered.\r\na refund item mus be a discount a the specified price o by another one. ',
  `unitary_price_meta` decimal(20,7) NOT NULL,
  `unitary_price` decimal(20,7) NOT NULL DEFAULT 0.0000000 COMMENT 'Este valor es calculado desde original_unitary_price Si el item es precio unitario + tax Entonces es igual a original unitary_price de lo contrario este es iguala unitary_price-tax',
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `item_id` (`item_id`),
  KEY `price_id` (`price_id`),
  KEY `item_option_id` (`item_option_id`),
  KEY `item_extra_id` (`item_extra_id`),
  KEY `commanda_id` (`commanda_id`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_ibfk_3` FOREIGN KEY (`price_id`) REFERENCES `price` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_item_ibfk_4` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_ibfk_5` FOREIGN KEY (`item_option_id`) REFERENCES `item_option` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_item_ibfk_6` FOREIGN KEY (`item_extra_id`) REFERENCES `item_option_value` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_item_ibfk_7` FOREIGN KEY (`commanda_id`) REFERENCES `commanda` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_item_cost`
--

DROP TABLE IF EXISTS `order_item_cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item_cost` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `child_items_cost` decimal(10,3) NOT NULL,
  `cost` decimal(10,3) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `ingredients_cost` decimal(10,3) NOT NULL,
  `item_cost` decimal(10,3) NOT NULL,
  `item_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `order_id` int(11) NOT NULL,
  `order_item_id` int(11) NOT NULL,
  `qty` decimal(20,5) NOT NULL,
  `sale_profit` decimal(10,3) NOT NULL,
  `sale_total` decimal(10,3) NOT NULL,
  `store_id` int(11) NOT NULL,
  `total` decimal(10,3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_item_cost_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_cost_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_item_exception`
--

DROP TABLE IF EXISTS `order_item_exception`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item_exception` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` varchar(60) NOT NULL,
  `item_exception_id` int(11) NOT NULL,
  `order_item_id` int(11) NOT NULL,
  `stock_item_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `order_item_id` (`order_item_id`),
  KEY `stock_item_id` (`stock_item_id`),
  KEY `item_exception_id` (`item_exception_id`),
  CONSTRAINT `order_item_exception_ibfk_1` FOREIGN KEY (`order_item_id`) REFERENCES `order_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_exception_ibfk_2` FOREIGN KEY (`stock_item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_exception_ibfk_3` FOREIGN KEY (`item_exception_id`) REFERENCES `item_exception` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_item_response`
--

DROP TABLE IF EXISTS `order_item_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item_response` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `response_id` int(11) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_item_id` int(11) NOT NULL,
  `serial_id` int(11) DEFAULT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_item_id` (`order_item_id`,`response_id`),
  KEY `response_id` (`response_id`),
  KEY `serial_id` (`serial_id`),
  CONSTRAINT `order_item_response_ibfk_1` FOREIGN KEY (`response_id`) REFERENCES `response` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_response_ibfk_2` FOREIGN KEY (`order_item_id`) REFERENCES `order_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_response_ibfk_3` FOREIGN KEY (`serial_id`) REFERENCES `serial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_item_serial`
--

DROP TABLE IF EXISTS `order_item_serial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item_serial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `order_item_id` int(11) NOT NULL,
  `serial_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `serial_id` (`serial_id`),
  KEY `order_item_id` (`order_item_id`),
  CONSTRAINT `order_item_serial_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_serial_ibfk_2` FOREIGN KEY (`serial_id`) REFERENCES `serial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_item_serial_ibfk_3` FOREIGN KEY (`order_item_id`) REFERENCES `order_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_offer`
--

DROP TABLE IF EXISTS `order_offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(20,10) NOT NULL DEFAULT 0.0000000000 COMMENT 'Sera 0 cuando el cupon aplique a los articulos, Tendra un valor si aplica a toda la orden si el descuento es monetario o porcentual a toda la orden',
  `coupon_code` varchar(20) NOT NULL,
  `order_id` int(11) NOT NULL,
  `offer_id` int(11) DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `offer_id` (`offer_id`),
  KEY `order_id` (`order_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  KEY `updated_by_user_id` (`updated_by_user_id`),
  CONSTRAINT `order_offer_ibfk_1` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_offer_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_offer_ibfk_3` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_offer_ibfk_4` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pallet`
--

DROP TABLE IF EXISTS `pallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `production_item_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `pallet_ibfk_1` (`production_item_id`),
  KEY `pallet_ibfk_2` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pallet_content`
--

DROP TABLE IF EXISTS `pallet_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pallet_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pallet_id` int(11) NOT NULL,
  `box_id` int(11) NOT NULL,
  `status` enum('ACTIVE','REMOVED') NOT NULL DEFAULT 'ACTIVE',
  `created_by_user_id` int(11) DEFAULT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `pallet_content_ibfk_1` (`box_id`),
  KEY `pallet_content_ibfk_2` (`pallet_id`),
  CONSTRAINT `pallet_content_ibfk_1` FOREIGN KEY (`pallet_id`) REFERENCES `pallet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cancellation_reason` text DEFAULT NULL,
  `cancellation_timestamp` timestamp NULL DEFAULT NULL,
  `cancelled_by_user_id` int(11) DEFAULT NULL,
  `change_amount` decimal(10,3) NOT NULL COMMENT 'Cantidad que se da de cambio, Es en un solo tipo de moneda, se tiene que hacer conversion al total en el tipo de moneda especificaco en currency_id',
  `concept` text DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL COMMENT 'Moneda de la transaccion, es el total recibido en una solo typo de moneda todos los pagos son convertidos y queda este tipo de moneda, deberia de ser el mismo que order_id',
  `exchange_rate` decimal(10,5) NOT NULL DEFAULT 1.00000 COMMENT 'El tipo de cambio en que se tomo lo recibido y lo que se devuelve, este valor es informativo y para impresion de tickets',
  `facturado` enum('YES','NO') NOT NULL DEFAULT 'NO',
  `paid_by_user_id` int(11) DEFAULT NULL,
  `payment_amount` decimal(10,3) NOT NULL COMMENT 'El total recibido de todo tipo de monedas convertido a currency_id',
  `received_amount` decimal(10,3) NOT NULL COMMENT 'El total recibido por el cajero de todo tipo de formas de pago y tipos de moneda convertido a currency_id,\r\neste valor puede incluir el cambio que se regresa al cliente este valor es informativo y para impresion de tickets\r\n',
  `sat_factura_id` int(11) DEFAULT NULL,
  `sat_pdf_attachment_id` int(11) DEFAULT NULL,
  `sat_uuid` varchar(40) DEFAULT NULL COMMENT 'DEPRECATED',
  `sat_xml_attachment_id` int(11) DEFAULT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `store_id` int(11) DEFAULT NULL,
  `sync_id` varchar(30) DEFAULT NULL,
  `sync_uuid` binary(16) DEFAULT NULL,
  `tag` varchar(40) DEFAULT NULL,
  `type` enum('income','expense') NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `sync_id` (`sync_id`),
  UNIQUE KEY `sync_uuid` (`sync_uuid`),
  KEY `user_id` (`created_by_user_id`),
  KEY `paid_by_user_id` (`paid_by_user_id`),
  KEY `store_id` (`store_id`),
  KEY `sat_factura_id` (`sat_factura_id`),
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `payment_ibfk_4` FOREIGN KEY (`paid_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `payment_ibfk_5` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `payment_ibfk_6` FOREIGN KEY (`sat_factura_id`) REFERENCES `sat_factura` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paypal_access_token`
--

DROP TABLE IF EXISTS `paypal_access_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `paypal_access_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access_token` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `expires` timestamp NOT NULL DEFAULT current_timestamp(),
  `raw_response` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paypal_order`
--

DROP TABLE IF EXISTS `paypal_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `paypal_order` (
  `id` varchar(100) NOT NULL,
  `buyer_user_id` int(11) NOT NULL,
  `create_response` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `log` text DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payroll`
--

DROP TABLE IF EXISTS `payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` date NOT NULL,
  `paid_status` enum('PENDING','PAID') NOT NULL DEFAULT 'PENDING',
  `start_date` date NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `store_id` int(11) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL COMMENT 'Es la suma de los montos a pagar de cada dia',
  `total` decimal(12,2) NOT NULL COMMENT 'es el subtotal menos los _deductions mÃ¡s _perceptions',
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `store_id` (`store_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  KEY `created` (`created`),
  KEY `updated_by_user_id` (`updated_by_user_id`) USING BTREE,
  KEY `updated` (`updated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payroll_concept`
--

DROP TABLE IF EXISTS `payroll_concept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll_concept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `formula` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `type` enum('DEDUCTION','PERCEPTION') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payroll_concept_value`
--

DROP TABLE IF EXISTS `payroll_concept_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll_concept_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payroll_concept_id` int(11) NOT NULL,
  `payroll_id` int(11) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `value` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payroll_id` (`payroll_id`),
  KEY `payroll_concept_id` (`payroll_concept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `period` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `end_timestamp` timestamp NOT NULL,
  `minutes_offset` int(11) NOT NULL COMMENT 'Diferencia horaria en minutos para mostrar en el tiempo de se realizo la reserva',
  `note` text DEFAULT NULL,
  `reservation_id` int(11) NOT NULL,
  `start_timestamp` timestamp NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservation_id` (`reservation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pharos_credentials`
--

DROP TABLE IF EXISTS `pharos_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharos_credentials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `endpoint` tinytext NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `merchant_code` varchar(30) NOT NULL,
  `terminal_code` varchar(30) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pharos_payment_request`
--

DROP TABLE IF EXISTS `pharos_payment_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharos_payment_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pharos_credentials_id` int(11) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `amount` decimal(20,5) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL COMMENT 'currency_id',
  `merchant_code` varchar(30) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `terminal_code` varchar(30) NOT NULL,
  `transaction_uuid` binary(16) NOT NULL,
  `response` longtext DEFAULT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `points_log`
--

DROP TABLE IF EXISTS `points_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `points_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_user_id` int(11) NOT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `points` decimal(10,2) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `points_log_fk1` (`client_user_id`),
  KEY `points_log_fk2` (`order_id`),
  KEY `points_log_fk3` (`created_by_user_id`),
  CONSTRAINT `points_log_fk1` FOREIGN KEY (`client_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `points_log_fk2` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `points_log_fk3` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `images_ids` text NOT NULL,
  `post` text NOT NULL,
  `title` varchar(255) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ask_for_guests_number` smallint(6) NOT NULL DEFAULT 1,
  `background_image_id` int(11) DEFAULT NULL,
  `background_image_size` enum('repeat','cover') NOT NULL DEFAULT 'repeat',
  `btn_primary_bg_color_hover` varchar(255) DEFAULT '#eb5a4e',
  `btn_primary_bg_color` varchar(255) NOT NULL DEFAULT '#eb5a4e',
  `btn_primary_border_color_hover` varchar(255) NOT NULL DEFAULT '#eb5a4e',
  `btn_primary_border_color` varchar(30) DEFAULT '#eb5a4e',
  `btn_primary_border_width` int(11) NOT NULL DEFAULT 0,
  `btn_primary_text_color_hover` varchar(30) DEFAULT '#eb5a4e',
  `btn_primary_text_color` varchar(30) DEFAULT '#FFFFFF',
  `btn_secondary_bg_color_hover` varchar(30) DEFAULT '#6c757d',
  `btn_secondary_bg_color` varchar(30) DEFAULT '#6c757d',
  `btn_secondary_border_color_hover` varchar(30) DEFAULT '#6c757d',
  `btn_secondary_border_color` varchar(30) DEFAULT '#6c757d',
  `btn_secondary_border_width` int(11) NOT NULL DEFAULT 0,
  `btn_secondary_text_color_hover` varchar(30) DEFAULT '#FEFEFE',
  `btn_secondary_text_color` varchar(30) DEFAULT '#FFFFFF',
  `button_border_radius` varchar(20) NOT NULL DEFAULT '.25rem',
  `button_style` text DEFAULT NULL,
  `card_background_color` varchar(30) DEFAULT '#FFFFFF',
  `card_background_image_id` int(11) DEFAULT NULL,
  `card_background_opacity` int(11) NOT NULL DEFAULT 86,
  `card_border_color` varchar(30) DEFAULT '#B5B5B5',
  `card_border_radius` varchar(20) NOT NULL DEFAULT '.25rem',
  `charts_colors` text DEFAULT NULL,
  `chat_upload_attachment_image_id` int(11) DEFAULT NULL,
  `chat_upload_image_id` int(11) DEFAULT NULL,
  `comex_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_price_preference` enum('ONLY_DEFAULT_CURRENCY','MULTIPLE_CURRENCY') NOT NULL DEFAULT 'ONLY_DEFAULT_CURRENCY',
  `default_cash_close_receipt` int(11) NOT NULL DEFAULT 1,
  `default_file_logo_image_id` int(11) DEFAULT NULL,
  `default_input_type` enum('TACTILE','KEYBOARD') NOT NULL DEFAULT 'TACTILE',
  `default_pos_availability_type` enum('ALWAYS','ON_STOCK') NOT NULL DEFAULT 'ALWAYS',
  `default_price_type_id` int(11) DEFAULT 1,
  `default_print_receipt` int(11) NOT NULL DEFAULT 1,
  `default_product_image_id` int(11) DEFAULT NULL,
  `default_return_action` enum('RETURN_TO_STOCK','ADD_TO_MERMA','TRANSFORM_TO_PRODUCT') NOT NULL DEFAULT 'ADD_TO_MERMA',
  `default_ticket_format` int(11) NOT NULL DEFAULT 1,
  `default_ticket_image_id` int(11) DEFAULT NULL,
  `default_user_logo_image_id` int(11) DEFAULT NULL,
  `display_categories_on_items` enum('YES','NO') NOT NULL DEFAULT 'NO',
  `ecommerce_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `header_background_color` varchar(30) DEFAULT '#eb5a4e',
  `header_text_color` varchar(30) DEFAULT '#000000',
  `item_selected_background_color` varchar(255) NOT NULL DEFAULT '#eb5a4e',
  `item_selected_text_color` varchar(255) NOT NULL DEFAULT '#FFFFFF',
  `link_color` varchar(30) NOT NULL DEFAULT '#eb5a4e',
  `link_hover` varchar(40) NOT NULL DEFAULT '#000000',
  `login_background_image_id` int(11) DEFAULT NULL,
  `login_background_image_size` enum('repeat','cover') NOT NULL DEFAULT 'cover',
  `login_image_id` int(11) DEFAULT NULL,
  `logo_image_id` int(11) DEFAULT NULL,
  `menu_background_color` varchar(60) NOT NULL DEFAULT 'none',
  `menu_background_image_id` int(11) DEFAULT NULL,
  `menu_background_image_size` enum('cover','repeat') NOT NULL DEFAULT 'repeat',
  `menu_background_type` enum('IMAGE','COLOR') NOT NULL DEFAULT 'IMAGE',
  `menu_color_opacity` int(11) NOT NULL DEFAULT 0,
  `menu_icon_color` varchar(30) NOT NULL DEFAULT '#eb5a4e',
  `menu_text_color` varchar(30) NOT NULL DEFAULT '#eb5a4e',
  `menu_title_color` varchar(30) NOT NULL DEFAULT '#666666',
  `name` varchar(50) NOT NULL DEFAULT 'Mi Tienda',
  `offers_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `pv_bar_background_color` varchar(255) NOT NULL DEFAULT '#eb5a4e',
  `pv_bar_text_color` varchar(255) NOT NULL DEFAULT '#FFFFFF',
  `pv_bar_total_color` varchar(255) NOT NULL DEFAULT '#FFFFFF',
  `pv_show_all_categories` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `pv_show_orders` enum('ALL_OPEN','OPEN_SAME_DAY') NOT NULL DEFAULT 'OPEN_SAME_DAY',
  `radius_style` varchar(30) DEFAULT NULL,
  `stock_negative_values_allowed` tinyint(1) NOT NULL DEFAULT 0,
  `submenu_background_color` varchar(255) NOT NULL DEFAULT '#eb5a4e',
  `submenu_color_opacity` int(11) NOT NULL DEFAULT 100,
  `submenu_icon_color` varchar(255) NOT NULL DEFAULT '#FFFFFF',
  `submenu_text_color` varchar(255) NOT NULL DEFAULT '#FFFFFF',
  `text_color` varchar(255) NOT NULL DEFAULT '#4d4d4d',
  `titles_color` varchar(30) DEFAULT '#666666',
  `touch_size_button` varchar(8) NOT NULL DEFAULT '100px',
  `touch_text_color` varchar(20) NOT NULL DEFAULT '#FFFFFF',
  `touch_text_shadow_color` varchar(20) NOT NULL DEFAULT '#000000',
  `update_prices_on_purchases` int(11) NOT NULL DEFAULT 1,
  `production_enabled` int(11) NOT NULL DEFAULT 1,
  `reservations_enabled` int(11) NOT NULL DEFAULT 1,
  `restaurant_enabled` int(11) NOT NULL DEFAULT 1,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_attachments` enum('ENABLED','DISABLED') NOT NULL DEFAULT 'DISABLED' COMMENT 'Es para si los usuario requieren archivos como foto de identificacion etc',
  PRIMARY KEY (`id`),
  KEY `logo_image_id` (`logo_image_id`),
  KEY `default_employee_logo_image_id` (`default_user_logo_image_id`),
  KEY `login_image_id` (`login_image_id`),
  KEY `background_image_id` (`background_image_id`),
  KEY `default_file_logo_image_id` (`default_file_logo_image_id`),
  KEY `chat_upload_image_id` (`chat_upload_image_id`),
  KEY `chat_upload_attachment_image_id` (`chat_upload_attachment_image_id`),
  KEY `login_background_image_id` (`login_background_image_id`),
  KEY `default_product_image_id` (`default_product_image_id`),
  KEY `default_price_type_id` (`default_price_type_id`),
  CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`background_image_id`) REFERENCES `image` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `preferences_ibfk_2` FOREIGN KEY (`chat_upload_attachment_image_id`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `preferences_ibfk_3` FOREIGN KEY (`default_file_logo_image_id`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `preferences_ibfk_4` FOREIGN KEY (`default_user_logo_image_id`) REFERENCES `image` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `preferences_ibfk_5` FOREIGN KEY (`login_background_image_id`) REFERENCES `image` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `preferences_ibfk_6` FOREIGN KEY (`logo_image_id`) REFERENCES `image` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `preferences_ibfk_7` FOREIGN KEY (`default_product_image_id`) REFERENCES `image` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `preferences_ibfk_8` FOREIGN KEY (`default_price_type_id`) REFERENCES `price_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL DEFAULT 'MXN',
  `item_id` int(11) NOT NULL,
  `percent` decimal(20,10) NOT NULL DEFAULT 0.0000000000,
  `price_list_id` int(11) NOT NULL,
  `price_type_id` int(11) NOT NULL,
  `price` decimal(20,7) NOT NULL,
  `tax_included` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `price_list_id` (`price_list_id`,`currency_id`,`item_id`,`price_type_id`),
  KEY `store_id` (`price_list_id`),
  KEY `price_type_id` (`price_type_id`),
  KEY `item_id` (`item_id`),
  KEY `currency_id` (`currency_id`),
  CONSTRAINT `price_ibfk_2` FOREIGN KEY (`price_type_id`) REFERENCES `price_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `price_ibfk_3` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `price_ibfk_4` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `price_ibfk_5` FOREIGN KEY (`price_list_id`) REFERENCES `price_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `price_list`
--

DROP TABLE IF EXISTS `price_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(40) NOT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `price_log`
--

DROP TABLE IF EXISTS `price_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `new_percent` decimal(20,10) NOT NULL DEFAULT 0.0000000000,
  `new_price` decimal(20,7) NOT NULL,
  `old_percent` decimal(20,10) NOT NULL DEFAULT 0.0000000000,
  `old_price` decimal(20,7) NOT NULL,
  `old_tax_included` enum('YES','NO') NOT NULL DEFAULT 'YES',
  `price_list_id` int(11) NOT NULL,
  `price_type_id` int(11) NOT NULL,
  `tax_included` enum('NO','YES') NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `price_log_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `price_type`
--

DROP TABLE IF EXISTS `price_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `installments` int(11) NOT NULL DEFAULT 0,
  `json_tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json_tags`)),
  `model` enum('AMOUNT','PERCENT','ALL') NOT NULL DEFAULT 'AMOUNT' COMMENT 'Amount, Set a price as is, PERCENT the price must be update based on the reference price, A value of 20 the unitary price must be reference price*1.20',
  `name` varchar(30) NOT NULL,
  `pv_bar_background_color` varchar(30) NOT NULL DEFAULT '#eb5a4e',
  `pv_bar_text_color` varchar(30) NOT NULL DEFAULT '#FFFFFF',
  `pv_bar_total_color` varchar(30) NOT NULL DEFAULT '#FFFFFF',
  `show_bill_code` enum('YES','NO') NOT NULL DEFAULT 'YES',
  `sort_priority` int(11) NOT NULL DEFAULT 0,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `tax_model` enum('TAX_INCLUDED','PLUS_TAX','ALL') NOT NULL DEFAULT 'ALL',
  `type` enum('RETAIL','WHOLESALE') NOT NULL DEFAULT 'RETAIL',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `wholesale_min_qty` decimal(10,5) NOT NULL DEFAULT 12.00000,
  `wholesale_type` enum('BY_ARTICLE','BY_CATEGORY','BY_TAG') NOT NULL DEFAULT 'BY_ARTICLE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `printer`
--

DROP TABLE IF EXISTS `printer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `printer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` int(11) NOT NULL,
  `device` varchar(255) DEFAULT NULL COMMENT 'device identifier lpt, usb or network share names',
  `ip_address` varchar(40) DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `port` int(11) DEFAULT NULL,
  `protocol` varchar(40) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `process` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `generator_type` enum('ON_DEMAN','SALE_ITEM','SALE_CATEGORY','SALE_JSON_TAG') NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `json_tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json_tags`)),
  `name` varchar(60) NOT NULL,
  `production_area_id` int(11) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `production_area_id` (`production_area_id`),
  KEY `item_id` (`item_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `process_ibfk_1` FOREIGN KEY (`production_area_id`) REFERENCES `production_area` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `process_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `process_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `process_status`
--

DROP TABLE IF EXISTS `process_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `process_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `mark_task_as_done` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(60) NOT NULL,
  `process_id` int(11) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `process_id` (`process_id`),
  CONSTRAINT `process_status_ibfk_1` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `production` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alternate_qty` decimal(10,3) NOT NULL DEFAULT 0.000 COMMENT 'Conteo alternativo, \r\nNo es oficial pero sirve para llevar registro si por ejemplo se necesita llevar conteo por kilos y pieza o algun otro tipo de conteo',
  `batch` varchar(40) DEFAULT NULL,
  `control` varchar(10) DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `merma_qty` int(11) NOT NULL DEFAULT 0,
  `merma_reason` varchar(40) DEFAULT NULL,
  `produced_by_user_id` int(11) DEFAULT NULL,
  `production_area_id` int(11) NOT NULL,
  `qty_reported` decimal(13,3) NOT NULL,
  `qty` decimal(13,3) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `store_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verified_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `production_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1915 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `production_area`
--

DROP TABLE IF EXISTS `production_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(60) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `store_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `production_area_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `production_area_item`
--

DROP TABLE IF EXISTS `production_area_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_area_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `production_area_id` int(11) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `production_area_id` (`production_area_id`,`item_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `production_area_item_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `production_area_item_ibfk_2` FOREIGN KEY (`production_area_id`) REFERENCES `production_area` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `production_user`
--

DROP TABLE IF EXISTS `production_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `production_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `price` decimal(10,3) NOT NULL COMMENT 'Precio para posible nomina, si no es necesario dejarlo en 0',
  `currency_id` varchar(3) NOT NULL COMMENT 'Moneda del pago, Pesos MXN',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4632 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci COMMENT='Registro por grupo, SI es necesario se especifica.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_id` int(11) DEFAULT NULL,
  `provider_name` varchar(100) DEFAULT NULL,
  `provider_user_id` int(11) DEFAULT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `stock_status` enum('PENDING','ADDED_TO_STOCK','SHIPPING_CREATED') NOT NULL DEFAULT 'PENDING',
  `store_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `amount_paid` decimal(20,5) NOT NULL DEFAULT 0.00000,
  `paid_timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  KEY `provider_user_id` (`provider_user_id`),
  KEY `purchase_ibfk_3` (`order_id`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`provider_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `purchase_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchase_detail`
--

DROP TABLE IF EXISTS `purchase_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `purchase_id` int(11) NOT NULL,
  `qty` decimal(10,3) NOT NULL,
  `serial_number` varchar(60) DEFAULT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `stock_status` enum('PENDING','ADDED_TO_STOCK') NOT NULL DEFAULT 'PENDING',
  `total` int(11) NOT NULL,
  `unitary_price` decimal(20,7) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial_number` (`serial_number`,`purchase_id`),
  KEY `item_id` (`item_id`),
  KEY `purchase_id` (`purchase_id`),
  CONSTRAINT `purchase_detail_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `purchase_detail_ibfk_2` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `push_notification`
--

DROP TABLE IF EXISTS `push_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `push_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_path` text DEFAULT NULL,
  `body` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `icon_image_id` int(11) DEFAULT NULL,
  `link` text DEFAULT NULL,
  `object_id` varchar(30) DEFAULT NULL,
  `object_type` varchar(30) NOT NULL,
  `priority` enum('normal','high') NOT NULL DEFAULT 'normal',
  `push_notification_id` varchar(64) DEFAULT NULL,
  `read_status` enum('PENDING','READ') NOT NULL,
  `response` text DEFAULT NULL,
  `sent_status` int(11) DEFAULT NULL,
  `title` text NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `push_notification_ibfk_1` (`user_id`),
  CONSTRAINT `push_notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `form_id` int(11) NOT NULL,
  `help` text DEFAULT NULL,
  `priority` int(11) NOT NULL DEFAULT 1 COMMENT 'Mayor tiene mas prioridad, para el orden en el que se muestren las preguntas',
  `question` text NOT NULL,
  `type` enum('text','textarea','multiple_choice','rating','ranking','date','number','tel') NOT NULL,
  `required` tinyint(1) DEFAULT 0,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `form_id` (`form_id`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `form` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_choice`
--

DROP TABLE IF EXISTS `question_choice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_choice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `choice_text` varchar(255) DEFAULT NULL,
  `choice_value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `question_choice_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quote`
--

DROP TABLE IF EXISTS `quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `quote` (
  `approved_status` enum('PENDING','SENT','DECLINED','APPROVED','CANCELLED') NOT NULL,
  `approved_time` datetime DEFAULT NULL,
  `attachment_id` int(11) DEFAULT NULL,
  `client_user_id` int(11) DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_id` varchar(3) NOT NULL,
  `email` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `note` text DEFAULT NULL,
  `phone` varchar(100) NOT NULL,
  `price_type_id` int(11) DEFAULT NULL,
  `sent_timestamp` timestamp NULL DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `sync_id` varchar(40) NOT NULL,
  `tax_percent` decimal(10,2) NOT NULL DEFAULT 16.00,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `valid_until` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  KEY `price_type_id` (`price_type_id`),
  CONSTRAINT `quote_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `quote_ibfk_2` FOREIGN KEY (`price_type_id`) REFERENCES `price_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quote_item`
--

DROP TABLE IF EXISTS `quote_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `quote_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `discount_percent` decimal(10,3) NOT NULL DEFAULT 0.000,
  `discount` decimal(10,3) NOT NULL DEFAULT 0.000,
  `ieps_calculated` decimal(15,6) NOT NULL DEFAULT 0.000000,
  `ieps_type` enum('RATE','AMOUNT') NOT NULL DEFAULT 'RATE',
  `ieps_value` decimal(7,4) NOT NULL DEFAULT 0.0000 COMMENT 'Es el valor definido al momento de crear el quote_item, si ieps_type es RATE, sera porcentaje, si es AMOUNT sera la constante definida',
  `item_id` int(11) NOT NULL,
  `original_unitary_price` decimal(10,3) NOT NULL,
  `provider_price` decimal(10,3) NOT NULL,
  `qty` decimal(10,3) NOT NULL,
  `quote_id` int(11) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `subtotal` decimal(10,3) NOT NULL,
  `tax_included` enum('YES','NO') NOT NULL DEFAULT 'YES',
  `tax` decimal(10,3) NOT NULL,
  `total` decimal(10,3) NOT NULL,
  `unitary_price` decimal(10,3) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `quote_id` (`quote_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `quote_item_ibfk_1` FOREIGN KEY (`quote_id`) REFERENCES `quote` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `quote_item_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quote_request`
--

DROP TABLE IF EXISTS `quote_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `quote_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quote_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `email` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `requisition`
--

DROP TABLE IF EXISTS `requisition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `requisition` (
  `approved_status` enum('PENDING','APPROVED','NOT_APPROVED') NOT NULL DEFAULT 'PENDING',
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date` date NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note` text DEFAULT NULL,
  `requested_to_store_id` int(11) DEFAULT NULL,
  `required_by_store_id` int(11) NOT NULL,
  `required_by_timestamp` timestamp NULL DEFAULT NULL,
  `shipped_status` enum('PENDING','SHIPPED') NOT NULL DEFAULT 'PENDING',
  `status` enum('PENDING','CANCELLED','NOT_APPROVED','SHIPPED','CLOSED','APPROVED') NOT NULL DEFAULT 'PENDING',
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `store_id` (`required_by_store_id`),
  KEY `requested_to_store_id` (`requested_to_store_id`),
  CONSTRAINT `requisition_ibfk_1` FOREIGN KEY (`requested_to_store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `requisition_ibfk_2` FOREIGN KEY (`required_by_store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `requisition_item`
--

DROP TABLE IF EXISTS `requisition_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `requisition_item` (
  `aproved_status` enum('NOT_APPROVED','APPROVED') NOT NULL DEFAULT 'NOT_APPROVED',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `requisition_id` int(11) NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `requisition_id` (`requisition_id`),
  CONSTRAINT `requisition_item_ibfk_1` FOREIGN KEY (`requisition_id`) REFERENCES `requisition` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address_id` int(11) DEFAULT NULL,
  `client_name` varchar(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `condition` enum('DRAFT','ACTIVE','CLOSED') NOT NULL DEFAULT 'ACTIVE',
  `currency_id` varchar(3) NOT NULL,
  `note` text DEFAULT NULL,
  `price_type_id` int(11) NOT NULL,
  `start` datetime NOT NULL COMMENT 'Inicio de la reserva, cuando el cliente lo solicita',
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `store_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT 'El id del usuario que hizo la reserva',
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  KEY `currency_id` (`currency_id`),
  KEY `store_id` (`store_id`),
  KEY `user_id` (`user_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  KEY `updated_by_user_id` (`updated_by_user_id`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_ibfk_3` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_ibfk_5` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_ibfk_6` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation_item`
--

DROP TABLE IF EXISTS `reservation_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `delivered_qty` int(11) NOT NULL DEFAULT 0,
  `end` datetime DEFAULT NULL COMMENT 'Fecha de fin de la reserva para el item en general, este solo se toma en cuenta si no hay especifico por reservation_item_serial.end',
  `item_id` int(11) NOT NULL COMMENT 'El item que tiene los precios, el nombre y la descripcion',
  `last_period_id` int(11) DEFAULT NULL COMMENT 'El id del ultimo periodo que se le hizo corte',
  `note` text DEFAULT NULL,
  `period_type` enum('BY_HOUR','DAILY','WEEKLY','MONTHLY','ONCE_ONLY') NOT NULL COMMENT 'Se cobra cada que pasa X tiempe excepto si se especifica que es ONCE_ONLY',
  `price` decimal(10,5) NOT NULL COMMENT 'Es el precio del articulo general',
  `tax_included` enum('YES','NO') NOT NULL DEFAULT 'YES',
  `qty` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `returned_qty` int(11) NOT NULL DEFAULT 0,
  `scheduled_delivery` datetime DEFAULT NULL COMMENT 'Fecha programada de entrega',
  `scheduled_return` datetime DEFAULT NULL COMMENT 'Fecha programada de retorno',
  `stock_item_id` int(11) NOT NULL COMMENT 'El item que requiere serial # Si es item ES RESERVABLE de lo contrario Stock_item_id debe ser igual a item_id CUANDO NO ES RESERVABLE	',
  `start` datetime NOT NULL COMMENT 'Fecha de inicio de la reserva para el item en general, este solo se toma en cuenta si no hay especifico por reservation_item_serial.start',
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `last_period_id` (`last_period_id`),
  KEY `reservation_id` (`reservation_id`),
  KEY `stock_item_id` (`stock_item_id`),
  CONSTRAINT `reservation_item_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_item_ibfk_2` FOREIGN KEY (`last_period_id`) REFERENCES `period` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_item_ibfk_3` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_item_ibfk_4` FOREIGN KEY (`stock_item_id`) REFERENCES `item` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation_item_assign`
--

DROP TABLE IF EXISTS `reservation_item_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_item_assign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `reservation_item_id` int(11) NOT NULL,
  `type` enum('DELIVERY','COLLECT') NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation_item_serial`
--

DROP TABLE IF EXISTS `reservation_item_serial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_item_serial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `delivered_qty` int(11) NOT NULL DEFAULT 0,
  `created_by_user_id` int(11) NOT NULL,
  `delivered_timestamp` timestamp NULL DEFAULT NULL COMMENT 'Fecha real de entrega',
  `delivery_by_user_id` int(11) DEFAULT NULL,
  `end` datetime DEFAULT NULL COMMENT 'Fecha de fin de la reserva para el serial, este tiene prioridad sobre reservation_item.end',
  `minutes_offset` int(11) NOT NULL COMMENT 'Diferencia horaria en minutos para mostrar en el tiempo de se realizo la reserva',
  `note` text DEFAULT NULL,
  `reservation_item_id` int(11) NOT NULL,
  `returned_qty` int(11) NOT NULL DEFAULT 0,
  `returned_timestamp` timestamp NULL DEFAULT NULL COMMENT 'Fecha real de retorno',
  `returned_by_user_id` int(11) DEFAULT NULL,
  `schedule_delivery` datetime DEFAULT NULL COMMENT 'Fecha programada de entrega',
  `schedule_return` datetime DEFAULT NULL COMMENT 'Fecha programada de retorno',
  `serial_id` int(11) NOT NULL COMMENT 'El deberia de ser el serial_id para un item de reservation_item.stock_item_id',
  `serial` varchar(40) DEFAULT NULL,
  `start` datetime DEFAULT NULL COMMENT 'Fecha de inicio de reserva para el serial, este tiene prioridad sobre reservation_item.start',
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  KEY `delivery_by_user_id` (`delivery_by_user_id`),
  KEY `reservation_item_id` (`reservation_item_id`),
  KEY `returned_by_user_id` (`returned_by_user_id`),
  KEY `serial_id` (`serial_id`),
  KEY `updated_by_user_id` (`updated_by_user_id`),
  CONSTRAINT `reservation_item_serial_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_item_serial_ibfk_2` FOREIGN KEY (`delivery_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_item_serial_ibfk_3` FOREIGN KEY (`reservation_item_id`) REFERENCES `reservation_item` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_item_serial_ibfk_4` FOREIGN KEY (`returned_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_item_serial_ibfk_5` FOREIGN KEY (`serial_id`) REFERENCES `serial` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reservation_item_serial_ibfk_6` FOREIGN KEY (`updated_by_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `response`
--

DROP TABLE IF EXISTS `response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `response` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `respondent_identifier` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `form_id` (`form_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `response_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `form` (`id`) ON DELETE CASCADE,
  CONSTRAINT `response_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `return_assignment`
--

DROP TABLE IF EXISTS `return_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `return_assignment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `reservation_item_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reservation_item_id` (`reservation_item_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `return_assignment_ibfk_1` FOREIGN KEY (`reservation_item_id`) REFERENCES `reservation_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `return_assignment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `returned_item`
--

DROP TABLE IF EXISTS `returned_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `returned_item` (
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `returned_qty` int(11) NOT NULL,
  `returns_id` int(11) NOT NULL,
  `total` decimal(10,3) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `returns_id` (`returns_id`),
  CONSTRAINT `returned_item_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `returned_item_ibfk_2` FOREIGN KEY (`returns_id`) REFERENCES `returns` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `returns`
--

DROP TABLE IF EXISTS `returns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `returns` (
  `amount_paid` decimal(10,3) NOT NULL DEFAULT 0.000,
  `cashier_user_id` int(11) NOT NULL,
  `client_user_id` int(11) DEFAULT NULL,
  `code` varchar(60) NOT NULL,
  `currency_id` varchar(3) NOT NULL DEFAULT 'MXN',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note` text DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `total` decimal(10,3) NOT NULL,
  `type` enum('RETURN_COUPON','RETURN_MONEY') NOT NULL DEFAULT 'RETURN_COUPON',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `client_user_id` (`client_user_id`),
  KEY `store_id` (`store_id`),
  KEY `order_id` (`order_id`),
  KEY `cashier_user_id` (`cashier_user_id`),
  CONSTRAINT `returns_ibfk_1` FOREIGN KEY (`client_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `returns_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `returns_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `returns_ibfk_4` FOREIGN KEY (`cashier_user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role_item_price`
--

DROP TABLE IF EXISTS `role_item_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_item_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `price` decimal(10,3) NOT NULL,
  `role_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_id` (`item_id`,`role_id`),
  KEY `role_item_price_role_id` (`role_id`),
  CONSTRAINT `role_item_price_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `role_item_price_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sat_factura`
--

DROP TABLE IF EXISTS `sat_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sat_factura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_cancelled_timestamp` timestamp NULL DEFAULT NULL,
  `billing_data_id` int(11) DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_id` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `pdf_attachment_id` int(11) DEFAULT NULL,
  `request` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`request`)),
  `transaccion` varchar(40) DEFAULT NULL,
  `type` enum('NORMAL','COMPLEMENTO_PAGO','POR_PERIODO','DESCONOCIDO') DEFAULT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `uuid` varchar(40) DEFAULT NULL,
  `xml_attachment_id` int(11) DEFAULT NULL COMMENT 'Esta null por si existe algun probleman almenos que guarde el pdf',
  `cancelado_por_sat` enum('YES','NO') DEFAULT 'NO',
  `solicitud_cancelacion_sat_timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid` (`uuid`),
  KEY `sat_factura_ibfk_1` (`order_id`),
  KEY `payment_id` (`payment_id`),
  KEY `billing_data_id` (`billing_data_id`),
  CONSTRAINT `sat_factura_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sat_factura_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`),
  CONSTRAINT `sat_factura_ibfk_3` FOREIGN KEY (`billing_data_id`) REFERENCES `billing_data` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sat_response`
--

DROP TABLE IF EXISTS `sat_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sat_response` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_order` int(11) NOT NULL,
  `request` text DEFAULT NULL,
  `response` text DEFAULT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_order` (`id_order`),
  CONSTRAINT `sat_response_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `serial`
--

DROP TABLE IF EXISTS `serial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `serial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `available_status` enum('AVAILABLE','RESERVED','MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
  `additional_data` text DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text DEFAULT NULL,
  `last_order_id` int(11) DEFAULT NULL,
  `last_reservation_id` int(11) DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `serial_number` varchar(60) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  `store_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial_number` (`serial_number`),
  KEY `item_id` (`item_id`),
  KEY `serial_ibfk_2` (`store_id`),
  CONSTRAINT `serial_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `serial_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `serial_image`
--

DROP TABLE IF EXISTS `serial_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `serial_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text DEFAULT NULL,
  `image_id` int(11) NOT NULL,
  `serial_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  KEY `serial_id` (`serial_id`),
  CONSTRAINT `serial_image_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `serial_image_ibfk_2` FOREIGN KEY (`serial_id`) REFERENCES `serial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `serial_log`
--

DROP TABLE IF EXISTS `serial_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `serial_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serial_id` int(11) NOT NULL,
  `note` text NOT NULL,
  `reservation_item_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `reservation_item_id` (`reservation_item_id`),
  KEY `serial_id` (`serial_id`),
  CONSTRAINT `serial_log_ibfk_1` FOREIGN KEY (`reservation_item_id`) REFERENCES `reservation_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `serial_log_ibfk_2` FOREIGN KEY (`serial_id`) REFERENCES `serial` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `serie_counter`
--

DROP TABLE IF EXISTS `serie_counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `serie_counter` (
  `id` varchar(60) NOT NULL,
  `counter` bigint(20) NOT NULL DEFAULT 1,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` varchar(16) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shipping`
--

DROP TABLE IF EXISTS `shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date` date NOT NULL,
  `delivery_timestamp` datetime DEFAULT NULL,
  `from_store_id` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `production_area_id` int(11) DEFAULT NULL,
  `purchase_id` int(11) DEFAULT NULL,
  `received_by_user_id` int(11) DEFAULT NULL,
  `requisition_id` int(11) DEFAULT NULL,
  `shipping_company` varchar(60) NOT NULL,
  `shipping_guide` varchar(60) NOT NULL,
  `status` enum('PENDING','DELIVERED','SENT','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `to_store_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `shipping_ibfk_1` (`from_store_id`),
  KEY `shipping_ibfk_2` (`to_store_id`),
  CONSTRAINT `shipping_ibfk_1` FOREIGN KEY (`from_store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shipping_ibfk_2` FOREIGN KEY (`to_store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shipping_item`
--

DROP TABLE IF EXISTS `shipping_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `box_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) DEFAULT NULL,
  `pallet_id` int(11) DEFAULT NULL,
  `qty` decimal(16,5) NOT NULL,
  `received_qty` decimal(16,5) NOT NULL DEFAULT 0.00000,
  `requisition_item_id` int(11) DEFAULT NULL,
  `serial_number` varchar(60) DEFAULT NULL,
  `shipping_id` int(11) NOT NULL,
  `shrinkage_qty` decimal(16,5) NOT NULL DEFAULT 0.00000 COMMENT 'Merma',
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `shipping_item_ibfk_1` (`shipping_id`),
  CONSTRAINT `shipping_item_ibfk_1` FOREIGN KEY (`shipping_id`) REFERENCES `shipping` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock_alert`
--

DROP TABLE IF EXISTS `stock_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_alert` (
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `max` decimal(20,7) DEFAULT NULL,
  `min` decimal(20,7) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_id_2` (`item_id`,`store_id`),
  KEY `item_id` (`item_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `stock_alert_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stock_alert_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock_record`
--

DROP TABLE IF EXISTS `stock_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text DEFAULT NULL,
  `is_current` tinyint(4) DEFAULT 1,
  `item_id` int(11) NOT NULL,
  `movement_qty` decimal(10,3) NOT NULL,
  `movement_type` enum('POSITIVE','NEGATIVE','ADJUSTMENT') NOT NULL,
  `order_item_id` int(11) DEFAULT NULL,
  `previous_qty` decimal(10,3) NOT NULL,
  `production_item_id` int(11) DEFAULT NULL,
  `purchase_detail_id` int(11) DEFAULT NULL,
  `qty` decimal(10,3) NOT NULL COMMENT 'Debe ser en la unidad de medida de la organizacion, definidio en la tabla item alq eu hace referencia en item_id',
  `serial_number_record_id` int(11) DEFAULT NULL,
  `shipping_item_id` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `stock_record_ibfk_1` (`item_id`),
  KEY `stock_record_ibfk_2` (`order_item_id`),
  KEY `stock_record_ibfk_3` (`store_id`),
  KEY `shipping_item_id` (`shipping_item_id`),
  KEY `purchase_detail_id` (`purchase_detail_id`),
  KEY `is_current` (`is_current`,`item_id`,`store_id`),
  CONSTRAINT `stock_record_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stock_record_ibfk_2` FOREIGN KEY (`order_item_id`) REFERENCES `order_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stock_record_ibfk_3` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stock_record_ibfk_4` FOREIGN KEY (`shipping_item_id`) REFERENCES `shipping_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stock_record_ibfk_5` FOREIGN KEY (`purchase_detail_id`) REFERENCES `purchase_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1789 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stocktake`
--

DROP TABLE IF EXISTS `stocktake`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocktake` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` text DEFAULT NULL,
  `status` enum('ACTIVE','CLOSED') NOT NULL,
  `stock_adjustment` enum('DIFFERENCE','EXACT_QTY') NOT NULL DEFAULT 'DIFFERENCE',
  `store_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stocktake_item`
--

DROP TABLE IF EXISTS `stocktake_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocktake_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `box_content_id` int(11) DEFAULT NULL,
  `box_id` int(11) DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `db_qty` decimal(20,5) NOT NULL COMMENT 'Es la cantidad que se encuentra registrada en base de datos a la hora de la toma de inventario. Ej: En Sistema dice que hay 20 articulos y la persona que esta haciendo el inventario solo cuenta 18, en este campo va 20.',
  `item_id` int(11) NOT NULL,
  `pallet_id` int(11) DEFAULT NULL,
  `real_qty` decimal(20,5) NOT NULL COMMENT 'Es la cantidad que se encuentra registrada en el sistema a la hora de la toma de inventario. Ej: En Sistema dice que hay 20 articulos y la persona que esta haciendo el inventario solo cuenta 18, en este campo va 18.',
  `stocktake_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `stocktake_id` (`stocktake_id`,`item_id`),
  KEY `stocktake_item_ibfk_1` (`stocktake_id`),
  CONSTRAINT `stocktake_item_ibfk_1` FOREIGN KEY (`stocktake_id`) REFERENCES `stocktake` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stocktake_scan`
--

DROP TABLE IF EXISTS `stocktake_scan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocktake_scan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stocktake_id` int(11) NOT NULL,
  `pallet_id` int(11) DEFAULT NULL,
  `box_id` int(11) DEFAULT NULL,
  `box_content_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `stocktake_id` (`stocktake_id`),
  KEY `pallet_id` (`pallet_id`),
  KEY `box_id` (`box_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `stocktake_scan_ibfk_1` FOREIGN KEY (`stocktake_id`) REFERENCES `stocktake` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stocktake_scan_ibfk_2` FOREIGN KEY (`pallet_id`) REFERENCES `pallet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stocktake_scan_ibfk_3` FOREIGN KEY (`box_id`) REFERENCES `box` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stocktake_scan_ibfk_4` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `level` int(11) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `parent_storage_id` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `storage_type_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  KEY `storage_type_id` (`storage_type_id`),
  KEY `parent_storage_id` (`parent_storage_id`),
  CONSTRAINT `storage_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `storage_ibfk_2` FOREIGN KEY (`storage_type_id`) REFERENCES `storage_type` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `storage_ibfk_3` FOREIGN KEY (`parent_storage_id`) REFERENCES `storage_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `storage_ibfk_4` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `storage_ibfk_5` FOREIGN KEY (`storage_type_id`) REFERENCES `storage_type` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `storage_ibfk_6` FOREIGN KEY (`parent_storage_id`) REFERENCES `storage_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage_item`
--

DROP TABLE IF EXISTS `storage_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `storage_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `storage_id` (`storage_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `storage_item_ibfk_1` FOREIGN KEY (`storage_id`) REFERENCES `storage` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `storage_item_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage_serial`
--

DROP TABLE IF EXISTS `storage_serial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_serial` (
  `id` int(11) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `serial_id` int(11) NOT NULL,
  `sort_weight` int(11) NOT NULL DEFAULT 1,
  `storage_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `storage_id` (`storage_id`),
  KEY `serial_id` (`serial_id`),
  CONSTRAINT `storage_serial_ibfk_1` FOREIGN KEY (`storage_id`) REFERENCES `storage` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `storage_serial_ibfk_2` FOREIGN KEY (`serial_id`) REFERENCES `serial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage_type`
--

DROP TABLE IF EXISTS `storage_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(60) DEFAULT NULL,
  `sort_weight` int(11) NOT NULL DEFAULT 1,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accept_cash` tinyint(1) NOT NULL DEFAULT 1,
  `accept_check` tinyint(1) NOT NULL DEFAULT 1,
  `accept_credit_card` tinyint(1) NOT NULL DEFAULT 1,
  `accept_delivery_orders` enum('NEVER','ONLY_PREPAID','ALWAYS') NOT NULL DEFAULT 'NEVER',
  `accept_pickup_orders` enum('NEVER','ONLY_PREPAID','ALWAYS') NOT NULL DEFAULT 'NEVER',
  `accept_transfer` tinyint(1) NOT NULL DEFAULT 1,
  `address` varchar(100) DEFAULT NULL,
  `autofacturacion_day_limit` int(11) NOT NULL DEFAULT 30 COMMENT 'Rango de dias en el que el cliente puede autofacturar despues de la compra',
  `autofacturacion_enabled` enum('YES','NO') NOT NULL DEFAULT 'YES',
  `autofacturacion_settings` enum('ONLY_SAME_MONTH','ONLY_DAY_LIMIT','BOTH','DISABLED') NOT NULL DEFAULT 'ONLY_SAME_MONTH' COMMENT 'Si es ONLY_SAME_MONTH puede facturar siempre y cuando sea dentro del mismo mes de la facturacion.\r\nDAY_LIMIT solo si es antes de que pasen la cantidad de dias especificados despues de la compra.\r\n\r\nBOTH para facturar deben de cumplirse las dos condiciones debe ser dentro del mismo mes y ademas debe de ser dentro del limite de dias.',
  `business_name` varchar(100) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `client_user_id` int(11) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `default_billing_data_id` int(11) DEFAULT NULL,
  `default_claveprodserv` varchar(8) DEFAULT NULL,
  `default_currency_id` varchar(3) NOT NULL DEFAULT 'MXN',
  `default_sat_item_name` varchar(60) NOT NULL DEFAULT '',
  `default_sat_serie` varchar(24) NOT NULL DEFAULT 'A',
  `electronic_transfer_percent_fee` decimal(10,0) NOT NULL DEFAULT 0,
  `exchange_rate` decimal(10,2) NOT NULL DEFAULT 20.00,
  `image_id` int(11) DEFAULT NULL,
  `lat` decimal(15,10) DEFAULT NULL,
  `lng` decimal(15,10) DEFAULT NULL,
  `main_pc_ip` varchar(20) DEFAULT NULL,
  `max_cash_amount` decimal(20,7) NOT NULL DEFAULT 0.0000000,
  `modo_facturacion` enum('DESGLOSADA','COMPACTA') NOT NULL DEFAULT 'DESGLOSADA',
  `name` varchar(50) NOT NULL DEFAULT 'Mi Tienda',
  `offline_search_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `paypal_email` text DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `pos_category_preferences` enum('DEFAULT_BY_PRODUCT','HIDE_BY_DEFAULT','SHOW_BY_DEFAULT') NOT NULL DEFAULT 'DEFAULT_BY_PRODUCT',
  `price_list_id` int(11) DEFAULT NULL,
  `print_receipt_copies` int(11) NOT NULL DEFAULT 1,
  `print_receipt` int(11) DEFAULT NULL,
  `printer_ticket_config` text DEFAULT NULL,
  `production_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `qr_size` enum('PERCENT_25','PERCENT_50','PERCENT_75','PERCENT_100') NOT NULL DEFAULT 'PERCENT_100',
  `print_delay` int(11) NOT NULL DEFAULT 0,
  `print_mode` enum('REDIRECT','NEW_WINDOW','POPUP') NOT NULL DEFAULT 'NEW_WINDOW',
  `rfc` varchar(20) DEFAULT NULL,
  `sales_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `show_facturacion_qr` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `state` varchar(40) DEFAULT NULL,
  `status` enum('ACTIVE','DISABLED') NOT NULL DEFAULT 'ACTIVE',
  `suggested_tip` int(11) NOT NULL DEFAULT 0,
  `tax_percent` decimal(5,2) NOT NULL DEFAULT 16.00 COMMENT 'Debe ser un valor entre 0 y 100',
  `ticket_footer_text` text DEFAULT NULL,
  `ticket_image_id` int(11) DEFAULT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `zipcode` varchar(10) DEFAULT NULL,
  `ticket_address_display` enum('SUCURSAL','DIRECCION_FISCAL') NOT NULL DEFAULT 'SUCURSAL' COMMENT 'Define qué dirección se muestra en el ticket: la de la sucursal o la fiscal',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `image_id` (`image_id`),
  KEY `client_id` (`client_user_id`),
  KEY `store_ibfk_3` (`default_billing_data_id`),
  KEY `store_ibfk_4` (`default_currency_id`),
  CONSTRAINT `store_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `store_ibfk_3` FOREIGN KEY (`default_billing_data_id`) REFERENCES `billing_data` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `store_ibfk_4` FOREIGN KEY (`default_currency_id`) REFERENCES `currency` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `store_bank_account`
--

DROP TABLE IF EXISTS `store_bank_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_bank_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_account_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `default_transaction_type` enum('CASH','CREDIT_CARD','DEBIT_CARD','CHECK','COUPON','TRANSFER','DISCOUNT','RETURN_DISCOUNT','PAYPAL') DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `store_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `bank_account_id` (`bank_account_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `store_bank_account_ibfk_1` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_account` (`id`),
  CONSTRAINT `store_bank_account_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `store_sale_report`
--

DROP TABLE IF EXISTS `store_sale_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_sale_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount_description` text NOT NULL,
  `ares_order_ids` text NOT NULL,
  `average_order_amount` decimal(10,3) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date` date DEFAULT NULL,
  `discounts` int(11) NOT NULL,
  `end_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `expense_payments` int(11) NOT NULL,
  `income_payments` int(11) NOT NULL,
  `localtime_end` datetime NOT NULL,
  `localtime_start` datetime NOT NULL,
  `order_count` int(11) NOT NULL,
  `order_ids` text NOT NULL,
  `start_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `store_consecutive` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `total_sales` int(11) NOT NULL,
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `table`
--

DROP TABLE IF EXISTS `table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attended_by_user_id` int(11) DEFAULT NULL,
  `capacity` int(11) NOT NULL DEFAULT 2,
  `clean_status` enum('CLEAN','NEED_CLEANING') NOT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `is_dirty` enum('NO','YES') NOT NULL DEFAULT 'NO',
  `name` varchar(40) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `ordered_status` enum('PENDING','ORDERED') NOT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL,
  `store_id` int(11) NOT NULL,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `table_ibfk_1` (`store_id`),
  KEY `table_ibfk_2` (`attended_by_user_id`),
  CONSTRAINT `table_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `table_ibfk_2` FOREIGN KEY (`attended_by_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `counter` int(11) NOT NULL DEFAULT 0 COMMENT 'Por ejemplo si es una tarea de produccion y se necesita para saber cuanto se lleva producido, este seria para eso',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` text NOT NULL,
  `in_charge_user_id` int(11) DEFAULT NULL,
  `is_done` tinyint(1) NOT NULL DEFAULT 0,
  `item_id` int(11) DEFAULT NULL,
  `main_task_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `over_extend_qty` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'Cuanto se puede producir de produccion extra EJ, \r\n\r\nSi pidieron 100 articulos pero el usuario hizo 150',
  `parent_task_id` int(11) DEFAULT NULL,
  `process_id` int(11) NOT NULL,
  `process_status_id` int(11) DEFAULT NULL,
  `production_area_id` int(11) NOT NULL,
  `qty` int(10) unsigned NOT NULL COMMENT 'Cuantos se requiere normalmente va ha ser uno por articulo solicitado, si se requiren 1000',
  `requisition_id` int(11) DEFAULT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `process_id` (`process_id`),
  KEY `item_id` (`item_id`),
  KEY `in_charge_user_id` (`in_charge_user_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `task_ibfk_3` FOREIGN KEY (`in_charge_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_ibfk_4` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task_comment`
--

DROP TABLE IF EXISTS `task_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `task_id` int(11) NOT NULL,
  `type` enum('SYSTEM','USER') NOT NULL DEFAULT 'SYSTEM',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_id` (`task_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `task_comment_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `unidad_medida_sat`
--

DROP TABLE IF EXISTS `unidad_medida_sat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad_medida_sat` (
  `id` varchar(10) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birthday` date DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `created_by_store_id` int(11) DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `creation_store_id` int(11) DEFAULT NULL COMMENT 'Tienda en la que el usuario fue creado',
  `credit_days` int(11) NOT NULL DEFAULT 0,
  `credit_limit` decimal(10,2) NOT NULL DEFAULT 0.00,
  `default_billing_address_id` int(11) DEFAULT NULL,
  `default_shipping_address_id` int(11) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  `job_address` text DEFAULT NULL,
  `job_name` varchar(255) DEFAULT NULL,
  `job_phone` varchar(30) DEFAULT NULL,
  `lat` decimal(9,6) DEFAULT NULL,
  `lng` decimal(9,6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` text DEFAULT NULL,
  `payment_address_id` int(11) DEFAULT NULL,
  `payment_option` enum('ADDRESS','TRANSFER','STORE') NOT NULL DEFAULT 'STORE',
  `phone` varchar(30) DEFAULT NULL,
  `platform_client_id` int(11) DEFAULT NULL,
  `points` decimal(20,10) NOT NULL DEFAULT 0.0000000000,
  `preferred_store_id` int(11) DEFAULT NULL,
  `price_type_id` int(11) NOT NULL DEFAULT 1,
  `production_area_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `store_id` int(11) DEFAULT NULL,
  `type` enum('CLIENT','USER') NOT NULL DEFAULT 'CLIENT',
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `username` varchar(255) DEFAULT NULL,
  `workshift_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `platform_client_id` (`platform_client_id`),
  KEY `image_id` (`image_id`),
  KEY `price_type_id` (`price_type_id`),
  KEY `store_id` (`store_id`),
  KEY `production_area_id` (`production_area_id`) USING BTREE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`),
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`price_type_id`) REFERENCES `price_type` (`id`),
  CONSTRAINT `user_ibfk_4` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_attachment`
--

DROP TABLE IF EXISTS `user_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) NOT NULL,
  `attachment_id` int(11) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('ACTIVE','DELETED') NOT NULL DEFAULT 'ACTIVE',
  `updated_by_user_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user__attachment_ibfk_1` (`attachment_id`),
  CONSTRAINT `user__attachment_ibfk_1` FOREIGN KEY (`attachment_id`) REFERENCES `attachment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_extra_fields`
--

DROP TABLE IF EXISTS `user_extra_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_extra_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `json_fields` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json_fields`)),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_permission` (
  `add_asistance` tinyint(1) NOT NULL DEFAULT 0,
  `add_bills` tinyint(1) NOT NULL DEFAULT 0,
  `add_commandas` tinyint(1) NOT NULL DEFAULT 0,
  `add_credit_limit` tinyint(1) NOT NULL DEFAULT 0,
  `add_credit_sales` tinyint(1) NOT NULL DEFAULT 0,
  `add_form` tinyint(1) NOT NULL DEFAULT 0,
  `add_items` tinyint(1) NOT NULL DEFAULT 0,
  `add_item_points` tinyint(1) NOT NULL DEFAULT 0,
  `add_marbetes` tinyint(1) NOT NULL DEFAULT 0,
  `add_merma` tinyint(1) NOT NULL DEFAULT 0,
  `add_offers` tinyint(1) NOT NULL DEFAULT 0,
  `add_payments` tinyint(1) NOT NULL DEFAULT 0,
  `add_payroll` tinyint(1) NOT NULL DEFAULT 0,
  `add_providers` tinyint(1) NOT NULL DEFAULT 0,
  `add_purchases` tinyint(1) NOT NULL DEFAULT 0,
  `add_requisition` tinyint(1) NOT NULL DEFAULT 0,
  `add_stock` tinyint(1) NOT NULL DEFAULT 0,
  `add_user` tinyint(1) NOT NULL DEFAULT 0,
  `advanced_order_search` tinyint(1) NOT NULL DEFAULT 0,
  `approve_bill_payments` tinyint(1) NOT NULL DEFAULT 0,
  `approve_requisition` tinyint(1) NOT NULL DEFAULT 0,
  `asign_marbetes` tinyint(1) NOT NULL DEFAULT 0,
  `caldos` tinyint(1) NOT NULL DEFAULT 0,
  `cancel_closed_orders` tinyint(1) NOT NULL DEFAULT 0,
  `cancel_ordered_item` tinyint(1) NOT NULL DEFAULT 0,
  `change_client_prices` tinyint(1) NOT NULL DEFAULT 0,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency_rates` tinyint(1) NOT NULL DEFAULT 0,
  `discounts` tinyint(1) NOT NULL DEFAULT 0,
  `edit_billing_data` tinyint(1) NOT NULL DEFAULT 0,
  `fullfill_orders` tinyint(1) NOT NULL DEFAULT 0,
  `global_add_stock` tinyint(1) NOT NULL DEFAULT 0,
  `global_bills` tinyint(1) NOT NULL DEFAULT 0,
  `global_order_delivery` tinyint(1) NOT NULL DEFAULT 0,
  `global_pos` tinyint(1) NOT NULL DEFAULT 0,
  `global_prices` tinyint(1) NOT NULL DEFAULT 0,
  `global_purchases` tinyint(1) NOT NULL DEFAULT 0,
  `global_receive_shipping` tinyint(1) NOT NULL DEFAULT 0,
  `reiniciar_facturacion` tinyint(1) NOT NULL DEFAULT 0,
  `factura_global` tinyint(1) NOT NULL DEFAULT 0,
  `facturar_orden` tinyint(1) NOT NULL DEFAULT 0,
  `cancelar_factura` tinyint(1) NOT NULL DEFAULT 0,
  `global_requisition` tinyint(1) NOT NULL DEFAULT 0,
  `global_send_shipping` tinyint(1) NOT NULL DEFAULT 0,
  `global_stats` tinyint(1) NOT NULL DEFAULT 0,
  `hades` tinyint(1) NOT NULL DEFAULT 0,
  `is_provider` tinyint(1) NOT NULL DEFAULT 0,
  `open_cashier_box_anytime` tinyint(1) NOT NULL DEFAULT 1,
  `order_delivery` tinyint(1) NOT NULL DEFAULT 0,
  `pay_bills` tinyint(1) NOT NULL DEFAULT 0,
  `pos` tinyint(1) NOT NULL DEFAULT 0,
  `preferences` tinyint(1) NOT NULL DEFAULT 0,
  `price_types` tinyint(1) NOT NULL DEFAULT 0,
  `print_pre_receipt` tinyint(1) NOT NULL DEFAULT 0,
  `production` tinyint(1) NOT NULL DEFAULT 0,
  `purchases` tinyint(1) NOT NULL DEFAULT 0,
  `pv_returns` tinyint(1) NOT NULL DEFAULT 0,
  `quotes` tinyint(1) NOT NULL DEFAULT 0,
  `receive_shipping` tinyint(1) NOT NULL DEFAULT 0,
  `reports` tinyint(1) NOT NULL DEFAULT 0,
  `return_money` tinyint(1) NOT NULL DEFAULT 0,
  `add_roles` tinyint(4) NOT NULL DEFAULT 0,
  `send_shipping` tinyint(1) NOT NULL DEFAULT 0,
  `shipping_receive_type` enum('VALIDATE','CAPTURE_QTY') NOT NULL DEFAULT 'CAPTURE_QTY',
  `show_tables` tinyint(1) NOT NULL DEFAULT 0,
  `stocktake` tinyint(1) NOT NULL DEFAULT 0,
  `store_prices` tinyint(1) NOT NULL DEFAULT 0,
  `updated_by_user_id` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  `view_asistance` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Ver asistencia check in check out',
  `view_commandas` tinyint(1) NOT NULL DEFAULT 0,
  `view_payroll` tinyint(1) NOT NULL DEFAULT 0,
  `view_responses` tinyint(1) NOT NULL DEFAULT 0,
  `view_stock_alerts` tinyint(1) NOT NULL DEFAULT 0,
  `view_stock` tinyint(1) NOT NULL DEFAULT 0,
  `view_reservations` tinyint(1) NOT NULL DEFAULT 0,
  `delete_draft_items` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_permission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `withdrawal`
--

DROP TABLE IF EXISTS `withdrawal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(20,5) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `currency` varchar(3) NOT NULL,
  `device_time` datetime NOT NULL,
  `note` text NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `withdrawal_ibfk_1` (`created_by_user_id`),
  CONSTRAINT `withdrawal_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `work_log`
--

DROP TABLE IF EXISTS `work_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `break_seconds` int(11) NOT NULL DEFAULT 0 COMMENT 'break time in seconds',
  `date` date NOT NULL,
  `disciplinary_actions` text DEFAULT NULL,
  `docking_pay` decimal(10,0) NOT NULL DEFAULT 0,
  `end_timestamp` timestamp NULL DEFAULT NULL,
  `extra_hours` decimal(5,2) unsigned NOT NULL DEFAULT 0.00,
  `hours` decimal(10,2) NOT NULL COMMENT 'What the manager write down',
  `in_out_count` smallint(5) unsigned NOT NULL,
  `json_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json_values`)),
  `on_time` enum('YES','NO') NOT NULL,
  `seconds_log` int(11) NOT NULL COMMENT 'Registered by the system',
  `start_timestamp` timestamp NULL DEFAULT NULL,
  `total_payment` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'Es el pago total por el dia, puede ser lo calculado automaticamente o lo introducido por el usuario',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `work_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `work_log_rules`
--

DROP TABLE IF EXISTS `work_log_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_log_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `json_rules` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json_rules`)),
  `store_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workshift`
--

DROP TABLE IF EXISTS `workshift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `workshift` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `duration` time NOT NULL,
  `name` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-07-17 10:59:13
