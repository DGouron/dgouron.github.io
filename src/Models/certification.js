class Certification extends ResumeItem{
    constructor(data){
        super();
        super.setData(data.title);
        this.makeItem(data);
    }

    makeItem(data){
        let newItem = document.createElement('div');
            newItem.classList.add('rightBarResumeItem');
        let newIcone = document.createElement('img');
            newIcone.src = './img/resume/'+data.icone;
        newItem.appendChild(newIcone);
        let newTitle = document.createElement('h2');
            newTitle.innerText = data.title;
        newItem.appendChild(newTitle);
        super.setItem(newItem);
    }
}