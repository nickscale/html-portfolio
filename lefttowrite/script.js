// on DOM loading initialise fields and local storage
document.addEventListener("DOMContentLoaded", () => {

    // default today field to today's date
    let todayDate = new Date();
    document.getElementById('date-today').valueAsDate = todayDate;

    // check localStorage and update fields accordingly

    // verify localStorage
    if (localStorage.length == 0) {
        console.log("localStorage on load is empty");
    } else {
        console.log("localStorage on load is:",localStorage);
    }

    // check for currentWords
    if (localStorage.getItem("currentWords") == null) {
        // none saved, SET default value
        currentWords = 1000;
        localStorage.setItem("currentWords",currentWords);
        console.log("SET DEFAULT currentWords",currentWords);
    } else {
        // else GET currentWords from storage
        currentWords = localStorage.getItem("currentWords");
    }
    document.getElementById('words-current').value = currentWords;

    // check for targetWords
    if (localStorage.getItem("targetWords") == null) {
        // none saved, SET default value
        targetWords = 5000;
        localStorage.setItem("targetWords",targetWords);
        console.log("SET DEFAULT targetWords",targetWords);
    } else {
        // else GET targetWords from storage
        targetWords = localStorage.getItem("targetWords");
    }
    document.getElementById('words-target').value = targetWords;

    // check for daysPerWeek - NOT YET IMPLEMENTED
    // if (localStorage.getItem("daysPerWeek") == null) {
    //     // none saved, SET default value7
    //     daysPerWeek = 7;
    //     localStorage.setItem("daysPerWeek",daysPerWeek);
    // } else {
    //     // else GET daysPerWeek from storage
    //     daysPerWeek = localStorage.getItem("daysPerWeek");
    // }
    // document.getElementById('days-per-week').value = daysPerWeek;

    // check daysToDate
    if (localStorage.getItem("daysToDate") == null) {
        // none saved, SET default value
        daysToDate = 10;
        localStorage.setItem("daysToDate",daysToDate);
        console.log("SET DEFAULT daysToDate",daysToDate);
    } else {
        // else GET daysToDate from storage
        daysToDate = localStorage.getItem("daysToDate");
    }
    document.getElementById('days-to-date').value = daysToDate;

    // check startDate
    let startDate = todayDate;
    if (localStorage.getItem("startDate") == null) {
        // none saved, set default (today - 10 days)
        startDate.setDate(todayDate.getDate() - 10);
        localStorage.setItem("startDate",startDate);
        console.log("SET DEFAULT startDate",startDate);
    } else {
        // load it from local Storage
        startDate = new Date(localStorage.getItem("startDate"));
    }
    document.getElementById('date-start').valueAsDate = startDate;

    let targetDate = todayDate;
    if (localStorage.getItem("targetDate") == null) {
        // none saved, set default (today + 30 days)
        startDate.setDate(todayDate.getDate() + 30);
        localStorage.setItem("targetDate",targetDate);
        console.log("SET DEFAULT targetDate",targetDate);
    } else {
        // load it from local Storage
        targetDate = new Date(localStorage.getItem("targetDate"));
    }
    document.getElementById('date-target').valueAsDate = targetDate;

    // set non-localStorage values to placeholder value
    document.getElementById("progress-percent").innerHTML = "";
    document.getElementById("rate-current").innerHTML = "TBD";
    document.getElementById("pages-current").innerHTML = "TBD";
    document.getElementById("date-predicted").innerHTML = "You should finish by TBD";
    document.getElementById("rate-required").innerHTML = "TBD";

    update();
});


/* RECALCULATE OUTPUT VALUES WHEN ANY FIELD IS UPDATED */

function update(elementID) {

    console.log('What changed:',elementID);

    // user can change the current date, say if they are planning ahead
    todayDate = document.getElementById('date-today').valueAsDate;

    // grab and save current field values
    currentWords = document.getElementById('words-current').value;
    localStorage.setItem("currentWords", currentWords);
    targetWords = document.getElementById('words-target').value;
    localStorage.setItem("targetWords", targetWords);
    daysToDate = document.getElementById('days-to-date').value;
    localStorage.setItem("daysToDate",daysToDate);
    startDate = document.getElementById('date-start').valueAsDate;
    localStorage.setItem("startDate", startDate);
    targetDate = document.getElementById('date-target').valueAsDate;
    localStorage.setItem("targetDate", targetDate);

    // daysPerWeek -- NOT IMPLEMENTED
    // daysPerWeek = document.getElementById('days-per-week option:selected').value;
    // localStorage.setItem("daysPerWeek", daysPerWeek);

    // calculate current completion percentage and degrees
    currentPercent = Math.floor(100 * currentWords / targetWords)
    document.getElementById("progress-percent").innerHTML = currentPercent + "%";
    currentDegrees = Math.floor(currentPercent * 360 / 100);
    document.documentElement.style.setProperty("--progress-degrees", currentDegrees + "deg");

    // calculate daysElapsed - either daysToDate, or days between startDate and todayDate
    if(document.getElementById('choose-days-to-date').checked) {
        // if user has selected number of days
        daysElapsed = daysToDate;
    } else if(document.getElementById('choose-date-start').checked) {
        // if user has selected a start date
        daysElapsed = diff_in_days(startDate, todayDate);
    }
    
    // calculate current word rate
    currentRate = Math.floor(currentWords / daysElapsed);
    if (isFinite(currentRate)) {
        document.getElementById("rate-current").innerHTML = currentRate;
    } else {
        document.getElementById("rate-current").innerHTML = "∞";
    }

    // calculate current page rate
    // assuming 275 words per pages, then rounded to nearest 0.5 pages
    currentPages = 0.5 * Math.round(2 * currentRate / 275);
    if (isFinite(currentPages)) {
        document.getElementById("pages-current").innerHTML = currentPages;
    } else {
        document.getElementById("pages-current").innerHTML = "∞";
    }

    // calculate predicted finish date
    currentProgress = currentWords / targetWords;
    switch(true) {
        case (currentProgress < 0.001):
            document.getElementById('date-predicted').innerHTML = "You've got a way to go...";
            break;
        case (currentProgress > 1):
            document.getElementById('date-predicted').innerHTML = "You already exceeded your target!";
            break;
        default:
            predictedDate = new Date(todayDate);
            addedDays = (targetWords - currentWords) / currentRate;
            predictedDate.setDate(predictedDate.getDate() + addedDays);
            document.getElementById('date-predicted').innerHTML = "You should finish by <strong>"+niceDate(predictedDate)+"</strong>.";
    }

    // calculate required rate
    daysRemaining = diff_in_days(targetDate,todayDate);
    console.log('daysRemaining',daysRemaining);
    requiredRate = (targetWords - currentWords) / daysRemaining;
    if (isFinite(requiredRate)) {
        document.getElementById("rate-required").innerHTML = Math.floor(requiredRate);
    } else {
        document.getElementById("rate-required").innerHTML = "∞";
    }

    // calculate required page rate
    // assuming 275 words per pages, then rounded to nearest 0.5 pages
    requiredPages = 0.5 * Math.round(2 * requiredRate / 275);
    if (isFinite(requiredPages)) {
        document.getElementById("pages-required").innerHTML = requiredPages;
    } else {
        document.getElementById("pages-required").innerHTML = "∞";
    }

}

// clear localstorage
document.getElementById('reset').onclick = function(){
    console.log('Resetting form and clearing localStorage');
    localStorage.clear();
    location.reload();
}

// return absolute difference in days between two dates
function diff_in_days(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    difference = Math.floor((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));
    return Math.abs(difference);
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

// determine whether ordinal suffix is -st, -nd or -rd
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