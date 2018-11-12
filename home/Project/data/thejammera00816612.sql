-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 01, 2018 at 12:01 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thejammera00816612`
--

-- --------------------------------------------------------

--
-- Table structure for table `friendrequests`
--

CREATE TABLE `friendrequests` (
  `fromUser` varchar(50) NOT NULL,
  `toUser` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friendrequests`
--

INSERT INTO `friendrequests` (`fromUser`, `toUser`, `status`) VALUES
('1', '4', 'P');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `fName` varchar(30) NOT NULL,
  `lName` varchar(30) NOT NULL,
  `username` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `passwrd` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `comments` varchar(5000) NOT NULL,
  `friends` varchar(500) NOT NULL,
  `active` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`fName`, `lName`, `username`, `gender`, `passwrd`, `mail`, `country`, `comments`, `friends`, `active`) VALUES
('1', '1', '1', 'M', '1', '1', 'Comoros', '1 & hola', ' ', '0'),
('2', '2', '2', 'O', '2', '2', 'England', '2 & mmmm | 2 & si', ' | 3 | 9', '1'),
('3', '3', '3', 'M', '3', '3', 'Fiji', '', ' | 2 ', '0'),
('4', '4', '4', 'F', '4', '5', 'Fiji', '', ' | 9', '0'),
('5', '5', '5', 'F', '5', '5', 'USA', '', ' | 3 ', '0'),
('9', '9', '9', 'O', '9', '9', 'France', '9 & hola | 9 & como estas? | 9 & bien | 9 & tu? | 9 & asdasd | 9 & jajajaja', '  | 2 | 4', '0'),
('Alfredo', 'Salazar', 'alfredo08', 'm', 'alfred90', 'alfredo@gmail.com', 'Mexico', '', '', '0'),
('Pamela', 'Rodriguez', 'thePam22', 'f', '22mapeht', 'Pamela@gmail.com', 'USA', '', '', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
