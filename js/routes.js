const db = require('./db');// Imported SQL methods from db.js.

// Defined routing and cors methods.
const express = require('express');
const app = express();
const PORT = 3000;
var cors = require('cors');

app.use(cors());

// Route asks for players in database to display on site.
app.get('/', db.getUsers);

// Route asks for teams in database to display on site.
app.get('/teams/', db.getTeams)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));