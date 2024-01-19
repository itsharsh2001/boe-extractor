-- CREATE TABLE `users_tbl` (
--   `id` varchar(64) NOT NULL,
--   `name` varchar(256) NOT NULL,
--   `email` varchar(64) NOT NULL,
--   `password` varchar(256) NOT NULL,
--   `role` varchar(64) NOT NULL DEFAULT "Business User",
--   `active` tinyint(1) DEFAULT 1,
--   `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   `modified_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `UK_email` (`email`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `passwd` varchar(256) NOT NULL,
  `role` varchar(64) NOT NULL DEFAULT "Business User",
  `active` tinyint(1) DEFAULT 1,
  `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `modified_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
 
CREATE TABLE `roles_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(64) NOT NULL,
  `module_id` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `modified_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;