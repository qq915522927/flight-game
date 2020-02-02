import Pool from "./base/pool"
import Bullet from "./player/bullet"
import Animation from "./base/animation"
import Enemy from "./npc/enemy"
/**
 * 全局状态管理器
 */
let instance:DataBus;

export default class DataBus {
    pool: Pool;
    frame: number;
    score: number;
    bullets: Set<Bullet>;
    animations: Animation[];
    enemys: Set<Enemy>
    constructor() {
      if ( instance )
        return instance
  
      instance = this
  
      this.pool = new Pool()
  
      this.reset()
    }
  
    reset() {
      this.frame      = 0
      this.score      = 0
      this.bullets    = new Set()
      this.enemys = new Set()
      this.animations = []
    }
  
    /**
     * 回收子弹，进入对象池
     * 此后不进入帧循环
     */
    removeBullets(bullet) {
  
        this.bullets.delete(bullet)
        bullet.visible = false
  
        this.pool.recover('bullet', bullet)
    }
    removeEnemey(enemy) {
  
        this.enemys.delete(enemy)
        enemy.visible = false
  
        this.pool.recover('enemy', enemy)
    }
  }
  