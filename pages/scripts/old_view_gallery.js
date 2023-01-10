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
var canvas, stage;

function init() {
    canvas = document.getElementById("testCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //stage = new createjs.StageGL(canvas, {});
    stage = new createjs.Stage(canvas, {});

    topLeft = makeCorner();
    topRight = makeCorner();
    bottomLeft = makeCorner();
    bottomRight = makeCorner();
    center = makeCorner();

    stage.addChild(topLeft, topRight, bottomLeft, bottomRight, center);

    window.addEventListener("resize", resize);
    resize();
}

function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    layout(w, h);

  //  stage.updateViewport(w, h);
    stage.update();
}

function layout(w, h) {
    topLeft.x = bottomLeft.x = 0;
    topRight.x = bottomRight.x = w;

    topLeft.y = topRight.y = 0;
    bottomLeft.y = bottomRight.y = h;

    center.x = w / 2;
    center.y = h / 2;
}

function makeCorner() {
    var r = 42;
    var item = new createjs.Shape();
    item.graphics
        .beginFill("#4ACFF1")
        .drawRoundRect(-r, -r, r * 2, r * 2, r * -0.8)
        .endFill();
    item.cache(-r, -r, r * 2, r * 2);
    return item;
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
