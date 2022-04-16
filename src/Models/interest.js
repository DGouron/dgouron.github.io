class Interest extends ResumeItem{
    constructor(data){
        super();
        super.setData(data.title);
        this.makeItem(data);
    }

    makeItem(data){
        let newItem = document.createElement('div');
        let newIcone = document.createElement('img');

            newIcone.src = './img/resume/'+data.icone+'.GIF';
            newIcone.title = data.title;

        if(data.link != ""){
            let newLink = document.createElement('a');
                newLink.href = data.link;
                newLink.appendChild(newIcone);
            newItem.appendChild(newLink);
        }else{
            newItem.appendChild(newIcone);
        }
        
        super.setItem(newItem);
    }
}