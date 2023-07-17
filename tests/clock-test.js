let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let timeString = hours+':'+minutes+':'+seconds;
console.log(timeString);

setTime(seconds, "second");
setTime(minutes, "minute");
setTime((hours%12) + (minutes/60), "hour");

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
  document.getElementById("digital").textContent = timeString;
}
