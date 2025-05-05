
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

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

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'careerrecommendationdb',
};

async function checkDatabaseConnection() {
  console.log(`${colors.cyan}▶ Database Connection Diagnostic Tool ${colors.reset}`);
  console.log(`${colors.cyan}══════════════════════════════════${colors.reset}`);
  
  // Log connection details (masking password)
  console.log(`${colors.blue}Connection Details:${colors.reset}`);
  console.log(`  Host: ${dbConfig.host}`);
  console.log(`  User: ${dbConfig.user}`);
  console.log(`  Password: ${'*'.repeat(dbConfig.password ? 8 : 0)}`);
  console.log(`  Database: ${dbConfig.database}`);
  console.log();

  let connection;
  try {
    console.log(`${colors.yellow}Attempting to connect to MySQL server...${colors.reset}`);
    
    // First try connecting to the server without specifying a database
    const serverConfig = { ...dbConfig };
    delete serverConfig.database;
    
    connection = await mysql.createConnection(serverConfig);
    console.log(`${colors.green}✓ Successfully connected to MySQL server!${colors.reset}`);
    
    // Check if the database exists
    console.log(`\n${colors.yellow}Checking if database '${dbConfig.database}' exists...${colors.reset}`);
    const [databases] = await connection.query('SHOW DATABASES');
    
    const databaseExists = databases.some(db => db.Database === dbConfig.database);
    
    if (databaseExists) {
      console.log(`${colors.green}✓ Database '${dbConfig.database}' exists!${colors.reset}`);
      await connection.end();
      
      // Now connect to the specific database
      console.log(`\n${colors.yellow}Connecting to database '${dbConfig.database}'...${colors.reset}`);
      connection = await mysql.createConnection(dbConfig);
      console.log(`${colors.green}✓ Successfully connected to database!${colors.reset}`);
      
      // Check tables in the database
      console.log(`\n${colors.yellow}Checking tables in database...${colors.reset}`);
      const [tables] = await connection.query('SHOW TABLES');
      
      if (tables.length === 0) {
        console.log(`${colors.red}⚠ No tables found in the database!${colors.reset}`);
        console.log(`${colors.yellow}Hint: You may need to run your database setup script.${colors.reset}`);
      } else {
        console.log(`${colors.green}✓ Found ${tables.length} tables in the database:${colors.reset}`);
        tables.forEach(table => {
          const tableName = Object.values(table)[0];
          console.log(`  - ${tableName}`);
        });
        
        // Check a sample table
        if (tables.length > 0) {
          const sampleTable = Object.values(tables[0])[0];
          console.log(`\n${colors.yellow}Checking sample data from '${sampleTable}'...${colors.reset}`);
          
          try {
            const [rows] = await connection.query(`SELECT * FROM ${sampleTable} LIMIT 5`);
            console.log(`${colors.green}✓ Successfully queried table '${sampleTable}'${colors.reset}`);
            console.log(`  Found ${rows.length} rows`);
          } catch (error) {
            console.log(`${colors.red}✗ Failed to query table '${sampleTable}': ${error.message}${colors.reset}`);
          }
        }
      }
    } else {
      console.log(`${colors.red}✗ Database '${dbConfig.database}' does not exist!${colors.reset}`);
      console.log(`${colors.yellow}Hint: You need to create the database first.${colors.reset}`);
      
      console.log(`\n${colors.magenta}Would you like to create the database now? (y/n)${colors.reset}`);
      process.stdout.write('> ');
      
      process.stdin.once('data', async (data) => {
        const answer = data.toString().trim().toLowerCase();
        if (answer === 'y' || answer === 'yes') {
          try {
            console.log(`${colors.yellow}Creating database '${dbConfig.database}'...${colors.reset}`);
            await connection.query(`CREATE DATABASE ${dbConfig.database}`);
            console.log(`${colors.green}✓ Database created successfully!${colors.reset}`);
            console.log(`${colors.yellow}Hint: Now run the database setup script to create tables.${colors.reset}`);
          } catch (error) {
            console.log(`${colors.red}✗ Failed to create database: ${error.message}${colors.reset}`);
          }
        }
        await connection.end();
        process.exit(0);
      });
      return; // Stop here to wait for user input
    }
    
  } catch (error) {
    console.log(`${colors.red}✗ Connection failed: ${error.message}${colors.reset}`);
    
    // Provide helpful tips based on the error
    if (error.code === 'ECONNREFUSED') {
      console.log(`\n${colors.yellow}Possible causes:${colors.reset}`);
      console.log(`  1. MySQL server is not running`);
      console.log(`  2. Firewall is blocking the connection`);
      console.log(`  3. MySQL server is not listening on the expected host/port`);
      
      console.log(`\n${colors.yellow}Suggestions:${colors.reset}`);
      console.log(`  • Make sure MySQL server is running`);
      console.log(`  • Check if the host and port are correct`);
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log(`\n${colors.yellow}Possible causes:${colors.reset}`);
      console.log(`  1. Incorrect username or password`);
      console.log(`  2. User does not have permission to access the database`);
      
      console.log(`\n${colors.yellow}Suggestions:${colors.reset}`);
      console.log(`  • Verify your username and password`);
      console.log(`  • Check if the user has the necessary privileges`);
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log(`\n${colors.blue}Connection closed${colors.reset}`);
    }
    
    console.log(`\n${colors.cyan}▶ Diagnostic Check Complete${colors.reset}`);
  }
}

// Run the check
checkDatabaseConnection().catch(console.error);
