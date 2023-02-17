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
let preLoader, animatedPreloaderManifest, attractionAnim;
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
    // ticker.framerate = 30;
    //ticker.delta=4;
    ticker.addEventListener("tick", tick);

    bgMC = new MovieClip();
    bg = new createjs.Shape();
    bg.graphics.beginFill("#BADA55").drawRect(0, 0, w, h).endFill();
    bgMC.addChild(bg);
    bgMC.setBounds(0, 0, w, h);
    bgMC.name = "backdrop";
    stage.addChild(bgMC);
    // console.log("backdrop: ", stage.getChildByName("backdrop"));
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

    subject.setBounds(0, 0, bgMC.getBounds().width, bgMC.getBounds().height);
    subject.cursor = "pointer";

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

    stage.addEventListener("stagemousedown", handle_Click);
    prepPreloader();
}
function prepPreloader() {
    simpleGalleryConfig._preLoader = new createjs.LoadQueue();

    preLoader = simpleGalleryConfig._preLoader;

    //console.log(":::←←←←←←←prepPreloader←:::");
    preLoaderMC = new MovieClip();

    stage.addChild(preLoaderMC);

    var loadBar = new MovieClip();

    preLoaderMC.addChild(loadBar);

    var loaderText = new TextClip();
    loaderText.makeTextClip(
        "Loading: 999%",
        defaultTextFormat.fontProps.fontStyle,
        parseInt(defaultTextFormat.fontProps.fontSize * 2),
        defaultTextFormat.fontProps.fontFamily,
        "#FFCC00",
        null
    );

    var loadingStripe = new ShapeObject();
    loadingStripe.drawBox(
        0,
        0,
        util_getScreenRelativeNumber(w),
        util_getScreenRelativeNumber(10),
        "#0080FF"
    );
    loadBar.addChild(loadingStripe);
    preLoaderMC.addChild(loadBar);

    loadBar.name = "loadbar";
    loaderText.name = "loader_textMC";
    preLoaderMC.name = "preloader_display";
    preLoaderMC.addChild(loaderText);
    simpleGalleryConfig._preLoaderDisplay = preLoaderMC;

    //set up the attraction animation
    var anMC = new createjs.MovieClip();
    anMC.name = "animation_home";
    anMC.x = stage.getBounds().width / 2;
    anMC.y = stage.getBounds().height / 2;

    //anMC.alpha = 1;

    preLoaderMC.addChild(anMC);

    animatedPreloaderManifest = [
        {
            id: "woody",
            src: "../images/woody-painting-white.json",
            type: "spritesheet",
            crossOrigin: false,
        },
        /*   {
            id: "really_large_img",
            src: "../pages/images/extremely-large-image.png",
            type: "image",
            crossOrigin: false,
        }, */
    ];

    simpleGalleryConfig._preLoader.addEventListener(
        "progress",
        preloadProgress
    );
    simpleGalleryConfig._preLoader.addEventListener(
        "complete",
        showAttractionAnim
    );
    //console.log("preLoaderMC██");
    //See: http://www.createjs.com/Docs/EaselJS/classes/Shadow.html for more
    preLoaderMC.shadow = new createjs.Shadow("rgba(0,0,127,0.35)", 0.5, 1.5, 5);

    //center preloader visuals
    var preLoaderMC_visualCenter = new ShapeObject();
    preLoaderMC_visualCenter.drawBox(0, 0, 2, 2, "#ff0000");
    preLoaderMC_visualCenter.x = w / 2;
    preLoaderMC_visualCenter.y = h / 2;
    preLoaderMC_visualCenter.name = "loading_indicator";
    stage.addChild(preLoaderMC_visualCenter);
    //hide the center so that it can be used as reference
    preLoaderMC_visualCenter.alpha = 1; //0.0;
    loadingStripe.x =
        preLoaderMC_visualCenter.x - loadingStripe.getBounds().width / 2;
    preLoadManifest();
}

function preLoadManifest() {
    simpleGalleryConfig._preLoader.loadManifest(
        animatedPreloaderManifest,
        true
    );
}

function showAttractionAnim(e) {
    attractionAnim = new createjs.Sprite(
        simpleGalleryConfig._preLoader.getResult("woody")
    );

    preLoaderMC.addChild(attractionAnim);
    attractionAnim.play();
    attractionAnim.x = w / 2;
    attractionAnim.y = h / 2;
    var hulking = new MovieClip();
    var bW = 0;
    var bH = 0;
    var bScale = 0;
    var bmp = new createjs.Bitmap("../pages/images/extremely-large-image.png");
    bmp.image.addEventListener("load", function () {
        bmp.setBounds(0, 0, bmp.image.naturalWidth, bmp.image.naturalHeight);
        console.log("this is the dimensions of the bmp.... ", bmp.getBounds());
        hulking.setBounds(
            0,
            0,
            bmp.image.naturalWidth,
            bmp.image.naturalHeight
        );
        bW = hulking.getBounds().width;
        bH = hulking.getBounds().height;
        console.log("this is the W:::::", w);
        if (bW >= w) {
            bScale = parseFloat(w / bW);
            hulking.scaleX = hulking.scaleY = bScale;
            if (bH <= h) {
                //TODO:
                //figure backdrop scale, so that it fits into the height of the window....
                bScale = parseFloat(h / bH);
                hulking.scaleX = hulking.scaleY = bScale;
                console.log("::::: bH ", bH, h);
                console.log("::::: bH ", bH, h);
            }
        } else if (bH <= h) {
            if (bW >= w) {
                bScale = parseFloat(w / bW);
                hulking.scaleX = hulking.scaleY = bScale;
            } else {
                bScale = parseFloat(h / bH);
                hulking.scaleX = hulking.scaleY = bScale;
                console.log("::::: bH ", bH, h);
                console.log("::::: bH ", bH, h);
            }
        }
        stage.update();
    });
    hulking.addChild(bmp);
    stage
        .getChildByName("backdrop")
        .getChildByName("subject")
        .addChild(hulking);
    hulking.name = "special_ops_bmp";
    /* 
    TODO:---
    ensure this is a patterned tile image that loads into the back of the interface, so that
    a tiled appearance is established. 
    see  Cleaned_Files\code_library\collection\tiled_background\waveys
    */
    //handle_Redraw();
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
/* 
function preloadStuff() {}
 */
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
}

function redrawStageDims(w, h) {
    topLeft.x = bottomLeft.x = 0;
    topRight.x = bottomRight.x = w;

    topLeft.y = topRight.y = 0;
    bottomLeft.y = bottomRight.y = h;

    center.x = parseInt(w / 2);
    center.y = parseInt(h / 2);
    var backdrop = stage.getChildByName("backdrop");
    var subject = backdrop.getChildByName("subject");
    subject.setBounds(0, 0, w, h);
    backdrop.setBounds(0, 0, w, h);

    var stageCenter = stage.getChildByName("loading_indicator");

    stageCenter.redraw(w, h);
    //attractionAnim.redraw(w, h);
    attractionAnim.x = parseInt(w / 2);
    attractionAnim.y = parseInt(h / 2);
    var bkGraphic = subject.getChildByName("special_ops_bmp");

    var bW = bkGraphic.getBounds().width;
    var bH = bkGraphic.getBounds().height;

    var bScale = 0;
    if (bW >= w) {
        bScale = parseFloat(w / bW);
        bkGraphic.scaleX = bkGraphic.scaleY = bScale;
    }
    if (bH <= h) {
        //TODO:
        //figure backdrop scale, so that it fits into the height of the window....
        bScale = parseFloat(h / bH);
        bkGraphic.scaleX = bkGraphic.scaleY = bScale;
        console.log(";;;;; bH ", bH, h);
    }
}
function thisReportIsWeird() {
    console.log("::: thisReportIsWeird :::");
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

    redrawStageDims(w, h);
    stage.update();
}

function tick(event) {
    stage.update(event);
}
/*
//TODO: TILED BACKGROUND   //***************************************************************

var BMP_W_limiit:Number = 2800;
var BMP_H_limiit:Number = 2800;
var skinBMPrefPoint:Point;
var mclListener:Object;
var mcl:MovieClipLoader;
var bgImg:String = "waveys.png";
var patchBMP:BitmapData;
var tiledBMP:BitmapData;
var skinBMPref:Rectangle;
var transMatx:Matrix;
var normMatx:Matrix;
var speed = .5;
var positionDrift = 3;
var swayLimit = 6;
var yThreshold = 250;
var xThreshold = 200;
var xAmt = positionDrift / (swayLimit * speed);
var yAmt = positionDrift / (swayLimit * speed);
var textAnimator;
var debugText;
var opacityLev:Number = 33;
var tiledClipForBg:MovieClip;
var gui = this.createEmptyMovieClip("GUI", this.getNextHighestDepth());
var GuiBG = gui.createEmptyMovieClip("GUIbackground", gui.getNextHighestDepth());
Stage.scaleMode = "noScale";
Stage.align = "TL";
var stageListener:Object = {};

//[TODO: add a dynamic font size to this. Involves a listener that sends events from the resize function already set up for the retile]
var defaultFont:TextFormat = new TextFormat();
defaultFont.font = "Artist_Choice";
defaultFont.align = "left";
defaultFont.size = 45;
defaultFont.color = 0xFFFFFF;

function generatePlainBMPSquare(dimW, dimH, colorVal):BitmapData {
	trace("generatePlainBMPSquare");
	var bmpSquare:BitmapData = new BitmapData(dimW, dimH, true, 0x00000000);
	bmpSquare.fillRect(bmpSquare.rectangle,colorVal);
	return bmpSquare;
}

function captureImg(mc):Void {
	tiledClipForBg=mc;
	trace ("tiledClipForBg: "+tiledClipForBg);
	trace("captureImg");
	trace(GuiBG);
	trace(mc._width);
	patchBMP = generatePlainBMPSquare(mc._width, mc._height, 0x00FF00FF);
	patchBMP.draw(mc);
	//patchBMP doesn't get GC'd. It's stored so the bitmap can be used again, and again
	tileImgBackGround(mc,patchBMP);
}

function adjustOpacity():Void {
	this._alpha = opacityLev;
}

function tileImgBackGround(mc, patchBMP):Void {
	trace ("tileImgBackGround");
	trace ("mc: "+mc);
	trace ("patchBMP: "+patchBMP);
	//mc is a callback to the holder clip
	skinBMPref = new Rectangle(0, 0, patchBMP.width, patchBMP.height);
	//go one bigger than the height and width so that it's not a partial reveal
	var skinCountW:Number = Math.floor(Stage.width / patchBMP.width) + 1;
	var skinCountH:Number = Math.floor(Stage.height / patchBMP.height) + 1;
	if (skinCountW > BMP_W_limiit) {
		skinCountW = 2800;
	}
	if (skinCountH > BMP_H_limiit) {
		skinCountH = 2800;
	}
	//make a bitmapdata to hold all the clips w, and h.         
	tiledBMP.dispose();
	tiledBMP = new BitmapData(patchBMP.width * skinCountW, patchBMP.height * skinCountH, true, 0x00FF00FF);
	transMatx = new Matrix();
	//for the width tiles
	for (var i:Number = 0; i < skinCountW; i++) {
		//for the height tiles
		for (var j:Number = 0; j < skinCountH; j++) {
			transMatx.tx = (patchBMP.width * i);
			transMatx.ty = (patchBMP.height * j);
			tiledBMP.draw(patchBMP,transMatx,null,"normal",null);
		}
	}
	//MovieClip mc;
	//mc can't be cleared or unloaded, so over-write the bg with the tiles
	mc = createEmptyMovieClip(mc, 0);
	mc.attachBitmap(tiledBMP,0,"always",true);
	adjustOpacity.apply(mc);
	activateTilingResize();
}

function sway() {
	this.onEnterFrame = function() {
		if (this._rotation > swayLimit) {
			speed = speed * -1;
			positionDrift = positionDrift * -1;
		}
		else if (this._rotation < -swayLimit) {
			speed = speed * -1;
			positionDrift = positionDrift * -1;
		}

		if (this._x >= xThreshold) {
			xAmt = Math.abs(xAmt) * -1;
		}
		else if (this._x < 0) {
			xAmt = Math.abs(xAmt);
			//updateTextField(textAnimator,debugText,"damn thing fell off! X",defaultFont);
		}

		if (this._y >= yThreshold) {
			yAmt = Math.abs(yAmt) * -1;
			//updateTextField(textAnimator,debugText,"damn thing fell off! Y",defaultFont);
		}
		if (this._y < 0) {
			yAmt = Math.abs(yAmt);
		}
		this._y += Math.cos(yAmt);
		this._x += Math.sin(xAmt);
		this._rotation += speed / 3;
	};
}

//function updateTextField(whatScope, whatField, whatText, whatTextFormat){
//	whatScope.whatField.text = whatText;
//	whatScope.whatField.embedFonts = true;
//	whatScope.whatField.setTextFormat(whatTextFormat);
//}  

function activateTilingResize(){
	stageListener.onResize = mx.utils.Delegate.create(GuiBG, reTile);
	Stage.addListener(stageListener);
}

function initGUI():Void {
//
	textAnimator = this.createEmptyMovieClip("TextHolder", this.getNextHighestDepth());
	debugText = textAnimator.createTextField("dText", textAnimator.getNextHighestDepth(), 0, 0, 320, 50);
	debugText.text = "THIS IS THE TEXT!!";
	debugText.embedFonts = true;
	debugText.setTextFormat(defaultFont);
	sway.apply(textAnimator);

	mclListener = {};
	mcl = new MovieClipLoader();
	//once the image is loaded, then the clip is captured as a bitmapdata.
	//load the background, using a reference to the MCLoader,
	mclListener.onLoadInit = function(mc) {
		captureImg(mc);
	};
	mcl.addListener(mclListener);
	mcl.loadClip(bgImg,GuiBG);
}

function reTile():Void {
	trace ("reTile");
	tileImgBackGround(this,patchBMP);
}

initGUI();
*/