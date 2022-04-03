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

var numberOfTiles = 3;
var numberOfTilesRange = [1, 7];
var changeTileNumberField = document.getElementById('modifyNumberOfTiles');

if (document.readyState === 'complete') {
} else {
    document.addEventListener('DOMContentLoaded', function () {
        createMainContent();
        modifyNumberOfTilesEventHandler();
    }, false);
}

/*Button binding for main menu */

const showGaleryButton = document.getElementById('ShowGalery');
const showTicTacToeButton = document.getElementById('ShowTicTacToe');
const showCVButton = document.getElementById('ShowCV');

showGaleryButton.addEventListener('click', function () {
    createMainContent('galery');
});

showTicTacToeButton.addEventListener('click', function () {
    createMainContent('ticTacToe');
});

showCVButton.addEventListener('click', function(){
    createMainContent('CV');
})



function createMainContent(contentName) {

    /*Machine for populate the main content section*/
    switch (contentName) {
        case 'galery':
            showGalery();
            break;
        case 'ticTacToe':
            showTicTacToe();
            break;
        case 'CV':
            showCV();
            break;
        default:
            showGalery();
            break;
    }
}

function showGalery() {

    removeMainContent();
    updateNumberOfTilesInField();
    refreshModifyNumberOfTilesBinding();
    createGaleryTiles(numberOfTiles);
}

function removeMainContent() {
    while (mainContent.children.length != 0) {
        mainContent.removeChild(mainContent.lastChild);
    }
}

function updateNumberOfTilesInField(){
    let mainContentHeader = document.createElement('header');
        mainContentHeader.textContent = "Nombre d'éléments à afficher : ";
        mainContent.appendChild(mainContentHeader);

    changeTileNumberField = document.createElement('input');
    changeTileNumberField.setAttribute('name', 'ModifyNumberOfTiles');
    changeTileNumberField.setAttribute('id', 'ModifyNumberOfTiles');
    changeTileNumberField.setAttribute('type', 'number');
    changeTileNumberField.setAttribute('value', numberOfTiles);
    changeTileNumberField.setAttribute('min', numberOfTilesRange[0]);
    changeTileNumberField.setAttribute('max', numberOfTilesRange[1]);

    mainContentHeader.appendChild(changeTileNumberField);
}

function createGaleryTiles(numberOfTiles){
    for (let index = 0; index < numberOfTiles; index++) {
        const newTile = document.createElement("article");
        
        let tileContent = document.createElement("p");
            tileContent.innerHTML = `Elément random numéro ${index + 1}. <br /><br />${loremIpsum}<br /><br /><strong>Elément généré automatiquement via Javascript.</strong>`;
        
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


function modifyNumberOfTilesEventHandler(event) {

    refreshModifyNumberOfTilesBinding();

    if (!event) { return };
    if (event.target.value != null) {
        numberOfTiles = event.target.value;
        createMainContent('galery');
        refreshModifyNumberOfTilesBinding();
    }
}

function refreshModifyNumberOfTilesBinding() {
    document.querySelector('input[name="ModifyNumberOfTiles"]').onchange = modifyNumberOfTilesEventHandler;
}

function showTicTacToe() {
    removeMainContent();
    createTicTacToeGame();
}

/* Tic Tac Toe variables */
var numberOfPlayers = 2;
var currentPlayer = 1;
var ticTacToeLength = 3;
const minTicTacToeLength = 3, maxTicTacToeLength = 12; //for future evolution
var allTicTacToeCells = []; //2D array who store all cells for check the victory conditions.

let countOccurrenceFor0 = 0, countOccurenceForX = 0;


class ticTacToeCell {
    constructor(name, parentRow) {
        this.name = name;
        this.parentRow = parentRow;
        this.cellRef = null;
        this.cellButtonRef = null;
        this.isLocked = false;
    }

    initCell(row, cell) {
        let tableCell = document.createElement('td');
        tableCell.classList.add('ticTacToCell');
        this.parentRow.appendChild(tableCell);
        this.cellRef = tableCell;
        this.createCellButton(row, cell);
    }

    createCellButton(row, cell) {
        let cellButton = document.createElement('input');
        cellButton.setAttribute('type', 'button');
        cellButton.setAttribute('name', 'Button' + row + cell);
        cellButton.classList.add('ticTacToButton');
        this.cellRef.appendChild(cellButton);
        this.cellButtonRef = cellButton;
        this.bindTicTacToeCellButton(cellButton);
    }


    bindTicTacToeCellButton(button) {
        button.addEventListener('click', function (event) {
            clickOnTicTacToCellButton(button);
        });
    }

    getButtonValue() {
        return this.cellButtonRef.value;
    }
}

function createTicTacToeGame() {

    for (let i = 0; i < ticTacToeLength; ++i) {
        allTicTacToeCells[i] = [];
    }

    let newTicTacToeTable = document.createElement('table');
    newTicTacToeTable.setAttribute('id', 'ticTacToe');
    mainContent.appendChild(newTicTacToeTable);

    let ticTacToeHeader = document.createElement('th');
    ticTacToeHeader.setAttribute('id', 'ticTacToeHeader');
    ticTacToeHeader.textContent = 'Tic Tac Toe';
    newTicTacToeTable.appendChild(ticTacToeHeader);


    for (let row = 0; row < ticTacToeLength; ++row) {

        let newTicTacToeRow = document.createElement('tr');
        newTicTacToeRow.setAttribute('id', 'ticTacToeRow');
        newTicTacToeTable.appendChild(newTicTacToeRow);

        for (let cell = 0; cell < ticTacToeLength; ++cell) {
            let newCell = new ticTacToeCell('test', newTicTacToeRow);
            newCell.initCell(row, cell);
            allTicTacToeCells[row].push(newCell); //store the cell ref
        }
    }

    createTicTacToeOptions();
}

function createTicTacToeOptions(){ //TO DO

    createColorEffectOption();
    createReplayButton();
    showPlayerStat();
}

function createColorEffectOption(){

}
function createReplayButton(){

}
function showPlayerStat(){

}

function checkVictoryState(){

    searchLineVictories();
    searchColumnVictories();
    searchDiagonalVictories();
}

function searchLineVictories(){

    for (let index = 0; index < ticTacToeLength; index++) {

        let currentRow = allTicTacToeCells[index];
        resetOccurenciesCounters();

        for (let currentCellIndex = 0; currentCellIndex < currentRow.length; ++currentCellIndex) {

            let buttonValue = currentRow[currentCellIndex].getButtonValue();

            searchOccurenciesFromCell(buttonValue);
            victoryValidation();
        }
    }
    return false;
}

function searchColumnVictories(){

    //we go through the rows of the first column and we compare n+n columns to the same row. If 3 match, win. Otherwise we go to the next row
    for (let currentRowIndex = 0; currentRowIndex < ticTacToeLength; ++currentRowIndex) {

        resetOccurenciesCounters();

        for (let currentColumnIndex = 0; currentColumnIndex < ticTacToeLength; ++currentColumnIndex) {
            currentCellsToCompare = allTicTacToeCells[currentColumnIndex];
            let buttonValue = currentCellsToCompare[currentRowIndex].getButtonValue(); //Save the value of the cell for comparison

            searchOccurenciesFromCell(buttonValue);
            victoryValidation();
        }
    }

    return false;
}

function searchDiagonalVictories(){

    let cellColor = undefined;
    let cell = undefined;
    let startRow = allTicTacToeCells[0];

    checkAllDiagonalFromLeftTopCorner(cellColor, cell, startRow);
    checkAllDiagonalFromRightTopCorner(cellColor, cell, startRow);
    checkAllDiagonalFromLeftBorder();
    checkAllDiagonalFromRightBorder();
}

function checkAllDiagonalFromLeftTopCorner(cellColor, cell, startRow){
    resetOccurenciesCounters();

    for (cellIndexInRow = 0; cellIndexInRow < ticTacToeLength; ++cellIndexInRow) {

        resetOccurenciesCounters();
        cellColor = getRandomColor();

        if (cellIndexInRow == 0) {
            cell = getCurrentCell(startRow, cellIndexInRow);

            validateOccurenciesFromButtonValue(cell, cellColor);

            for (let adjacentCellIndex = 1; adjacentCellIndex < ticTacToeLength; ++adjacentCellIndex) {
                currentRow = allTicTacToeCells[adjacentCellIndex];
                cell = getCurrentCell(currentRow, adjacentCellIndex);
                
                if (cell != null || cell != undefined) {
                    validateOccurenciesFromButtonValue(cell, cellColor);
                }
            }
        }
    }
}
function checkAllDiagonalFromRightTopCorner(cellColor, cell, startRow){

    resetOccurenciesCounters();
    cellColor = getRandomColor();
    let startColumnIndex = ticTacToeLength - 1;
    let startRowIndex = 0;

    cell = getCurrentCell(startRow, ticTacToeLength - 1);
    validateOccurenciesFromButtonValue(cell, cellColor);

    --startColumnIndex;

    for(startColumnIndex ; startColumnIndex != -1; --startColumnIndex){
        ++startRowIndex;
        let currentRow = allTicTacToeCells[startRowIndex];
        cell = getCurrentCell(currentRow, startColumnIndex);
        if(cell != null){validateOccurenciesFromButtonValue(cell, cellColor);} 
    }
}
function checkAllDiagonalFromLeftBorder(){
    resetOccurenciesCounters();
}
function checkAllDiagonalFromRightBorder(){
    resetOccurenciesCounters();
}

function validateOccurenciesFromButtonValue(cell, cellColor = getRandomColor()){
    cell.cellButtonRef.style.backgroundColor = cellColor;
    let buttonValue = cell.getButtonValue();
    searchOccurenciesFromCell(buttonValue);
    victoryValidation();
}

function getCurrentCell(targetRow, cellIndex){
    currentCell = targetRow[cellIndex];
    if(currentCell != null){return currentCell;}
    else{return null;}    
}

function searchOccurenciesFromCell(valueToCompare) {

    let currentValueToCompare = valueToCompare;


    if (currentValueToCompare == 'X') {
        ++countOccurenceForX;
        countOccurrenceFor0 = 0;
    } else if (currentValueToCompare == '0') {
        ++countOccurrenceFor0;
        countOccurenceForX - 0;
    } else {
        resetOccurenciesCounters();
    }
}

function resetOccurenciesCounters() {
    countOccurrenceFor0 = 0;
    countOccurenceForX = 0;
}

function victoryValidation() {
    if (countOccurrenceFor0 == 3) {
        ticTacToeHeader.textContent = 'VICTORY FOR 0';
        disableAllCells();
        return true;
    } else if (countOccurenceForX == 3) {
        ticTacToeHeader.textContent = 'VICTORY FOR X';
        disableAllCells();
        return true;
    }
    return false
}

function disableAllCells() {
    for (let index = 0; index < ticTacToeLength; index++) {

        let currentRow = allTicTacToeCells[index];

        for (let currentCellIndex = 0; currentCellIndex < currentRow.length; ++currentCellIndex) {
            currentRow[currentCellIndex].cellButtonRef.disabled = 'disabled';
        }
    }
}

function clickOnTicTacToCellButton(button) {
    
    //If the button is mark at "ButtonLock", the player cant use it.
    if (currentPlayer == 1 && !button.classList.contains('ButtonLock')) {
        button.value = 'X';
        currentPlayer = 2;
        button.classList.add('ButtonLock');
    } else if (currentPlayer == 2 && !button.classList.contains('ButtonLock')) {
        button.value = "0";
        currentPlayer = 1;
        button.classList.add('ButtonLock');
    }
    button.disabled = "disabled";
    checkVictoryState();
}

function showCV(){ //TO DO
    removeMainContent();
}