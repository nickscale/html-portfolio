// variables for fields
var theForm = document.forms["data-entry"];
var todayField = $('#todays-date');
var daysPerWeekField = $('#days-per-week option:selected');
var currentWordsField = $('#current-words');
var targetWordsField = $('#target-words');
var currentDaysField = $('#current-days');
var startDateField = $('#start-date');
var targetDateField = $('#target-date');
var daysTotal = 

console.log("currentWords: " + currentWordsField.value);

// calculation variables
var date = new Date();
var daysPerWeek = daysPerWeekField.text();
var currentWords = currentWordsField.value;
var targetWords = targetWordsField.value;
var currentDays = currentDaysField.value;
var startDate = startDateField.value;
var targetDate = targetDateField.value;



$(document).ready( function() {

    var date = new Date();
    todayDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);
    todayField.value = todayDate;
    yesterdayDate = todayDate-1;

    startDateField.value = (todayDate-1);
    targetDateField.value = (todayDate+100);

    // DEBUG
    console.log("DEBUG daysPerWeek:" + daysPerWeek + " currentWords:" + currentWords + " targetWords:" + targetWords + " currentDays:" + currentDays + " startDate:" + startDate + " targetDate:" + targetDate);

    // console.log("Today, yesterday: " +  todayDate, yesterdayDate);

});

function recalculate() {

    daysElapsed = todayDate - startDate;
    currentRate = currentWords / daysElapsed;

    estimatedFinishDate = todayDate + (targetWords - currentWords)*currentRate; 

    var date_diff_indays = function(date1, date2) {
        dt1 = new Date(date1);
        dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        }
        console.log(date_diff_indays('04/02/2014', '11/04/2014'));
        console.log(date_diff_indays('12/02/2014', '11/04/2014'));


    var targetDate = moment([2007, 0, 29]);
    var todayDate = moment([2007, 0, 28]);
    targetDate.diff(todayDate, 'days')   // =1

    daysUntilTarget = targetDate - todayDate;
    requiredRate = (targetWords - currentWords) / daysUntilTarget;


    $("current-rate").text = currentRate;
    $("estimated-finish").text = estimatedFinishDate;
    $("required-rate").text = requiredRate; 

};