let cvs = document.getElementById("canvas");
let ctx = cvs.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();


bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
pipeBottom.src = 'img/pipeBottom.png';


// Звуковые файлы
let fly = new Audio();
let scoreAudio = new Audio();

fly.src = 'audio/fly.m3'
scoreAudio.src = 'audio/CHP.mp3'

let gap = 90;

// При нажатии на кнопку
document.addEventListener("keydown", moveUp)

function moveUp() {
    yPos -= 30;
    fly.play().then();
}


// Создание блоков
let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

let score = 0;

// Позиция питчки
let xPos = 10;
let yPos = 150;
let grav = 0.9;


function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)

        pipe[i].x--;

        if(pipe[i].x === 20) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        // Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y
            + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Перезагрузка страницы
        }

        if(pipe[i].x === 5) {
            score++
            scoreAudio.play().then()
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = '#000';
    ctx.font = '24px Verdana';
    ctx.fillText('Счет: ' + score, 10, cvs.height - 20)



    requestAnimationFrame(draw);
}


draw()


pipeBottom.onload = draw;