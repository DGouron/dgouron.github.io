
class ResumeFactory {
    constructor(data, type){
        switch(type){
            case 'Hardskill':
                return new Hardskill(data);
            case 'Softskill':
                return new Softskill(data);
            case 'PersonnalInformation':
                return new PersonalInformation(data);
            case 'Certification':
                return new Certification(data);
            case 'Interest':
                return new Interest(data);
            default: 
                throw 'Unknown type format';
        }
    }

    GetData(){
        console.log('test');
    }
}

class ResumeItem{
    constructor(){}
    printData(){
        console.table(this.data);
    }
    setData(data){
        this.data = data;
    }
    setItem(item){
        this.item = item;
    }
    getItem(){
        return this.item;
    }
    item = undefined;
    data = undefined;
}