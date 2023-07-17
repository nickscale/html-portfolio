let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

let timeString = hours+':'+minutes+':'+seconds;
console.log(timeString);

// setTime(0, "second");
// setTime(0, "minute");
// setTime(0%12 + (0/60), "hour");
setTime(seconds, "second");
setTime((minutes%60) + (seconds/60), "minute");
setTime((hours%12) + (minutes/60), "hour");

function setTime(angle, hand) {
    switch(hand) {
        case 'second':
            offset = 180 + (6 * angle);
            break;
        case 'minute':
            offset = 180 + (6 * angle);
            break;
        case 'hour':
            offset = 180 + (30 * angle);           
            break;
    }
  document.querySelector("div.offset_"+hand).style.cssText = "transform: rotate("+offset+"deg);";
}
