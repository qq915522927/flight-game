import Sprite from "../base/sprite"

const screenWidth  = 400
const screenHeight = 400

const BG_IMG_SRC   = require("../../images/bg.jpg").default
const BG_WIDTH     = 400
const BG_HEIGHT    = 400

export default class BackGround extends Sprite {
    private top:number;
    private bg_img:any;

    constructor(ctx) {
        super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
        this.top = 0
    
        this.render(ctx)
      }
    
      update() {
        this.top += 5
    
        if ( this.top >= screenHeight )
          this.top = 0
      }
    
      /**
       * 背景图重绘函数
       * 绘制两张图片，两张图片大小和屏幕一致
       * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
       * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
       */
      render(ctx) {
        ctx.drawImage(
          this.img,
          0,
          0,
          this.width,
          this.height,
          0,
          -screenHeight + this.top,
          screenWidth,
          screenHeight
        )
    
        ctx.drawImage(
          this.img,
          0,
          0,
          this.width,
          this.height,
          0,
          this.top,
          screenWidth,
          screenHeight
        )
      }
    }

