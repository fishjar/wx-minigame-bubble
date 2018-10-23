import DataBus from '../databus'
const databus = new DataBus()
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

export default class Tips {
  constructor() {
    this.visible = true
    this.text = "test text!!"
  }

  update() {
    this.text = `hit ${databus.score}`
  }

  render(ctx) {
    if (!this.visible) {
      return
    }
    ctx.fillStyle = "#666"
    ctx.font = "20px Arial"

    ctx.fillText(
      this.text,
      10,
      20
    )
  }

}

