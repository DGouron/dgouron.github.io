class Certification extends ResumeItem{
    constructor(data){
        super();
        super.setData(data.title);
        this.makeItem(data);
    }

    makeItem(data){
        let newItem = document.createElement('div');
            newItem.classList.add('rightBarResumeCertificationItem');
        let newSchool = document.createElement('p');
            newSchool.innerHTML = "<img src='./img/resume/" +data.icone+"' class='certificationIcone'>"+data.title+"<br /> "+data.school;
        newItem.appendChild(newSchool);
        super.setItem(newItem);
    }
}