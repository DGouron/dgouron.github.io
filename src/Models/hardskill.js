class Hardskill extends ResumeItem{
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
            separatorPoint.title = data.content;
        newItem.appendChild(separatorPoint);
        let newContent = document.createElement('p');
            newContent.innerText = data.content;
        newItem.appendChild(newContent);
        super.setItem(newItem);
    }
}