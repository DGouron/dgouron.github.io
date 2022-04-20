class Experience extends ResumeItem{
    constructor(data){
        super();
        super.setData(data.title);
        this.makeItem(data);
    }

    makeItem(data){
        let newItem = document.createElement('div');
            newItem.classList.add('resumeItem');
        let separatorPoint = document.createElement('img');
            separatorPoint.src = "./img/resume/blackpoint.gif";
            separatorPoint.alt = data.title;
            separatorPoint.title = data.title;
        newItem.appendChild(separatorPoint);
        let newContent = document.createElement('p');
            newContent.innerHTML = "<strong>"+data.years + " </strong>- "+ data.title + " - "+ data.enterprise + " - " + data.location;
        let newText = document.createElement('p');
            newText.innerText = data.text;
        newItem.appendChild(newContent);
        newItem.appendChild(newText);
        super.setItem(newItem);
    }
}