
import CONST from "./const"
let canvas = <HTMLCanvasElement>document.getElementById('game')
canvas.width = CONST.SCREEN_WIDTH;
canvas.height = CONST.SCREEN_HEIGHT;
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')

export {canvas, ctx};