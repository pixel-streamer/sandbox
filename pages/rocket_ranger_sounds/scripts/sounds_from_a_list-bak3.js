window.addEventListener("load", loadGoogleFonts);
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
// import { loadGoogleFonts }
// import "font-loading_module.js";

var fontsHaveLoaded = false;

function loadFonts(config) {
    var loader = new createjs.FontLoader(config, true);
    loader.on("complete", handleFontLoad);
    loader.load();
}

const fontload_evt = new CustomEvent("fontload_evtStr", {
    detail: { msg: ":::fontloaded, now setup stage" },
});

function handleFontLoad(e) {
    //console.log("handleFontLoad and detail", e.detail);
    fontsHaveLoaded = true;
    window.dispatchEvent(fontload_evt);
}
//window.addEventListener("load", init); //called now from under font loaded event.
window.addEventListener("fontload_evtStr", setupStage);
//fonts are now loaded, so start putting things
//onto the stage.

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

var stage;
var stageBounds;
var nofullhover;
function setupStage(e) {
    /* 
    // from http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml
    */
    nofullhover = window.matchMedia("(hover:none), (hover:on-demand)").matches; //returns true or false
    bigCanvas.setAttribute("width", w);
    bigCanvas.setAttribute("height", h);
    //console.log("≈██ setupStage ██≈", e.detail);
    stage = bigCanvas;
    stage = new createjs.Stage("big_stage");
    //console.log("::::::::::::::stage::: ", stage, "nofullhover: ", nofullhover);
    stage.setBounds(0, 0, w, h);
    stageBounds = stage.getBounds();
    subject_content = new createjs.Container();
    stage.addChild(subject_content);
    init();
    makeSomeText();
}

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
let resizeObserver;
let delay = 250;
let timeout;

/*
ResizeObserver.disconnect()
    Unobserves all observed Element targets of a particular observer.

ResizeObserver.observe()
    Initiates the observing of a specified Element.
    
ResizeObserver.unobserve()
    Ends the observing of a specified Element.
*/
resizeObserver = new ResizeObserver((entries) => {});
resizeObserver.observe(document.querySelector("#testCanvas"));
window.addEventListener("resize", function () {
    clearTimeout(timeout);
    timeout = setTimeout(handle_Redraw, delay);
    return;
});

function handle_Redraw() {
    // console.log(
    //     "▄▄▄▄▄▄▄▄▄handle_Redraw▄▄▄▄▄▄▄▄",
    //     "find a way to add something to all corners of the stage, and re-dim that sucker"
    // );
    //TODO:
    //find a way to add something to all corners of the stage, and re-dim that sucker
    /* 
    you can handle text in a dynamic way:
    https://stackoverflow.com/questions/22943186/html5-canvas-font-size-based-on-canvas-size
    In your resize event handler, apply a font size to a range of canvas sizes:
        if(canvas.width<480){
        context.font='14px verdana';
        }else if(canvas.width<768){
        context.font='30px verdana';
        }else{
        context.font='80px verdana';
        }
    */
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

/* 
function:

preload the attractor animation

load thumbnail images for main sections

setup classes for the interface parts?
  needs pagination for the detail images

  pagination requires that there is an amount of loaded materials,
  enough to require segmentation my modulo

  (clicking through them would go something like this:
    amount % displayed amount
        would give the paginated, displayable amount of detail images that should be available.

        round-robin'ing the detail images would go:
            display amount % 1, 2, 3,

            it's been a while that I've had something that would work that way now.
  )

needs a project class that dynamically uses the layout from the page:
https://pixel-streamer.github.io/sandbox/pages/responsive-image-viewer-with-long-text.html

here's an xml listing of images to test the cyclical round-robin of the thumbnails for clicking on:

testing_numbers/testing.xml

the canvas width/height changes of the resize function on the other file is what's needed to keep the
main canvas size firmly inside the 100vw/vh area

*/

var fileLoader;
var bigArea = document.querySelector("#testCanvas");
var subject_content;
var w = parseInt(getComputedStyle(bigArea).width);
var h = parseInt(getComputedStyle(bigArea).height);
var bigCanvas = document.querySelector(".full_size_canvas");
var imageCount = 0;
var yCount = 0;
var x;
var y;
var generalPadding = 16;
let progress = document.querySelector("#progress");
let gallery = document.querySelector("#gallery");

function init() {
    x = 0;
    y = 0;

    /* 
    preload part of the init
    */
    //console.log("init from page.");

    var queue = new createjs.LoadQueue(false);

    queue.on("fileload", handle_fileComplete);
    queue.on("progress", handle_progress);
    queue.on("complete", handle_preloadComplete);

    queue.loadFile("testing_numbers/testing.xml");

    fileLoader = new createjs.LoadQueue(false);

    /*
  galleryImageLinks.forEach(function (member) {
    queue.loadFile(member);
  });
*/

    /* 
  END preload part of the init
  */
}

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ PRELOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

function handle_progress(e) {
    //console.log(Math.floor(parseFloat(e.progress * 100).toPrecision(2)));
}

function handle_preloadComplete(e) {
    //console.log(":::final func after loading xml. handle_preloadComplete:::");
}

function handle_fileComplete(e) {
    //console.log("whoohoo xml loaded ", e);
    /// note use of querySelector on the loaded result. This func can set up all the
    // variables....
    // IMAGES LOADING FROM THIS FUNCTION TOO...  fileLoader is for loading images

    var basePath = e.result.querySelector("base_path").getAttribute("url");
    var green_colored = e.result
        .querySelector("green_colored")
        .getAttribute("url");
    var greens_extension = e.result
        .querySelector("green_colored")
        .getAttribute("extensions");
    var peach_colored = e.result
        .querySelector("peach_colored")
        .getAttribute("url");
    var peachs_extension = e.result
        .querySelector("peach_colored")
        .getAttribute("extensions");
    var imagesNodeList = e.result.querySelectorAll("image");

    fileLoader = new createjs.LoadQueue(false);
    fileLoader.on("fileload", handle_ImageLoadReady);
    fileLoader.on("progress", handle_ImageLoadProgress);
    fileLoader.on("complete", handle_ImageLoadComplete);

    imagesNodeList.forEach(function (member) {
        var extension_trim = member.getAttribute("src");
        extension_trim = extension_trim.substring(
            0,
            extension_trim.lastIndexOf(".")
        );
        /*
        //console.log(
            "string: ",
            basePath +
                "/" +
                peach_colored +
                "/" +
                extension_trim +
                peachs_extension,
            type: "img",
        }
        );
        */
        fileLoader.loadFile(
            basePath +
                "/" +
                peach_colored +
                "/" +
                extension_trim +
                peachs_extension
        );
        fileLoader.loadFile(
            basePath +
                "/" +
                green_colored +
                "/" +
                extension_trim +
                greens_extension
        );

        // this didn't work...
        // fileLoader.loadFile({
        //     src:
        //         basePath +
        //         "/" +
        //         green_colored +
        //         "/" +
        //         extension_trim +
        //         greens_extension,
        //     type: "img",
        // });
    });

    fileLoader.loadFile({
        src: "../images/ui_vectors/work_selections-copy.svg",
        //src: "../images/ui_vectors/playhead-buttons-copy.svg",
        //src: "../images/ui_vectors/rec.svg",
        id: "playhead",
        //type: createjs.Types.SVG,
        //type: createjs.Types.IMAGE,
        //type: "svg",
        type: createjs.LoadQueue.IMAGE,
        //type: createjs.LoadQueue.TEXT,
    });
    ////console.log("basePath: ", basePath);
}

var galleryImageLinks = [
    "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/haphalloween.jpg",
    "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/animations/snuff.gif",
    "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/bottle.jpg",
    "https://pixel-streamer.github.io/sandbox/pages/images/thumbs/coke-bottle-render-t.png",
    "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/coke-bottle-render.png",
];

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF PRELOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
function handle_ImageLoadReady(e) {
    /*
    //console.log(
    "::::::handle_ImageLoadReady::::::\nsingle image loaded and waiting\n",
    e.item.src
    );
    */

    /* 
        //console.log(":::::▄█ handle_ImageLoadReady █▄", e.item.type);
    */
    //i'm just going to try to get pull the extension from .src
    var src = e.item.src;
    var extension_trim = src.substring(src.lastIndexOf("/") + 1);
    var extension = extension_trim.substring(
        extension_trim.lastIndexOf(".") + 1
    );

    switch (extension) {
        case "svg":
            addSVG(e);
            //console.log(":::: SVG ▄█▄█▄ SVG ::::", e.item.type);
            break;
        default:
            layoutImage(e);
        //console.log(":::::▄█ handle_ImageLoadReady █▄", e.item.type);
        // code block
    }
}
function handle_ImageLoadProgress(e) {
    // //console.log(Math.floor(parseFloat(e.progress * 100).toPrecision(2)));
}

function handle_ImageLoadComplete(e) {
    //console.log(":::handle_ImageLoadComplete:::", e);
    /* 
    goodFontP.appendChild(
        document.createTextNode(
            "THIS IS THE LUCKIEST GUY! this is the Luckiest Guy!"
        )
    ); */
}

function makeSomeText() {
    //console.log(":::makeSomeText:::");

    var text = new createjs.Text(
        "WHO IS THIS GUY?",
        //"16px 'Press Start 2P'",
        "800 italic 64px 'Barlow ExtraBold'",
        // "#ff7700"
        "#FFFFFF"
    );
    var textSmaller = new createjs.Text(
        "(click on a section to see my work)",
        //"16px 'Press Start 2P'",
        "800 italic 21px 'Barlow Semi Condensed'",
        // "#ff7700"
        "#FFFFFF"
    );
    //console.log(":::text:::", text);
    stage.addChild(text);
    var textMetrics = text.getMetrics();
    var textW = textMetrics.width;
    var textH = textMetrics.height;

    text.x = (stageBounds.width - textW) / 2;
    text.y = (stageBounds.height - textH) / 2;

    stage.addChild(textSmaller);
    var textSmallerMetrics = textSmaller.getMetrics();
    var textSmallerW = textSmallerMetrics.width;
    var textSmallerH = textSmallerMetrics.height;

    textSmaller.x = (stageBounds.width - textSmallerW) / 2;
    textSmaller.y =
        (stageBounds.height - textSmallerH) / 2 +
        textMetrics.height / 2 +
        generalPadding;
    stage.update();
}

function addSVG(e) {
    //console.log(":::addSVG:::", e);
    //adding the data part didn't seem to do anything
    // var svg =  "data:image/svg+xml," + fileLoader.getResult("playhead");
    var svg = fileLoader.getResult("playhead");
    //console.log(":::addSVG:::", svg);
    var bg = new createjs.Bitmap(svg);
    stage.addChild(bg);
    var bgDims = bg.getTransformedBounds();
    // bg.x = (stageBounds.width - textW) / 2;
    // bg.y = (stageBounds.height - textH) / 2;

    bg.x = (stageBounds.width - bgDims.width) / 2;
    bg.y = (stageBounds.height - bgDims.height) / 2;

    //console.log("bg.width: ", bgDims);
    stage.update();
}

function layoutImage(e) {
    //  //console.log("target index: ", e, e.item.id.substring());
    /*
    right now, all this does is load in a bunch of graphics onto a grid, in
    the main canvas.

    what I need is:
    I need to collect some kind of data and relate that to the thumbnail, so 
    that the "full size" image can be loaded.
    */

    //get some kind of count:
    // e.item.id is brought along with the loaded images.
    /* 
        drawImage(image, dx, dy)
        drawImage(image, dx, dy, dWidth, dHeight)
        drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) 
    */

    var bg = new createjs.Bitmap(e.result);
    bg.scaleX = 85 / e.result.width;
    bg.scaleY = 64 / e.result.height;
    //add the images to the subject content
    subject_content.addChild(bg);

    var subjBounds = subject_content.getBounds();
    subject_content.x = (stageBounds.width - subjBounds.width) / 2;
    subject_content.y = (stageBounds.height - subjBounds.height) / 2;

    var xWidth = parseInt(imageCount * 85);
    // //console.log(" xWidth: ", xWidth);

    if (xWidth >= parseInt(w - 85)) {
        yCount = parseInt(yCount + 1);
        imageCount = 0;
    }
    // //console.log("╫╫  y  ", y);

    xWidth = parseInt(imageCount * 85);
    x = xWidth;
    y = parseInt(yCount * 64);

    bg.x = x;
    bg.y = y;

    // var loadedImgProxyCanvas = document.createElement("canvas");
    // var proxyContext = loadedImgProxyCanvas.getContext("2d");
    // loadedImgProxyCanvas.setAttribute("width", e.result.naturalWidth);
    // loadedImgProxyCanvas.setAttribute("height", e.result.naturalHeight);
    // //document.querySelector(".hidden").appendChild(loadedImgProxyCanvas);
    // proxyContext.drawImage(e.result, 0, 0);

    // var bigCanvasContext = bigCanvas.getContext("2d");
    // var thumbCanvas = document.createElement("canvas");
    // var thumbContext = thumbCanvas.getContext("2d");
    // //document.querySelector(".hidden").appendChild(thumbCanvas);
    // thumbContext.drawImage(loadedImgProxyCanvas, 0, 0, 85, 64);
    // var xWidth = parseInt(imageCount * 85);
    // // //console.log(" xWidth: ", xWidth);

    // if (xWidth >= parseInt(w - 85)) {
    //     yCount = parseInt(yCount + 1);
    //     imageCount = 0;
    // }
    // // //console.log("╫╫  y  ", y);

    // xWidth = parseInt(imageCount * 85);
    // x = xWidth;
    // y = parseInt(yCount * 64);
    // bigCanvasContext.drawImage(thumbCanvas, x, y);
    //  bigCanvasContext.restore();
    //  bigCanvasContext.save();
    /* 
    TODO: there is a *single* count of images here that are loaded.
    since there are more than one "lists" of images, not all the images
    are placed correctly.
    */
    imageCount++;
    stage.update();
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/