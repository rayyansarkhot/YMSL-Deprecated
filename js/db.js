const { response } = require('express');

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
const getPlayers = (request, response) => {
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

// Function queries database for a specific player's info.
const getPerson = (request, response) => {
  
  const id = parseInt(request.params.id);

  // Super long query gathers singular player's total stats across games.
  pool.query('SELECT * FROM all_stats WHERE player_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);

  });

}  


// Function returns players on a certain team.
const getPlayerInfo = (request, response) => {

  let halfName = request.query.name.slice(0, ((request.query.name).indexOf(' ')));
  let s = "'";

  pool.query(`SELECT * FROM players WHERE team LIKE ${s}${halfName}%${s}`, (error, results) => {
  
    if (error) {
      throw error
    }

    response.status(200).json(results.rows);
    
  });

  ``

};

module.exports = {getPlayers, getTeams, getPerson, getPlayerInfo};