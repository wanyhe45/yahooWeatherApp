
var today = new Date();
var month = new Array();
//var time = today.getHours() + ":" + today.getMinutes();
var time = today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
    date = (new Date().toString().split(' ').splice(1,2).join(' ')), 
    year = today.getFullYear();

document.querySelector('.time').innerHTML = "Today " + time;
document.querySelector('#date').innerHTML = date + ", " + year;

document.querySelector('.mobiletime').innerHTML = "Today " + time;

function init() { 
    var range = document.getElementById("range"); 
    var rangeWidth = range.clientWidth; 
    var steppers = document.getElementsByClassName("stepper"); 
    var n = steppers.length; 
    left = 0
    for (i = 0; i < n; i++) { 
        left +=22;
        steppers[i] = left; 
        steppers[i].style.left = left+"px";
    }
};
init();

function leftBtn() {
    var range = document.getElementById("range"); 
    var rangeWidth = range.clientWidth; 
    var steppers = document.getElementsByClassName("stepper");
    var n = steppers.length;

    
    for (i = 0; i < n; i++) {
        var stepperWidth = steppers[i].clientWidth;
        var left = parseInt(steppers[i].style.left);

        if (left < 22) {
            left = left + stepperWidth+22;
            steppers[i] = left;
            steppers[i].style.left = left + "px";
        }
    }
}   

function rightBtn() {
    var range = document.getElementById("range"); 
    var rangeWidth = range.clientWidth; 
    var steppers = document.getElementsByClassName("stepper");
    var n = steppers.length;

    
    for (i = 0; i < n; i++) {
        var stepperWidth = steppers[i].clientWidth;
        var left = parseInt(steppers[i].style.left);

        if (left > -986) {
            left = left - stepperWidth-22;
            steppers[i] = left;
            steppers[i].style.left = left + "px";
        }
    }
}   



function gotNewPlace() {
    var newPlace = document.querySelector('#search').value;
    
    var script = document.createElement('script');
    script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+newPlace+"')&format=json&callback=callbackFunction"
	script.id = "jsonpCall";

	// remove old script
	var oldScript = document.getElementById("jsonpCall");
	if (oldScript != null) {
		document.body.removeChild(oldScript);
	}

	// put new script into DOM at bottom of body
	document.body.appendChild(script);
};
/* called when new weather arrives */

function callbackFunction(data) {
	var pgh = document.getElementById("forecast");
    	pgh.textContent = JSON.stringify(data);
    
    var city = data.query.results.channel.location.city,
        region = data.query.results.channel.location.region,
        title_temp = data.query.results.channel.item.condition.temp,
        title_desc = data.query.results.channel.item.condition.text,
        humidity = data.query.results.channel.atmosphere.humidity,
        windspeed = data.query.results.channel.wind.speed;
        
//section1
    document.querySelector('.mobile_location').innerHTML = city + "," + region;    
    document.querySelector('.location').innerHTML = city + "," + region;
    document.querySelector('.temperature').innerHTML = title_temp + "<span>\u2109</span>";
    document.querySelector('.description').innerHTML = title_desc.toLowerCase();
    document.querySelector('#humidity').innerHTML = humidity +"%";
    document.querySelector('#windspeed').innerHTML = windspeed + "mph";
    
    var sec1_code = data.query.results.channel.item.condition.code;
    var sec1_weatherImg = document.getElementsByClassName("sec1_weatherImg");
    for (var i = 0; i < sec1_weatherImg.length; i++) {
        var code = sec1_code;
        if (code === '19' || code === '20' || code === '21' || code === '22' || code === '28' || code === '26' || code === '27') {
            sec1_weatherImg[i].src = "image/cloudy.png";
        } 
        else if (code==='6' || code === '8' || code === '9' || code === '10' || code === '11' || code === '12' || code === '35' || code === '40' || code === '45') { 
            sec1_weatherImg[i].src = "image/rain.png";       
        } 
        else if (code === '7' || code === '13' || code === '14' || code === '15' || code === '16' || code === '17' || code === '18' || code === '41' || code === '42' || code === '43' || code === '46') {
            sec1_weatherImg[i].src = "image/snow.png";       
        } 
        else if (code === '23' || code === '24' || code === '25') {
            sec1_weatherImg[i].src = "image/wind.png"
        }
        else if (code === '29' || code === '30' || code === '44') {
            sec1_weatherImg[i].src = "image/part-sun.png";
        } 
        else if (code === '31' || code === '32' || code === '33'|| code === '34' || code === '36') {
            sec1_weatherImg[i].src = "image/sunny.png";
        } 
        else if (code === '3' || code === '4' || code === '37' || code === '38' || code === '39' || code === '47') {
            sec1_weatherImg[i].src = "image/thunder.png";        
        } 
        else if ( code === '0' || code === '1' || code === '2' || code === '5') {
            sec1_weatherImg[i].src = "";
        }
    }
    
//section2
    var forecast = data.query.results.channel.item.forecast;
    var allDate = document.getElementsByClassName("date");
    for (var i = 0; i < allDate.length; i++) {
        allDate[i].innerHTML = forecast[i].day;
    }
    
    var allElDesc = document.getElementsByClassName("el-desc");
    for (var i = 0; i < allElDesc.length; i++) {
        allElDesc[i].innerHTML = forecast[i].text.toLowerCase();
    }
    
    var allHighTemp = document.getElementsByClassName("left_tmp");
     for (var i = 0; i < allHighTemp.length; i++) {
        allHighTemp[i].innerHTML = forecast[i].high + "°";
    }
    
    var allLowTemp = document.getElementsByClassName("right_tmp");
     for (var i = 0; i < allLowTemp.length; i++) {
        allLowTemp[i].innerHTML = forecast[i].low + "°";
    }
    
//dynamic image
    var weatherImg = document.getElementsByClassName("weatherImg");
    for (var i = 0; i < weatherImg.length; i++) {
        var code = forecast[i].code;
        
        if (code === '19' || code === '20' || code === '21' || code === '22' || code === '28' || code === '26' || code === '27') {
            weatherImg[i].src = "image/cloudy.png";
        } 
        else if (code==='6' || code === '8' || code === '9' || code === '10' || code === '11' || code === '12' || code === '35' || code === '40' || code === '45') { 
            weatherImg[i].src = "image/rain.png";       
        } 
        else if (code === '7' || code === '13' || code === '14' || code === '15' || code === '16' || code === '17' || code === '18' || code === '41' || code === '42' || code === '43' || code === '46') {
            weatherImg[i].src = "image/snow.png";       
        } 
        else if (code === '23' || code === '24' || code === '25') {
            weatherImg[i].src = "image/wind.png"
        }
        else if (code === '29' || code === '30' || code === '44') {
            weatherImg[i].src = "image/part-sun.png";
        } 
        else if (code === '31' || code === '32' || code === '33'|| code === '34' || code === '36') {
            weatherImg[i].src = "image/sunny.png";
        } 
        else if (code === '3' || code === '4' || code === '37' || code === '38' || code === '39' || code === '47') {
            weatherImg[i].src = "image/thunder.png";        
        } 
        else if ( code === '0' || code === '1' || code === '2' || code === '5') {
            weatherImg[i].src = "";
        }
    }

};

function resize() {
    init();
    document.querySelector('#resize').style.marginLeft = "5%";
    document.querySelector('#resize').style.marginRight = "5%";
    // document.querySelector('main').style.overflow = "hidden";
    
}
