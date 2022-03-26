const mainContent = document.getElementById('MainContent');
let numberOfTiles = 6;
const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

/* Populate the main section*/

for (let index = 0; index < numberOfTiles; index++) {
    const newTile = document.createElement("article");
    let tileContent = document.createElement("p");
        tileContent.textContent = 'Page random numéro ' + (index + 1) + '. '+ loremIpsum;
    let tileButton = document.createElement("a");
        tileButton.setAttribute("href", "#");
        tileButton.classList.add('buttonBase');
        tileButton.classList.add('animatedButton');
        tileButton.textContent = 'Voir plus';

    newTile.appendChild(tileContent);
    newTile.appendChild(tileButton);


    mainContent.appendChild(newTile);
}