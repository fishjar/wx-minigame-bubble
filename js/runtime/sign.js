import Sprite from '../base/sprite'
import DataBus from '../databus'

const databus = new DataBus()
const { xys } = databus

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const SIGN_IMG_SRC = 'images/sign.png'
const SIGN_WIDTH = 30
const SIGN_HEIGHT = 30

export default class Sing extends Sprite {
  constructor(ctx) {
    super(SIGN_IMG_SRC, SIGN_WIDTH, SIGN_HEIGHT)
    this.visible = true
  }

  update() {
    const { sx, sy, px, py, visible } = xys
    this.x = screenWidth / 2 + (sx - px) - SIGN_WIDTH / 2
    this.y = screenHeight / 2 + (sy - py) - SIGN_HEIGHT / 2
    this.visible = visible
  }
}
