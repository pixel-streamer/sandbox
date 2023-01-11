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

let canvasHome, canvas, stage;
let aspect, originW, originH;
let w = window.innerWidth;
let h = window.innerHeight;
let attractionAnim, preLoader;
let resizeObserver;
let delay = 250;
let timeout, ticker;
let defaultTextFormat = {};
let preLoaderMC;

let simpleGalleryConfig = new SimpleGalleryConfig();
simpleGalleryConfig._ticker = null;
simpleGalleryConfig._firstRun = false;
simpleGalleryConfig._mainStage = null;
simpleGalleryConfig._preLoader = null;
simpleGalleryConfig._preLoaderDisplay = null;
simpleGalleryConfig._collectionNames = ""; // #3d_renders,#<collection_name> --from the queryO
simpleGalleryConfig._baseURLPortion = "images/fullsize/";
simpleGalleryConfig._thumbURLPortion = "images/thumbs/";
simpleGalleryConfig._canvasEl = undefined;
simpleGalleryConfig._galleryCanResize = false;
simpleGalleryConfig._canvasEl = undefined;
simpleGalleryConfig._galleryCanResize = false;
simpleGalleryConfig._thumbW = 150; //max thumb width -- adjust for the device display size
simpleGalleryConfig._thumbH = 150; //max thumb height -- adjust for the device display size
simpleGalleryConfig._fullW = 320; //max fullsize width -- adjust for the device display size
simpleGalleryConfig._fullH = 320; //max fullsize height -- adjust for the device display size
simpleGalleryConfig._isUsingGridLayout = false;
simpleGalleryConfig._hasCaptionsEnabled = false;
simpleGalleryConfig._hasGalleryText = false;
simpleGalleryConfig._galleryFontFamily = "Fontdiner Swanky"; //Arial
simpleGalleryConfig._galleryFontColor = "#450067";
simpleGalleryConfig._galleryFontSize = 16;
simpleGalleryConfig._captionText = "gallery";
simpleGalleryConfig._captionFontFamily = "Fontdiner Swanky"; //Fontdiner Swanky
simpleGalleryConfig._captionFontColor = "#450067";
simpleGalleryConfig._captionFontSize = 16;
simpleGalleryConfig._originalImgSrc = "";
simpleGalleryConfig._originalThumbSrc = "";
simpleGalleryConfig._originalImg = "";
simpleGalleryConfig._originalThumb = "";
simpleGalleryConfig._effectName = "fade";
//ie: blindsEffect, verticalSlatEffect, fadeEffect,
//fade only avail. in v1

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

    //straight from https://codepen.io/createjs/pen/dZvVKp for testing resize
    center = makeCorner();
    topLeft = makeCorner();
    topRight = makeCorner();
    bottomLeft = makeCorner();
    bottomRight = makeCorner();

    // stage.addChild(topLeft, topRight, bottomLeft, bottomRight, center);
    //ENDs resize test-- now debounced.
    resizeObserver = new ResizeObserver((entries) => {});
    resizeObserver.observe(canvas);
    window.addEventListener("resize", function () {
        clearTimeout(timeout);
        timeout = setTimeout(handle_Redraw, delay);
        return;
    });
    simpleGalleryConfig._ticker = createjs.Ticker;
    ticker = simpleGalleryConfig._ticker;

    // ticker.timingMode = createjs.Ticker.RAF;
    // these are equivalent, 1000ms / 40fps (framerate) = 25ms (interval)
    //ticker.interval = 25;
    ticker.timingMode = ticker.RAF_SYNCHED;
    //createjs.Ticker.timingMode = createjs.Ticker.RAF;
    ticker.framerate = 30;
    ticker.addEventListener("tick", tick);

    bgMC = new MovieClip();
    bg = new createjs.Shape();
    bgMC.addChild(bg);

    bg.graphics.beginFill("#BADA55").drawRect(0, 0, w, h).endFill();
    bgMC.setBounds(0, 0, w, h);
    bgMC.name = "backdrop";
    stage.addChild(bgMC);

    console.log("backdrop: ", stage.getChildByName("backdrop"));
    stage.addChild(topLeft, topRight, bottomLeft, bottomRight, center);

    baseTextSizeFromDims = new TextClip();
    baseTextSizeFromDims.makeTextClip(
        "M",
        "normal",
        undefined,
        "sans-serif",
        "#000000"
    );

    var testdimsTextSize = parseFloat(baseTextSizeFromDims.getMeasuredWidth());

    baseTextTo10Px = parseFloat(testdimsTextSize * 1.2005 * 0.1 * 10);
    baseTextTo10PxTo10Percent = parseFloat(
        testdimsTextSize * 1.2005 * (w * 0.01) * 0.1
    );

    baseTextTo16px = Math.max(baseTextTo10PxTo10Percent * 1.601, 16);

    baseTextVariableTen = baseTextTo16px * 0.85;

    simpleGalleryConfig._baseText10px = baseTextTo10Px; //baseTextTo10Px
    simpleGalleryConfig._baseText16px = baseTextTo16px; //baseTextTo16px
    simpleGalleryConfig._baseText10Percent = baseTextTo10PxTo10Percent; //baseTextTo10PxTo10Percent

    subject = new MovieClip();
    subject.name = "subject";
    bgMC.addChild(subject);
    subject.cursor = "pointer";

    defaultTextFormat["text"] = " ";
    defaultTextFormat.text = baseTextTo16px;
    defaultTextFormat.color = "#0000FF";
    defaultTextFormat.fontProps = {
        fontStyle: "normal",
        fontSize: baseTextVariableTen,
        fontFamily: "Nunito",
        fontColor: defaultTextFormat.color,
    };
    defaultTextFormat.font =
        defaultTextFormat.fontProps.fontStyle +
        " " +
        defaultTextFormat.fontProps.fontSize +
        "px " +
        defaultTextFormat.fontProps.fontFamily +
        " " +
        defaultTextFormat.fontProps.fontColor;
    simpleGalleryConfig._preLoader = new createjs.LoadQueue();

    preLoader = simpleGalleryConfig._preLoader;

    var animatedPreloader = [
        {
            id: "woody",
            src: "../images/woody-painting-white.json",
            type: "spritesheet",
            crossOrigin: false,
            // crossOrigin: true,
        },
        {
            id: "really_large_img",
            src: "../pages/images/extremely-large-image.png",
            type: "image",
            crossOrigin: false,
        },
    ];
    stage.addEventListener("stagemousedown", handle_Click);
    preLoader.loadManifest(animatedPreloader, true);
    //preloader:----
    attractionAnim = new createjs.Sprite(preLoader.getResult("woody"));

    console.log(":::←←←←←←←prepPreloader←:::");
    preLoaderMC = new MovieClip();
    var preLoaderMC_visualCenter = new ShapeObject(); // new createjs.Shape();
    preLoaderMC_visualCenter.drawBox(
        0,
        0,
        util_getScreenRelativeNumber(1),
        util_getScreenRelativeNumber(1),
        "#FF0000"
    );
    preLoaderMC.addChild(preLoaderMC_visualCenter);
    stage.addChild(preLoaderMC);
    //center preloader visuals
    preLoaderMC_visualCenter.x =
        stage.getBounds().width / 2 -
        preLoaderMC_visualCenter.getBounds().width;
    preLoaderMC_visualCenter.y =
        stage.getBounds().height / 2 -
        preLoaderMC_visualCenter.getBounds().height;
    //hide the center so that it can be used as reference
    preLoaderMC_visualCenter.alpha = 0.0;
    var loadBar = new MovieClip();

    var loadingIndicator = new ShapeObject();
    loadingIndicator.drawBox(
        0,
        0,
        util_getScreenRelativeNumber(w),
        util_getScreenRelativeNumber(10),
        "#0080FF"
    );
    loadBar.addChild(loadingIndicator);
    preLoaderMC.addChild(loadBar);
    loadingIndicator.x =
        preLoaderMC_visualCenter.x - loadingIndicator.getBounds().width / 2;
    loadingIndicator.y = loadingIndicator.getBounds().height / 2;

    var loaderText = new TextClip();
    loaderText.makeTextClip(
        "Loading: 999%",
        defaultTextFormat.fontProps.fontStyle,
        parseInt(defaultTextFormat.fontProps.fontSize * 2),
        defaultTextFormat.fontProps.fontFamily,
        "#FFCC00",
        null
    );
    loadBar.name = "loadbar";
    loaderText.name = "loader_textMC";
    preLoaderMC.name = "preloader_display";
    preLoaderMC.addChild(loaderText);
    simpleGalleryConfig._preLoaderDisplay = preLoaderMC;
    //preloader:
    console.log("::::preloadStuff");
    preLoader.addEventListener("progress", preloadProgress);
    preLoader.addEventListener("complete", showAttractionAnim);

    console.log("preLoaderMC██");
    //See: http://www.createjs.com/Docs/EaselJS/classes/Shadow.html for more
    preLoaderMC.shadow = new createjs.Shadow("rgba(0,0,127,0.35)", 0.5, 1.5, 5);
}

function showAttractionAnim() {
    console.log(":::  showAttractionAnim  :::");

    //   attractionAnim.scale = thingSize[2]  ;
    //console.log(thingSize[2]); //0.333;
    attractionAnim.play();

    var anMC = new MovieClip();
    var animHome = new MovieClip();
    anMC.name = "animation_home";

    console.log("attractionAnim:::: ", attractionAnim);
    animHome.addChild(attractionAnim);
    animHome.scale = 2 * aspect;
    anMC.alpha = 0;
    //  stage.addChild(anMC);
    //  anMC.addChild(animHome);

    anMC.x = stage.getBounds().width / 2;
    anMC.y = stage.getBounds().height / 2;
    //fade in now....
    //TODO: fade in
    anMC.alpha = 1;
    //set up a home for the canvas visuals
    // stageSetupNowStart();

    fadeThisOut.call(attractionAnim);
}

var hasFadedOut = false;
function checkFade() {
    console.log("this is checkFade: ");
    if (hasFadedOut === true) {
        fadeThisIn.call(attractionAnim);
    }
    if (hasFadedOut === false) {
        fadeThisOut.call(attractionAnim);
    }
}
function fadeThisOut() {
    createjs.Tween.get(this)
        .wait(300)
        .to({ alpha: 0, visible: false }, 250)
        .call(function () {
            setTimeout(checkFade.bind(this), 1500);
            toggleFade();
        });
}
function fadeThisIn() {
    this.visible = true;
    createjs.Tween.get(this)
        .wait(300)
        .to({ alpha: 1 }, 250)
        .call(function () {
            setTimeout(checkFade.bind(this), 1500);
            toggleFade();
        });
}
function toggleFade() {
    hasFadedOut = !hasFadedOut;
}
function initCollections() {
    console.log(":::  initCollections  :::");
}
function util_getScreenRelativeNumber(num) {
    //console.log(":::  util_getScreenRelativeNumber  :::");
    //controls sizing so that pixel numbers are more precise. (in no way accurate, however)
    var temp = parseFloat(num * ((baseTextVariableTen * 0.74) / 10) * 100);
    //alerted reassignment
    temp = parseInt(parseFloat(temp) / 10) / 10;
    return temp;
}
function util_resizeDimsToNewOnes() {
    console.log(":::  util_resizeDimsToNewOnes  :::");
}
function util_flushChildren(withinEl) {
    console.log(":::  util_flushChildren  :::");
    while (withinEl.hasChildNodes()) {
        withinEl.removeChild(withinEl.childNodes[0]);
    }
}
function handle_Preloading() {
    console.log(":::  handle_Preloading  :::");
}
function handle_SimpleImage_error() {
    console.log(":::  handle_SimpleImage_error  :::");
}
function handle_SimpleImage_load() {
    console.log(":::  handle_SimpleImage_load  :::");
}
function handle_Click() {
    console.log(":::  handle_Click  :::");
}

function preloadStuff() {}

function preloadProgress(e) {
    var preloadingText =
        simpleGalleryConfig._preLoaderDisplay.getChildByName("loader_textMC");
    var loadBar =
        simpleGalleryConfig._preLoaderDisplay.getChildByName("loadbar");
    loadBar.scaleX = parseFloat(e.progress);
    preloadingText.text = "LOADING: " + Math.floor(e.progress * 100) + "%";
    //console.log("LOADING: " + Math.floor(e.progress * 100) + "%");
    stage.update();
}

window.addEventListener("load", init);

//I think that createjs requires the starting function to be "init"
function init() {
    setupStage();
    preloadStuff();
    /*
        showAttractionAnim();
        initCollections();
    */
}

function redrawStageDims(w, h) {
    topLeft.x = bottomLeft.x = 0;
    topRight.x = bottomRight.x = w;

    topLeft.y = topRight.y = 0;
    bottomLeft.y = bottomRight.y = h;

    center.x = parseInt(w / 2);
    center.y = parseInt(h / 2);
    var backdrop = stage.getChildByName("backdrop");
    backdrop.setBounds(0, 0, w, h);
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
    console.log("::: handle_Redraw :::", w, h);
    console.log("you resized me.....");
    //I'm going to let css tell us the correct box height of the main container.
    w = Math.max(parseInt(getComputedStyle(canvasHome).width), 320);
    h = Math.max(parseInt(getComputedStyle(canvasHome).height), 320);

    stage.canvas.width = w;
    stage.canvas.height = h;

    /*  aspect = Math.min(originW, originH) / Math.max(originW, originH);
    stage.canvas.width = w * aspect;
    stage.canvas.height = h * aspect;
    console.log("::: aspect :::", aspect, w * aspect, h * aspect);
    layout(canvas.width, canvas.height); */
    redrawStageDims(w, h);
    stage.update();
}

function tick(event) {
    //var deltaS = event.delta / 1000;
    //var position = <clip>.x + 15 * deltaS;
    //var moverW = <clip>.getBounds().width * <clip>.scaleX;
    //<clip>.x = position >= w + moverW ? -moverW : position;
    //console.log("random info");
    stage.update(event);
}
