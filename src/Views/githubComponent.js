const githubProfileLink = "https://api.github.com/users/DGouron";
const showConsoleDebug = true;

fetch(githubProfileLink)
    .then(reponse => reponse.json())
    .then(dataToShow => showGithubStats(dataToShow))

function showGithubStats(dataToShow){
    if(showConsoleDebug){console.table(dataToShow);}

    let footerRef = document.getElementById('mainFooter');

    let gitHubComponent = document.createElement('div');
        gitHubComponent.id = 'gitHubComponent';

        gitHubComponent.appendChild(constructGitHubAvatar(dataToShow));
        gitHubComponent.appendChild(constructProfileLinkButton(constructProfileLink()));
        
    let gitHubName = document.createElement('div');
        gitHubName.innerHTML = 'Github Stats Component <br /><em> Githbug Name : ' + dataToShow.name + '</em><br />';
        gitHubName.classList.add('gitHubComponentElement');
        gitHubComponent.appendChild(gitHubName);

    let followStats = document.createElement('div');
        followStats.classList.add('gitHubComponentElement');
        followStats.id = 'gitHubFollowStats';
        followStats.innerHTML = '<strong>'+ dataToShow.followers +' Followers | '+dataToShow.following +' Following</strong>'
    gitHubComponent.appendChild(followStats);

    footerRef.appendChild(gitHubComponent);
}

function constructGitHubAvatar(data){
    let gitHubAvatar = document.createElement('img');
        gitHubAvatar.classList.add('gitHubAvatar');
        gitHubAvatar.src = data.avatar_url;
        gitHubAvatar.title = 'GitHub avatar';
        gitHubAvatar.alt = 'GitHub avatar';

    return gitHubAvatar;
}

function constructProfileLink(){
    let profileLink = document.createElement('a');
        profileLink.href = githubProfileLink;
        profileLink.alt = 'Link to github profile.';
        profileLink.title = 'Link to github profile.';

    return profileLink;
}

function constructProfileLinkButton(profileLink){
    let profileLinkButton = document.createElement('input');
        profileLinkButton.type = 'button';
        profileLinkButton.classList.add('callToAction');
        profileLinkButton.title = 'Voir le profile Github';
        profileLinkButton.alt = 'Voir le profile Github';
        profileLinkButton.value = 'Voir le profile Github';
    profileLink.appendChild(profileLinkButton);
    return profileLinkButton;
}