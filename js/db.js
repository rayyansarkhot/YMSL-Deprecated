// pg is used to query Postgresql database.
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ball',
  password: 'postgres',
  port: 5432
});

// Method selects names from players table in ball database.
const getUsers = (request, response) => {
    pool.query('SELECT name FROM players ORDER BY id', (error, results) => {
      if (error) 
        throw error;
    
      response.status(200).json(results.rows);
    })
};


// Method selects team content from players table in ball database.
const getTeams = (request, response) => {
  pool.query('SELECT DISTINCT team FROM players', (error, results) => {
    if (error) 
      throw error;

    response.status(200).json(results.rows);
  })
};


module.exports = {getUsers, getTeams};