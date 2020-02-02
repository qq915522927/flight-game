import Sprite from "../base/sprite"
import bulletImg from "../../images/bullet.png"
import {databus} from "../global"

const BULLET_IMG_SRC = bulletImg
const BULLET_WIDTH = 10
const BULLET_HEIGHT = 10

export default class Bullet extends Sprite {
    private speed:number
    constructor() {
      super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
    }
  
    init(x, y, v) {
      this.x = x
      this.y = y
  
      this.speed = v
  
      this.visible = true
    }
  
    // 每一帧更新子弹位置
    update() {
      this.y -= this.speed
  
      // 超出屏幕外回收自身
      if ( this.y < -this.height )
        databus.removeBullets(this)
    }
  }
  