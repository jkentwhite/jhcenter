let xoff, yoff = 10;
let chains = [];
let numChains = 50;
let rectW, rectH;

let bg, fg, a;
let vmin, vmax;

const mq = window.matchMedia( "(min-width: 1000px)" );


function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = color(0);
  background(bg);  
  noFill();
  noCursor();
  strokeWeight(1);
  
  rectW = width*0.8;
  rectH = height*0.8;
  rectX = width*0.1;
  rectY = height*0.1;
  
  
  
  if(mq.matches){
  	vmin = width*0.010;
  	vmax = width*0.0101;
  } else {
	vmin = 9;
	vmax = 11;
  }
  
  for(let i  = 0; i < numChains; i++){
    let vary = random(0.5,1.5);
    let varx = int(random(vmin, vmax));
    a = int(random(100,200));
    fg = color(255,229,180,a);
    chains.push(new Chain(varx, vary, fg));
  }
}

function draw() {

  background(bg);
  stroke(255,229,180, 100);
  rect(rectX,rectY, rectW, rectH);

  chains.forEach(chain => {
    chain.drawChain();
  });
}

class Chain {

  constructor(x, y, c){
    this.xvar = x;
    this.yvar = y;
    this.c = c;
  }

  drawChain(){
    stroke(this.c);
    beginShape();
  
    xoff = 0;
    for(let x = -10; x <= width+10; x+=this.xvar){
      let y = map(noise(xoff, yoff-this.yvar), 0, 1, 100, height-100);
      vertex(x, y * this.yvar);
      xoff += 0.02;
    }
    yoff += 0.00002;
    endShape();
  }
}
