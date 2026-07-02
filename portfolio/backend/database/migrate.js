const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const fs = require('fs');
const mysql2 = require('mysql2/promise');

async function migrate() {
  const conn = await mysql2.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  console.log('🔄 Running migrations...');
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await conn.query(sql);
    console.log(`  ✅ ${file}`);
  }

  const seedsDir = path.join(__dirname, 'seeds');
  const seedFiles = fs.readdirSync(seedsDir).filter(f => f.endsWith('.sql')).sort();

  console.log('🔄 Running seeds...');
  for (const file of seedFiles) {
    const sql = fs.readFileSync(path.join(seedsDir, file), 'utf8');
    await conn.query(sql);
    console.log(`  ✅ ${file}`);
  }

  await conn.end();
  console.log('✅ All migrations and seeds complete.\n');
}

migrate().catch(e => {
  console.error('Migration failed:', e.message);
  process.exit(1);
});
