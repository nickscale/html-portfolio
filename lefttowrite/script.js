$(document).ready( function() {

    setCopyrightYear();

    // default today field to today's date
    let todayDate = new Date();
    document.getElementById('date-today').valueAsDate = todayDate;

    // load startDate from localStorage
    let startDate = todayDate;
    if (localStorage.getItem("startDate") === null) {
        // if none saved, default to 10 days before todayDate
        startDate.setDate(todayDate.getDate() - 10);
        localStorage.setItem("startDate",startDate);
        console.log("SET startDate:",localStorage.setItem("startDate"));
    } else {
        // load it from local Storage
        let startDate = new Date(localStorage.getItem("startDate"));
        console.log("GET startDate:",localStorage.getItem("startDate"));

    }
    document.getElementById('date-start').valueAsDate = startDate;

    // load targetDate from localStorage
    let targetDate = new Date();
    if (localStorage.getItem("targetDate") != null) {
        targetDate = new Date(localStorage.getItem("targetDate"));
    } else {
        // otherwise default it to 30 days after todayDate
        targetDate = new Date(todayDate);
        targetDate.setDate(targetDate.getDate() + 30);
    }
    document.getElementById('date-target').valueAsDate = targetDate;
    
    // load currentWords from local storage
    if (localStorage.getItem("currentWords") != null) {
        currentWords = new Date(localStorage.getItem("currentWords"));
        document.getElementById('words-current').value = currentWords;
    } else {
        // otherwise default it to 5000
        document.getElementById('words-current').value = 5000;
    }

    // load targetWords from local storage
    let targetWords = 10000;
    if (localStorage.getItem("currentWords") != null) {
        targetWords = new Date(localStorage.getItem("currentWords"));
        document.getElementById('words-target').value = targetWords;
    } else {
        // otherwise default it to 10000
        document.getElementById('words-target').value = 10000;
    }

    
    $('#days-current').val(10);
    $("#rate-current").text("");
    $("#date-predicted").text(String(todayDate).slice(0, 15));
    $("#rate-required").text("");

    update();
});

function update() {

    // daysPerWeekField = $('#days-per-week option:selected');

    // this lets user change the current date, say if they are planning ahead
    todayDate = document.getElementById('date-today').valueAsDate;

    // calculate daysElapsed
    if(document.getElementById('choose-days-current').checked) {
        // if user has selected number of days
        daysElapsed = document.getElementById('days-current').value;
        localStorage.setItem("daysElapsed",daysElapsed);
    } else if(document.getElementById('choose-date-start').checked) {
        // if user has selected a start date
        startDate = document.getElementById('date-start').valueAsDate;
        localStorage.setItem("startDate", startDate);
        daysElapsed = diff_in_days(startDate, todayDate);
    }
    
    // calculate currentRate
    currentWords = document.getElementById('words-current').value;
    currentRate = (currentWords / daysElapsed);
    if (isFinite(currentRate)) {
        $("#rate-current").text(Math.floor(currentRate));
    } else {
        $("#rate-current").text("TBD");
    }

    // calculate predicted finish date
    targetWords = document.getElementById('words-target').value;
    localStorage.setItem("targetWords", targetWords);
    predictedDate = new Date(todayDate);
    addedDays = (targetWords - currentWords) / currentRate;
    predictedDate.setDate(predictedDate.getDate() + addedDays);
    $('#date-predicted').text(niceDate(predictedDate));

    // calculate required rate
    targetDate = document.getElementById('date-target').valueAsDate;
    localStorage.setItem("targetDate", targetDate);
    daysRemaining = diff_in_days(targetDate,todayDate);
    requiredRate = (targetWords - currentWords) / daysRemaining;
    if (isFinite(requiredRate)) {
        $("#rate-required").text(Math.floor(requiredRate));
    } else {
        $("#rate-required").text("TBD");
    }
}


/* general useful functions */

// return absolute difference in days between two dates
function diff_in_days(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    difference = Math.floor((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));
    return Math.abs(difference);
}

// return a nice date string, e.g. 'Saturday 22nd July 2021'
function niceDate(thisDate) { 
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday","Sunday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    thisDayOfWeek = days[thisDate.getUTCDay()];
    thisDayNumber = thisDate.getUTCDate();
    
    // add suffix to day
    let lastDigit = thisDayNumber.toString().slice(-1);
    switch (lastDigit) {
        case "1":
            suffix = "st";
            break;
        case "2":
            suffix = "nd";
            break;
        case "3":
            suffix = "rd";
            break;
        default:
            suffix = "th";
    }

    thisMonth = months[(thisDate.getMonth() + 1)];
    thisYear = thisDate.getUTCFullYear();
    dateString = `${thisDayOfWeek} ${thisDayNumber}${suffix} ${thisMonth} ${thisYear}`;
    return dateString
}

function setCopyrightYear() {
    let thisYear = new Date();
    document.getElementById("copyright-year").textContent = thisYear.getUTCFullYear();
}