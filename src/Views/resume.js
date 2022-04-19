const resumeDataLink = './data/data_resume.json';
let currentResumeData;
let resumePannels = [];

fetch(resumeDataLink)
    .then(response => response.json())
    .then(resumeData => getResumeData(resumeData))


function getResumeData(resumeData){
    currentResumeData = resumeData;
    updateWebsiteHeader();
}
function updateWebsiteHeader(){
    document.title = currentResumeData.title;
    document.getElementById('HeaderTitle').textContent = currentResumeData.title;
    document.getElementById('HeaderResume').innerHTML = currentResumeData.headerText;
}

function createResumeView(){
    clearResumePannels();

    createRightResumePannel();
    createLeftResumePannel();

    addResumePannelsToMain();
}
function clearResumePannels(){
    resumePannels = [];
}

function createLeftResumePannel(){
    let leftResumePannel = document.createElement('div');
        leftResumePannel.id = "leftBarResume";
    for(element in currentResumeData.leftPannel){
        let currentData = currentResumeData.leftPannel[element];

        leftResumePannel.appendChild(constructLeftResumePannelTitle(currentData.blockName));

        for(element in currentResumeData.leftPannel[element].content){
            let newResumeItem = new ResumeFactory(currentData.content[element], currentData.type); 
                if(newResumeItem.getItem() != undefined){
                    leftResumePannel.appendChild(newResumeItem.getItem());
                }
                
        }
    }
    resumePannels.push(leftResumePannel);
}

function constructLeftResumePannelTitle(title){
    let titleItem = document.createElement('div');
        titleItem.classList.add('leftResumePannelTitle');
    let titleText = document.createElement('p');
        titleText.innerText = title;
    titleItem.appendChild(titleText);

    return titleItem;
}

function createRightResumePannel(){
    let rightResumePannel = document.createElement('div');
        rightResumePannel.id = "rightBarResume";

        for(element in currentResumeData.rightPannel){
            let currentData = currentResumeData.rightPannel[element];

            if(currentData.showBlockName){
                let separator = document.createElement('img');
                    separator.src = './img/resume/separator.GIF';
                    separator.alt = 'separator';
                rightResumePannel.appendChild(separator);
                let blockTitle = document.createElement('p');
                    blockTitle.innerText = currentData.blockName;
                rightResumePannel.appendChild(blockTitle);
            }
            
            for(element in currentResumeData.rightPannel[element].content){
                let newResumeItem = new ResumeFactory(currentData.content[element], currentData.type); 
                    if(newResumeItem.getItem() != undefined){
                        rightResumePannel.appendChild(newResumeItem.getItem());
                    }
                    
            }
        }
    resumePannels.push(rightResumePannel);
}

function addResumePannelsToMain(){
    let mainContentPannel = document.getElementById('MainContent');
    let resumeContentBox = document.createElement('div');
        resumeContentBox.id ='resumeContentBox';

    for(element in resumePannels){
        resumeContentBox.appendChild(resumePannels[element]);
    }

    mainContentPannel.appendChild(resumeContentBox);
}