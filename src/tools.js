/* 
/  Copyright all right reserved Damien Gouron - 2022
/  
*/
const configColorPicker = './config/config_color_picker.json';

function getRandomColor(configFileName = null) {
    return configFileName == null ? '#' + (Math.random() * 0xFFFFFF << 0).toString(16) : null; //TO DO
}

function getPercentage(value1 = 0, value2 = 0, roundResult = true){
    if(value1 == 0 || value2 == 2){ return 0;}
    return roundResult ?  Math.round((value1 * 100) / value2) : (value1 * 100) / value2 ;
}

