/*******************************************************************************************/
/*******************************************************************************************/
/*******************************************************************************************/
/*******************************************************************************************/

//tasks:
//preloader

//load content
// src= gallery_non_js.htm

//determine device dimensions with group of dom elements corresponding to display size
//based off the visible element (media query) load in appropriate imagery

//if tiny, small, medium, large elements are browsed for visibility... targeted breakpoint elements will be visible.
//use to determine asset to load

// phone, tablet, laptop, desktop would be the sizes
//width: 320, 768, 1024, >1280
//		360x640		768x1024	1024x768	1280x800

//build gui
//setup display area
//setup buttons for interaction
//paginate necessary arrays

//perform layout:
//layout thumbnail items
//grid the thumbnails

//initialize objects in memory for the following:
//display area fullsize image (with possible interaction in mind for later)
//pagination handling
//interaction buttons req.

//grab "all array"
//split all by slice mod increment

//thumbnail handling
//interaction buttons req. (thumbnails)

//THUMBNAIL INTERACTION:
// onclick
//display large url in display area.
//set border on thumbnail

/*
// SimpleGallery TODO:
//  pass a configure object to this simple gallery (with xml, or query string)
//  to control:
//  can the gallery be resized?
//      _galleryCanResize
//  thumbnail dims:
//     
//  fullSize dims (max)
//     
//  slide_objects:
//     
//      _originalThumb?  <<< --- derived from the original size image. (sounds best)
//      holds the full, and thumb, so that if resized, can be re-rendered
//  gallery grid (or not) config
//    
//  does this gallery have text?
//      
//  text to include as captions (or not)
//      
//  caption_location?
//  header for gallery (font enabled)?
//  footer for gallery?
//  date and time stamp of gallery render?

*/
//define these in the obj, until they can be loaded via xml (as well as the rest)
//let simpleGalleryConfig = new SimpleGalleryConfig();
var canvasHome, canvas, stage;
var aspect, originW, originH;
var w = window.innerWidth;
var h = window.innerHeight;

let resizeObserver;
let delay = 250;
let timeout;

function setupStage() {
    canvasHome = document.querySelector("#testCanvas");
    var canvasFrag = document.createDocumentFragment();
    canvas = document.createElement("canvas");
    canvasFrag.appendChild(canvas);
    canvasHome.appendChild(canvasFrag);
    originW = parseInt(getComputedStyle(canvasHome).width);
    originH = parseInt(getComputedStyle(canvasHome).height);

    canvas.setAttribute("width", originW);
    canvas.setAttribute("height", originH);
    canvas.setAttribute("id", "main_canvas");
    //maybe setting the styles within the canvas container ARE NOT RIGHT
    //it seems to work with the styles removed.
    //TODO: set up a redraw for the screen on resize.
    /*
    canvas.setAttribute(
        "style",
        "width:" + originW + "px;" + "height:" + originH + "px;"
    );
    */
    stage = new createjs.Stage("main_canvas");
    stage.enableMouseOver();
    stage.setBounds(0, 0, originW, originH);
    /*  stage.canvas.width = stage.getBounds().width;
    stage.canvas.height = stage.getBounds().height; */

    //straight from https://codepen.io/createjs/pen/dZvVKp for testing
    center = makeCorner();
    topLeft = makeCorner();
    topRight = makeCorner();
    bottomLeft = makeCorner();
    bottomRight = makeCorner();

    stage.addChild(topLeft, topRight, bottomLeft, bottomRight, center);
    //ENDs resize test-- debounced.
    resizeObserver = new ResizeObserver((entries) => {});

    resizeObserver.observe(canvas);

    window.addEventListener("resize", function () {
        clearTimeout(timeout);
        timeout = setTimeout(handle_Redraw, delay);
        return;
    });
}

//I think that createjs requires the starting function to be "init"
/* function init() {
    showAttractionAnim();
    initCollections();
} */
function showAttractionAnim() {
    console.log(":::    :::");
}
function initCollections() {
    console.log(":::    :::");
}
function util_getScreenRelativeNumber() {
    console.log(":::    :::");
}
function util_resizeDimsToNewOnes() {
    console.log(":::    :::");
}
function util_flushChildren() {
    console.log(":::    :::");
}
function handle_Redraw() {
    console.log(":::    :::");
}
function handle_Preloading() {
    console.log(":::    :::");
}
function handle_SimpleImage_error() {
    console.log(":::    :::");
}
function handle_SimpleImage_load() {
    console.log(":::    :::");
}
function handle_Click() {
    console.log(":::    :::");
}
//window.addEventListener();

window.addEventListener("load", init);

function init() {
    setupStage();
}

function layout(w, h) {
    topLeft.x = bottomLeft.x = 0;
    topRight.x = bottomRight.x = w;

    topLeft.y = topRight.y = 0;
    bottomLeft.y = bottomRight.y = h;

    center.x = parseInt(w / 2);
    center.y = parseInt(h / 2);
}

function makeCorner() {
    //from https://codepen.io/createjs/pen/dZvVKp
    var r = 32;
    var item = new createjs.Shape();
    item.graphics
        .beginFill("#4ACFF1")
        .drawRoundRect(-r, -r, r * 2, r * 2, r * -0.88)
        .endFill();
    item.cache(-r, -r, r * 2, r * 2);
    return item;
}

function handle_Redraw() {
    console.log("you resized me.....");

    /*
        //should this use offset width and height?
        w = canvasHome.clientWidth;
        h = canvasHome.clientHeight;  
        w = window.innerWidth;
        h = window.innerHeight;
    */
    //I'm going to let css tell us the correct box height of the main container.
    w = Math.max(parseInt(getComputedStyle(canvasHome).width), 320);
    h = Math.max(parseInt(getComputedStyle(canvasHome).height), 320);
    console.log("::: handle_Redraw :::", w, h);

    stage.canvas.width = w;
    stage.canvas.height = h;

    /*  aspect = Math.min(originW, originH) / Math.max(originW, originH);
    stage.canvas.width = w * aspect;
    stage.canvas.height = h * aspect;
    console.log("::: aspect :::", aspect, w * aspect, h * aspect);
    layout(canvas.width, canvas.height); */
    layout(w, h);
    stage.update();
}
