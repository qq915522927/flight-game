export default class Sprite {
    public img:HTMLImageElement;
    public height:number;
    public width:number;
    public x:number;
    public y:number;
    public visible:boolean;

    constructor(imgSrc = '', width=  0, height = 0, x = 0, y = 0) {
      this.img     = new Image()
      this.img.src = imgSrc
  
      this.width  = width
      this.height = height
  
      this.x = x
      this.y = y
  
      this.visible = true
    }
  
    /**
     * 将精灵图绘制在canvas上
     */
    drawToCanvas(ctx:CanvasRenderingContext2D) {
      if ( !this.visible )
        return
      ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
      /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
    isCollideWith(sp:Sprite) {
        let p4 = [
            {x: sp.x, y: sp.y},
            {x: sp.x + sp.width, y: sp.y},
            {x: sp.x + sp.width, y: sp.y + sp.height},
            {x: sp.x, y: sp.y + sp.height},
        ]

        if ( !this.visible || !sp.visible )
            return false
        for (let index = 0; index < 4; index++) {
            let spX = p4[index].x
            let spY = p4[index].y

            let res:Boolean = Boolean(spX >= this.x
                    && spX <= this.x + this.width
                    && spY >= this.y
                    && spY <= this.y + this.height  )
            if(res)
                return res
        }
        let p4_this = [
            {x: this.x, y: this.y},
            {x: this.x + this.width, y: this.y},
            {x: this.x + this.width, y: this.y + this.height},
            {x: this.x, y: this.y + this.height},
        ]

        for (let index = 0; index < 4; index++) {
            let spX = p4_this[index].x
            let spY = p4_this[index].y

            let res:Boolean = Boolean(spX >= sp.x
                    && spX <= sp.x + sp.width
                    && spY >= sp.y
                    && spY <= sp.y + sp.height  )
            if(res)
                return res
        }
        return false

    }
  }