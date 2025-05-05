
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'careerrecommendationdb',
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

async function initializeDatabase() {
  console.log(`${colors.cyan}▶ Database Initialization Tool ${colors.reset}`);
  console.log(`${colors.cyan}════════════════════════════${colors.reset}\n`);
  
  let connection;
  try {
    // First connect without database to check if it exists
    const serverConfig = { ...dbConfig };
    delete serverConfig.database;
    
    connection = await mysql.createConnection(serverConfig);
    console.log(`${colors.green}✓ Connected to MySQL server${colors.reset}`);
    
    // Check if database exists
    const [databases] = await connection.query('SHOW DATABASES');
    const databaseExists = databases.some(db => db.Database === dbConfig.database);
    
    if (!databaseExists) {
      console.log(`${colors.yellow}Creating database '${dbConfig.database}'...${colors.reset}`);
      await connection.query(`CREATE DATABASE ${dbConfig.database}`);
      console.log(`${colors.green}✓ Database created successfully!${colors.reset}`);
    } else {
      console.log(`${colors.blue}ℹ Database '${dbConfig.database}' already exists${colors.reset}`);
    }
    
    // Close initial connection
    await connection.end();
    
    // Connect to the specific database
    connection = await mysql.createConnection(dbConfig);
    console.log(`${colors.green}✓ Connected to database '${dbConfig.database}'${colors.reset}\n`);
    
    // Read SQL setup file
    const sqlPath = path.resolve(__dirname, '../utils/database-setup.sql');
    console.log(`${colors.yellow}Reading SQL setup file: ${sqlPath}${colors.reset}`);
    
    const sqlContent = await fs.readFile(sqlPath, 'utf8');
    
    // Split the SQL file into separate statements
    const statements = sqlContent
      .replace(/\r\n/g, '\n')
      .split(';')
      .filter(statement => statement.trim() !== '');
    
    console.log(`${colors.blue}ℹ Found ${statements.length} SQL statements to execute${colors.reset}\n`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim() + ';';
      
      try {
        await connection.query(statement);
        console.log(`${colors.green}✓ Statement ${i + 1}/${statements.length} executed successfully${colors.reset}`);
      } catch (error) {
        // Only show first 80 characters of the statement in the error
        const shortStatement = statement.length > 80 
          ? statement.substring(0, 80) + '...' 
          : statement;
        
        console.log(`${colors.red}✗ Failed to execute statement ${i + 1}/${statements.length}:${colors.reset}`);
        console.log(`  ${shortStatement}`);
        console.log(`  Error: ${error.message}\n`);
      }
    }
    
    // Check the tables that were created
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`\n${colors.green}✓ Database setup complete!${colors.reset}`);
    console.log(`${colors.blue}ℹ Tables in database:${colors.reset}`);
    
    if (tables.length === 0) {
      console.log(`${colors.yellow}  No tables found${colors.reset}`);
    } else {
      tables.forEach(table => {
        const tableName = Object.values(table)[0];
        console.log(`  - ${tableName}`);
      });
    }
    
  } catch (error) {
    console.log(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
  } finally {
    if (connection) {
      await connection.end();
      console.log(`\n${colors.blue}Connection closed${colors.reset}`);
    }
    console.log(`\n${colors.cyan}▶ Database Initialization Complete${colors.reset}`);
  }
}

initializeDatabase().catch(console.error);
