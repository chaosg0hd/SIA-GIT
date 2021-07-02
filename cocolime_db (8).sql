-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2021 at 07:59 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cocolime_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance_tb`
--

CREATE TABLE `attendance_tb` (
  `attendance_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `attendance_date` date NOT NULL,
  `attendance_hours` int(11) NOT NULL DEFAULT 0,
  `attendance_remarks` varchar(255) NOT NULL,
  `attendance_is_calc` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance_tb`
--

INSERT INTO `attendance_tb` (`attendance_id`, `emp_id`, `attendance_date`, `attendance_hours`, `attendance_remarks`, `attendance_is_calc`) VALUES
(1, 1, '2021-06-04', 8, '', 0),
(2, 1, '2021-06-05', 7, 'late', 0),
(3, 1, '2021-06-09', 8, '', 0),
(4, 1, '2021-06-10', 8, '', 0),
(5, 1, '2021-06-11', 0, 'absent', 0),
(6, 1, '2021-06-12', 0, 'absent', 0),
(7, 1, '2021-06-13', 10, 'overtime', 0);

-- --------------------------------------------------------

--
-- Table structure for table `delta_types`
--

CREATE TABLE `delta_types` (
  `delta_id` int(11) NOT NULL,
  `delta_name` varchar(255) NOT NULL,
  `delta_amount` double NOT NULL,
  `delta_arguments` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employees_tb`
--

CREATE TABLE `employees_tb` (
  `emp_id` int(11) NOT NULL,
  `emp_name` varchar(255) NOT NULL,
  `emp_position` varchar(255) NOT NULL,
  `emp_start_date` datetime NOT NULL,
  `emp_status` varchar(255) NOT NULL,
  `emp_last_mod_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `emp_last_mod_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees_tb`
--

INSERT INTO `employees_tb` (`emp_id`, `emp_name`, `emp_position`, `emp_start_date`, `emp_status`, `emp_last_mod_date`, `emp_last_mod_by`) VALUES
(1, 'Benedict Cumberbatch', 'BossiSsss', '2021-06-01 00:00:00', 'HirS', '2021-06-29 08:23:48', ''),
(2, 'Charlessss', 'Head Bjsss', '2021-06-09 05:18:51', 'Resigneded', '2021-06-28 08:27:52', ''),
(3, 'Jivans', 'Mainsss', '2021-06-09 05:18:51', 'Firedd', '2021-06-28 08:27:56', ''),
(4, 'Cyans', '2ndSSS', '2021-08-09 05:18:51', 'On-probationdwdwd', '2021-06-28 08:23:38', ''),
(6, 'tertertellini', 'tretert', '2021-06-09 09:11:43', 'tertetet', '2021-06-28 08:12:39', ''),
(7, 'gwegwegeg', 'gewgwegwgweg', '2021-06-09 09:12:21', 'gewgwegwg', '2021-06-13 20:38:58', ''),
(8, 'gewgwegw', 'gewgwegwgwgwg', '2021-06-09 09:12:21', 'gewgwg', '2021-06-13 20:38:58', ''),
(9, 'gewgwgwg', 'gewgewgwegweggweg', '2021-06-09 09:12:21', 'ewgwegwe', '2021-06-13 20:38:58', ''),
(11, 'r23r23r2r', 'r3r23r2r', '2021-06-14 00:00:00', 'r23r2r3r2', '2021-06-14 05:12:50', ''),
(12, 'rwerwrrrr', 'rrrrrrr', '2021-06-14 00:00:00', 'rrrrr', '2021-06-14 05:33:23', ''),
(13, 'rrrrrrr', 'rrrrrrrrrrrrrrrrr', '2021-06-14 00:00:00', 'rrrrrrrrrrrrrr', '2021-06-14 05:33:53', ''),
(14, 'trtrtrt', 'trtrtrtr', '2021-06-15 00:00:00', 'trtrtrtrtr', '2021-06-14 05:40:05', ''),
(15, 'rererrere', 'rerererer', '2021-06-17 00:00:00', 'rerererer', '2021-06-14 05:39:54', '');

-- --------------------------------------------------------

--
-- Table structure for table `outgoing_tb`
--

CREATE TABLE `outgoing_tb` (
  `outgoing_id` int(11) NOT NULL,
  `outgoing_name` int(11) NOT NULL,
  `outgoing_amount` double NOT NULL,
  `outgoing_recipient` varchar(255) NOT NULL,
  `outgoing_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_tb`
--

CREATE TABLE `payroll_tb` (
  `payroll_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `payroll_start` date NOT NULL,
  `payroll_end` date NOT NULL,
  `payroll_total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `salary_delta_tb`
--

CREATE TABLE `salary_delta_tb` (
  `delta_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `delta_type` varchar(50) NOT NULL,
  `delta_name` varchar(50) NOT NULL,
  `delta_amount` double NOT NULL,
  `delta_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salary_delta_tb`
--

INSERT INTO `salary_delta_tb` (`delta_id`, `emp_id`, `delta_type`, `delta_name`, `delta_amount`, `delta_date`) VALUES
(1, 1, '', 'ONETIME BONUS', 1000, '2021-06-08 21:22:54'),
(2, 1, '', 'COMPENSASTION', 500, '2021-06-08 21:22:54'),
(3, 1, '', 'ONETIME BONUS', 1000, '2021-06-08 21:22:57'),
(4, 1, '', 'COMPENSASTION', 500, '2021-06-08 21:22:57');

-- --------------------------------------------------------

--
-- Table structure for table `salary_tb`
--

CREATE TABLE `salary_tb` (
  `salary_id` int(11) NOT NULL,
  `emp_id` varchar(11) NOT NULL,
  `wage_id` varchar(11) NOT NULL,
  `salary_amount` double NOT NULL,
  `salary_date` date NOT NULL,
  `salary_last_mod_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_tb`
--

CREATE TABLE `user_tb` (
  `user_id` varchar(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_tb`
--

INSERT INTO `user_tb` (`user_id`, `user_name`, `user_password`, `user_date`) VALUES
('', 'Password', '$2y$10$MGE4NDQ4YzRlNWI0NDZmM.NE8s6ILMcYzYDZuDaaiKbHm5CS0Aojy', '0000-00-00'),
('1', 'Admin', '$2y$10$Mzk1OWYyN2YwNDU1YzRmMO9m0e4YpTCFGLwRdk0WkN0ZeA7AZULV2', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `wage_tb`
--

CREATE TABLE `wage_tb` (
  `wage_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `wage_rate` double NOT NULL,
  `wage_args` varchar(255) NOT NULL,
  `wage_last_mod_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wage_tb`
--

INSERT INTO `wage_tb` (`wage_id`, `emp_id`, `wage_rate`, `wage_args`, `wage_last_mod_date`) VALUES
(1, 1, 100, '', '2021-06-13 20:42:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance_tb`
--
ALTER TABLE `attendance_tb`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `delta_types`
--
ALTER TABLE `delta_types`
  ADD PRIMARY KEY (`delta_id`);

--
-- Indexes for table `employees_tb`
--
ALTER TABLE `employees_tb`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `outgoing_tb`
--
ALTER TABLE `outgoing_tb`
  ADD PRIMARY KEY (`outgoing_id`);

--
-- Indexes for table `payroll_tb`
--
ALTER TABLE `payroll_tb`
  ADD PRIMARY KEY (`payroll_id`);

--
-- Indexes for table `salary_delta_tb`
--
ALTER TABLE `salary_delta_tb`
  ADD PRIMARY KEY (`delta_id`);

--
-- Indexes for table `salary_tb`
--
ALTER TABLE `salary_tb`
  ADD PRIMARY KEY (`salary_id`);

--
-- Indexes for table `user_tb`
--
ALTER TABLE `user_tb`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `wage_tb`
--
ALTER TABLE `wage_tb`
  ADD PRIMARY KEY (`wage_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance_tb`
--
ALTER TABLE `attendance_tb`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `delta_types`
--
ALTER TABLE `delta_types`
  MODIFY `delta_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees_tb`
--
ALTER TABLE `employees_tb`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `outgoing_tb`
--
ALTER TABLE `outgoing_tb`
  MODIFY `outgoing_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_tb`
--
ALTER TABLE `payroll_tb`
  MODIFY `payroll_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salary_delta_tb`
--
ALTER TABLE `salary_delta_tb`
  MODIFY `delta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `salary_tb`
--
ALTER TABLE `salary_tb`
  MODIFY `salary_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wage_tb`
--
ALTER TABLE `wage_tb`
  MODIFY `wage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
