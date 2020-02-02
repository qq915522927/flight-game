import enemyImg from "../../images/enemy.png"
import Animation from "../base/animation"
import { databus } from '../global'
import CONST from "../const"
import img1 from "../../images/explosion1.png"
import img2 from "../../images/explosion2.png"
import img3 from "../../images/explosion3.png"
const ENEMY_IMG_SRC = enemyImg
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60

const EXPLO_IMG_PREFIX  = 'images/explosion'
const EXPLO_FRAME_COUNT = 3
let images:any[] = [img1, img2, img3]
const __ = {
  speed: Symbol('speed')
}

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)

    this.initExplosionAnimation()
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
    this.y = -this.height

    this[__.speed] = speed

    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames:any[] = []


    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(images[i])
    }

    this.initFrames(frames)
  }

  // 每一帧更新子弹位置
  update() {
    this.y += this[__.speed]

    // 对象回收
    if ( this.y > CONST.SCREEN_HEIGHT + this.height )
      databus.removeEnemey(this)
  }
}
