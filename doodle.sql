-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2020 at 08:19 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doodle`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `specifications` text NOT NULL,
  `status` int(11) NOT NULL COMMENT '1 - approved, 2 - waiting for approve, 3 - rejected',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `productName`, `price`, `specifications`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'test', '1520.00', 'alram', 2, '2020-08-06 08:50:20', '2020-08-06 08:50:20'),
(2, 'Fire hiostral', '2500.00', 'safety measurement', 1, '2020-08-06 08:51:23', '2020-08-06 08:51:23'),
(3, 'Fire hydrant', '2500.00', 'safety measurement', 1, '2020-08-06 08:52:08', '2020-08-06 08:52:08'),
(4, 'Fire alarm', '2500.00', 'safety measurement', 1, '2020-08-06 08:54:56', '2020-08-06 08:54:56'),
(5, 'Fire', '1200.00', 'safety measurement', 1, '2020-08-06 09:19:28', '2020-08-06 09:19:28'),
(6, 'Fire gh', '3500.00', 'test', 2, '2020-08-06 19:20:11', '2020-08-06 19:20:11'),
(7, 'Fire testt', '2500.00', 'safety measurement', 2, '2020-08-06 20:23:01', '2020-08-06 20:23:01');

--
-- Triggers `product`
--
DELIMITER $$
CREATE TRIGGER `after_product_update` AFTER UPDATE ON `product` FOR EACH ROW BEGIN
    IF OLD.status <> new.status THEN
        INSERT INTO ProductChanges(productId,productName,beforePrice, afterPrice, beforeStatus, afterStatus)
        VALUES(old.id, old.productName,old.price, new.price, old.status, new.status);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `productchanges`
--

CREATE TABLE `productchanges` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `beforePrice` decimal(12,2) DEFAULT NULL,
  `afterPrice` decimal(12,2) DEFAULT NULL,
  `beforeStatus` tinyint(1) NOT NULL,
  `afterStatus` tinyint(1) NOT NULL,
  `changedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productchanges`
--

INSERT INTO `productchanges` (`id`, `productId`, `productName`, `beforePrice`, `afterPrice`, `beforeStatus`, `afterStatus`, `changedAt`) VALUES
(1, 1, 'test', '1520.00', '1520.00', 1, 2, '2020-08-06 16:49:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roletype` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `role`, `roletype`, `created_at`, `updated_at`) VALUES
(1, 'superadmin', 'ttvrkavi@gmail.com', 'superadmin', 'admin', 'superadmin', 1, '2020-08-04 22:19:31', '2020-08-04 16:49:31'),
(2, 'test', 'test@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-04 23:34:06', '2020-08-04 18:04:06'),
(4, 'test', 'test1@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-04 23:36:31', '2020-08-04 18:06:31'),
(5, 'test', 'tesqt1@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-04 23:37:40', '2020-08-04 18:07:40'),
(6, 'test', 'test2@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-04 23:38:44', '2020-08-04 18:08:44'),
(7, 'test', 'test3@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-04 23:44:49', '2020-08-04 18:14:49'),
(8, 'test', 'testi3@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-04 23:45:49', '2020-08-04 18:15:49'),
(9, 'test', 'tes66@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-04 23:46:23', '2020-08-04 18:16:23'),
(10, 'test', 'kavi@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-04 23:50:41', '2020-08-04 18:20:41'),
(11, 'test', 'kaviss@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-04 23:58:58', '2020-08-04 18:28:58'),
(12, 'test', 'kaviDD@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-05 00:05:28', '2020-08-04 18:35:28'),
(13, 'test', 'dhanvi@gmail.com', 'admin', 'admin', 'staff', 2, '2020-08-05 00:21:20', '2020-08-04 18:51:20'),
(14, 'test', 'kavibeem@gmail.com', 'staff1', 'staff1', 'staff', 2, '2020-08-05 00:32:13', '2020-08-04 19:02:13'),
(16, 'test', 'kavibeefm@gmail.com', 'staff1', 'staff1', 'staff', 2, '2020-08-05 00:32:42', '2020-08-04 19:02:42'),
(17, 'test', 'raj@gmail.com', 'staff12', 'staff12', 'staff', 2, '2020-08-05 00:34:17', '2020-08-04 19:04:17'),
(29, 'test', 'pavithra@gmail.com', 'staff12', 'staff12', 'staff', 2, '2020-08-05 01:11:16', '2020-08-04 19:41:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productchanges`
--
ALTER TABLE `productchanges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `productchanges`
--
ALTER TABLE `productchanges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
