const resumeDataLink = './data/data_CV.json';
let resumeData = [];

fetch(resumeDataLink)
    .then(res => res.json())
        .catch(console.error('CANT FINT DATA CV JSON FILE'))
    .then(data => resumeData = data)
        .catch(console.error('RESUME DATA NOT LOADED'))
    .then(createResume())


function createResume(){
    console.log(resumeData);
}