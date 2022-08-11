export default class Enemy { // 적 기본 클래서 내보내기.
  constructor(x, y, imageNumber) {  // x와 y에 x에 할당할 이미지 번호
    this.x = x; // x 는 x와 같다
    this.y = y; // y 는 y와 같다
    this.width = 44; // 적 높이 너비
    this.height = 32;

    this.image = new Image(); // 적 이미지 할당.
    this.image.src = `images/enemy${imageNumber}.png`; // 적 이미지 불러오기
  }

  draw(ctx) {  // 적 이미지 그리기.
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
// 적 이동 메서드는 x속도와 y 속도로 움직임.
  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
  }

  collideWith(sprite) {
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
