const resumeDataLink = './data/data_resume.json';
let currentResumeData;

fetch(resumeDataLink)
    .then(response => response.json())
    .then(resumeData => getResumeData(resumeData))


function getResumeData(resumeData){
    currentResumeData = resumeData;
    console.table(currentResumeData);
}

function createResumeView(){
    
}