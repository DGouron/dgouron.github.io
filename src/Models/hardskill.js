class Hardskill extends ResumeItem{
    constructor(data){
        super();
        super.setData(data.title);
        this.makeItem(data);
    }

    makeItem(data){
        let newItem = document.createElement('div');
        if(data.icone != ""){
            let newIcone = document.createElement('img');
                newIcone.src = data.icone;
                newIcone.title = data.title;
            newItem.appendChild(newIcone);
        }

        let newContent = document.createElement('p');
            newContent.innerText = data.content;
        newItem.appendChild(newContent);
        super.setItem(newItem);
    }
}