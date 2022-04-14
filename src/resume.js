const resumeDataLink = './data/data_resume.json';

fetch(resumeDataLink)
    .then(response => response.json())
    .then(resumeData => createResume(resumeData))


function createResume(resumeData){
    console.table(resumeData);
}