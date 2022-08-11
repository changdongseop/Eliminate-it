export default class Player { // 플레이어 내보내기.
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;

  constructor(canvas, velocity, bulletController) { // 플레이어 위치 설정하기
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 60;
    this.height = 60;
    this.image = new Image();
    this.image.src = "images/player.png";

    document.addEventListener("keydown", this.keydown); // 플레이어 조작키
    document.addEventListener("keyup", this.keyup);
  }
// 그리기 메서드에서 이동키와 총알과 컨드럴러
  draw(ctx) { 
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
    }
    this.move();  // 키도드 이벤트에 대한 응답을 담당할 무브 메서드 호출.
    this.collideWithWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
// 벽과 충돌하는 매서드 정의.
  collideWithWalls() {
    //left
    if (this.x < 0) {
      this.x = 0;
    }

    //right
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  move() { // 무브 메서드 정의하기.
    if (this.rightPressed) {
      this.x += this.velocity;
    } else if (this.leftPressed) {
      this.x += -this.velocity;
    }
  }
// 키다운 이벤트 정의한다. 이때 반드시 화살표 함수 꼭 사용해야한다 이유는 현재 객체에 바인딩 해야 하므로
  keydown = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = true;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = true;
    }
    if (event.code == "Space") {
      this.shootPressed = true;
    }
  };

  keyup = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = false;
    }
    if (event.code == "Space") {
      this.shootPressed = false;
    }
  };
}
