let currentPlayer = 1;
let ticTacToeLength = 3;
const minTicTacToeLength = 3, maxTicTacToeLength = 12; //for future evolution
const victoryFirstPlayerWord = 'X', victorySecondPlayerWord = '0';
let allTicTacToeCells = []; //2D array who store all cells for check the victory conditions.
const classForTicTacToeButtonLocked = 'ButtonLock';
const victoryMessageHead = 'VICTORY FOR ', equalityMessage = "AMAZING ! ITS AN EQUALITY !"
let canModifyButtonColor = true;

let countOccurrenceFor0 = 0, countOccurenceForX = 0;
let gameCounterAlreadyIncrement = false; //State for prevent duplicate action and duplicate incrementation
let ticTacToeStatistics = {
    gamesPlayed: 0,
    playersVictories: [0,0,0]
}


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

    ticTacToeStatistics.playersVictories[0] = ticTacToeStatistics.gamesPlayed - (ticTacToeStatistics.playersVictories[1]+ticTacToeStatistics.playersVictories[2]);
    resetGameCounterIncrementationState();

    for (let i = 0; i < ticTacToeLength; ++i) {
        allTicTacToeCells[i] = [];
    }

    let newTicTacToeTable = document.createElement('table');
        newTicTacToeTable.setAttribute('id', 'ticTacToe');
    mainContent.appendChild(newTicTacToeTable);

    let ticTacToeHeader = document.createElement('th');
        ticTacToeHeader.setAttribute('id', 'ticTacToeHeader');
        ticTacToeHeader.setAttribute('scope', 'rowgroup');
        ticTacToeHeader.setAttribute('colspan', ticTacToeLength);
        ticTacToeHeader.textContent = 'Tic Tac Toe';
    newTicTacToeTable.appendChild(ticTacToeHeader);


    for (let row = 0; row < ticTacToeLength; ++row) {

        let newTicTacToeRow = document.createElement('tr');
            newTicTacToeRow.setAttribute('id', 'ticTacToeRow');
        newTicTacToeTable.appendChild(newTicTacToeRow);

        for (let cell = 0; cell < ticTacToeLength; ++cell) {
            let newCell = new ticTacToeCell(cell, newTicTacToeRow);
                newCell.initCell(row, cell);
            allTicTacToeCells[row].push(newCell); //store the cell ref
        }
    }

    createTicTacToeOptions();
}
function createTicTacToeOptions(){
    let optionsSection = document.createElement('section');
        mainContent.appendChild(optionsSection);

    createReplayButton(optionsSection);
    createColorEffectOption(optionsSection);
    showPlayerStatistics(optionsSection);
}
function createColorEffectOption(section){
    let effectOptionsPannel = document.createElement('div');
        effectOptionsPannel.setAttribute('id', 'colorEffectOption');
    let colorEffectOption = document.createElement('p');
    colorEffectOption.innerText = 'Color Effect : ';
    effectOptionsPannel.appendChild(colorEffectOption);
    let colorEffectOptionCheckbox = document.createElement('input');
        colorEffectOptionCheckbox.setAttribute('type', 'checkbox');
        colorEffectOptionCheckbox.classList.add('colorEffectOptionCheckbox');
        colorEffectOptionCheckbox.setAttribute(canModifyButtonColor ? 'checked' : 'unchecked', '');
        colorEffectOptionCheckbox.setAttribute('title', "Si coché, modifie la couleur des cellules lorsqu'un joueur joue.");
        colorEffectOption.appendChild(colorEffectOptionCheckbox);

        colorEffectOptionCheckbox.addEventListener('change', function () {
            changeColorEffectCheckbox(colorEffectOptionCheckbox);
        });

    section.appendChild(effectOptionsPannel);
}

function createReplayButton(section){
    let replayButton = document.createElement('input');
        replayButton.classList.add('ticTacToeReplayButton');
        replayButton.setAttribute('type', 'button');
        replayButton.setAttribute('value', 'REJOUER');

        replayButton.addEventListener('click', function () {
            clickOnReplayTicTacToeCellButton();})

            section.appendChild(replayButton);
}
function showPlayerStatistics(section){
    let numberOfGamesPlayed = document.createElement('p');
        numberOfGamesPlayed.innerText = 'Parties jouées : '+ ticTacToeStatistics.gamesPlayed;
    section.appendChild(numberOfGamesPlayed);

    for(let currentElement = 0; currentElement < ticTacToeStatistics.playersVictories.length; ++currentElement){
        let elementToAdd = document.createElement('p');
        let elementPercentOfGames = getPercentage(ticTacToeStatistics.playersVictories[currentElement], ticTacToeStatistics.gamesPlayed);

        switch(currentElement){
            case 0:
                elementToAdd.innerText = 'Egalitées : '+ ticTacToeStatistics.playersVictories[currentElement]+ ' ('+ elementPercentOfGames +'%)';
                break;
            case 1:
                elementToAdd.innerText = 'Victoires joueur '+victoryFirstPlayerWord+' : '+ ticTacToeStatistics.playersVictories[currentElement]+ ' ('+ elementPercentOfGames +'%)';
                break;
            case 2:
                elementToAdd.innerText = 'Victoires joueur '+victorySecondPlayerWord+' : '+ ticTacToeStatistics.playersVictories[currentElement]+ ' ('+ elementPercentOfGames +'%)';
                break;
        }
        section.appendChild(elementToAdd);
    }
        
}

function clickOnReplayTicTacToeCellButton(){
    createMainContent(pannels[1]);
}

function changeColorEffectCheckbox(checkbox){
    canModifyButtonColor = checkbox.checked;
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

            let cellButtonValue = currentRow[currentCellIndex].getButtonValue();

            searchOccurenciesFromCell(cellButtonValue);
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
            let cellButtonValue = currentCellsToCompare[currentRowIndex].getButtonValue(); //Save the value of the cell for comparison

            searchOccurenciesFromCell(cellButtonValue);
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

            validateOccurenciesFromButtonValue(cell, cellColor, true);

            for (let adjacentCellIndex = 1; adjacentCellIndex < ticTacToeLength; ++adjacentCellIndex) {
                currentRow = allTicTacToeCells[adjacentCellIndex];
                cell = getCurrentCell(currentRow, adjacentCellIndex);
                
                if (cell != null || cell != undefined) {
                    validateOccurenciesFromButtonValue(cell, cellColor, true);
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
    validateOccurenciesFromButtonValue(cell, cellColor, true);

    --startColumnIndex;

    for(startColumnIndex ; startColumnIndex != -1; --startColumnIndex){
        ++startRowIndex;
        let currentRow = allTicTacToeCells[startRowIndex];
        cell = getCurrentCell(currentRow, startColumnIndex);
        if(cell != null){validateOccurenciesFromButtonValue(cell, cellColor, true);} 
    }
}
function checkAllDiagonalFromLeftBorder(){
    resetOccurenciesCounters();
}
function checkAllDiagonalFromRightBorder(){
    resetOccurenciesCounters();
}

function validateOccurenciesFromButtonValue(cell, cellColor = getRandomColor()){

    if(canModifyButtonColor){
        cell.cellButtonRef.style.backgroundColor = cellColor;
    }

    let cellButtonValue = cell.getButtonValue();
    searchOccurenciesFromCell(cellButtonValue);
    victoryValidation();
}

function getCurrentCell(targetRow, cellIndex){
    currentCell = targetRow[cellIndex];
    if(currentCell != null){return currentCell;}
    else{return null;}    
}

function searchOccurenciesFromCell(valueToCompare) {

    let currentValueToCompare = valueToCompare;


    if (currentValueToCompare == victoryFirstPlayerWord) {
        ++countOccurenceForX;
        countOccurrenceFor0 = 0;
    } else if (currentValueToCompare == victorySecondPlayerWord) {
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
        ticTacToeHeader.textContent = victoryMessageHead + victorySecondPlayerWord;
        ++ticTacToeStatistics.playersVictories[2];
        incrementGameCounter();
        disableAllCells();
        return true;
    } else if (countOccurenceForX == 3) {
        ticTacToeHeader.textContent =  victoryMessageHead + victoryFirstPlayerWord;
        ++ticTacToeStatistics.playersVictories[1];
        incrementGameCounter();
        disableAllCells();
        return true;
    }
    
    if(checkEquality()){
        ticTacToeHeader.textContent = equalityMessage;
        gameCounterAlreadyIncrement == false ? incrementGameCounter() : null;
        return true;
   }

    return false;
}
function incrementGameCounter(){
    ++ticTacToeStatistics.gamesPlayed;
    gameCounterAlreadyIncrement = true;
}
function resetGameCounterIncrementationState(){
    gameCounterAlreadyIncrement = false;
}
function checkEquality(){

    let numberOfButtons = ticTacToeLength * ticTacToeLength;
    let numberOfButtonsUsed = 0;

    //Read all cell buttons value
    for (let currentRowIndex = 0; currentRowIndex < ticTacToeLength; ++currentRowIndex) {
        let row = allTicTacToeCells[currentRowIndex];
        for (let currentCell = 0; currentCell < ticTacToeLength; ++currentCell) {
            if(row[currentCell].cellButtonRef.getAttribute('value') == victoryFirstPlayerWord || 
                row[currentCell].cellButtonRef.getAttribute('value') == victorySecondPlayerWord){
                    ++numberOfButtonsUsed;
                }
        }
    }

    if(numberOfButtonsUsed == numberOfButtons){return true;}
    else{return false};
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
    if (currentPlayer == 1 && !button.classList.contains(classForTicTacToeButtonLocked)) {
        button.value = victoryFirstPlayerWord;
        currentPlayer = 2;
        button.classList.add(classForTicTacToeButtonLocked);
    } else if (currentPlayer == 2 && !button.classList.contains(classForTicTacToeButtonLocked)) {
        button.value = victorySecondPlayerWord;
        currentPlayer = 1;
        button.classList.add(classForTicTacToeButtonLocked);
    }
    button.disabled = "disabled";
    animTicTacToeButtonAtClick(button);
    checkVictoryState();
}

function animTicTacToeButtonAtClick(button)
{
    button.style.backgroundColor = "gold";    
    setTimeout(() => {
        button.style.backgroundColor = "#00949b";  
    }, 200)
}