class Interest extends ResumeItem{
    constructor(data){
        super();
        super.setData(data.title);
        this.makeItem(data);
    }

    makeItem(data){
        let newItem = document.createElement('div');
        let newIcone = document.createElement('img');
            newIcone.classList.add('interestItem');
            newIcone.alt = data.title;
            newIcone.src = './img/resume/'+data.icone+'.png';
            newIcone.title = data.title;

        if(data.link != ""){
            let newLink = document.createElement('a');
                newLink.href = data.link;
                newLink.setAttribute('target', '_blank');
                newLink.appendChild(newIcone);
            newItem.appendChild(newLink);
        }else{
            newItem.appendChild(newIcone);
        }
        
        super.setItem(newItem);
    }
}