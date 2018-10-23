import Sprite from '../base/sprite'
import DataBus from '../databus'
import Ball from '../npc/ball'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg_.jpg'
const BG_WIDTH = 1024
const BG_HEIGHT = 1024

const databus = new DataBus()
const { xys } = databus
xys.sx = BG_WIDTH / 2
xys.sy = BG_HEIGHT / 2
xys.px = BG_WIDTH / 2
xys.py = BG_HEIGHT / 2


/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor() {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    // // 目标坐标，相对于bg
    // this.sx = this.width / 2
    // this.sy = this.height / 2

    // // 目前坐标，相对于bg
    // this.px = this.width / 2
    // this.py = this.height / 2

    this.speed = 2

    // this.render(ctx)

    this.initEvent()
  }

  update() {
    const { speed } = this
    const { sx, sy, px, py } = xys
    const dx = sx - px
    const dy = sy - py
    const distance = Math.sqrt(dx * dx + dy * dy)

    // if (distance < 5) {
    //   return {
    //     x: screenWidth / 2 - dx,
    //     y: screenHeight / 2 - dy,
    //     visible: false
    //   }
    // }

    // xys.px += dx * speed / distance
    // xys.py += dy * speed / distance
    // return {
    //   x: screenWidth / 2 - xys.px + sx,
    //   y: screenHeight / 2 - xys.py + sy,
    //   visible: true
    // }

    if (distance < 5) {
      xys.visible = false
      return
    }
    xys.px += dx * speed / distance
    xys.py += dy * speed / distance
    xys.visible = true
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    const { px, py } = xys
    const bx = px - (screenWidth / 2)
    const by = py - (screenHeight / 2)
    // ctx.drawImage(
    //   this.img,
    //   bx,
    //   by,
    // )

    // ctx.save();

    ctx.drawImage(
      this.img,
      bx,
      by,
      screenWidth,
      screenHeight,
      0,
      0,
      screenWidth,
      screenHeight
    )

    // ctx.rotate((2 * Math.PI) / (5 * 60) * 10)
    // ctx.restore();


    // ctx.save();
    // ctx.fillStyle = '#09F'       // 在原有配置基础上对颜色做改变
    // ctx.fillRect(50, 50, 100, 100); // 使用新的设置绘制一个矩形
    // ctx.save();
    // ctx.translate(200,200);
    // ctx.fillRect(50, 50, 100, 100);
    // ctx.restore();


    // ctx.drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0,
    //   -screenHeight + this.top,
    //   screenWidth,
    //   screenHeight
    // )

    // ctx.drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0,
    //   this.top,
    //   screenWidth,
    //   screenHeight
    // )
  }

  setSign(x, y) {
    const { px, py } = xys
    let sx = px - screenWidth / 2 + x
    let sy = py - screenHeight / 2 + y
    if (sx < 0) {
      sx = 0
    }
    if (sx > this.width) {
      sx = this.width
    }
    if (sy < 0) {
      sy = 0
    }
    if (sy > this.height) {
      sy = this.height
    }
    xys.sx = sx
    xys.sy = sy
  }

  setBall() {
    if (databus.balls.length >= 10) {
      return
    }
    const ball = databus.pool.getItemByClass('ball', Ball)
    const bx = this.width * Math.random()
    const by = this.height * Math.random()
    const br = 20 + 20 * Math.random()
    ball.init(bx, by, br)
    databus.balls.push(ball)
  }

  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      // console.log(e)
      e.preventDefault()
    }).bind(this))
    canvas.addEventListener('touchmove', ((e) => {
      // console.log(e)
      e.preventDefault()
    }).bind(this))
    canvas.addEventListener('touchend', ((e) => {
      // console.log(e)
      e.preventDefault()
      const x = e.changedTouches[0].clientX
      const y = e.changedTouches[0].clientY
      this.setSign(x, y)
    }).bind(this))
  }

}
