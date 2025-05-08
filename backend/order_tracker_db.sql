
CREATE TABLE `users` (
    `user_id` int  NOT NULL ,
    `user_name` varchar(50)  NOT NULL ,
    `user_password` varchar(255)  NOT NULL ,
    `user_email` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `user_id`
    )
);

CREATE TABLE `products` (
    `pro_id` int  NOT NULL ,
    `pro_name` varchar(255)  NOT NULL ,
    `pro_price` varchar(255)  NOT NULL ,
    `pro_sku` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `pro_id`
    )
);

CREATE TABLE `customer` (
    `cus_id` int  NOT NULL ,
    `cus_name` varchar(50)  NOT NULL ,
    `cus_email` varchar(255)  NOT NULL ,
    `cus_password` varchar(255)  NOT NULL ,
    `cus_number` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `cus_id`
    )
);

CREATE TABLE `orders` (
    `order_id` int  NOT NULL ,
    `cus_id` int  NOT NULL ,
    `user_id` int  NOT NULL ,
    `order_time` datetime  NOT NULL ,
    `order_status` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `order_id`
    )
);

CREATE TABLE `order_items` (
    `order_id` int  NOT NULL ,
    `pro_id` int  NOT NULL ,
    `quantity` int  NOT NULL ,
    `price` decimal  NOT NULL 
);

ALTER TABLE `orders` ADD CONSTRAINT `fk_orders_cus_id` FOREIGN KEY(`cus_id`)
REFERENCES `customer` (`cus_id`);

ALTER TABLE `orders` ADD CONSTRAINT `fk_orders_user_id` FOREIGN KEY(`user_id`)
REFERENCES `users` (`user_id`);

ALTER TABLE `order_items` ADD CONSTRAINT `fk_order_items_order_id` FOREIGN KEY(`order_id`)
REFERENCES `orders` (`order_id`);

ALTER TABLE `order_items` ADD CONSTRAINT `fk_order_items_pro_id` FOREIGN KEY(`pro_id`)
REFERENCES `products` (`pro_id`);

