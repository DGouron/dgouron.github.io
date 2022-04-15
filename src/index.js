/* 
/  Copyright all right reserved Damien Gouron - 2022
*/

let linkedinLink = "https://www.linkedin.com/in/damien-gouron/"

const configNavLink = './config/config_nav.json';
let configNavData;

const projectsDataLink = './data/data_projects.json';
let projectsData = [];


let numberOfTiles = 6;
let numberOfTilesRange = [1, 7];
const pannels = ['Gallerie', 'Tic Tac Toe', 'CV'];
let currentMainPannel = 0;
let changeTileNumberField = document.getElementById('modifyNumberOfTiles');


fetch(projectsDataLink)
    .then(res => res.json())
    .then(data => reloadMainContent(data))

    function reloadMainContent(data){
        projectsData = data;
        numberOfTilesRange[1] = projectsData.length + 3;
        createMainContent();
    }


let mainContent = document.getElementById('MainContent');
const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';


if (document.readyState === 'complete') {
} else {
    document.addEventListener('DOMContentLoaded', function () {

        createMainContent();
        numberOfTilesViewEventHandler();
    }, false);
}

function numberOfTilesViewEventHandler(event) {
    refreshNumberOfTilesView();

    if (!event) { return };
    if (event.target.value != null) {
        numberOfTiles = event.target.value;
        createMainContent(pannels[0]);
        refreshNumberOfTilesView();
    }
}

/*Button binding for main menu */

const showGaleryButton = document.getElementById('ShowGalery');
const showTicTacToeButton = document.getElementById('ShowTicTacToe');
const showCVButton = document.getElementById('ShowCV');
const nextContentView = document.getElementById('RightNavigationArrow');
      nextContentView.setAttribute('title', 'Allez vers '+ pannels[currentMainPannel + 1]);
const previousContentView = document.getElementById('LeftNavigationArrow');
      previousContentView.setAttribute('title', 'Allez vers '+ pannels[pannels.length - 1]);

showGaleryButton.addEventListener('click', function () {
    createMainContent(pannels[0]);
    currentMainPannel = 0;
});

showTicTacToeButton.addEventListener('click', function () {
    createMainContent(pannels[1]);
    currentMainPannel = 1;
});

showCVButton.addEventListener('click', function(){
    createMainContent(pannels[2]);
    currentMainPannel = 2;
});

nextContentView.addEventListener('click', function(){
    if(currentMainPannel == pannels.length - 1){
        createMainContent(pannels[0]);
        currentMainPannel = 0;
    }
    else{
        createMainContent(pannels[currentMainPannel + 1]);
        ++currentMainPannel;
    }
    nextContentView.setAttribute('title', currentMainPannel + 1 > pannels.length - 1 ? 'Allez vers ' + pannels[0] : 'Allez vers '+ pannels[currentMainPannel + 1]);
});

previousContentView.addEventListener('click', function(){
    if(currentMainPannel == 0){
        createMainContent(pannels[pannels.length - 1]);
        currentMainPannel = pannels.length - 1;
    }
    else{
        createMainContent(pannels[currentMainPannel - 1]);
        --currentMainPannel;
    }
    previousContentView.setAttribute('title', currentMainPannel - 1 < 0 ? 'Allez vers ' + pannels[pannels.length - 1] : 'Allez vers '+ pannels[currentMainPannel - 1]);
});

function createMainContent(contentName) {

    /*Machine for populate the main content section*/
    switch (contentName) {
        case pannels[0]:
            showGalery();
            break;
        case pannels[1]:
            showTicTacToe();
            break;
        case pannels[2]:
            showResume();
            break;
        default:
            showGalery();
            break;
    }
}

function showGalery() {  
    removeMainContent();
    updateNumberOfTilesInField();
    refreshNumberOfTilesView();
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
    changeTileNumberField.setAttribute('name', 'NumberOfTilesViewer');
    changeTileNumberField.setAttribute('id', 'NumberOfTilesViewer');
    changeTileNumberField.setAttribute('readonly', true);
    changeTileNumberField.setAttribute('value', numberOfTiles);

    mainContentHeader.appendChild(changeTileNumberField);

    let divForSlider = document.createElement('div');
        divForSlider.classList.add('tileSliderContainer');
    let tileSlider = document.createElement('input');
        tileSlider.setAttribute('type', 'range');
        tileSlider.setAttribute('min', numberOfTilesRange[0]);
        tileSlider.setAttribute('max', numberOfTilesRange[1]);
        tileSlider.setAttribute('value', numberOfTiles)
        tileSlider.setAttribute('id', 'tileSlider');
        tileSlider.classList.add('tileSlider');
    divForSlider.appendChild(tileSlider);

    tileSlider.addEventListener('change', function(){
        numberOfTiles = this.value;
        refreshNumberOfTilesView();
        createMainContent(pannels[0]);
    });

    mainContentHeader.appendChild(divForSlider);

}

function createGaleryTiles(numberOfTiles){
    for (let index = 0; index < numberOfTiles; index++) {
        const newLink = document.createElement("a");
            newLink.setAttribute("href", linkedinLink);
            newLink.classList.add('tileLink');
        const newTile = document.createElement("article");
        
        if(index <= projectsData.length-1){
            console.log(projectsData[index]);
            newTile.appendChild(loadProjectData(projectsData[index], newLink));
        }else{
            let tileContent = document.createElement("p");
            textForTileContent = "Ceci est un futur projet. <br /><br /> Vous pouvez me contacter a <em>damien.gouron@gmail.com</em> ou sur Linkedin pour que nous le commencions ensemble.<br /><br />"
            
            textForTileContent = textForTileContent + '<a href="'+linkedinLink+'" title="Me rejoindre sur Linkedin"><img src="./img/logo_linkedin.png" title = "Me rejoindre sur Linkedin" class = "TileIcones"></a>';
            tileContent.innerHTML = textForTileContent;
            newTile.appendChild(tileContent);
            
        }
        newLink.appendChild(newTile);
        mainContent.appendChild(newLink);}
   
}

function loadProjectData(data, linkElement){
    let projectBlock = document.createElement('div');
    let projectTitle = document.createElement('h1');
        projectTitle.innerText = data.projectName;
    let projectThumbnail = document.createElement('img');
        projectThumbnail.setAttribute('src', data.projectLargeImage);
        projectThumbnail.classList.add('projectThumbnail');
    let projectDescription = document.createElement('p');
        projectDescription.innerText = data.projectDescription;
    projectBlock.appendChild(projectThumbnail);
    projectBlock.appendChild(projectTitle);
    projectBlock.appendChild(projectDescription);
    linkElement.setAttribute('href', data.projectLink);
    linkElement.setAttribute('target', '_blank');

    return projectBlock;
}
function refreshNumberOfTilesView() {
    let numberOfTilesViewer = document.getElementById('NumberOfTilesViewer');
        numberOfTilesViewer.setAttribute('value', numberOfTiles);
}

function showTicTacToe() {
    removeMainContent();
    createTicTacToeGame();
}

function showResume(){
    removeMainContent();
    createResumeView();
}