let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
console.log(hours, minutes, seconds);

setTime(seconds, "second");
setTime(minutes, "minute");
setTime(hours, "hour");

function setTime(left, hand) {
    switch(hand) {
        case 'second':
            offset = -6 * left;
            break;
        case 'minute':
            offset = 6 * left;
            break;
        case 'hour':
            offset = 30 * left;           
            break;
    }
  document.querySelector("div.offset__"+hand).style.cssText = "transform: rotate("+offset+"deg);";
}
