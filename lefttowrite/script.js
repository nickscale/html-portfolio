$(document).ready( function() {
    setCopyrightYear();

    // default today field to today's date
    let todayDate = new Date();
    document.getElementById('date-today').valueAsDate = todayDate;

    // default startDate to 10 days before todayDate
    let startDate = new Date(todayDate);
    startDate.setDate(startDate.getDate() - 10);
    document.getElementById('date-start').valueAsDate = startDate;

    // default targetDate to 30 days after todayDate
    let targetDate = new Date(todayDate);
    targetDate.setDate(targetDate.getDate() + 30);
    document.getElementById('date-target').valueAsDate = targetDate;
    
    // set initial values for other fields
    document.getElementById('words-current').value = 5000;

    $('#words-target').val(10000);
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
    } else if(document.getElementById('choose-date-start').checked) {
        // if user has selected a start date
        startDate = document.getElementById('date-start').valueAsDate;
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
    predictedDate = new Date(todayDate);
    addedDays = (targetWords - currentWords) / currentRate;
    predictedDate.setDate(predictedDate.getDate() + addedDays);
    $('#date-predicted').text(niceDate(predictedDate));

    // calculate required rate
    targetDate = document.getElementById('date-target').valueAsDate;
    daysRemaining = diff_in_days(targetDate,todayDate);
    requiredRate = (targetWords - currentWords) / daysRemaining;
    if (isFinite(requiredRate)) {
        $("#rate-required").text(Math.floor(requiredRate));
    } else {
        $("#rate-required").text("TBD");
    }
}

// calculate the absolute difference in days between two dates
function diff_in_days(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    difference = Math.floor((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));
    return Math.abs(difference);
}

function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

// returns a nice date string, e.g. 'Saturday 22nd July 2021'
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

    thisMonth = months[(thisDate.getUTCMonth() + 1)];
    thisYear = thisDate.getUTCFullYear();
    dateString = `${thisDayOfWeek} ${thisDayNumber}${suffix} ${thisMonth} ${thisYear}`;
    return dateString
}

function addSeparators(thisNumber) {
    return thisNumber.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function setCopyrightYear() {
    let thisYear = new Date();
    $("#copyright-year").text(thisYear.getUTCFullYear());
}