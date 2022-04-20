class Volonteer extends ResumeItem{
    constructor(data){
        super();
        super.setData(data.title);
        this.makeItem(data);
    }

    makeItem(data){
        let newItem = document.createElement('div');
            newItem.classList.add('resumeItem');
        let separatorPoint = document.createElement('img');
            separatorPoint.alt = data.title;
            separatorPoint.src = "./img/resume/blackpoint.gif";
            separatorPoint.title = data.title;
        newItem.appendChild(separatorPoint);
        let newContent = document.createElement('p');
        if(data.actual){
            newContent.innerHTML = "<strong>"+data.years + " </strong> (En cours) - "+ data.title + " - " + data.location;
        }else{
            newContent.innerHTML = "<strong>"+data.years + " </strong>- "+ data.title + " - " + data.location;
        }
         
        newItem.appendChild(newContent);
        super.setItem(newItem);
    }
}