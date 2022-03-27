/* Load configuration files and setup bloc generation*/
var configNavLink = './config/config_nav.json';
var configNavData;

var mainContent = document.getElementById('MainContent');
const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

if (document.readyState === 'complete') {
    createMainContent(); //Init the main content
} else {
    document.addEventListener('DOMContentLoaded', function() {
        createMainContent();
    });
}

/*Button binding for main menu */

const showGaleryButton = document.getElementById('ShowGalery');
const showTicTacToeButton = document.getElementById('ShowTicTacToe');

showGaleryButton.addEventListener('click', function(){
    console.log('Show Galery');
    createMainContent('galery');
});

showTicTacToeButton.addEventListener('click', function(){
    console.log('Show TicTacToe');
    createMainContent('ticTacToe');
});

/* Populate the main section*/

function createMainContent(contentName){
    /*Factory for populate the main content section*/
    switch (contentName) {
        case 'galery':
            showGalery();
            break;
        case 'ticTacToe':
            showTicTacToe();
            break;
        default:
            showGalery();
            break;
    }
}

function removeMainContent(){
    let mainContentChildren = mainContent.children;

    while(mainContent.children.length != 0)
    {
        mainContent.removeChild(mainContent.lastChild);
    }
}

function showGalery(){
    removeMainContent();

    let numberOfTiles = 4;

    let mainContentHeader = document.createElement('header');
        mainContentHeader.textContent = 'Nombre de tuiles affichées : '+numberOfTiles;
    mainContent.appendChild(mainContentHeader);

    for (let index = 0; index < numberOfTiles; index++) {
        const newTile = document.createElement("article");
        let tileContent = document.createElement("p");
            tileContent.innerHTML = `Tuile random numéro ${index + 1}. <br /><br />${loremIpsum}<br /><br /><strong>Tuile générée automatiquement.</strong>`;
        let tileButton = document.createElement("a");
            tileButton.setAttribute("href", "#");
            tileButton.classList.add('buttonBase');
            tileButton.classList.add('animatedButton');
            tileButton.textContent = 'Voir plus';

        newTile.appendChild(tileContent);
        newTile.appendChild(tileButton);


        mainContent.appendChild(newTile);
    }
}

function showTicTacToe(){
    removeMainContent();
}