export default class Sprite {
    protected img:HTMLImageElement;
    protected height:number;
    protected width:number;
    protected x:number;
    protected y:number;
    protected visible:boolean;

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
  }