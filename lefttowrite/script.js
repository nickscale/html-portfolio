$(document).ready( function() {
    // INITIALISE ALL FIELDS
    // to SET date field, assign string format YYYY-MM-DD
    let todayDate = new Date();
    document.getElementById('date-today').valueAsDate = todayDate;
    document.getElementById('date-start').valueAsDate = todayDate;
    document.getElementById('date-target').valueAsDate = todayDate;
    
    // set initial values for other fields
    document.getElementById('words-current').value = 5000;
    console.log('ready() currentWords is ',document.getElementById('words-current').value);

    $('#words-target').val(10000);
    $('#days-current').val(100);
    $("#rate-current").text("______");
    $("#date-predicted").text(String(todayDate).slice(0, 15));
    $("#rate-required").text("______");

    //update();
    console.log("Initialized all fields");
});

function update() {

    let daysPerWeekField = $('#days-per-week option:selected');

    todayDate = document.getElementById('date-today').valueAsDate;

    // calculate daysElapsed
    startDate = document.getElementById('date-start').valueAsDate;
    daysElapsed = diff_in_days(startDate, todayDate);

    // calculate currentRate
    currentWords = document.getElementById('words-current').value;
    currentRate = Math.floor(currentWords / daysElapsed);
    console.log("date-today,date-start,daysElapsed:", todayDate, startDate, daysElapsed, currentWords, currentRate);
    $("#rate-current").text(currentRate);

    // calculate predicted finish date
    targetWords = document.getElementById('words-target').value;
    predictedDate = todayDate + ((targetWords - currentWords) / currentRate);
    $("#date-predicted").text(predictedDate);


    // calculate finish date = today + ((targetWords - currentWords)*currentRate)
    estimatedFinishDate = 100;

    // DEBUG
    // console.log("DEBUG today:" + date-today + " daysPerWeek:" + daysPerWeek + " currentWords:" + currentWords + " targetWords:" + targetWords + " currentDays:" + currentDays + " startDate:" + startDate + " targetDate:" + targetDate);

}

function dateToString(thisDate) {
    //console.log("Converting date "+ thisDate);
    dateString = thisDate.getFullYear().toString() + '-' + (thisDate.getMonth() + 1).toString().padStart(2, 0) +
    '-' + thisDate.getDate().toString().padStart(2, 0);
    return dateString;
}

function diff_in_days(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    difference = Math.floor((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));
    return Math.abs(difference);
}