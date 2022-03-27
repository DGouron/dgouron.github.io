/* Load configuration files and setup bloc generation*/
var configNavLink = './config/config_nav.json';
var configNavData;

var mainContent = document.getElementById('MainContent');
const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';


/* Binding for galery */

var   numberOfTiles = 2;
var   numberOfTilesRange = [1, 7];
var   changeTileNumberField = document.getElementById('modifyNumberOfTiles');

if (document.readyState === 'complete') {
} else {
    document.addEventListener('DOMContentLoaded', function() {
        createMainContent();
        modifyNumberOfTilesEventHandler();
    }, false);
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

    let mainContentHeader = document.createElement('header');
        mainContentHeader.textContent = 'Nombre de tuiles affichées : ';
    mainContent.appendChild(mainContentHeader);

    changeTileNumberField = document.createElement('input');
        changeTileNumberField.setAttribute('name', 'modifyNumberOfTiles');
        changeTileNumberField.setAttribute('id', 'modifyNumberOfTiles');
        changeTileNumberField.setAttribute('type', 'number');
        changeTileNumberField.setAttribute('value', numberOfTiles);
        changeTileNumberField.setAttribute('min', numberOfTilesRange[0]);
        changeTileNumberField.setAttribute('max', numberOfTilesRange[1]);
    mainContentHeader.appendChild(changeTileNumberField);
    refreshModifyNumberOfTilesBinding();

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

function modifyNumberOfTilesEventHandler(event){
    
    refreshModifyNumberOfTilesBinding();

    if(!event){return};
    if(event.target.value != null){
        numberOfTiles = event.target.value;
        createMainContent('galery');
        refreshModifyNumberOfTilesBinding();
    }
}

function refreshModifyNumberOfTilesBinding(){
    document.querySelector('input[name="modifyNumberOfTiles"]').onchange=modifyNumberOfTilesEventHandler;
}
    

