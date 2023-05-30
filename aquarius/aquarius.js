var numberOfCircles = 300;

var distanceToInteract;

var circleCoordinates = [];
var circleCoordinates_new = [];

var startTime;

var timer = 20000;

var img;

var firstTime = true;
var secondTime = false;

let strokeColor;
var alphaCounter = 0;

const mq = window.matchMedia( "(min-width: 1000px)" );

var debugText;

var dark = true;

var displayText;

var cvn;

var mobile;

var chrome, safari;

function setup() {
  createCanvas(windowWidth-15, windowHeight-20);
  
  background(0);
  
  if(mq.matches){
  	distanceToInteract = width/35;
  	strokeWeight(.15);
  	textSize(48);
  	mobile =false;
  } else {
	distanceToInteract = width/20;
	strokeWeight(.25);
	textSize(64);
	mobile = true;
  }
  
   a = int(random(100,200));
  strokeColor = color(255,229,180);
  strokeColor.setAlpha(alphaCounter);
  stroke(strokeColor);

  noFill();
  
  
  
  for (var i = 0; i < numberOfCircles; i++) {
  	circleCoordinates_new[i] = [];
  	circleCoordinates[i] = [];
    circleCoordinates_new[i][0] = random(-10, width+10);
    circleCoordinates_new[i][1] = random(-10, height+10);

    circleCoordinates_new[i][2] = 2;
    
    circleCoordinates[i][0] =  circleCoordinates_new[i][0];
    circleCoordinates[i][1] =  circleCoordinates_new[i][1];
    circleCoordinates[i][2] =  circleCoordinates_new[i][2];
    
    circleCoordinates[i][0] = lerp(circleCoordinates[i][0], circleCoordinates_new[i][0], 0.025);
    circleCoordinates[i][1] = lerp(circleCoordinates[i][1], circleCoordinates_new[i][1], 0.025);
	ellipse(circleCoordinates[i][0], circleCoordinates[i][1], circleCoordinates[i][2], circleCoordinates[i][2]);


    startTime = millis();
  }
	

}
  

function draw() {
  cursor(HAND);
  background(0);
  stroke(strokeColor);
  	
  strokeColor.setAlpha(alphaCounter);
  
  for (var i = 0; i < numberOfCircles; i++) {
    
    circleCoordinates[i][2] = circleCoordinates_new[i][2];
    ellipse(circleCoordinates[i][0], circleCoordinates[i][1], circleCoordinates[i][2], circleCoordinates[i][2]);
    circleCoordinates[i][0] = lerp(circleCoordinates[i][0], circleCoordinates_new[i][0], 0.015);
    circleCoordinates[i][1] = lerp(circleCoordinates[i][1], circleCoordinates_new[i][1], 0.015);
  }
  
  


  for (var i = 0; i < numberOfCircles; i++) {

    for (var j = 0; j < numberOfCircles; j ++) {

      if (circleCoordinates[i][0] >= circleCoordinates[j][0] - distanceToInteract &&
        circleCoordinates[i][0] <= circleCoordinates[j][0] + distanceToInteract &&
        circleCoordinates[i][1] >= circleCoordinates[j][1] - distanceToInteract &&
        circleCoordinates[i][1] <= circleCoordinates[j][1] + distanceToInteract) {
        line(circleCoordinates[i][0], circleCoordinates[i][1], circleCoordinates[j][0], circleCoordinates[j][1]);
      }
    }
  }

  if (millis() - startTime >= timer) {
    for (var i = 0; i < numberOfCircles; i++) {
      circleCoordinates_new[i][0] = random(-10, width+10);
      circleCoordinates_new[i][1] = random(-10, height+10);
      
    }
    startTime = millis();
  }
  if(alphaCounter<255){
  	alphaCounter++;
  }
  
  
}



function mousePressed(){
	
  if(!mobile){
        for (var i = 0; i < numberOfCircles; i++) {
            circleCoordinates_new[i][0] = (random(width));
            circleCoordinates_new[i][1] = (random(height));
        }
  } 
 
  startTime = millis();
  
}





function touchStarted() {

  for (var i = 0; i < numberOfCircles; i++) {
    circleCoordinates_new[i][0] = (random(width));
    circleCoordinates_new[i][1] = (random(height));
  }

  startTime = millis();
  
}

function checkBrowser() { 
          
            // Get the user-agent string 
            let userAgentString =  
                navigator.userAgent; 
          
            // Detect Chrome 
            let chromeAgent =  
                userAgentString.indexOf("Chrome") > -1; 
          
            // Detect Internet Explorer 
            let IExplorerAgent =  
                userAgentString.indexOf("MSIE") > -1 ||  
                userAgentString.indexOf("rv:") > -1; 
          
            // Detect Firefox 
            let firefoxAgent =  
                userAgentString.indexOf("Firefox") > -1; 
          
            // Detect Safari 
            let safariAgent =  
                userAgentString.indexOf("Safari") > -1; 
                  
            // Discard Safari since it also matches Chrome 
            if ((chromeAgent) && (safariAgent))  
                safariAgent = false; 
          
            // Detect Opera 
            let operaAgent =  
                userAgentString.indexOf("OP") > -1; 
                  
            // Discard Chrome since it also matches Opera      
            if ((chromeAgent) && (operaAgent))  
                chromeAgent = false; 
          
           chrome = chromeAgent;
           safari = safariAgent;
           // console.log(chrome);
           // console.log(safari);
} 



