-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2021 at 04:47 PM
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
  `emp_id` varchar(50) NOT NULL,
  `attendance_date` date NOT NULL,
  `attendance_hours` int(11) NOT NULL DEFAULT 0,
  `attendance_remarks` varchar(255) NOT NULL,
  `attendance_is_calc` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance_tb`
--

INSERT INTO `attendance_tb` (`attendance_id`, `emp_id`, `attendance_date`, `attendance_hours`, `attendance_remarks`, `attendance_is_calc`) VALUES
(1, 'XX-01', '2021-06-04', 8, '', 0),
(2, 'XX-01', '2021-06-05', 7, 'late', 0),
(3, 'XX-01', '2021-06-09', 8, '', 0),
(4, 'XX-01', '2021-06-10', 8, '', 0),
(5, 'XX-01', '2021-06-11', 0, 'absent', 0),
(6, 'XX-01', '2021-06-12', 0, 'absent', 0),
(7, 'XX-01', '2021-06-13', 10, 'overtime', 0);

-- --------------------------------------------------------

--
-- Table structure for table `dailytimerecord_tb`
--

CREATE TABLE `dailytimerecord_tb` (
  `dtr_no` int(11) NOT NULL,
  `dtr_id` varchar(50) NOT NULL,
  `emp_id` varchar(50) NOT NULL,
  `dtr_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `dtr_month_year` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dailytimerecord_tb`
--

INSERT INTO `dailytimerecord_tb` (`dtr_no`, `dtr_id`, `emp_id`, `dtr_content`, `dtr_month_year`) VALUES
(81, 'XX-01_july_2021', 'XX-01', '[{\"date\":\"2021-07-16\",\"am_time_in\":\"2021-07-16\",\"am_time_out\":\"2021-07-16\",\"pm_time_in\":\"2021-07-16\",\"pm_time_out\":\"2021-07-16\",\"ot_time_in\":\"2021-07-16\",\"ot_time_out\":\"2021-07-16\"},{\"date\":\"2021-07-16\",\"am_time_in\":\"2021-07-16\",\"am_time_out\":\"2021-07-16\",\"pm_time_in\":\"2021-07-16\",\"pm_time_out\":\"2021-07-16\",\"ot_time_in\":\"2021-07-16\",\"ot_time_out\":\"2021-07-16\"}]', '');

-- --------------------------------------------------------

--
-- Table structure for table `deductibles_tb`
--

CREATE TABLE `deductibles_tb` (
  `ded_id` varchar(50) NOT NULL,
  `ded_name` varchar(50) NOT NULL,
  `ded_args` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deductibles_tb`
--

INSERT INTO `deductibles_tb` (`ded_id`, `ded_name`, `ded_args`) VALUES
('ded_1', 'Cash Advance', ''),
('ded_2', 'Late Penalty', '');

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
  `emp_no` int(11) NOT NULL,
  `emp_id` varchar(11) NOT NULL,
  `emp_firstname` varchar(50) NOT NULL,
  `emp_lastname` varchar(50) NOT NULL,
  `emp_address` varchar(255) NOT NULL,
  `emp_datebirth` date NOT NULL,
  `emp_contact` varchar(50) NOT NULL,
  `emp_time_in` time NOT NULL,
  `emp_time_out` time NOT NULL,
  `emp_department` varchar(100) NOT NULL,
  `emp_rate` double NOT NULL,
  `emp_is_archived` tinyint(1) NOT NULL,
  `emp_sex` varchar(25) NOT NULL,
  `emp_position` varchar(255) NOT NULL,
  `emp_start_date` datetime NOT NULL,
  `emp_status` varchar(50) NOT NULL,
  `emp_last_mod_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `emp_last_mod_by` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees_tb`
--

INSERT INTO `employees_tb` (`emp_no`, `emp_id`, `emp_firstname`, `emp_lastname`, `emp_address`, `emp_datebirth`, `emp_contact`, `emp_time_in`, `emp_time_out`, `emp_department`, `emp_rate`, `emp_is_archived`, `emp_sex`, `emp_position`, `emp_start_date`, `emp_status`, `emp_last_mod_date`, `emp_last_mod_by`) VALUES
(1, 'XX-01', 'Benedict ', 'Ng', 'cdcdcdcdcddc', '0000-00-00', 'fefefefefeff', '23:00:00', '14:00:00', 'GERGRGR', 0, 1, 'M', 'BossiSsss', '2021-06-01 00:00:00', 'Ok lang', '2021-07-15 04:27:08', 'dsdssdsddsd'),
(2, 'XX-02', 'Charles', 'Umbina', 'cdcdcdc', '0000-00-00', '43423532523', '00:00:00', '00:00:00', 'EHERHEH', 0, 0, 'F', 'Head Bjsss', '0000-00-00 00:00:00', 'guguugiiguguigu', '2021-07-15 04:27:32', ''),
(3, 'XX-03', 'Bob', 'uigguigiu', 'fefefefe', '0000-00-00', '5235235235', '00:00:00', '00:00:00', 'trtrtrtrt', 0, 0, 'M', 'Mainsss', '2021-06-09 05:18:51', 'ugiuiggguiiguiguguigiu', '2021-07-15 04:27:20', ''),
(4, 'XX-04', 'Steveia', 'gui', 'fdfdfdf', '0000-00-00', '5325252352', '00:00:00', '00:00:00', 'fefefef', 0, 0, 'M', '2ndSSS', '2021-08-09 05:18:51', 'guigiuguigiuguigigiu', '2021-07-15 04:27:24', ''),
(5, 'XX-05', 'giiuguiguiguiiu', 'igugui', 'fefefefffef', '0000-00-00', 'dededeede', '00:00:00', '00:00:00', 'HEEFFSDF', 0, 0, 'M', 'tretert', '2021-06-09 09:11:43', 'guiguiiguiiguguiuigiuu', '2021-07-08 14:20:38', ''),
(7, 'XX-06', 'giugiuguiguigui', 'gui', 'fefefeffefewfwefwef', '0000-00-00', '235252352', '00:00:00', '00:00:00', 'FSFSDFFF', 0, 0, 'M', 'gewgwegwgwgwg', '2021-06-09 09:12:21', 'ugiugigiugiugiuuiiuui', '2021-07-15 03:53:24', ''),
(8, 'XX-07', 'uigguiguiguguigiu', 'gui', 'fwfwefewfwfew', '0000-00-00', '5235252', '00:00:00', '00:00:00', 'FSDFSDFSFSDF', 0, 0, 'M', 'gewgewgwegweggweg', '2021-06-09 09:12:21', 'iugiugiuguiguiuiuiuiiuiu', '2021-07-08 07:03:46', ''),
(9, 'XX-08', 'giugiugi', 'gui', 'Studio 103 The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG', '0000-00-00', '2525235', '00:00:00', '00:00:00', 'DWEFWEFWEF', 0, 0, 'M', 'r3r23r2r', '2021-06-14 00:00:00', 'guuigiuguiguigiugiugui', '2021-07-08 07:03:46', ''),
(10, 'XX-09', 'guigu', 'gui', 'Studio 103 The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG', '0000-00-00', '532525', '00:00:00', '00:00:00', 'FWEFWEFWEFEWF', 0, 0, 'F', 'rrrrrrr', '2021-06-14 00:00:00', 'guiguiguiguiguigiugiu', '2021-07-08 07:03:47', ''),
(11, 'XX-10', 'guiguii', 'gui', 'Studio 103 The Business Centre 61 Wellfield Road Roath Cardiff CF24 3DG', '0000-00-00', '523525235', '00:00:00', '00:00:00', 'FWEFWFWFF', 0, 0, 'M', 'rrrrrrrrrrrrrrrrr', '2021-06-14 00:00:00', 'uigiiguguiuigigigigigugiuiguguiigu', '2021-07-08 07:03:47', ''),
(12, 'XX-11', 'trtrtrt', 'Bob', 'dedwdwdd', '0000-00-00', 'fefef', '00:00:00', '00:00:00', '', 0, 0, 'M', 'trtrtrtr', '2021-06-15 00:00:00', 'trtrtrtrtr', '2021-07-15 03:55:22', ''),
(13, 'XX-12', 'rererrere', 'guarerea', 'dwddwdwd', '0000-00-00', '', '00:00:00', '00:00:00', '', 0, 0, 'M', 'rerererer', '2021-06-17 00:00:00', 'rerererer', '2021-07-15 03:52:28', ''),
(26, 'XX-17', 'Neiwlinn', 'Pineda', 'fefef', '0000-00-00', '', '00:00:00', '00:00:00', '', 0, 0, '', '', '0000-00-00 00:00:00', 'efefef', '2021-07-15 03:57:03', ''),
(27, 'XX-18', '', '', '', '0000-00-00', '', '00:00:00', '00:00:00', '', 0, 0, '', '', '0000-00-00 00:00:00', '', '2021-07-15 03:55:10', ''),
(28, 'XX-15', '', '', '', '0000-00-00', '', '00:00:00', '00:00:00', '', 0, 0, '', '', '0000-00-00 00:00:00', '', '2021-07-15 04:25:51', '');

-- --------------------------------------------------------

--
-- Table structure for table `json_tb`
--

CREATE TABLE `json_tb` (
  `json_no` int(11) NOT NULL,
  `json_id` varchar(50) NOT NULL,
  `emp_id` varchar(50) NOT NULL,
  `json_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`json_content`)),
  `json_date_made` date NOT NULL,
  `json_made_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for table `dailytimerecord_tb`
--
ALTER TABLE `dailytimerecord_tb`
  ADD PRIMARY KEY (`dtr_no`);

--
-- Indexes for table `deductibles_tb`
--
ALTER TABLE `deductibles_tb`
  ADD PRIMARY KEY (`ded_id`);

--
-- Indexes for table `delta_types`
--
ALTER TABLE `delta_types`
  ADD PRIMARY KEY (`delta_id`);

--
-- Indexes for table `employees_tb`
--
ALTER TABLE `employees_tb`
  ADD PRIMARY KEY (`emp_no`);

--
-- Indexes for table `json_tb`
--
ALTER TABLE `json_tb`
  ADD PRIMARY KEY (`json_no`);

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
-- AUTO_INCREMENT for table `dailytimerecord_tb`
--
ALTER TABLE `dailytimerecord_tb`
  MODIFY `dtr_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `delta_types`
--
ALTER TABLE `delta_types`
  MODIFY `delta_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees_tb`
--
ALTER TABLE `employees_tb`
  MODIFY `emp_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `json_tb`
--
ALTER TABLE `json_tb`
  MODIFY `json_no` int(11) NOT NULL AUTO_INCREMENT;

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
