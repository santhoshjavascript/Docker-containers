-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 06, 2025 at 05:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `userapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_a75f3f172bfb296f2e10cbfc6dfc1883', 'i:1;', 1751773487),
('laravel_cache_a75f3f172bfb296f2e10cbfc6dfc1883:timer', 'i:1751773487;', 1751773487),
('laravel_cache_e7cf66797159dc3cd3e85f72e15bb551', 'i:1;', 1751760911),
('laravel_cache_e7cf66797159dc3cd3e85f72e15bb551:timer', 'i:1751760911;', 1751760911);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_07_05_210544_create_users_table', 2),
(5, '2025_07_05_220553_create_users_table', 3),
(6, '2025_07_05_221254_create_personal_access_tokens_table', 4),
(7, '2025_07_05_222435_create_users_table', 5),
(8, '2025_07_05_223412_create_users_table', 6),
(9, '2025_07_05_223610_create_personal_access_tokens_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 3, 'auth_token', 'e4964a20e534e0ba3434781425addeb59e9a94bfb4d24e74137cc9aa3508cb3a', '[\"*\"]', '2025-07-06 02:52:04', NULL, '2025-07-06 02:51:05', '2025-07-06 02:52:04'),
(2, 'App\\Models\\User', 5, 'auth_token', '484fa6e7aa71aa65dd4134d1e79b859e6cfedcc57973055733fb843c5b4bed91', '[\"*\"]', '2025-07-06 03:28:32', NULL, '2025-07-06 03:21:49', '2025-07-06 03:28:32'),
(3, 'App\\Models\\User', 6, 'auth_token', '45302fc60d7135f984c71da270b1ef2707888c24493e4de0e7e3cdf64d8992ca', '[\"*\"]', '2025-07-06 04:14:11', NULL, '2025-07-06 04:01:51', '2025-07-06 04:14:11'),
(4, 'App\\Models\\User', 6, 'auth_token', '8312ddefbcab483c1895c48a444328b1c93d7f8fac2a6060e0411d1b07355235', '[\"*\"]', NULL, NULL, '2025-07-06 07:38:18', '2025-07-06 07:38:18'),
(5, 'App\\Models\\User', 13, 'auth_token', 'df553ef7dcb1a78e5931b5af7e9c6b29d20cf494ef4a9ad1268ea179167730bc', '[\"*\"]', NULL, NULL, '2025-07-06 07:39:14', '2025-07-06 07:39:14'),
(6, 'App\\Models\\User', 13, 'auth_token', 'c561ad6d66e3992f2e6dfa8848803cbb3feb4be266b27a6beaf1c9bc6784a30d', '[\"*\"]', NULL, NULL, '2025-07-06 07:40:28', '2025-07-06 07:40:28');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('eIVXS3VxRcWytyYH7OG5kMWxcvyPrWTOSbBieKUx', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaTlLUlpNMDdIemxGbDFnaWpJRnNSUkNjYTVsUmozZlZtSmtGWHQxWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751759479),
('RnajJnLhKdFsiTFjKZRjl5TideF9g85lCe9aRZIn', NULL, '127.0.0.1', 'PostmanRuntime/7.44.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMG9OUHlsTFk1Mmh4b3hJNGRsNVAzdlcycm5nSUREUFpNZXZXZ1dJciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751757247),
('ZrqNHU3EGX26AUthWFOsx0sLeW3pNO8F5CuAM75H', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSlZmZlJEU3pJVTViZHZCZ2NPQ3owcG41RTJWUVZkZk1KQTZDQUNzUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751754608);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `bio`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'john@example.com', '$2y$12$tCqX4B6mVHkD8TPyJO.x6.9mK81g2svodVTIdxy.txBZBhg0PIHrq', NULL, '2025-07-06 02:43:23', '2025-07-06 02:43:23'),
(2, 'John Doe', 'john85@example.com', '$2y$12$DTuhkaou8omCdaMh3v9pIu0Q2YvRqc.EGinzAdnoUngZVHb9Y7yiO', NULL, '2025-07-06 02:46:07', '2025-07-06 02:46:07'),
(3, 'John Updated', 'john857@example.com', '$2y$12$ce8Jpl3pMrYoC67QYtOjL..B6xHT5t2G1iz/ADiVz5J4Eh8LpAWKG', 'Software Developer', '2025-07-06 02:50:49', '2025-07-06 02:52:04'),
(4, 'John Doe', 'john440@example.com', '$2y$12$ao053hvdXsyNRDGjHKKlc.tFgFNQvKLgvwFYxb4TAXDXwIXz8.1K.', NULL, '2025-07-06 03:13:55', '2025-07-06 03:13:55'),
(5, 'John Doe', 'john706@example.com', '$2y$12$9MJ9gqnjaa2hdtIp84CpB.4z9pt8Tcanb7uoPDsbdTyGz5Dv7cW1e', NULL, '2025-07-06 03:21:27', '2025-07-06 03:21:27'),
(6, 'John Doe', 'john.doe@example.com', '$2y$12$FBsLTnKiVgzWC5WTorMhneCTyzbHJ1caBIRk5d1xBtlsoQQ0NuTVC', NULL, '2025-07-06 04:01:04', '2025-07-06 04:01:04'),
(7, 'John Dose', 'john.doe@examplde.com', '$2y$12$IL2croK1SnsQ4TCMCIxZmuxW8i1A.3tJ0oifQdthIpxZ9aIWrvIdG', NULL, '2025-07-06 04:42:38', '2025-07-06 04:42:38'),
(8, 'santhosh', 'santhosh.doe@examplde.com', '$2y$12$3ly/fHNbgsqIoLmD/FibTup3aq7DRr8FO2EEeqa4viArnk3Cx6sa.', NULL, '2025-07-06 04:43:19', '2025-07-06 04:43:19'),
(9, 'santhossh', 'santhosh.doed@examplde.com', '$2y$12$D4q8MRzQC/.kx0pYM78nn.8W3rKAFagDUGBYoLG8wCtXrvAPWaaYW', NULL, '2025-07-06 04:59:18', '2025-07-06 04:59:18'),
(10, 'santdhossh', 'santhosh.doedd@examplde.com', '$2y$12$L2x4n95qp6Df8YbR5AR6JeyVdHcMmQVkP0MzZvxlIru/zNxJpreUK', NULL, '2025-07-06 04:59:38', '2025-07-06 04:59:38'),
(11, 'santddhossh', 'santhosh.doedd@edxamplde.com', '$2y$12$t9SJ2jSQhb8KyzdXqI86GOgZw7dNGmP2aM7Il9n16hsL4e55p9lZq', NULL, '2025-07-06 05:25:10', '2025-07-06 05:25:10'),
(12, 'santdddhossh', 'santhosh.doedd@dedxamplde.com', '$2y$12$5jFVkBxreIKtuc59ZyD45ej4yWYnqaE3.8zs3SG6XxG0j45EgIhIq', NULL, '2025-07-06 05:25:44', '2025-07-06 05:25:44'),
(13, 'Hello world', 'hello@gmail.com', '$2y$12$NxulMDecnKKsanXSGR4.ie2yDcjXbXTrTeNfyxM/.aX0zmmUMw3be', NULL, '2025-07-06 07:36:49', '2025-07-06 07:36:49'),
(14, 'Hello', 'qerty@gmail.com', '$2y$12$Ei7oAGX9JLiWmMTXVnkhCurZqRC5B.3xrmNN7lRroseGaZku4jxX.', NULL, '2025-07-06 07:41:51', '2025-07-06 07:41:51'),
(15, 'Hellos', 'qweryy@gmail.com', '$2y$12$3KGB5b0b5pC4ZAM0h.1ZvuKIsmDHeNpLAQSnej8FwxAsjCOKFIBcO', NULL, '2025-07-06 07:43:48', '2025-07-06 07:43:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
