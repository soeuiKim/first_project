// 캔버스 세팅
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

/* 
캔버스 상단 좌측부터 우측으로 X +
캔버스 상단부터 하단까지 Y +
*/
canvas.width = 300;
canvas.height = 400;

document.body.appendChild(canvas); //캔버스 그리기

//배경이미지 세팅
let backgroundImage, spaceshipImage, bulletImage, gameOverImage, alienImage, alien2Image, alien3Image, ufoImage;
function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "image/sky.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "image/fighter.png";

    bulletImage = new Image();
    bulletImage.src = "image/bullet.png";

    gameOverImage = new Image();
    gameOverImage.src = "image/game-over.jpg";

    alienImage = new Image();
    alienImage.src = "image/alien.png";

    alien2Image = new Image();
    alien2Image.src = "image/alien2.png";

    alien3Image = new Image();
    alien3Image.src = "image/alien3.png";

    ufoImage = new Image();
    ufoImage.src = "image/ufo.png";
}

loadImage(); // 이미지 호출

// 우주선좌표
let fighterX = canvas.width/2 - 32;
let fighterY = canvas.height - 64;

// 배경화면, 우주선 그리기
function render() {    
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, fighterX, fighterY);
}

function main() {
    render();
    requestAnimationFrame(main);
}

main(); // 그리기 호출

// 총알좌표
let bulletX = 0 ;
let bulletY = 0 ;

// 총알 그리기
function renderBullet() { 
    ctx.drawImage(bulletImage, bulletX, bulletY);
    const bulletAni = requestAnimationFrame(renderBullet); // 총알 그리기

    bulletY -= 10; // 총알 위치 옮기기
    // console.log(bulletY); // 위치확인
    if (bulletY <= -16) {
        cancelAnimationFrame(bulletAni); // 애니메이션 중지
    }
}


let randAlienX = Math.floor(Math.random() * canvas.width);
let randAlienY = 0;
function renderAlien() {
    ctx.drawImage(alienImage, randAlienX, randAlienY);
    randAlienY += 1;
    const alienAni = requestAnimationFrame(renderAlien);
    if (randAlienY >= canvas.height) {
        cancelAnimationFrame(alienAni);
        randAlienX = Math.floor(Math.random() * canvas.width);
        randAlienY = 0;
        renderAlien();
    }
}

let randAlien2X = Math.floor(Math.random() * canvas.width);
let randAlien2Y = 0;
function renderAlien2() {    
    ctx.drawImage(alien2Image, randAlien2X, randAlien2Y);
    randAlien2Y += 3;
    const alienAni = requestAnimationFrame(renderAlien2);
    if (randAlien2Y >= canvas.height) {
        cancelAnimationFrame(alienAni);
        randAlien2X = Math.floor(Math.random() * canvas.width);
        randAlien2Y = 0;
        renderAlien2();
    }
}

let randAlien3X = Math.floor(Math.random() * canvas.width);
let randAlien3Y = 0;
function renderAlien3() {    
    ctx.drawImage(alien3Image, randAlien3X, randAlien3Y);
    randAlien3Y += 2;
    const alienAni = requestAnimationFrame(renderAlien3);
    if (randAlien3Y >= canvas.height) {
        cancelAnimationFrame(alienAni);
        randAlien3X = Math.floor(Math.random() * canvas.width);
        randAlien3Y = 0;
        renderAlien3();
    }
}

let randUfoX = Math.floor(Math.random() * canvas.width);
let randUfoY = 0;
function renderUfo() {    
    ctx.drawImage(ufoImage, randUfoX, randUfoY);
    randUfoY += 6;
    const alienAni = requestAnimationFrame(renderUfo);
    if (randUfoY >= canvas.height) {
        cancelAnimationFrame(alienAni);
        randUfoX = Math.floor(Math.random() * canvas.width);
        randUfoY = 0;
        renderUfo();
    }
}
renderAlien();
renderAlien2();
renderAlien3();
renderUfo();

// 방향키 누르면
// 우주선의 좌표가바뀌고
// 다시 render그려준다

document.onkeydown = function(e) {
    switch (e.code) {
        case "ArrowUp" :
            fighterY -= 5 ;
            render();
            break;
        case "ArrowDown" :
            fighterY += 5 ;
            render();
            break;
        case "ArrowRight" :
            fighterX += 5 ;
            render();
            break;
        case "ArrowLeft" :
            fighterX -= 5 ;
            render();
            break;
        case "Space" :
            bulletX = fighterX + 24;
            bulletY = fighterY - 16;
            renderBullet();
            break;
    }
};