# [YMSLstatTracker](https://htmlpreview.github.io/?https://github.com/rayyansarkhot/YMSLstatTracker/blob/main/index.html) (Under Construction)🚧

## Description
I am a part of administration for my local Muslim basketball league, but they take and display player data with pen and paper, as well as Google Sheets. This website was created to digitize the recording of this league's players' game data and display it in a way pretty way. Essentially, it is a statistics tracker for a basketball league.

## Current Features
- Team and Player names are available in both dropdowns.
- Last season's data for 3 players can be accessed through the dropdown.
- Alert popup if an invalid search is given.

## Features still to be added:
- Last and current season data for teams and remaining players.
- Player and Team rankings according to data.
- Interface to track live games and add old game data.
- Player personal information(i.e. pictures, height, etc.)
- Move website to AWS server.

## How to use
(Local PostgreSQL database with data must be setup beforehand)
- Pull project from this repository to local code editor.
- Make sure NodeJS is installed and run the command: npm install
- Run routes.js file with node command.
- Load website with local path on browser.

## Technologies
**HTML/CSS**
- I used HTML to create the structure of the website with a title, forms, and buttons. This code is available in *index.html*. 
- CSS was used to style and color HTML elements. This code is available in *style.css*.

**JavaScript/Node/Express/pg/Postman**
- Javascript and the Node library is used for site interactivity and backend work within the files in the _js_ folder. 
- The Express library is used in the _js/routes.js_ file to generate HTML requests towards a database API.
- The pg library is sets up a connection to a postgreSQL client and allows site to directly send database requests from website.
- Postman was used to debug and test HTML requests to website.

**PostgreSQL/Postbird**
- A postgreSQL database is setup locally to persistenly store league data.
- Postbird and Windows CLI were used to create this database and test requests to it.
