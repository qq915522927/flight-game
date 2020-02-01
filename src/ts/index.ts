import $ from "jquery"
import BackGround from "./runtime/background"
import "../css/style.css"
import imgSrc from "../images/bg.jpg"

let img = <HTMLImageElement>document.getElementById('img')
img.src = imgSrc
let canvas = <HTMLCanvasElement>document.getElementById('game')
canvas.width = 400;
canvas.height = 400;
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
export default class Main {
    private bg:BackGround;
    private aniId:number;
    constructor() {
      // 维护当前requestAnimationFrame的id
      this.aniId    = 0
  
      this.restart()
    }
  
    restart() {
  
      this.bg = new BackGround(ctx)
  
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
  
    }
  
    // 游戏逻辑更新主函数
    update() {
  
      this.bg.update()
  
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