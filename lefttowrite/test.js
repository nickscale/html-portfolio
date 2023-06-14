$(document).ready( function() {

    // to SET date field, assign string format YYYY-MM-DD
    todayDate = new Date();    
    document.getElementById('date-input').valueAsDate = todayDate;
    console.log("SET todayDate:", todayDate);

});

function update() {
    // let x = Number($("#number1").val());
    // let y = Number($("#number2").val());
    // let result = x + y;
    // $("#result").text(result);
    // console.log(`x:${x},y:${y},result:${result}`);

    // GET date field
    let todayDateEntry = document.getElementById('date-input').valueAsDate;
    console.log("GET todayDateEntry:", todayDateEntry);

    // console.log(diff_in_days('2014-04-02', '2014-04-11'));

}

function diff_in_days(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    difference = Math.floor((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));
    return Math.abs(difference);
}

function dateToString(thisDate) {
    //console.log("Converting date "+ thisDate);
    dateString = thisDate.getFullYear().toString() + '-' + (thisDate.getMonth() + 1).toString().padStart(2, 0) +
    '-' + thisDate.getDate().toString().padStart(2, 0);
    return dateString;
}
