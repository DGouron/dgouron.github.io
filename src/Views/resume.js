const resumeDataLink = './data/data_resume.json';
let currentResumeData;
let resumePannels = [];

fetch(resumeDataLink)
    .then(response => response.json())
    .then(resumeData => getResumeData(resumeData))


function getResumeData(resumeData){
    currentResumeData = resumeData;
    updateWebsiteHeader();
    console.table(currentResumeData);
}
function updateWebsiteHeader(){
    document.title = currentResumeData.title;
    document.getElementById('HeaderTitle').textContent = currentResumeData.title;
    document.getElementById('HeaderResume').innerHTML = currentResumeData.headerText;
}

function createResumeView(){
    clearResumePannels();

    createLeftResumePannel();
    createRightResumePannel();

    addResumePannelsToMain();
}
function clearResumePannels(){
    resumePannels = [];
}

function createLeftResumePannel(){

}

function constructBlockForLeftResumePannel(){

}

function  constructBlockForRightResumePannel(blockData){
    let newBlock = document.createElement('section');
    let blockTitle = document.createElement('h1');
        blockTitle.textContent = blockData.blockName;
        newBlock.appendChild(blockTitle);
    return newBlock;
}

function createRightResumePannel(){
    let leftResumePannel = document.createElement('section');
    console.error(currentResumeData.rightPannel)
        for(element in currentResumeData.rightPannel){
            console.table(currentResumeData.rightPannel[element]);
            leftResumePannel.appendChild(constructBlockForRightResumePannel(currentResumeData.rightPannel[element])); 
        }
    resumePannels.push(leftResumePannel);
}

function addResumePannelsToMain(){
    let mainContentPannel = document.getElementById('MainContent');

    for(element in resumePannels){
        mainContentPannel.appendChild(resumePannels[element]);
    }
}