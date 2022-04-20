class PersonalInformation extends ResumeItem{
    constructor(data){
        super();
        super.setData(data.title);
        this.makeItem(data);
    }

    makeItem(data){
        let newItem = document.createElement('div');
            newItem.classList.add('personnalInformationItem');

        if(data.isLink){
            let newLink = document.createElement('a');
                newLink.setAttribute('href', data.content);
                newLink.title = data.title;
            newLink.setAttribute('target', '_blank');
            newLink.classList.add('personalInformationLink');

            if(data.icone != ""){
                let newIcone = document.createElement('img');
                    newIcone.classList.add('personalInformationIcone');
                    newIcone.src = data.icone;
                    newIcone.alt = data.title;
                    newIcone.title = data.title;
                newLink.appendChild(newIcone);
            }

            newItem.appendChild(newLink);
        }
        else{
            if(data.icone != ""){
                let newIcone = document.createElement('img');
                    newIcone.classList.add('personalInformationIcone');
                    newIcone.src = data.icone;
                    newIcone.title = data.title;
                newItem.appendChild(newIcone);
            }     
        }
        
        let newContent = document.createElement('p');
                newContent.innerText = data.content;
                newContent.classList.add('personnalInformationContent');
                newItem.appendChild(newContent);
        
        super.setItem(newItem);
    }
}