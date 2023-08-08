let timeString = '';
let dateString = '';

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

timeString += hours+':'+minutes+':'+seconds;
dateString += now.getDay() + now.getDate() + now.getMonth() + now.getFullYear(); 

setTime(seconds, "second");
setTime(minutes, "minute");
setTime((hours%12) + (minutes/60), "hour");
setDigitalTime();


function setTime(angle, hand) {
    switch(hand) {
        case 'second':
            offset = 6 * angle;
            break;
        case 'minute':
            offset = 6 * angle;
            break;
        case 'hour':
            offset = 30 * angle;           
            break;
    }
  document.querySelector("div.offset_"+hand).style.cssText = "transform: rotate("+offset+"deg);";
  document.getElementById("digital-date").textContent = niceDate(now);
}

/* set time on digital clock, called by setInterval every second */
function setDigitalTime() {
    let thisTime = new Date();
    let hh = thisTime.getHours();
    let mm = thisTime.getMinutes();
    let ss = thisTime.getSeconds();

    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }

    thisTimeString = hh+":"+mm+":"+ss;
    document.getElementById("digital-time").textContent = thisTimeString;
    setTimeout(setDigitalTime, 1000);
} 

// return a nice date string, e.g. 'Saturday 22nd July 2021'
function niceDate(thisDate) { 

    // get formatted strings
    thisYear = thisDate.getUTCFullYear();
    thisMonth = thisDate.toLocaleDateString('en-UK', {month: 'long' });
    thisDayNumber = thisDate.toLocaleDateString('en-UK', {day: 'numeric'});
    thisDayOfWeek = thisDate.toLocaleDateString('en-UK', {weekday: 'long' });
    
    let suffix = ordinalSuffix(thisDayNumber)

    dateString = `${thisDayOfWeek} ${thisDayNumber}${suffix} ${thisMonth} ${thisYear}`;
    return dateString
}

// find the ordinal suffix (-st, -nd or -rd) for a given integer
function ordinalSuffix(thisNumber) {
    if (thisNumber == 11 || thisNumber == 12 || thisNumber == 13) {
        return "th";
    } else {
        let lastDigit = thisNumber.toString().slice(-1);
        switch (lastDigit) {
            case "1":
                return "st";
            case "2":
                return "nd";
            case "3":
                return "rd";
            default:
                return "th";
        }
    } 
}