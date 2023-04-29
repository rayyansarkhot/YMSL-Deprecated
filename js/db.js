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
  
  let all;
  const id = parseInt(request.params.id);

  // Super long query gathers singular player's total stats across games.
  pool.query('SELECT * FROM game1stats WHERE player_id = $1 UNION ALL SELECT * FROM game2stats WHERE player_id = $1 UNION ALL SELECT * FROM game3stats WHERE player_id = $1 UNION ALL SELECT * FROM game4stats WHERE player_id = $1 UNION ALL SELECT * FROM game5stats WHERE player_id = $1 UNION ALL SELECT * FROM game6stats WHERE player_id = $1 UNION ALL SELECT * FROM game7stats WHERE player_id = $1 UNION ALL SELECT * FROM game8stats WHERE player_id = $1 UNION ALL SELECT * FROM game9stats WHERE player_id = $1 UNION ALL SELECT * FROM game10stats WHERE player_id = $1 UNION ALL SELECT * FROM game11stats WHERE player_id = $1 UNION ALL SELECT * FROM game12stats WHERE player_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);

  });

}  

module.exports = {getPlayers, getTeams, getPerson};