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
        console.log("localStorage contains:",localStorage);
    }

    // check for daysPerWeek
    if (localStorage.getItem("daysPerWeek") == null) {
        // none saved, SET default value7
        daysPerWeek = 7;
        localStorage.setItem("daysPerWeek",daysPerWeek);
        console.log("SET DEFAULT daysPerWeek",daysPerWeek);
    } else {
        // else GET daysPerWeek from storage
        daysPerWeek = localStorage.getItem("daysPerWeek");
    }
    document.getElementById('days-per-week').value = daysPerWeek;
    
    // check for currentWords
    if (localStorage.getItem("currentWords") == null) {
        // none saved, SET default value
        currentWords = 1500;
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
        targetWords = 10000;
        localStorage.setItem("targetWords",targetWords);
        console.log("SET DEFAULT targetWords",targetWords);
    } else {
        // else GET targetWords from storage
        targetWords = localStorage.getItem("targetWords");
    }
    document.getElementById('words-target').value = targetWords;

    // check chooseDaysToDate radio button
    if (localStorage.getItem("chooseDaysToDate") == null) {
        // none saved, SET default value
        chooseDaysToDate = true;
        localStorage.setItem("chooseDaysToDate",chooseDaysToDate);
        console.log("SET DEFAULT chooseDaysToDate",chooseDaysToDate);
    } else {
        // else GET chooseDaysToDate from storage
        chooseDaysToDate = localStorage.getItem("chooseDaysToDate");
    }
    document.getElementById('choose-days-to-date').checked = chooseDaysToDate;

    // check chooseStartDate radio button
    if (localStorage.getItem("chooseStartDate") == null) {
        // none saved, SET default value
        chooseStartDate = false;
        localStorage.setItem("chooseStartDate",chooseStartDate);
        console.log("SET DEFAULT chooseStartDate",chooseStartDate);
    } else {
        // else GET chooseDaysToDate from storage
        chooseStartDate = localStorage.getItem("chooseStartDate");
    }
    document.getElementById('choose-start-date').checked = chooseStartDate;

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
    document.getElementById('start-date').valueAsDate = startDate;

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

    console.log('What changed?',elementID);

    // user can change the current date, say if they are planning ahead
    todayDate = document.getElementById('date-today').valueAsDate;

    // grab and save current field values
    currentWords = document.getElementById('words-current').value;
    localStorage.setItem("currentWords", currentWords);
    targetWords = document.getElementById('words-target').value;
    localStorage.setItem("targetWords", targetWords);
    chooseDaysToDate = document.getElementById('choose-days-to-date').checked;
    localStorage.setItem("chooseDaysToDate",chooseDaysToDate);
    chooseStartDate = document.getElementById('choose-start-date').checked;
    localStorage.setItem("chooseStartDate", chooseStartDate);
    daysToDate = document.getElementById('days-to-date').value;
    localStorage.setItem("daysToDate",daysToDate);
    startDate = document.getElementById('start-date').valueAsDate;
    localStorage.setItem("startDate", startDate);
    targetDate = document.getElementById('date-target').valueAsDate;
    localStorage.setItem("targetDate", targetDate);

    // daysPerWeek
    daysPerWeek = document.getElementById("days-per-week").value;
    localStorage.setItem("daysPerWeek", daysPerWeek);

    // calculate current completion percentage and degrees
    currentPercent = Math.floor(100 * currentWords / targetWords)
    document.getElementById("progress-percent").innerHTML = currentPercent + "%";
    currentDegrees = Math.floor(currentPercent * 360 / 100);
    document.documentElement.style.setProperty("--progress-degrees", currentDegrees + "deg");

    // calculate daysElapsed - either daysToDate, or days between startDate and todayDate
    if(document.getElementById('choose-days-to-date').checked) {
        // if user has selected number of days
        daysElapsed = daysToDate;
    } else if(document.getElementById('choose-start-date').checked) {
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
    // assuming 275 words per pages, then rounded to nearest 0.25 pages
    currentPages = 0.25 * Math.round(4 * currentRate / 275);
    if (isFinite(currentPages)) {
        document.getElementById("pages-current").innerHTML = currentPages;
    } else {
        document.getElementById("pages-current").innerHTML = "∞";
    }

    // calculate predicted finish date
    currentProgress = currentWords / targetWords;
    switch(true) {
        case (currentProgress < 0.001):
            document.getElementById('date-predicted').innerHTML = "<strong>You've got a long way to go...</strong>";
            break;
        case (currentProgress > 1):
            document.getElementById('date-predicted').innerHTML = "<strong>You already exceeded your target!</strong>";
            break;
        default:
            predictedDate = new Date(todayDate);
            addedDays = (targetWords - currentWords) / currentRate;

            if(document.getElementById('choose-days-to-date').checked) {
                // If user selected 'total writing days' then all
                // of these days were writing days.
                predictedDate.setDate(predictedDate.getDate() + addedDays);
            } else if(document.getElementById('choose-start-date').checked) {
                // If user selected 'by start date' then we must add on the
                // number of non-writing days to the estimated finish date.
                addedNonWorkDays = (7 - daysPerWeek) * Math.floor(addedDays/7); 
                predictedDate.setDate(predictedDate.getDate() + addedDays + addedNonWorkDays);
            }
            document.getElementById('date-predicted').innerHTML = "You should finish by <strong>"+niceDate(predictedDate)+"</strong>.";
    }

    // calculate required rate
    daysRemaining = diff_in_days(targetDate,todayDate);

    if(document.getElementById('choose-days-to-date').checked) {
        // If user selected 'total writing days' then all
        // of these days were writing days.
        requiredRate = (targetWords - currentWords) / (daysRemaining);
    } else if(document.getElementById('choose-start-date').checked) {
        // If user selected 'by start date' then we must add on the
        // number of non-writing days to the estimated finish date.
        daysNotWorking = (7 - daysPerWeek) * Math.floor(daysRemaining/7); 
        requiredRate = (targetWords - currentWords) / (daysRemaining - daysNotWorking);
    }

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

    console.log('localStorage after update:',localStorage);

}

// clear localstorage
function resetForm(){
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

// determine ordinal suffix -st, -nd or -rd
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