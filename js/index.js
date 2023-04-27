// Selects dropdown element that displays player names.
const selectPlayer = document.getElementById('player');
// Selects dropdown element that displays team names.
const selectTeam = document.getElementById('team');

// Function queries database ball for player names and fills select dropdown with it.
let playerDropdown = async (data) => {
    
    let reader;
    let all;

    // Sends an API request to send a postgresql query.
    await fetch('http://localhost:3000/').then(response => {
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

    // Creates new options for dropdown.
    for(let x = 0; x < all.length; x++) {
        let newOption = new Option(all[x].name, all[x].name);
        selectPlayer.add(newOption);    
    }

    
};


// Function queries database ball for team names and fills select dropdown with it.
let teamDropdown = async (data) => {
    
    let reader;
    let all;

    // Sends an API request to send a postgresql query.
    await fetch('http://localhost:3000/teams').then(response => {
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

    // Creates new options for dropdown.
    for(let x = 0; x < all.length; x++) {
        let newOption = new Option(all[x].team, all[x].team);
        selectTeam.add(newOption);    
    }
    
};

// Added event listeners to fire functions when page loads.
window.addEventListener('load', playerDropdown);
window.addEventListener('load', teamDropdown);