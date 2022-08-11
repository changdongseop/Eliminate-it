import EnemyController from "./EnemyController.js";  // 적 컨트롤러 js 파일에서 가져오기.
import Player from "./Player.js"; // 플레이어 가져오기
import BulletController from "./BulletController.js"; // 총알컨트롤러 가져오기

const canvas = document.getElementById("game"); // html 에서 게임 식별자로 이름을 지정한 다큐멘트 엘리맨틀리아이디를 사용해서 캔버스 가져오기.
const ctx = canvas.getContext("2d"); // 캔버스에서 ctx 선언하고 캔버스에 2d 컨텍스트 가져오기.

canvas.width = 600;   // 캔버스 너비 높이 설정.
canvas.height = 600;   // 캔버스 너비 높이 설정.

const background = new Image();   // 배경 이미지 설정.
background.src = "images/space.png"; // 배경을 불러올 주소.

// 플레이어총알조작, 적 총알조작, 적 조작 
const playerBulletController = new BulletController(canvas, 100, "yellow", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(         // 적 컨트롤러를 선언.
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController); //  플레이어 캔버스랑 속도

let isGameOver = false;
let didWin = false;

function game() {          // 게임 루프 설정하기
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // 뒷배경을 그린다. x,y 시작점 0,0 캔버스랑 동일한 너미, 높이로 설정.
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx); // 에너미컨트롤러.js 에서 계속 그리라고 알려준다
    player.draw(ctx); // 플레이어 그리기
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "대박!성공!짝짝" : "아까비!!ㅋㅋ";   //성공 or 실패 맨트 설정
    let textOffset = didWin ? 7.0 : 5; // 메세지 텍스트 크기 설정하기

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

setInterval(game, 1000 / 60);  // 게임 함수를 호출할 간격 설정.(게임루프를 60번 호출한다는 뜻.)
