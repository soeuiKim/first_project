// 캔버스 세팅
let canvas;
let ctx;

canvas = document.createElement("canvas"); //도화지
ctx = canvas.getContext("2d"); //그림그리는 역할

/* 
캔버스 상단 좌측부터 우측으로 X +
캔버스 상단부터 하단까지 Y +
*/
canvas.width = 300;
canvas.height = 500;

document.body.appendChild(canvas); //캔버스 그리기

let gameOver = false; // true 게임끝\
let score = 0;

//배경이미지 세팅
let backgroundImage,
  spaceshipImage,
  bulletImage,
  gameOverImage,
  alienImage,
  alien2Image,
  alien3Image,
  ufoImage;
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "image/sky.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src = "image/fighter.png";

  bulletImage = new Image();
  bulletImage.src = "image/bullet.png";

  gameOverImage = new Image();
  gameOverImage.src = "image/gameOver.png";

  alienImage = new Image();
  alienImage.src = "image/alien.png";

  alien2Image = new Image();
  alien2Image.src = "image/alien2.png";

  alien3Image = new Image();
  alien3Image.src = "image/alien3.png";

  ufoImage = new Image();
  ufoImage.src = "image/ufo.png";
}

// 전투기좌표
let fighterX = canvas.width / 2 - 32;
let fighterY = canvas.height - 64;

// 배경화면, 전투기 그리기
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, fighterX, fighterY);
  ctx.fillText(`Score:${score}`,10,20);
  ctx.fillStyle="white";
  ctx.font="15px Arial";

  for( let i = 0; i < bulletList.length; i++){
    if (bulletList[i].alive) {
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }

  for( let i = 0; i < alienList.length; i++){
    ctx.drawImage(alienImage, alienList[i].x, alienList[i].y);
  }
}


// 방향키 누르면
// 전투기의 좌표가바뀌고
// 다시 render그려준다

let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
    // console.log("누른 키", keysDown);
  });

  document.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
    // console.log("누른 후", keysDown);

    if (e.keyCode == 32){
        createBullet(); // 총알 생성
    }
  });
}

/*
총알만들기
1) 스페이스바누르면 총알발사
2) 총알이 발사 = 총알의 y값 --, x값은 스페이스바 누른 순간 전투기의 x값
3) 발사된 총알들은 총알 배열에 저장
4) 총알들은 x,y좌표값이 있어야함
5) 총알배열을 가지고 render
*/
let bulletList = [] //총알저장 리스트
function Bullet() {
    this.x = 0;
    this.y = 0;

    this.init = function() {
        this.x = fighterX + 25;
        this.y = fighterY;

        this.alive = true; // true면 살아있는 총알
        bulletList.push(this);
    }

    this.update = function() {
        this.y -= 7;
    }

    this.checkHit = function() {
        for(let i = 0; i < alienList.length; i++) {
            if(this.y <= alienList[i].y && this.x >= alienList[i].x && this.x <= alienList[i].x + 40) {
                score++;
                this.alive = false;
                alienList.splice(i, 1);
            }
        }
    }

}

function createBullet() {
    let b = new Bullet();
    b.init();
}

function update() {
  if (39 in keysDown) {
    fighterX += 5;
  } // right

  if (37 in keysDown) {
    fighterX -= 5;
  } // left

  if (fighterX > canvas.width - 64) {
    fighterX = canvas.width - 64;
  }

  if (fighterX <= 0) {
    fighterX = 0;
  }

  //총알 y좌표 update함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
        bulletList[i].update();
        bulletList[i].checkHit();
    }
  }

  //외계인
  for (let i = 0; i < alienList.length; i++) {
    alienList[i].update();
  }
}

/* 외계인 만들기 */
function RandomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max-min-1)) + min;
    // console.log("randomNum",randomNum)
    return randomNum;
}

let alienList=[]
function alien() {
    this.x = 0;
    this.y = 0;

    this.init = function() {
        this.x = RandomValue(0, canvas.width - 40); //랜덤좌표
        this.y = 0;
        alienList.push(this);
    }

    this.update = function() {
        this.y += 2;

        if(this.y >= canvas.height - 40) {
            gameOver = true;
        }
    }
}

function createAlien() {
    const interval = setInterval(function(){
        let e = new alien();
        e.init();
    }, 1000);
}


function main() {
    if (gameOver == false) {
        update(); //좌표값 업데이트
        render(); //그려주기
        requestAnimationFrame(main);
    } else {
        ctx.drawImage(gameOverImage, 10, 50, 280, 280);
    }
}

loadImage(); // 이미지 호출
setupKeyboardListener();
createAlien(); // 외계인 호출
main(); // 그리기 호출

/*
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
*/
