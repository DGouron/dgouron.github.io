/* 
/  Copyright all right reserved Damien Gouron - 2022
/  
*/
const configColorPicker = './config/config_color_picker.json';

function getRandomColor(configFileName = null) {
    if(configFileName == null){
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }else{
        //TO DO
    }
}

function getPercentage(value1 = 0, value2 = 0, roundResult = true){
    if(roundResult){
        return Math.round((value1 * 100) / value2);
    }
    else{
        return (value1 * 100) / value2;
    }
    
}

