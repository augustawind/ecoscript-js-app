export default class Sprite {
  constructor({ image, width, height, x, y }) {
    this.image = image
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }

  render(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
