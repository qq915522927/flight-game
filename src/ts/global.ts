
import Databus from "./databus"
import CONST from "./const"
let canvas = <HTMLCanvasElement>document.getElementById('game')
canvas.width = CONST.SCREEN_WIDTH;
canvas.height = CONST.SCREEN_HEIGHT;
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')

let databus = new Databus()
export {canvas, ctx, databus};