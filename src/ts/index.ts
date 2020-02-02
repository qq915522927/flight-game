import $ from "jquery"
import {canvas, ctx} from "./global"
import BackGround from "./runtime/background"
import Player from "./player"
import "../css/style.css"

export default class Main {
    private bg:BackGround;
    private player:Player
    private aniId:number;
    constructor() {
      // 维护当前requestAnimationFrame的id
      this.aniId    = 0
  
      this.restart()
    }
  
    restart() {
  
      this.bg = new BackGround(ctx)
      this.player = new Player()
  
      this.loop = this.loop.bind(this)
  
      // 清除上一局的动画
      window.cancelAnimationFrame(this.aniId);
  
      this.aniId = window.requestAnimationFrame(
        this.loop,
      )
    }
  
  
  
    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      this.bg.render(ctx)
      this.player.drawToCanvas(ctx)
    //   this.player.drawToCanvas(ctx)
  
    }
  
    // 游戏逻辑更新主函数
    update() {
  
      this.bg.update()
      this.player.update()
  
    }
  
    // 实现游戏帧循环
    loop() {
  
      this.update()
      this.render()
  
      this.aniId = window.requestAnimationFrame(
        this.loop,
      )
    }
  }

new Main()