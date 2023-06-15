let data = {
    canvas: null,
    context: null,
    clickedDot: null,
    dots: [{x: 100, y: 150}, {x: 200, y: 250}, {x: 200, y: 100}, {x: 100, y: 200}]
};

function circleCollision (thisCircle, thisClick) {
    let a = thisCircle.r + thisClick.r;
    let x = thisCircle.x - thisClick.x;
    let y = thisCircle.y - thisClick.y;
    
    distance = Math.sqrt((x*x)+(y*y));

    if (a > distance) {
        return true;
    } else {
        return false;
    }
}

function prepCanvas () {
    let resolution = window.devicePixelRatio || 1; // = 2
    let scale = 1 / resolution;

    data.canvas = document.getElementById('dots');
    data.context = data.canvas.getContext('2d');
    
    data.canvas.width = window.innerWidth * resolution;
    data.canvas.height = window.innerHeight * resolution;
    data.canvas.style.width = window.innerWidth + 'px';
    data.canvas.style.height = window.innerHeight + 'px';
    
    data.context.scale(resolution, resolution);
    
    data.canvas.addEventListener('mousedown', function (event) {
        checkForDot(event);
    });
}

function drawDots () {
    let i = 0;
    for (; i < data.dots.length; i++) {
        let d = data.dots[i];
        data.context.beginPath();
        data.context.arc(d.x, d.y, 10, 0, 2*Math.PI);
        data.context.fillStyle = '#777';
        data.context.fill();
        data.context.closePath();
    }
}
function drawLine (toDot) {
    data.context.beginPath();
    data.context.moveTo(data.clickedDot.x, data.clickedDot.y);
    data.context.lineTo(toDot.x, toDot.y);
    data.context.lineWidth = 5;
    data.context.strokeStyle = '#777';
    data.context.stroke();
    data.context.closePath();
}

function checkForDot (event) {
    console.clear();
    let i = 0;
    let collision = null;
    console.log(event.pageX, event.pageY);
    for (; i < data.dots.length; i++) {
        let d = data.dots[i];
        let thisCircle = {x: d.x, y: d.y, r: 10};
        let thisClick = {x: event.pageX, y: event.pageY, r: 10};

        if (circleCollision(thisCircle, thisClick)){
            collision = d;
        }
    }
    if (collision !== null) {
        if (data.clickedDot !== null) drawLine(collision);
        data.clickedDot = collision;
    } else data.clickedDot = null;
}

prepCanvas();
drawDots();
