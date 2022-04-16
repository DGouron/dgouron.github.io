class Interest extends ResumeItem{
    constructor(data){
        super();
        super.setData(data.title);
        this.makeItem(data);
    }

    makeItem(data){
        let newItem = document.createElement('div');
        let newTitle = document.createElement('h1');
            newTitle.innerText = data.title;
        newItem.appendChild(newTitle);
        super.setItem(newItem);
    }
}