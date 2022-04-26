/* 
/  Copyright all right reserved Damien Gouron - 2022
/  
*/
const configColorPicker = './config/config_color_picker.json';
let colorsData = [];

fetch(configColorPicker)
    .then(res => res.json())
    .then(data => colorsData = data)

function getRandomColor(useConfigFile = true) {
    
    let color = Math.round(Math.random() * (colorsData.length-1 - 0) + 0);
    return useConfigFile == false ? '#' + (Math.random() * 0xFFFFFF << 0).toString(16) : colorsData[color].value;
}

function getPercentage(value1 = 0, value2 = 0, roundResult = true){
    let result = roundResult ?  Math.round((value1 * 100) / value2) : (value1 * 100) / value2 ;
    if(result != 0 && !result > 0){ return 0}
    else{return result}
}

const days = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
];

function getDay(){
    let date = new Date();
    let day = days[date.getDay()-1];

    return day;
}
