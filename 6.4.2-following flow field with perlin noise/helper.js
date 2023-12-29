export function lineTo(ctx,x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeSytle="black"
    ctx.stroke();
    
}
export function getRandomColor() {
  // Generate random values for red, green, and blue components
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var color= "rgba("+red+","+ green+","+blue+","+"1)"
  // Convert the values to hexadecimal and format the color string
  // var color = '#' + red.toString(16) + green.toString(16) + blue.toString(16);

  return color;
}
export function getOppositeColor(inputColor) {
  // Remove the '#' if present
  inputColor = inputColor.replace("#", "");

  // Convert the hexadecimal color to decimal
  var decimalColor = parseInt(inputColor, 16);

  // Calculate the opposite color by XOR with white (0xFFFFFF)
  var oppositeColor = (0xFFFFFF ^ decimalColor).toString(16).toUpperCase();

  // Add leading zeros if needed
  while (oppositeColor.length < 6) {
    oppositeColor = "0" + oppositeColor;
  }

  // Add the '#' back
  return "#" + oppositeColor;
}
export function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }
  
  export function generateGaussianRandom(mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
      var y1;
      if (use_last) {
        y1 = y2;
        use_last = false;
      } else {
        var x1, x2, w;
        do {
          x1 = 2.0 * Math.random() - 1.0;
          x2 = 2.0 * Math.random() - 1.0;
          w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);
        w = Math.sqrt((-2.0 * Math.log(w)) / w);
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = true;
      }
  
      var retval = mean + stdev * y1;
      if (retval > 0)
        return retval;
      return -retval;
    }
  }
  
  export class Pvector{
    constructor(x,y){
    this.x=x;
    this.y=y;
    }
    copy(){
      return new Pvector(this.x,this.y)
    }
    add(vec2){
    this.x+=vec2.x;
    this.y+=vec2.y;
    }
    sub(vec2){
    this.x=this.x-vec2.x;
    this.y=this.y-vec2.y;
    }
    mult(num){
      this.x=this.x*num;
      this.y=this.y*num;
    }
    div(num){
      this.x=this.x/num;
      this.y=this.y/num;
    }
    subvector(vec2){
    let retvec=new Pvector(this.x,this.y)
    retvec.sub(vec2)
    return retvec;
    }
    mag(){
      return Math.sqrt(this.x*this.x+this.y*this.y)
    }
    normalize(){
    let currmag=this.mag()
    if(currmag==0){
    this.x=1
    }
    else{
      this.x=this.x/currmag;
      this.y=this.y/currmag;
    }
    }
    setmag(num){
      this.normalize()
      this.x*=num;
      this.y*=num;
    }
    limit(num){
      if(this.mag()>=num){
        this.setmag(num)
      }
    }
    constrain(num1,num2){
      if(this.mag()<=num1){
        this.setmag(num1)
      }
      if(this.mag()>=num2){
        this.setmag(num2)
      }
    }
    angle(){
      if(this.x<0){
        return Math.PI+Math.atan(this.y/this.x)
      }
      else{
        return Math.atan(this.y/this.x)
      }
    }
    setAngle(angle){
      let mag=this.mag()
      this.x=Math.cos(angle)
      this.y=Math.sin(angle)
      this.setmag(mag)
    }
    }

    export function drawArrow(ctx,x, y, length, angle) {
      var radians=angle
      // Calculate arrow coordinates
      var x2 = x + length * Math.cos(radians);
      var y2 = y + length * Math.sin(radians);
  
      // Draw the line
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
  
      // Draw the arrowhead
      var arrowSize = 5;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - arrowSize * Math.cos(radians - Math.PI / 6), y2 - arrowSize * Math.sin(radians - Math.PI / 6));
      ctx.lineTo(x2 - arrowSize * Math.cos(radians + Math.PI / 6), y2 - arrowSize * Math.sin(radians + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
  }
    export class Queue {
      constructor() {
        this.items = [];
      }
    
      enqueue(element) {
        this.items.push(element);
      }
    
      dequeue() {
        if (this.isEmpty()) {
          return "Queue is empty";
        }
        return this.items.shift();
      }
    
      front() {
        if (this.isEmpty()) {
          return "Queue is empty";
        }
        return this.items[0];
      }
    
      isEmpty() {
        return this.items.length === 0;
      }
    
      size() {
        return this.items.length;
      }
    
      // Access i-th element without removing it
      accessElement(index) {
        if (index < 0 || index >= this.size()) {
          return "Invalid index";
        }
        return this.items[index];
      }
    }
    export function  drawTriangle(ctx,x1,y1,x2,y2,size){//x2,y2 is the direction in which triangle is drawn  and x1,y1, is kind of like the center
      let location=new Pvector(x1,y1)
      let direction=new Pvector(x2,y2)
      direction.sub(location)
      direction.setmag(size)
      let angle=10
      angle=angle*Math.PI/180
      
      
      // /_\ ax,ay is the head  x1,y1 is the center
      let a=direction.copy()
      a.add(location)
     
      
      
      // ctx.beginPath()
      // ctx.moveTo(x1,y1)
      // ctx.lineTo(a.x,a.y)
      // ctx.stroke()
      
      // /_\ bx,by is the left size  x1,y1 is the center
      
      let b=direction.copy()
      let bangle=b.angle()
      b.setAngle(bangle+angle)
      b.setmag(2*size)
      b.mult(-1)
      b.add(a)
      ctx.beginPath()//connection a to b
      ctx.moveTo(a.x,a.y)
      ctx.lineTo(b.x,b.y)
      ctx.stroke()
      
      // /_\ cx,cy is the right size  x1,y1 is the center
      let c=direction.copy()
      let cangle=c.angle()
      c.setAngle(cangle-angle)
      c.setmag(2*size)
      c.mult(-1)
      c.add(a)
      ctx.beginPath()//connection a to c
      ctx.moveTo(a.x,a.y)
      ctx.lineTo(c.x,c.y)
      ctx.stroke()
      
      ctx.beginPath()//connection b to c
      ctx.moveTo(b.x,b.y)
      ctx.lineTo(c.x,c.y)
      ctx.stroke()
      }