import $ from "jquery"
import {canvas, ctx, databus} from "./global"
import BackGround from "./runtime/background"
import Player from "./player"
import Enemy from "./npc/enemy"
import "../css/style.css"

export default class Main {
    private bg:BackGround;
    private player:Player
    private aniId:number;
    private gameOver:boolean
    constructor() {
      // 维护当前requestAnimationFrame的id
      this.aniId    = 0
      this.gameOver = false
  
      this.restart()
    }
  
    restart() {
      databus.reset()
      this.bg = new BackGround(ctx)
      this.player = new Player()
      this.gameOver = false
  
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
      databus.bullets.forEach((item)=>{
          item.drawToCanvas(ctx)
      })
      databus.enemys.forEach((item)=>{
          item.drawToCanvas(ctx)
      })
      databus.animations.forEach((item)=>{
          if(item.isPlaying)
            item.aniRender(ctx)
      })
    //   this.player.drawToCanvas(ctx)
  
    }
  
    // 游戏逻辑更新主函数
    update() {
  
      for(let bullte of databus.bullets.keys()){
          for(let enemy of databus.enemys.keys()){
              if(bullte.isCollideWith(enemy)){
                  bullte.visible = false
                  enemy.playAnimation()
                  break
              }
          }
      }
        for(let enemy of databus.enemys.keys()){
            if(enemy.isCollideWith(this.player)){
                this.gameOver = true
                return
            }
        }
      this.bg.update()
      this.player.update()
      databus.bullets.forEach((item)=>{
          item.update()
      })
      databus.enemys.forEach((item)=>{
          item.update()
      })
      if(databus.frame % 20 === 0){
          this.player.shoot()
      }
      this.enemyGenerate()
  
    }
  
    // 实现游戏帧循环
    loop() {
        if(this.gameOver)
            return
        databus.frame += 1
  
      this.update()
      this.render()
  
      this.aniId = window.requestAnimationFrame(
        this.loop,
      )
    }
    enemyGenerate() {
        if ( databus.frame % 10 === 0 ) {
          let enemy = databus.pool.getItemByClass('enemy', Enemy)
          enemy.init(6)
          databus.enemys.add(enemy)
        }
      }

  }

new Main()