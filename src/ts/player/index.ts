import Sprite from '../base/sprite'
import CONST from "../const"
import HeroImg from '../../images/hero.png'
import Bullet from './bullet'
import { databus } from '../global'

const screenWidth = CONST.SCREEN_WIDTH
const screenHeight = CONST.SCREEN_HEIGHT

// 玩家相关常量设置
const PLAYER_IMG_SRC = HeroImg
const PLAYER_WIDTH = 80
const PLAYER_HEIGHT = 80

interface Speed{
    x:number
    y:number
}

export default class Player extends Sprite {
    private v:Speed;
    private step:number;
    constructor() {
        super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

        // 玩家默认处于屏幕底部居中位置
        this.x = screenWidth / 2 - this.width / 2
        this.y = screenHeight - this.height - 30
        this.step = 3
        this.v = {x:0, y:0}


        // 初始化事件监听
        this.initEvent()
    }
    shoot() {
        let bullet = databus.pool.getItemByClass('bullet', Bullet)
        bullet.init(
          this.x + this.width / 2 - bullet.width / 2,
          this.y - 10,
          4
        )
        databus.bullets.add(bullet)
      }
    update(){
        this.movePlanePosition(this.v.x, this.v.y)
    }
    /** move the plane
     * 限定飞机的活动范围限制在屏幕中
     */
    movePlanePosition(x, y) {
        let disX = this.x + x
        let disY = this.y + y

        if (disX < 0)
            disX = 0

        else if (disX > screenWidth - this.width)
            disX = screenWidth - this.width

        if (disY <= 0)
            disY = 0

        else if (disY > screenHeight - this.height)
            disY = screenHeight - this.height

        this.x = disX
        this.y = disY
    }

    /**
     * 玩家响应手指的触摸事件
     * 改变战机的位置
     */
    initEvent() {
        window.addEventListener('keydown', ((e: KeyboardEvent) => {
            e.preventDefault()
            let keys: number = e.keyCode
            if (keys == 38 || keys == 87) {
                // up
                this.v.y =  - this.step
            } else if (keys == 39 || keys == 68) {
                // right
                this.v.x =  this.step

            } else if (keys == 40 || keys == 83) {
                // down
                this.v.y =  this.step
            } else if (keys == 37 || keys == 65) {
                // left
                this.v.x =  -this.step
            } else {
                ;
            }

        }).bind(this))

        window.addEventListener('keyup', ((e: KeyboardEvent) => {
            e.preventDefault()
            let keys: number = e.keyCode
            if (keys == 38 || keys == 87) {
                // up
                this.v.y =  0
            } else if (keys == 39 || keys == 68) {
                // right
                this.v.x =  0

            } else if (keys == 40 || keys == 83) {
                // down
                this.v.y =  0
            } else if (keys == 37 || keys == 65) {
                // left
                this.v.x =  0
            } else {
                ;
            }

        }).bind(this))
    }

}
