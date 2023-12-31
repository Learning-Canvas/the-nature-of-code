import {Pvector,lineTo} from './helper.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

let center=new Pvector(innerWidth/2,innerHeight/2)
let mouse=new Pvector(0,0)

canvas.addEventListener("mousemove",(e)=>{
mouse.x=e.clientX
mouse.y=e.clientY
})
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    lineTo(c,center.x,center.y,mouse.x,mouse.y)
}
animate()