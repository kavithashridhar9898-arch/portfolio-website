-- ============================================================
-- Aether.OS Portfolio — Seed Data
-- Run after migrations: node migrate.js (or mysql -u root -p aether_portfolio < seeds/001_seed_data.sql)
-- ============================================================

USE aether_portfolio;

-- ──────────────────────────────────────────────────────────
-- Default Admin User (password: Admin@1234)
-- Change this immediately via the admin panel!
-- ──────────────────────────────────────────────────────────
INSERT INTO users (name, email, password_hash, role, bio) VALUES
('Anshul SridaraNayak Katte', 'anshulnayak.9898@gmail.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMqJqhh5jXgKmv5jJt2hT.r2rO', 'admin', 'Independent Full-Stack Developer driven by curiosity and a passion for solving real-world problems.')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- ──────────────────────────────────────────────────────────
-- Hero Content
-- ──────────────────────────────────────────────────────────
INSERT INTO hero_content (id, title, subtitle, cta_text, cta_link, status_text) VALUES
(1, 'ANSHUL SRIDARANAYAK KATTE', 'Full-Stack Developer & AI Enthusiast', 'Explore Projects', '#projects', 'Available for Work')
ON DUPLICATE KEY UPDATE title=VALUES(title), subtitle=VALUES(subtitle);

-- ──────────────────────────────────────────────────────────
-- About Content
-- ──────────────────────────────────────────────────────────
INSERT INTO about_content (id, section_label, headline, body, stat_value, stat_label, feature_title, feature_body, card2_title, card2_body) VALUES
(1, 
 'The Mission',
 'Turning real-world problems into software products.',
 '🔭 I''m currently working on HiFix – an AI-powered home service marketplace, while continuously improving my Data Structures & Algorithms skills.\n\n🤝 I''m looking to collaborate on Salesforce, Full-Stack Development, React Native Mobile Applications, and Open Source projects.\n\n🌩️ I''m looking for help with Cloud Deployment, scalable application architecture, and production-ready DevOps practices.\n\n🌱 I''m currently learning Salesforce Platform, Cloud Computing, and advanced software engineering concepts.\n\n💬 Ask me about Full-Stack Development, React Native, Node.js, MySQL, REST APIs, JWT Authentication, and Mobile App Development.',
 '15+',
 'Technologies Mastered',
 'Lifelong Learner',
 'I genuinely enjoy exploring new ideas—whether they''re technical, business-related, or completely outside technology.',
 'Full-Stack Architecture',
 'Building cross-platform mobile apps, AI integrations, and secure backend REST APIs utilizing modern technologies and scalable cloud deployments.'
)
ON DUPLICATE KEY UPDATE headline=VALUES(headline), body=VALUES(body);

-- ──────────────────────────────────────────────────────────
-- Projects
-- ──────────────────────────────────────────────────────────
INSERT INTO projects (title, slug, description, tags, github_url, live_url, featured, sort_order) VALUES
('HiFix – AI-Powered Home Service Marketplace', 'hifix-home-service', 'A full-stack cross-platform mobile application designed to connect homeowners with verified local service professionals through a secure and user-friendly platform. Features include real-time chat, Face ID authentication, email OTP, and AI-powered repair cost estimation.', '["React Native", "Node.js", "Express.js", "MySQL", "JWT"]', 'https://github.com/kavithashridhar9898-arch', '', 1, 1),
('TrueScan – AI-Powered Fake News Detection', 'truescan-fake-news', 'A full-stack web application leveraging AI to detect fake news by analyzing articles and URLs. Integrates Logistic Regression, LSTM, and BERT models for accurate predictions with confidence scores through an interactive dashboard.', '["Node.js", "Python", "BERT", "LSTM", "TailwindCSS"]', 'https://github.com/kavithashridhar9898-arch', '', 1, 2),
('Blockchain Academic Certificate Verification', 'blockchain-certificate-verification', 'A secure blockchain-inspired certificate verification platform developed to eliminate forgery using cryptographic hashing (SHA-256) and blockchain concepts. Features JWT authentication for students and institutional users.', '["Node.js", "MySQL", "SHA-256", "Web3", "Ethereum"]', 'https://github.com/kavithashridhar9898-arch', '', 1, 3),
('Personal Portfolio Website', 'personal-portfolio', 'A modern developer portfolio showcasing projects, technical skills, certifications, and GitHub repositories. Emphasizes clean design, smooth animations, and performance.', '["Next.js", "TailwindCSS", "GSAP", "Three.js"]', 'https://github.com/kavithashridhar9898-arch', '', 0, 4)
ON DUPLICATE KEY UPDATE title=VALUES(title), tags=VALUES(tags);

-- ──────────────────────────────────────────────────────────
-- Skills
-- ──────────────────────────────────────────────────────────
INSERT INTO skills (name, category, proficiency, sort_order) VALUES
('JavaScript', 'Frontend', 95, 1),
('React Native', 'Frontend', 90, 2),
('Next.js', 'Frontend', 85, 3),
('TailwindCSS', 'Frontend', 95, 4),
('HTML5/CSS3', 'Frontend', 95, 5),
('Node.js', 'Backend', 90, 6),
('Express.js', 'Backend', 90, 7),
('Python', 'Backend', 85, 8),
('Java / C / C++', 'Backend', 80, 9),
('MySQL', 'Database', 90, 10),
('MongoDB', 'Database', 85, 11),
('Postgres', 'Database', 80, 12),
('AWS', 'DevOps', 75, 13),
('Docker', 'DevOps', 80, 14),
('Jenkins / CI/CD', 'DevOps', 75, 15),
('Git / GitHub', 'Tools', 95, 16),
('Figma', 'Tools', 80, 17);

-- ──────────────────────────────────────────────────────────
-- Experience
-- ──────────────────────────────────────────────────────────
INSERT INTO experience (title, company, period, description, sort_order) VALUES
('Independent Full-Stack Developer', 'Self-Employed', 'January 2025 – Present', 'Designing and developing full-stack web and mobile applications including AI-powered apps, blockchain verification systems, and RESTful APIs with secure JWT authentication. Focused on clean, scalable code and cloud computing.', 1);

-- ──────────────────────────────────────────────────────────
-- Social Links
-- ──────────────────────────────────────────────────────────
INSERT INTO social_links (platform, url, icon, sort_order) VALUES
('LinkedIn', 'https://www.linkedin.com/in/anshul-sn-katte-4068073b7', 'linkedin', 1),
('GitHub', 'https://github.com/kavithashridhar9898-arch', 'github', 2),
('Email', 'mailto:anshulnayak.9898@gmail.com', 'email', 3);

-- ──────────────────────────────────────────────────────────
-- SEO Settings
-- ──────────────────────────────────────────────────────────
INSERT INTO seo_settings (page, title, description, keywords) VALUES
('home', 'Anshul SridaraNayak Katte | Full-Stack Developer', 'Portfolio of Anshul SridaraNayak Katte, Full-Stack Developer specializing in React Native, Node.js, AI integrations, and cloud deployments.', 'Anshul Katte, full stack developer, React Native, Node.js, AI, portfolio, software engineer')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- ──────────────────────────────────────────────────────────
-- Site Settings
-- ──────────────────────────────────────────────────────────
INSERT INTO site_settings (`key`, value) VALUES
('site_name', 'ANSHUL S. KATTE'),
('tagline', 'Independent Full-Stack Developer'),
('contact_email', 'anshulnayak.9898@gmail.com'),
('available_for_work', 'true'),
('theme', 'dark'),
('location', 'Mangalore, Karnataka, India')
ON DUPLICATE KEY UPDATE value=VALUES(value);
