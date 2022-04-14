const githubProfileLink = "https://api.github.com/users/DGouron";

fetch(githubProfileLink)
    .then(reponse => reponse.json())
    .then(dataToShow => showGithubStats(dataToShow))

function showGithubStats(dataToShow){
    console.table(dataToShow);
}