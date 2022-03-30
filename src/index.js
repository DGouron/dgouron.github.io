/* 
/  Copyright all right reserved Damien Gouron - 2022
/  Summary : Galery - Tic Tac Toe - CV
*/


/* Load configuration files and setup bloc generation*/
var configNavLink = './config/config_nav.json';
var configNavData;

var mainContent = document.getElementById('MainContent');
const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';


/* Binding for galery */

var   numberOfTiles = 2;
var   numberOfTilesRange = [1, 7];
var   changeTileNumberField = document.getElementById('modifyNumberOfTiles');
/*-----------------------------------------*/

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
const showCVButton = document.getElementById('ShowCV');

showGaleryButton.addEventListener('click', function(){
    createMainContent('galery');
});

showTicTacToeButton.addEventListener('click', function(){
    createMainContent('ticTacToe');
});

/* Populate the main content */

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
    createTicTacToeGame();
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





/*-------------------------------------------------------------------------- TIC TAC TOE -------------------------------------------------------------------------------------------*/
/* Tic Tac Toe variables */
var numberOfPlayers = 2;
var currentPlayer = 1;
var ticTacToeLength = 12;
const minTicTacToeLength = 3, maxTicTacToeLength = 12;
var allTicTacToeCells = []; //2D array who store all cells for check the victory conditions.
/*-----------------------------------------*/

class ticTacToeCell {
    constructor(name, parentRow) {
        this.name = name;
        this.parentRow = parentRow;
        this.cellRef = null;
        this.cellButtonRef = null;
        this.isLocked = false;
    }

    initCell(row, cell){
        let tableCell = document.createElement('td');
            tableCell.classList.add('ticTacToCell');
        this.parentRow.appendChild(tableCell);
        this.cellRef = tableCell;
        this.createCellButton(row,cell);
    }

    createCellButton(row, cell){
        let cellButton = document.createElement('input');
            cellButton.setAttribute('type', 'button');
            cellButton.setAttribute('name', 'Button'+row+cell);
            cellButton.classList.add('ticTacToButton');
        this.cellRef.appendChild(cellButton);
        this.cellButtonRef = cellButton;
        this.bindTicTacToeCellButton(cellButton);
    }


    bindTicTacToeCellButton(button){
        button.addEventListener('click', function(event){
            clickOnTicTacToCellButton(button);
        });
    }

    getButtonValue(){
        return this.cellButtonRef.value;
    }
}

function createTicTacToeGame(){ 

    for(let i = 0; i < ticTacToeLength; ++i){
        allTicTacToeCells[i] = [];
    }
    console.log(allTicTacToeCells);
    let newTicTacToeTable = document.createElement('table');
        newTicTacToeTable.setAttribute('id', 'ticTacToe');
    mainContent.appendChild(newTicTacToeTable);

    let ticTacToeHeader = document.createElement('th');
        ticTacToeHeader.setAttribute('id', 'ticTacToeHeader');
        ticTacToeHeader.textContent = 'Tic Tac Toe';
    newTicTacToeTable.appendChild(ticTacToeHeader);


    for(let row = 0; row < ticTacToeLength; ++row){

        let newTicTacToeRow = document.createElement('tr');
            newTicTacToeRow.setAttribute('id', 'ticTacToeRow');
        newTicTacToeTable.appendChild(newTicTacToeRow);

        for(let cell = 0; cell < ticTacToeLength; ++cell){
            let newCell = new ticTacToeCell('test', newTicTacToeRow);
                newCell.initCell(row, cell);
                allTicTacToeCells[row].push(newCell); //store the cell ref
        }
    }
} 


function checkVictoryState(){
    //check if one of a victory condition are true
    let ticTacToeHeader = document.getElementById('ticTacToeHeader');

    if(!victoryInLineSearch(ticTacToeHeader)){
        if(!victoryInColumnSearch(ticTacToeHeader)){
            victoryInDiagonalSearch(ticTacToeHeader);
        }
    } 
}

function victoryInLineSearch(ticTacToeHeader){
    let lineCounterForX = 0;
    let lineCounterFor0 = 0;

    for(let index = 0; index < ticTacToeLength ; index++){
        
        let currentRow = allTicTacToeCells[index];
        lineCounterFor0 =0;
        lineCounterForX = 0;

       for(let currentCellIndex = 0; currentCellIndex < currentRow.length; ++currentCellIndex){
            if(currentRow[currentCellIndex].getButtonValue() == 'X'){
                ++lineCounterForX;
                lineCounterFor0 = 0;
            }else if(currentRow[currentCellIndex].getButtonValue() == '0'){
                ++lineCounterFor0;
                lineCounterForX = 0;
            }else{
                lineCounterFor0 =0;
                lineCounterForX = 0;
            }

          victoryValidation(lineCounterFor0, lineCounterForX);
       }
    }
    return false;
}

function victoryInColumnSearch(ticTacToeHeader){
    //we go through the rows of the first column and we compare n+n columns to the same row. If 3 match, win. Otherwise we go to the next row
    let columnCounterForX = 0;
    let columnCounterFor0 = 0;

    for(let currentRowIndex = 0; currentRowIndex < ticTacToeLength; ++currentRowIndex){
        columnCounterForX = 0;
        columnCounterFor0 = 0;

        for(let currentColumnIndex = 0; currentColumnIndex < ticTacToeLength; ++currentColumnIndex){
            currentCellsToCompare = allTicTacToeCells[currentColumnIndex];
            buttonValue = currentCellsToCompare[currentRowIndex].getButtonValue(); //Save the value of the cell for comparison

            if(buttonValue == 'X'){
                ++columnCounterForX;
                columnCounterFor0 = 0;
            }else if(buttonValue == '0'){
                ++columnCounterFor0;
                columnCounterForX - 0;
            }else{
                columnCounterFor0 = 0;
                columnCounterForX = 0;
            }

            victoryValidation(columnCounterFor0, columnCounterForX);
        }
    }

    return false;
}

function victoryInDiagonalSearch(ticTacToeHeader){

    let counterForX = 0;
    let counterFor0 = 0;
    let adjustedRowIndex = 0;
    var rowArray = [];

    //Toute la ligne 0
    let startRow = allTicTacToeCells[0];
    let currentRow = [];


    /*for(cellIndexInRow = 0; cellIndexInRow < ticTacToeLength; ++cellIndexInRow){
        let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

        if(cellIndexInRow == 0){
            let cell = startRow[cellIndexInRow];
            cell.cellButtonRef.style.backgroundColor = color;

            for(let adjacentCellIndex = 1; adjacentCellIndex < ticTacToeLength; ++adjacentCellIndex){ //Recherche des cellules adjacentes bas-droit
                currentRow = allTicTacToeCells[adjacentCellIndex];
                cell = currentRow[adjacentCellIndex];
                if(cell != null || cell != undefined){
                    cell.cellButtonRef.style.backgroundColor = color;
                }
            }
        }else{

            let cell = startRow[cellIndexInRow];
            cell.cellButtonRef.style.backgroundColor = color; //point de départ de la diagonale

            for(let adjacentColumnIndex = 1; adjacentColumnIndex < ticTacToeLength; ++adjacentColumnIndex){ //recherche de la cellule d'adjacente bas-droit
                
                console.log(cellIndexInRow);

                //selectionne la ligne du dessous
                currentRow = allTicTacToeCells[adjacentColumnIndex];
                //selectionne la cellule un cran à droite
                let cell = currentRow[adjacentColumnIndex + cellIndexInRow];
                //modifie la couleur de la cellule
                if(cell != null || cell != undefined){
                    cell.cellButtonRef.style.backgroundColor = color;
                    
                }   
            }
        }
    }*/

    //Toute la colonne 0
     startRow = allTicTacToeCells[1];
     currentRow = [];

     for(currentRowIndex = 1; currentRowIndex < ticTacToeLength; ++currentRowIndex){ //On check toutes les lignes 0 de la colonne 0
        let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

        let cell = startRow[cellIndexInRow];
            cell.cellButtonRef.style.backgroundColor = color;
     }


    return false;
}

function victoryValidation(counterFor0, counterForX){
    if(counterFor0 == 3){
        ticTacToeHeader.textContent = 'VICTORY FOR 0';
        disableAllCells();
        return true;
    }else if(counterForX == 3){
        ticTacToeHeader.textContent = 'VICTORY FOR X';
        disableAllCells();
        return true;
    }
    return false
}

function disableAllCells(){
    for(let index = 0; index < ticTacToeLength ; index++){
        
        let currentRow = allTicTacToeCells[index];

       for(let currentCellIndex = 0; currentCellIndex < currentRow.length; ++currentCellIndex){
            currentRow[currentCellIndex].cellButtonRef.disabled = 'disabled';
       }
    }
}

function clickOnTicTacToCellButton(button){
    //If the button is mark at "ButtonLock", the player cant use it.
    if(currentPlayer == 1 && !button.classList.contains('ButtonLock')){
        button.value = 'X';
        currentPlayer = 2;
        button.classList.add('ButtonLock');
    }else if(currentPlayer == 2 && !button.classList.contains('ButtonLock')){
        button.value = "0";
        currentPlayer = 1;
        button.classList.add('ButtonLock');
    }
    button.disabled = "disabled";
    checkVictoryState();
}