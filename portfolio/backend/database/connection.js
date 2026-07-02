const mysql2 = require('mysql2/promise');

// ──────────────────────────────────────────────────────────
// MySQL Connection Pool
// ──────────────────────────────────────────────────────────
const pool = mysql2.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'aether_portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  charset: 'utf8mb4',
  timezone: '+00:00',
});

/**
 * Execute a SQL query with optional parameters.
 * Returns [rows, fields].
 */
async function query(sql, params = []) {
  const [rows, fields] = await pool.execute(sql, params);
  return [rows, fields];
}

/**
 * Get a single record.
 */
async function queryOne(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows[0] || null;
}

/**
 * Test the database connection on startup.
 */
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL connected to database:', process.env.DB_NAME);
    conn.release();
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();

module.exports = { pool, query, queryOne };
