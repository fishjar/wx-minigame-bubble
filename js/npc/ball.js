import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const databus = new DataBus()
const { xys } = databus

export default class Ball {
  constructor() {
    this.x = 0
    this.y = 0
    this.radius = 0
    this.visible = true
  }

  init(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.visible = true
  }

  render(ctx) {
    const { px, py } = xys
    const { x, y } = this
    if (!this.visible) {
      return
    }
    const ax = screenWidth / 2 + (x - px)
    const ay = screenHeight / 2 + (y - py)
    const ar = this.radius
    ctx.beginPath();
    ctx.arc(ax, ay, ar, 0, Math.PI * 2, true)
    ctx.fill();
    ctx.stroke();
    // ctx.save();
    // ctx.translate(screenWidth / 2 + (x - px), screenHeight / 2 + (y - py));
    // ctx.rotate(this.degree)
    // ctx.restore();
  }

  update(index) {
    if (!this.visible){
      return
    }
    const { px, py } = xys
    const { x, y, radius } = this
    if ((Math.abs(x - px) < radius) && (Math.abs(y - py) < radius)) {
      this.visible = false
      console.log(databus.score++)
      databus.removeBalls(this,index)
    }
  }

}

