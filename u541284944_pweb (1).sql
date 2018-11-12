-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 12, 2018 at 01:03 PM
-- Server version: 10.2.18-MariaDB
-- PHP Version: 7.1.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u541284944_pweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE `calendar` (
  `id` int(10) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `hours` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `idUser1` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `idUser2` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`id`, `date`, `description`, `hours`, `idUser1`, `idUser2`) VALUES
(1, '2018-11-19', 'Appointment with you, baby', 'lu13.0-1-2', '4', '5'),
(2, '2018-11-19', 'Second Date', 'lu13.3|lu14.0-1', '5', '4'),
(3, '2018-11-19', 'A date with a special person', 'lu14.1-2-3', '7', '5'),
(8, '2018-11-13', 'Test 2', 'ma8.0-1', '4', 'OWN'),
(10, '2018-11-22', 'asd', 'ju9.0-1-2', '4', 'Myself'),
(15, '2018-11-14', 'Test Repeat collision ', 'mi14.0-1', '4', 'Myself'),
(16, '2018-11-28', 'Test Repeat collision ', 'mi14.0-1', '4', 'Myself'),
(17, '2018-12-05', 'Test Repeat collision ', 'mi14.0-1', '4', 'Myself'),
(19, '2018-12-09', 'Test weekend', 'do11.0-1', '4', 'Myself'),
(21, '2018-11-30', 'Test tablet', 'vi8.3|vi9.0', '4', 'Myself'),
(22, '2018-11-30', 'Test tablet', 'vi13.3|vi14.0', '4', 'Myself'),
(23, '2018-11-08', '', 'ju8.0-1-2-3', '4', 'Myself'),
(24, '2018-11-08', '', 'ju9.2-3|ju10.0-1', '4', 'Myself'),
(25, '2018-11-08', '', 'ju16.2-3|ju17.0-1', '4', 'Myself'),
(26, '2018-11-08', 'Test User ', 'ju11.2-3|ju12.0-1', 'jorge', 'Myself'),
(27, '2018-11-15', 'Test User ', 'ju11.2-3|ju12.0-1', 'jorge', 'Myself'),
(28, '2018-11-22', 'Test User ', 'ju11.2-3|ju12.0-1', 'jorge', 'Myself'),
(29, '2018-11-05', 'Test 2', 'lu11.0-1-2', 'jorge', 'Myself'),
(30, '2018-11-21', 'Test Event on Cell 1', 'mi12.1', '4', 'Myself'),
(32, '2018-11-16', 'Test 3', 'vi12.2-3', '4', 'kike'),
(33, '2018-11-16', 'Test 3', 'vi12.0-1', '4', 'kike'),
(34, '2018-11-12', '', 'lu17.1', '4', 'Myself'),
(35, '2018-11-15', '', 'ju8.0', '4', 'Myself'),
(36, '2018-11-16', '', 'vi8.0', '4', 'Myself'),
(37, '2018-11-17', '', 'sa8.3', '4', 'Myself'),
(38, '2018-11-17', '', 'sa8.0', '4', 'Myself'),
(39, '2018-11-17', '', 'sa8.1', '4', 'Myself'),
(40, '2018-11-17', '', 'sa8.2', '4', 'Myself'),
(41, '2018-11-16', '', 'vi8.1', '4', 'Myself'),
(42, '2018-11-13', '', 'ma8.2', '4', 'Myself'),
(43, '2018-11-15', '', 'ju14.0', '4', 'Myself'),
(44, '2018-11-15', 'Mega Test', 'ju9.0-1-2-3', '4', 'Myself'),
(45, '2018-11-29', 'Mega Test', 'ju9.0-1-2-3', '4', 'Myself'),
(46, '2018-12-06', 'Mega Test', 'ju9.0-1-2-3', '4', 'Myself'),
(47, '2018-12-13', 'Mega Test', 'ju9.0-1-2-3', '4', 'Myself'),
(48, '2018-11-12', '', 'lu10.0', '4', 'Myself'),
(49, '2018-11-12', '', 'lu11.3', '4', 'Myself'),
(50, '2018-11-26', '', 'lu11.0', '4', 'Myself'),
(51, '2018-11-12', '', 'lu11.0', 'kike', 'Myself'),
(52, '2018-11-19', '', 'lu11.0', 'kike', 'Myself'),
(53, '2018-11-26', '', 'lu12.0', 'kike', 'Myself'),
(54, '2018-12-03', '', 'lu12.0', 'kike', 'Myself'),
(55, '2018-11-12', '', 'lu11.0', '4', 'Myself'),
(58, '2018-11-12', '', 'lu17.3', '4', 'Myself'),
(59, '2018-11-18', 'Savage Test 1', 'do14.2', '4', 'kike'),
(60, '2018-11-18', 'Savage Test 2', 'do15.2-3|do16.0-1', '4', 'kike'),
(61, '2018-11-25', 'Savage Test 2', 'do15.2-3|do16.0-1', '4', 'kike'),
(62, '2018-11-22', 'Savage Test 6', 'ju13.2-3|ju14.0-1', '4', 'kike'),
(63, '2018-11-14', '', 'mi8.0', '4', 'kike'),
(64, '2018-11-15', 'Test Multiple', 'ju13.0-1-2-3', '4', 'kike'),
(65, '2018-11-29', 'Test Multiple', 'ju13.0-1-2-3', '4', 'kike'),
(66, '2018-11-18', '', 'do8.0', '4', 'kike'),
(67, '2018-11-18', '', 'do8.1', '4', 'kike'),
(68, '2018-11-18', '', 'do8.2', '4', 'kike'),
(69, '2018-11-18', '', 'do8.3', '4', 'kike'),
(70, '2018-11-14', 'Live Test', 'mi20.0-1-2-3', '4', 'jorge'),
(72, '2018-11-17', '', 'sa11.1-2', 'jorge', 'Myself'),
(73, '2018-11-12', 'Test night ', 'lu20.1-2', '4', 'jorge'),
(74, '2018-11-12', '', 'lu18.2-3', '4', 'jorge');

-- --------------------------------------------------------

--
-- Table structure for table `doctores`
--

CREATE TABLE `doctores` (
  `id` int(10) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `speciality` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `services` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `clinic` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `paypal` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctores`
--

INSERT INTO `doctores` (`id`, `username`, `speciality`, `services`, `title`, `clinic`, `address`, `paypal`) VALUES
(1, '7', '7', '7,7,7,7', 'medico', '7', 'Mexico, Veracruz, Boca del Rio, Cherna, 1318, 94299', '7'),
(2, 'jorge', 'Engineering', 'Math,Physics,Chemistry,', 'maestro', 'ITESM', 'Mexico, Nuevo León, Monterrey, Esparta, 3212,64833', '1234567890'),
(3, 'kike', 'Cardiologist', 'Hearts,Veins,Arteries,', 'medico', 'IMSS', 'Mexico, Nuevo Leon, San Nicolas de los Garza, Cerro de las Mitras, 225, 66460', '1234567890');

-- --------------------------------------------------------

--
-- Table structure for table `friendrequests`
--

CREATE TABLE `friendrequests` (
  `fromUser` varchar(50) NOT NULL,
  `toUser` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friendrequests`
--

INSERT INTO `friendrequests` (`fromUser`, `toUser`, `status`, `id`) VALUES
('7', 'alfredo08', 'P', 2),
('7', '1', 'P', 4),
('gabo', 'kike', 'P', 8),
('gabo', '4', 'P', 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `fName` varchar(30) NOT NULL,
  `lName` varchar(30) NOT NULL,
  `username` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `passwrd` varchar(200) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `comments` varchar(5000) NOT NULL,
  `friends` varchar(500) NOT NULL,
  `userType` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`fName`, `lName`, `username`, `gender`, `passwrd`, `mail`, `country`, `comments`, `friends`, `userType`) VALUES
('1', '1', '1', 'M', '1', '1', 'Comoros', '1 & hola', ' ', 'p'),
('2', '2', '2', 'O', '2', '2', 'England', '2 & mmmm | 2 & si', ' | 3 | 9', 'd'),
('3', '3', '3', 'M', '3', '3', 'Fiji', '', ' | 2 ', 'd'),
('Juan', 'Lopez Perez', '4', 'F', '$2y$10$WvgXSpNysoBgSRQFUwLjNOLIWDVaueB9m10Ubx/IseWqKH2VQYtxa', 'Juan@hotmail.com', 'Fiji', '', '| thePam22 | test  | kike | jorge', 'p'),
('5', '5', '5', 'F', '5', '5', 'USA', '', ' | 3 ', 'p'),
('7', '7', '7', 'M', '$2y$10$IVQBVm6AS6Yn5iWR6G6h8O/wc7SUE7.viCxKh1dy/JsYgZZ.g35b2', '7', 'USA', '', ' | test', 'd'),
('9', '9', '9', 'O', '9', '9', 'France', '9 & hola | 9 & como estas? | 9 & bien | 9 & tu? | 9 & asdasd | 9 & jajajaja', '  | 2 | 4', 'p'),
('Alfredo', 'Salazar', 'alfredo08', 'm', 'alfred90', 'alfredo@gmail.com', 'Mexico', '', '', 'd'),
('Cesar', 'Zamora', 'gabo', 'O', '$2y$10$BcsRrixMGlOC.qTfOkw5Ve6FrnvO6sl2VohE35mlcdQaY9qsfSwbS', 'cesar@gmail.com', 'USA', '', '', 'p'),
('Jorge', 'De la Torre', 'jorge', 'M', '$2y$10$BcsRrixMGlOC.qTfOkw5Ve6FrnvO6sl2VohE35mlcdQaY9qsfSwbS', 'jorge@gmail.com', 'Mexico', '', ' | 4', 'd'),
('Enrique', 'Zaragoza ', 'kike', 'M', '$2y$10$GaCfA2tellq070Bi3eJSZe/0bXhH9ojFCEBd2VxlgBr8mTbXQ4t7S', 'e.zaragoza@hotmail.com', 'Mexico', '', ' | 4', 'd'),
('jorge', 'test', 'test', 'M', '$2y$10$e6TwXuV.Nl6HwNPZu4ixoeQhfKHBkHb5Lw.aTEr3UJkJMr8IDdeSS', 'test', 'Bostswana', '', ' | 7', 'p'),
('Pamela', 'Rodriguez', 'thePam22', 'f', '22mapeht', 'Pamela@gmail.com', 'USA', '', '', 'p');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctores`
--
ALTER TABLE `doctores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friendrequests`
--
ALTER TABLE `friendrequests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `doctores`
--
ALTER TABLE `doctores`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `friendrequests`
--
ALTER TABLE `friendrequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
