// Selects dropdown elements that displays player & team names.
const selectPlayer = document.getElementById('player');
const selectTeam = document.getElementById('team');

// Select search button elements.
const playerBtn = document.getElementById('searchByPlayerBTN');
const teamBtn = document.getElementById('searchByTeamBTN');

// Selects div element that will hold the table of stats.
const tableDiv = document.getElementById('table'); 



// Function sends a fetch request and returns parsed data.
let query = async (url) => {
  
    let reader;
    let all;

    // Sends an API request to send a postgresql query.
    await fetch(url).then(response => {
        // Attached reader to readableStream obj.
        reader = response.body.getReader();
    });

    // Reader reads from readableStream object.
    await reader.read().then(function process(done, value) {
        // Decodes array and places it into a variable.
        all = new TextDecoder().decode(done.value);
    });
    
    // Redefined from string to object so properties are more accessibile.
    all = JSON.parse(all);
    return all;
    
};

// Function creates player page.
let createPlayerPage = (all, value) => {

    // let title = document.createElement('h1');

    // title.innerHTML = 'HASEEB';
    // title.style.fontSize = 'large';
    // title.style.color = 'white';

    // tableDiv.append(title);


    // Created table element on site.
    let table = document.createElement('table');
    tableDiv.append(table);
    table.style.display = 'table';
    table.style.width = '100%';
    table.style.marginTop = '.5em'; 

    // Function creates top row of table.
    let row = table.insertRow(-1);
    row.style.color = 'white';
    row.style.fontSize = 'larger';
    row.style.textAlign = 'center';

    // Array is attributes to be added to page.
    let arr = ['Game','Points','Assists', 'Steals', 'Blocks', '2 Points Made', '2 Points Attempted', '3 Points Made', '3 points Attempted'];

    // Loop fills first row of table.
    for(let x = 0; x < arr.length; x++) {
       
        let newCell = row.insertCell(x);
        newCell.innerHTML = arr[x];
        newCell.style.padding = '1em';
        newCell.style.border = '1px solid red';

    }

    // Loop fills rest of data.
    for(let y = 0; y < all.length; y++) {

        // Creates new row
        row = table.insertRow(-1);
        row.style.color = 'white';
        row.style.fontSize = 'larger';
        row.style.textAlign = 'center';
    
        // Initial cell for game number.
        newCell = row.insertCell(0);
        newCell.innerHTML = y+1;
        newCell.style.border = '1px solid red';
        
        // Checks if points is null.
        if(all[y].points === null) {

            // Fills row with DNP if nulls are present.
            for(let x = 0; x < 8; x++) {
                newCell = row.insertCell(1);
                newCell.innerHTML = 'DID NOT PLAY';
                newCell.style.border = '1px solid red';
            }

        } else {

            // Cell for points.
            newCell = row.insertCell(1);
            newCell.innerHTML = all[y].points;
            newCell.style.border = '1px solid red';

            // Cell for assists.
            newCell = row.insertCell(2);
            newCell.innerHTML = all[y].assists;
            newCell.style.border = '1px solid red';

            // Cell for steals.
            newCell = row.insertCell(3);
            newCell.innerHTML = all[y].steals;
            newCell.style.border = '1px solid red';

            // Cell for points.
            newCell = row.insertCell(1);
            newCell.innerHTML = all[y].blocks;
            newCell.style.border = '1px solid red';

            // Cell for points.
            newCell = row.insertCell(1);
            newCell.innerHTML = all[y].two_ptm;
            newCell.style.border = '1px solid red';

            // Cell for points.
            newCell = row.insertCell(1);
            newCell.innerHTML = all[y].two_pta;
            // newCell.style.padding = '1em';
            newCell.style.border = '1px solid red';

            // Cell for points.
            newCell = row.insertCell(1);
            newCell.innerHTML = all[y].three_ptm;
            newCell.style.border = '1px solid red';

            // Cell for points.
            newCell = row.insertCell(1);
            newCell.innerHTML = all[y].three_pta;
            newCell.style.border = '1px solid red';
        
        }    
    }
}

// Function queries database ball for player names and fills select dropdown with it.
let playerDropdown = async () => {

    // Asks for data regarding players.
    all = await query('http://localhost:3000/players');

    // Creates new options for dropdown.
    for(let x = 0; x < all.length; x++) {
        let newOption = new Option(all[x].name, 1+x);
        selectPlayer.add(newOption);    
    }

    
};


// Function queries database ball for team names and fills select dropdown with it.
let teamDropdown = async () => {

    all = await query('http://localhost:3000/teams');

    // Creates new options for dropdown.
    for(let x = 0; x < all.length; x++) {
        let newOption = new Option(all[x].team, all[x].team);
        selectTeam.add(newOption);    
    }
    
};

// Function queries database for info regarding a player and displays it.
let playerTable = async () => {

    // // If statement checks if pre-existing tables are on the site.
    // if(tableDiv.contains(''))

    // Get's requested player's ID and sends a query for their info.
    value = selectPlayer.value;
    all = await query(`http://localhost:3000/players/${value}`);

    createPlayerPage(all, value);

    // // Checks if dropdown was left empty.
    // if (value === "") {
    //     alert("Ensure you choose a value and then click search!");
    // } else {

    //     console.log(`A${value}`);
    //     // Sends request with dropdown value.
    //     all = await query(`https://localhost:3000/person?name=${value}`);
    //     console.log(all);

    // }

};

// Added event listeners to fire functions when page loads.
window.addEventListener('load', playerDropdown);
window.addEventListener('load', teamDropdown);

// Event listeners fire functions when user clicks search button.
playerBtn.onclick = playerTable;
// teamBtn.onclick = teamTable;
