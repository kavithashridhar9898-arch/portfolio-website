-- ============================================================
-- Aether.OS Portfolio Database — Migration Script
-- Run in order: mysql -u root -p < migrations/001_create_tables.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS aether_portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE aether_portfolio;

-- ──────────────────────────────────────────────────────────
-- 1. USERS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  name          VARCHAR(255)     NOT NULL,
  email         VARCHAR(255)     NOT NULL UNIQUE,
  password_hash VARCHAR(255)     NOT NULL,
  role          ENUM('admin','editor') NOT NULL DEFAULT 'admin',
  avatar_url    VARCHAR(512)     NULL,
  bio           TEXT             NULL,
  created_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 2. HERO CONTENT
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hero_content (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  title         VARCHAR(255)     NOT NULL DEFAULT 'AETHER SYNDICATE',
  subtitle      TEXT             NULL,
  cta_text      VARCHAR(100)     NOT NULL DEFAULT 'Explore Projects',
  cta_link      VARCHAR(255)     NOT NULL DEFAULT '#projects',
  bg_image_url  VARCHAR(512)     NULL,
  avatar_url    VARCHAR(512)     NULL,
  status_text   VARCHAR(100)     NULL DEFAULT 'Available for Work',
  updated_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 3. ABOUT CONTENT
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS about_content (
  id              INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  section_label   VARCHAR(100)   NOT NULL DEFAULT 'The Mission',
  headline        TEXT           NOT NULL,
  body            TEXT           NOT NULL,
  stat_value      VARCHAR(50)    NULL DEFAULT '12+',
  stat_label      VARCHAR(100)   NULL DEFAULT 'Global Projects',
  feature_title   VARCHAR(100)   NULL DEFAULT 'Precision First',
  feature_body    TEXT           NULL,
  card2_title     VARCHAR(100)   NULL DEFAULT 'Infrastructure Intelligence',
  card2_body      TEXT           NULL,
  card2_image_url VARCHAR(512)   NULL,
  updated_at      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 4. PROJECTS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  title         VARCHAR(255)     NOT NULL,
  slug          VARCHAR(255)     NOT NULL UNIQUE,
  description   TEXT             NULL,
  tags          JSON             NULL COMMENT 'Array of tag strings',
  image_url     VARCHAR(512)     NULL,
  github_url    VARCHAR(512)     NULL,
  live_url      VARCHAR(512)     NULL,
  featured      TINYINT(1)       NOT NULL DEFAULT 0,
  sort_order    INT              NOT NULL DEFAULT 0,
  created_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_projects_slug (slug),
  INDEX idx_projects_featured (featured),
  INDEX idx_projects_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 5. SKILLS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  name          VARCHAR(100)     NOT NULL,
  category      VARCHAR(100)     NULL COMMENT 'e.g. Frontend, Backend, DevOps',
  icon          VARCHAR(100)     NULL COMMENT 'Icon identifier or URL',
  proficiency   TINYINT UNSIGNED NULL COMMENT '0-100',
  sort_order    INT              NOT NULL DEFAULT 0,
  created_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_skills_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 6. EXPERIENCE
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS experience (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  title         VARCHAR(255)     NOT NULL,
  company       VARCHAR(255)     NOT NULL,
  period        VARCHAR(100)     NOT NULL COMMENT 'e.g. 2022 — Present',
  description   TEXT             NULL,
  sort_order    INT              NOT NULL DEFAULT 0,
  created_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_experience_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 7. EDUCATION
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS education (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  degree        VARCHAR(255)     NOT NULL,
  institution   VARCHAR(255)     NOT NULL,
  period        VARCHAR(100)     NULL,
  description   TEXT             NULL,
  sort_order    INT              NOT NULL DEFAULT 0,
  created_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 8. ACHIEVEMENTS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS achievements (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  title         VARCHAR(255)     NOT NULL,
  description   TEXT             NULL,
  icon          VARCHAR(100)     NULL,
  year          YEAR             NULL,
  sort_order    INT              NOT NULL DEFAULT 0,
  created_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 9. CERTIFICATES
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certificates (
  id              INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  title           VARCHAR(255)   NOT NULL,
  issuer          VARCHAR(255)   NOT NULL,
  issue_date      DATE           NULL,
  expiry_date     DATE           NULL,
  image_url       VARCHAR(512)   NULL,
  credential_url  VARCHAR(512)   NULL,
  sort_order      INT            NOT NULL DEFAULT 0,
  created_at      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 10. GALLERY
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  title         VARCHAR(255)     NULL,
  image_url     VARCHAR(512)     NOT NULL,
  alt_text      VARCHAR(255)     NULL,
  sort_order    INT              NOT NULL DEFAULT 0,
  created_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 11. MESSAGES (Contact Form Submissions)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  name          VARCHAR(255)     NOT NULL,
  email         VARCHAR(255)     NOT NULL,
  subject       VARCHAR(500)     NULL,
  message       TEXT             NOT NULL,
  read_at       TIMESTAMP        NULL,
  created_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_messages_read (read_at),
  INDEX idx_messages_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 12. RESUME
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resume (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  file_url      VARCHAR(512)     NOT NULL,
  file_name     VARCHAR(255)     NULL,
  updated_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 13. SOCIAL LINKS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS social_links (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  platform      VARCHAR(100)     NOT NULL,
  url           VARCHAR(512)     NOT NULL,
  icon          VARCHAR(100)     NULL,
  sort_order    INT              NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 14. SEO SETTINGS
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS seo_settings (
  id              INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  page            VARCHAR(100)   NOT NULL DEFAULT 'home',
  title           VARCHAR(255)   NULL,
  description     TEXT           NULL,
  og_image        VARCHAR(512)   NULL,
  keywords        TEXT           NULL,
  canonical_url   VARCHAR(512)   NULL,
  twitter_handle  VARCHAR(100)   NULL,
  updated_at      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX idx_seo_page (page)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 15. SITE SETTINGS (Key-Value Store)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  `key`         VARCHAR(100)     NOT NULL UNIQUE,
  value         TEXT             NULL,
  updated_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX idx_settings_key (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────────────────────
-- 16. ANALYTICS (Page View Tracking)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS analytics (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  page          VARCHAR(255)     NOT NULL DEFAULT '/',
  user_agent    TEXT             NULL,
  ip_address    VARCHAR(45)      NULL COMMENT 'Supports IPv6',
  referrer      VARCHAR(512)     NULL,
  created_at    TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_analytics_page (page),
  INDEX idx_analytics_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
