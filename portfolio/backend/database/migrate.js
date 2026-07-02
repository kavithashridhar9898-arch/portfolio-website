const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const fs = require('fs');
const mysql2 = require('mysql2/promise');

async function migrate() {
  const dbName = process.env.DB_NAME || 'defaultdb';
  console.log(`Connecting to database '${dbName}' on host '${process.env.DB_HOST || 'localhost'}'...`);

  const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.DB_HOST?.includes('aivencloud.com');

  const conn = await mysql2.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: dbName,
    multipleStatements: true,
    ssl: isServerless ? { rejectUnauthorized: false } : undefined
  });

  console.log('✅ Connected!');

  // Helper to clean SQL: remove CREATE DATABASE and USE statements
  const cleanSql = (sql) => {
    return sql
      .replace(/CREATE DATABASE[\s\S]*?;/gi, '') // Remove CREATE DATABASE
      .replace(/USE\s+\w+;/gi, '');              // Remove USE database
  };

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  console.log('🔄 Running migrations...');
  for (const file of files) {
    let sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    sql = cleanSql(sql);
    await conn.query(sql);
    console.log(`  ✅ ${file}`);
  }

  const seedsDir = path.join(__dirname, 'seeds');
  const seedFiles = fs.readdirSync(seedsDir).filter(f => f.endsWith('.sql')).sort();

  console.log('🔄 Running seeds...');
  for (const file of seedFiles) {
    let sql = fs.readFileSync(path.join(seedsDir, file), 'utf8');
    sql = cleanSql(sql);
    await conn.query(sql);
    console.log(`  ✅ ${file}`);
  }

  await conn.end();
  console.log('✅ All migrations and seeds complete on Aiven database.\n');
}

migrate().catch(e => {
  console.error('Migration failed:', e.message);
  process.exit(1);
});
