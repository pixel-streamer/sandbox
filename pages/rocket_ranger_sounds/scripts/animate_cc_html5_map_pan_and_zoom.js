/*
from here: Adobe Adobe Support Community
https://community.adobe.com/t5/animate-discussions/zooming-and-panning-map-in-animate-cc-movie-html5-to-canvas/m-p/9593567

 

I need to create zoom and pan controls in an Adobe Animate CC movie html5 to Canvas (using .js) that operate similar to the controls that you see in Google Maps.

I have one layer with a movie symbol containing a vector map. In another layer I have the up, down, left, right, +, - buttons. I want to be able that on clicking the buttons the map pans around and zooms in and out.
*/

    
 

//- The drag area was being incorrectly calculated. The correct is to get the canvas size and divide by the stage scale;

/*
- The methods getBounds and getTransformedBounds will sometimes return null. So I replaced the last one by the nominalBounds property that Animate CC creates and then I multiplied the width and the height by the scaleX and scaleY of the map;
*/

   
//animate_cc_html5_map_pan_and_zoom

 

//Code:

var that = this;

var clickedX;

var clickedY;

var isDragging = false;

var friction = 0.85;

var speedX = 0;

var speedY = 0;

var mapOriginalX = this.map.x;

var mapOriginalY = this.map.y;

var mapNudge = 5;

var minScale = 0.25;

var maxScale = 3;

 

function onMouseWheel(e)

{   

    var zoomFactor = e.detail / 30;   

    scaleMap(zoomFactor);   

}

 

function mouseDown(e)

{

    clickedX = stage.mouseX;

    clickedY = stage.mouseY;

    isDragging = true;   

}

 

function stageMouseUp(e)

{

    isDragging = false;

}

 

function update(e)

{   

    if (isDragging)

    {

        speedX = stage.mouseX - clickedX;

        speedY = stage.mouseY - clickedY;

    }   

   

    speedX *= friction;

    speedY *= friction;

   

    that.map.x += speedX;

    that.map.y += speedY;

   

    clickedX = stage.mouseX;

    clickedY = stage.mouseY;

}

 

function resetMap()

{

    that.map.x = mapOriginalX;

    that.map.y = mapOriginalY;

    that.map.scaleX = that.map.scaleY = 1;

}

 

function zoomMap(e)

{

    if (e.currentTarget == that.plusButton)

        scaleMap(-0.1);

    if (e.currentTarget == that.minusButton)

        scaleMap(0.1);

}

 

function moveMap(e)

{

    if (e.currentTarget == that.upButton)

        speedY -= mapNudge;

    else if (e.currentTarget == that.rightButton)

        speedX += mapNudge;

    else if (e.currentTarget == that.downButton)

        speedY += mapNudge;

    else if (e.currentTarget == that.leftButton)

        speedX -= mapNudge;

}

 

function scaleMap(amount)

{

    var map = that.map;

   

    map.scaleX -= amount;

    map.scaleY = map.scaleX;

   

    if (map.scaleX < minScale)

        map.scaleX = map.scaleY = minScale;

    else if (map.scaleX > maxScale)

        map.scaleX = map.scaleY = maxScale;

}

 

// listeners

this.map.on("mousedown", mouseDown.bind(this));

this.resetButton.on("click", resetMap.bind(this));

this.plusButton.on("click", zoomMap.bind(this));

this.minusButton.on("click", zoomMap.bind(this));

this.upButton.on("click", moveMap.bind(this));

this.rightButton.on("click", moveMap.bind(this));

this.downButton.on("click", moveMap.bind(this));

this.leftButton.on("click", moveMap.bind(this));

stage.on("stagemouseup", stageMouseUp.bind(this));

document.getElementById('canvas').addEventListener('mousewheel', onMouseWheel.bind(this));

document.getElementById('canvas').addEventListener('DOMMouseScroll', onMouseWheel.bind(this));

createjs.Ticker.addEventListener("tick", update.bind(this));

 

resetMap();

 
 
/*
Anyway, I noticed your popups scale along with the map. One thing you can do is to store all the card and close buttons inside of an array and set their scale to be the inverse of the map's scale. Like this:
*/

var fixed =

[

    this.map.Hide_MooseLake_Btn,

    this.map.MouseLake_mc,

    this.map.Hide_BowLake_Btn,

    this.map.BowLakePopUp_mc,

    this.map.Hide_Castle_Btn,

    this.map.CastleMountain_mc,

    this.map.Hide_Spirals_Btn,

    this.map.SpiralPopUp_mc,

    this.map.Hide_Sulphur_Btn,

    this.map.SulphurPopUp_mc,

    this.map.Hide_Hoodoos_Btn,

    this.map.HoodoosPopUp_mc,

    this.map.Hide_LakeLouise_Btn,

    this.map.LakeLouise_mc,

    this.map.Hide_Banff_Btn,

    this.map.Banff_PopUp_mc,

    this.map.Hide_Jasper_Btn,

    this.map.JasperNatPark_mc,

    this.map.Hide_Iceland_Btn,

    this.map.IcelandCard_mc,

    this.map.Hide_MountRob_Btn,

    this.map.MountRobson_mc

]

function fixScale()

{

    for (var i = 0, total = fixed.length; i < total; i++)

        fixed.scaleX = fixed.scaleY = 1 / that.map.scaleX;     

}

//Then you call the fixScale function in the end of the scaleMap function.

function scaleMap(amount)

{

    var map = that.map;

   

    map.scaleX -= amount;

    map.scaleY = map.scaleX;

   

    if (map.scaleX < minScale)

        map.scaleX = map.scaleY = minScale;

    else if (map.scaleX > maxScale)

        map.scaleX = map.scaleY = maxScale;

   

    fixScale();

}
 
/*
 
So the issue I'm having now is when I use the scroll button to scroll down the page the map is zooming in and out. How can I just disable to mouse zoom feature, but keep the mouse able to move around the map?
 
*/
 

function onMouseWheel(e)

{

    var delta;

  

    if (e == window.event)

        delta = -10 / window.event.wheelDeltaY;

    else

        delta = e.detail / 30;

  

    var zoomFactor = delta;  

    scaleMap(zoomFactor);  

}

 
/*

Wow, this thread has been so helpful for me! Thank you, JoãoCésar! I'm using this "map" as a labeling quiz with the ability to zoom in/out. The fixscale(); function was perfect to keep the labels with the map. Can I do a similiar function for movemap to keep labels moving left/right/up/down with the map?
   
   
*/