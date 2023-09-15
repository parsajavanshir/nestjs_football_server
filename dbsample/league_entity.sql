-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 15, 2023 at 06:25 PM
-- Server version: 8.0.34-0ubuntu0.20.04.1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `soccer_fly`
--

-- --------------------------------------------------------

--
-- Table structure for table `league_entity`
--

CREATE TABLE `league_entity` (
  `entity_id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `league_entity`
--

INSERT INTO `league_entity` (`entity_id`, `name`) VALUES
(173, 'Ả Rập Xê Út King Cup'),
(220, 'AFC Champions League'),
(168, 'AFF Suzuki Cup'),
(49, 'ALG D1'),
(56, 'Anh Isthmian League Premier Division'),
(14, 'ARM D1'),
(129, 'Bangladesh Premier League'),
(6, 'BEL U21'),
(15, 'BHR D'),
(48, 'BHR D1'),
(132, 'Bỉ National Division 1'),
(188, 'Brazil Campeonato Carioca'),
(221, 'Brazil Campeonato Paulista'),
(81, 'Các Tiểu vương quốc Ả Rập Thống nhất Arabian Gulf Cup'),
(244, 'CAF Champions League'),
(20, 'CHA CSL'),
(34, 'CHA D1'),
(243, 'Champions League'),
(54, 'Champions League Nữ'),
(41, 'COL D1'),
(76, 'Cộng hòa Séc Tipsport liga'),
(227, 'Copa Libertadores'),
(149, 'Copa por Mexico'),
(242, 'Copa Sudamericana'),
(163, 'Cúp Algeria Ligue'),
(172, 'Cúp Bỉ'),
(226, 'Cúp Brazil'),
(229, 'Cúp Đan Mạch'),
(57, 'Cúp FA'),
(164, 'Cúp FA Trung Quốc'),
(130, 'Cup Hong Kong  Elite'),
(150, 'Cúp Hy Lạp'),
(134, 'Cúp Israel'),
(171, 'Cúp Liên Đoàn Anh'),
(223, 'Cúp Nga'),
(170, 'Cúp nhà vua Tây Ban Nha'),
(228, 'Cúp Pháp'),
(231, 'Cúp QG Hà Lan'),
(82, 'Cúp Quốc gia Azerbaijan'),
(80, 'Cúp Quốc gia Costa Rica'),
(136, 'Cúp Quốc gia UAE'),
(63, 'Cúp Romania'),
(64, 'Cúp Serie C'),
(169, 'Cúp Thổ Nhĩ Kỳ'),
(222, 'Cúp Thụy Điển'),
(12, 'CYP D1'),
(138, 'Đức 2. Bundesliga Nữ'),
(101, 'Đức Bundesliga Nữ'),
(127, 'Đức DFB Junioren Pokal'),
(121, 'Đức Junioren Bundesliga South'),
(102, 'Đức Regionalliga Sudwest'),
(32, 'EGY D1'),
(142, 'Empress’s Cup Nữ Nhật Bản'),
(4, 'ENG CN'),
(23, 'ENG Conf'),
(24, 'ENG CS'),
(45, 'ENG CWCUP'),
(43, 'ENG FAC'),
(26, 'ENG RYM'),
(17, 'ENG U21D2'),
(7, 'ENG U21LC'),
(27, 'ENG-S CE'),
(25, 'ENG-S PR'),
(162, 'England FA Vase'),
(133, 'England FA Women Super League'),
(114, 'England League 1'),
(144, 'England Southern League Central Division'),
(99, 'England U21 League Cup'),
(90, 'Eredivisie Nữ Hà Lan'),
(60, 'FA Cup Nữ'),
(100, 'FIFA World Cup'),
(13, 'FRA D3'),
(36, 'FRA U19'),
(103, 'French Championnat Amateur'),
(166, 'Ghana Premier League'),
(240, 'Giải Hạng 2 Nga'),
(95, 'Giải Hạng hai Anh'),
(61, 'Giao hữu'),
(83, 'Giao hữu quốc tế'),
(16, 'GRE D2'),
(109, 'Hạng 2 Algeria Ligue'),
(96, 'Hạng 2 Bỉ'),
(190, 'Hạng 2 Bồ Đào Nha'),
(137, 'Hạng 2 Hà Lan'),
(74, 'Hạng 2 Hy Lạp'),
(108, 'Hạng 2 Síp'),
(53, 'Hạng 2 Tây Ban Nha'),
(75, 'Hạng 2 Tunisia'),
(59, 'Hạng 2 Ý'),
(98, 'Hạng 3 Pháp'),
(119, 'Hạng 3 Ý'),
(78, 'Hạng Ba Thổ Nhĩ Kỳ'),
(187, 'Hạng hai Pháp'),
(105, 'Hạng Hai Thổ Nhĩ Kỳ'),
(155, 'Hạng Nhất Ả Rập Xê Út'),
(72, 'Hạng Nhất Ấn Độ'),
(115, 'Hạng Nhất Anh'),
(146, 'Hạng Nhất Bahrain'),
(154, 'Hạng Nhất Kuwait'),
(86, 'Hạng Nhất Thái Lan'),
(79, 'Hạng Nhất Trung Quốc'),
(158, 'Hạng Nhất UAE'),
(124, 'Hạng Tư Thổ Nhĩ Kỳ'),
(128, 'Hồng Kông FA Cup'),
(178, 'Hồng Kông Senior Shield'),
(135, 'Hungary Merkantil Bank Liga'),
(19, 'IDN ISL'),
(22, 'IND D1'),
(9, 'INT CF'),
(47, 'ISR D2'),
(46, 'ISR LATTC'),
(65, 'Israel Leumit League'),
(156, 'Israel State League'),
(62, 'Israel Toto Cup'),
(152, 'Israel Women 1st National'),
(5, 'ITA C1'),
(44, 'ITA D2'),
(35, 'ITA PRO LC'),
(1, 'JAM D1'),
(175, 'Jamaica Premier League'),
(92, 'JWL'),
(232, 'K League 2 Hàn Quốc'),
(217, 'K-League Hàn Quốc'),
(91, 'Kuwait Crown Prince Cup'),
(148, 'League Trophy - Anh'),
(52, 'Liên đoàn Bồ Đào Nha'),
(235, 'Lithuania A Lyga'),
(191, 'Mexico Liga MX'),
(218, 'MLS Mỹ'),
(38, 'MNE D1'),
(225, 'Myanmar National League'),
(112, 'National League Anh'),
(58, 'National League North Anh'),
(116, 'National League South Anh'),
(203, 'Ngoại Hạng Anh'),
(151, 'Ngoại hạng Scotland'),
(88, 'Nicaragua Liga Primera'),
(157, 'NIFL Championship Bắc Ireland'),
(28, 'NIR LC'),
(245, 'Not defined!'),
(241, 'NPL Victoria Úc'),
(37, 'OMA PL'),
(177, 'Omani Federation Cup'),
(126, 'POR L3'),
(21, 'Por U23'),
(2, 'PORLC'),
(117, 'Primavera 2'),
(125, 'Primera Division Nữ Tây Ban Nha'),
(233, 'Recopa Sudamericana'),
(10, 'ROM D1'),
(31, 'ROMC'),
(89, 'Scotland Challenge Cup'),
(161, 'Scotland Championship'),
(160, 'Scotland League 1'),
(113, 'Scotland League 2'),
(234, 'Siêu Cúp Argentina'),
(30, 'SLO D1'),
(55, 'Southern League South Division Anh'),
(3, 'SPA D2'),
(111, 'Spanish Segunda Division B'),
(29, 'SPDRFEF'),
(97, 'Super League Nữ Bỉ'),
(11, 'TFF 1. Lig'),
(39, 'TIP CUP'),
(33, 'TTLd'),
(40, 'TUR D3'),
(73, 'U19 Pháp'),
(143, 'U23 Liga Revelacao Bồ Đào Nha'),
(18, 'UAE'),
(42, 'UEFA WUC'),
(238, 'Uzbekistan Super League'),
(211, 'V-League'),
(189, 'VĐQG  Ba Lan'),
(159, 'VĐQG  Israel'),
(153, 'VĐQG Ả Rập Xê Út'),
(66, 'VĐQG Ai Cập'),
(139, 'VĐQG Albania'),
(70, 'VĐQG Algerian Ligue'),
(110, 'VĐQG Ấn Độ'),
(208, 'VĐQG Áo'),
(183, 'VĐQG Argentina'),
(84, 'VĐQG Armenia'),
(147, 'VĐQG Azerbaijan'),
(94, 'VĐQG Bắc Ireland'),
(140, 'VĐQG Bắc Macedonia'),
(68, 'VĐQG Bahrain'),
(197, 'VĐQG Bỉ'),
(182, 'VĐQG Bồ Đào Nha'),
(180, 'VĐQG Bolivia'),
(209, 'VĐQG Bulgaria'),
(179, 'VĐQG Chilê'),
(51, 'VĐQG Colombia'),
(193, 'VĐQG Costa Rica'),
(206, 'VĐQG Croatia'),
(215, 'VĐQG Đan Mạch'),
(204, 'VĐQG Đức'),
(214, 'VĐQG Ecuador'),
(230, 'VĐQG El Salvador'),
(236, 'VĐQG Estonia'),
(141, 'VĐQG Georgia'),
(50, 'VĐQG Guatemala'),
(195, 'VĐQG Hà Lan'),
(131, 'VĐQG Honduras'),
(201, 'VĐQG Hungary'),
(174, 'VĐQG Hy Lạp'),
(77, 'VĐQG Indonesia'),
(167, 'VĐQG Iran'),
(198, 'VĐQG Ireland'),
(239, 'VĐQG Kazakhstan'),
(145, 'VĐQG Kuwait'),
(200, 'VĐQG Ma-rốc'),
(216, 'VĐQG Malaysia'),
(123, 'VĐQG Malta'),
(71, 'VĐQG Montenegro'),
(202, 'VĐQG Nam Phi'),
(237, 'VĐQG Nga'),
(213, 'VĐQG Nhật Bản'),
(69, 'VĐQG Oman'),
(194, 'VĐQG Paraguay'),
(184, 'VĐQG Peru'),
(196, 'VĐQG Pháp'),
(107, 'VĐQG Pháp Nữ'),
(219, 'VĐQG Qatar'),
(104, 'VĐQG Romania'),
(205, 'VĐQG Séc'),
(207, 'VĐQG Serbia'),
(106, 'VĐQG Síp'),
(67, 'VĐQG Slovenia'),
(210, 'VĐQG Slovkia'),
(185, 'VĐQG Tây Ban Nha'),
(212, 'VĐQG Thái Lan'),
(176, 'VĐQG Thổ Nhĩ Kỳ'),
(199, 'VĐQG Thụy Sĩ'),
(85, 'VĐQG Trung Quốc'),
(122, 'VĐQG Tunisia'),
(165, 'VĐQG UAE'),
(87, 'VĐQG Úc'),
(224, 'VĐQG Ukraine'),
(181, 'VĐQG Uruguay'),
(192, 'VĐQG Venezuela'),
(120, 'VĐQG Wales'),
(186, 'VĐQG Ý'),
(118, 'VĐQG Ý Nữ'),
(93, 'W-League Úc'),
(8, 'World Cup');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `league_entity`
--
ALTER TABLE `league_entity`
  ADD PRIMARY KEY (`entity_id`),
  ADD UNIQUE KEY `IDX_204bae64f39b6df9368c1bdb55` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `league_entity`
--
ALTER TABLE `league_entity`
  MODIFY `entity_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
