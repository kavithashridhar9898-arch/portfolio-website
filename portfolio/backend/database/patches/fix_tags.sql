-- Fix project tags to be valid JSON arrays
USE aether_portfolio;

UPDATE projects SET tags = '["React Native", "Node.js", "Express.js", "MySQL", "JWT"]' WHERE slug = 'hifix-home-service';
UPDATE projects SET tags = '["Node.js", "Python", "BERT", "LSTM", "TailwindCSS"]' WHERE slug = 'truescan-fake-news';
UPDATE projects SET tags = '["Node.js", "MySQL", "SHA-256", "Web3", "Ethereum"]' WHERE slug = 'blockchain-certificate-verification';
UPDATE projects SET tags = '["Next.js", "TailwindCSS", "GSAP", "Three.js"]' WHERE slug = 'personal-portfolio';
