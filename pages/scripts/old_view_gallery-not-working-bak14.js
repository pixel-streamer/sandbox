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

let aspect, stage, w, h, loader;
let trackingMC, bgMC, bg;
let sky, grant, ground, hill, hill2;
let stageTextSize,
    baseTextTo10Px,
    baseTextTo10PxTo10Percent,
    baseTextTo16px,
    baseTextVariableTen,
    scaleFactor,
    displayW,
    displayH = 0;
let delay = 250; // delay after event is "complete" to run callback
//const     was defined before, make it LET now. (hoisted-- testing.)
let resizeObserver;
let preLoader,
    preLoaderMC,
    ticker,
    subject,
    attractionAnim = null;
let timeout, // holder for timeout id
    isIE = false;
let defaultTextFormat = {};
let displayArea = {};

class MovieClip extends createjs.MovieClip {
    constructor() {
        super();
        this.movieClip;
        this.name = "mc_" + Math.floor(Math.random() * 1000);

        if (this.movieClip === undefined) {
            this.movieClip = this;
            this.init();
        }
        this.width;
        this.height;
    }
    clear() {
        this.removeAllChildren();
        //  this.movieClip.removeAllChildren();
        // this.movieClip.cache(0, 0, this.movieClip.width, this.movieClip.height);
    }

    init() {
        if (this.movieClip === undefined) {
            this.movieClip = new createjs.MovieClip();
            //  this.movieClip.setBounds
            console.log("MovieClip:::::::: ", this.width, this.height);
        }
        return this.movieClip;
    }
    setDims(param) {
        this.width = param.width;
        this.height = param.height;
    }
}

class ShapeObject extends createjs.Shape {
    constructor() {
        super();
        this.instance = this;
    }
    drawBox(x, y, x1, y1, color) {
        // <visual>.drawBox(0, 0, getNumberResized(10), getNumberResized(10),"#FF0000");
        this.instance.graphics.beginFill(color);
        this.instance.graphics.drawRect(x, y, x1, y1);
        this.instance.graphics.endFill();
        this.instance.setBounds(x, y, x1, y1);
    }
}
class TextClip extends createjs.Text {
    constructor() {
        super();
        this.textStr; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textStyle; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textSize; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textFontFamily; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textColor; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textReference; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.hit;
    }
    makeTextClip(
        textStr,
        textStyle,
        textSize,
        textFontFamily,
        textColor,
        textReference
    ) {
        this.textStr = textStr;
        this.textStyle = textStyle;
        this.textSize = textSize;
        this.textColor = textColor;
        this.textFontFamily = textFontFamily;
        this.textReference = textReference;

        if (this.textClip === undefined) {
            this.textClip = new MovieClip();
            this.textClip.name = this.textStr.toString().split(" ").join("_");
        }
        TextClip.prototype.snapToPixel = true;
        this.set({
            text: this.textStr,
            font:
                this.textStyle +
                " " +
                this.textSize +
                "px" +
                " " +
                this.textFontFamily,
            color: this.textColor,
        });
        this.textClip.clear();
        this.textClip.addChild(this);

        this.hit = new createjs.Shape();
        this.hit.graphics
            .beginFill("#FF0000")
            .drawRect(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
        this.hitArea = this.hit;
        this.textWidth = this.getMeasuredWidth();
        this.textHeight = this.getMeasuredHeight();
        this.textClip.setDims({
            width: this.getMeasuredWidth(),
            height: this.getMeasuredHeight(),
        });
        this.textClip.cache(0, 0, this.textWidth, this.textHeight);
        return this.textClip;
    }
    getDims() {
        return this.textClip.getBounds();
    }
}
function init() {
    initSimpleGallery();

    prepPreloader();
    preloadStuff();
}

function reportScaled() {
    /*
    displayW = parseInt(getComputedStyle(displayArea.fsDisplayWin).width);
    displayH = parseInt(getComputedStyle(displayArea.fsDisplayWin).height);
    aspect = Math.min(displayW, displayH) / Math.max(displayW, displayH);
    */
    /*  var newScale = resizeToKnownDimensions(
        window.innerWidth,
        window.innerHeight,
        displayW,
        displayH
    );
    var slingW = newScale[0];
    var slingH = newScale[1];
    aspect = newScale[2];
    stage.canvas.width = slingW;
    stage.canvas.height = slingH;

    stage.canvas.setAttribute(
        "style",
        "width:" + slingW + "px;height:" + slingH + "px;"
    );
    stage.scaleX = stage.scaleY = aspect;
*/

    /*
    stage.children.forEach(function (el) {
      //  el.x = (el.getBounds().width - stage.getBounds().width) / 2;
      console.log(el.x)
    });
    */

    var widthToHeight = displayW / displayH;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        displayArea.fsDisplayWin.style.height = newHeight + "px";
        displayArea.fsDisplayWin.style.width = newWidth + "px";
    } else {
        newHeight = newWidth / widthToHeight;
        displayArea.fsDisplayWin.style.height = newHeight + "px";
        displayArea.fsDisplayWin.style.width = newWidth + "px";
    }

    scale = newWidthToHeight / widthToHeight;
    stage.width = newWidth;
    stage.height = newHeight;
    subject.scale=scale;
    displayArea.fsDisplayWin.style.marginTop =
        (window.innerHeight - newHeight) / 2 + "px";
    displayArea.fsDisplayWin.style.marginLeft =
        (window.innerWidth - newWidth) / 2 + "px";

    console.log(
        "███└└say:reportScaled",
        "displayW:",
        displayW,
        "displayH",
        displayH,
        aspect
    );
}

function reportClick() {
    console.log("say: clicked on something");
    subject.clear();

    var text = new TextClip();
    text.makeTextClip(
        "M",
        defaultTextFormat.fontProps.fontStyle,
        defaultTextFormat.fontProps.fontSize,
        defaultTextFormat.fontProps.fontFamily,
        defaultTextFormat.fontProps.fontColor
    );
    text.y = 0;
    subject.addChild(text);

    stage.update();
    console.log(" subject.width: ", subject);

    var moretext = new TextClip();
    moretext.makeTextClip();
    subject.addChild(moretext);
    console.log("moretext: ", moretext.getBounds());
    stage.update();
}

function getNumberResized(num) {
    //controls sizing so that pixel numbers are more precise. (in no way accurate, however)
    var temp = parseFloat(num * ((baseTextVariableTen * 0.74) / 10) * 100);
    //alerted reassignment
    temp = parseInt(parseFloat(temp) / 10) / 10;
    return temp;
}

function stageSetupNowStart() {
    console.log("█├───stageSetupNowStart ");
    var tempClip = new createjs.Shape();
    tempClip.graphics
        .setStrokeStyle(getNumberResized(1), "square", "bevel", "round")
        .beginStroke("#000")
        .drawRect(
            getNumberResized(1),
            getNumberResized(100),
            getNumberResized(100),
            getNumberResized(100)
        );
    bgMC.addChild(tempClip);
    tempClip.scaleX = getNumberResized(1);
    tempClip.scaleY = getNumberResized(1);

    stage.addEventListener("stagemousedown", reportClick);
}

function tick(event) {
    stage.update(event);
}

/*
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************
 ************************************************************************************
 */

function showLoadingAnim() {
    console.log("::::showLoadingAnim:::");
    attractionAnim = new createjs.Sprite(preLoader.getResult("woody"));

    //   attractionAnim.scale = thingSize[2]  ;
    //console.log(thingSize[2]); //0.333;
    attractionAnim.play();

    var anMC = new MovieClip();
    var animHome = new MovieClip();
    anMC.name = "animation_home";
    animHome.addChild(attractionAnim);
    animHome.scale = 2 * aspect;
    anMC.alpha = 0;
    stage.addChild(anMC);
    anMC.addChild(animHome);

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

function preloadStuff() {
    console.log("::::preloadStuff");
    preLoader.addEventListener("progress", preloadProgress);
    preLoader.addEventListener("complete", showLoadingAnim);

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

    preLoader.loadManifest(animatedPreloader, true);
}

function preloadProgress(e) {
    var preloadingText =
        simpleGalleryConfig._preLoaderDisplay.getChildByName("loader_textMC");
    simpleGalleryConfig._preLoaderDisplay.scaleX = parseFloat(e.progress);
    preloadingText.text = "LOADING: " + Math.floor(e.progress * 100) + "%";
    console.log("LOADING: " + Math.floor(e.progress * 100) + "%");

    stage.update();
    return;
    preloadingText.regX = loadTextW * 0.5;
    preloadingText.regY = loadTextH * 0.5;

    preloadingText.x = w / 2;
    preloadingText.y = h / 2;
}
/* 
function getXMLdata(e) {
    //  console.log("::: ██ getXMLdata ██ :::");
    var queue = new createjs.LoadQueue(true);
    queue.on("fileload", loadGameData, this);
    queue.loadFile({
        src: "hangman_words.xml",
        type: createjs.Types.XML,
    });
    queue.load();
}
 */
/* 
function loadGameData(e) {
    console.log("loadGameData");
    return;
    var rawXML = e.result.firstChild;

    var len = rawXML.childNodes.length;
    GameData.wordbank_arr = [];
    for (var i = 0; i < len; i++) {
        if (rawXML.getElementsByTagName("term")[i] !== undefined) {
            GameData.wordbank_arr.push(
                rawXML.getElementsByTagName("term")[i].childNodes[0].nodeValue
            );
        }
    }
    GameData.stage.dispatchEvent("loadedXML");
}
 */

function prepPreloader() {
    console.log(":::prepPreloader:::");

    bgMC = new MovieClip();
    bg = new createjs.Shape();
    bgMC.addChild(bg);

    bg.graphics.beginFill("#BADA55").drawRect(0, 0, w, h).endFill();
    bgMC.setBounds(0, 0, w, h);
    stage.addChild(bgMC);

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

    preLoaderMC = new MovieClip();
    var preLoaderMC_visualCenter = new ShapeObject(); // new createjs.Shape();
    preLoaderMC_visualCenter.drawBox(
        0,
        0,
        getNumberResized(1),
        getNumberResized(1),
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
        getNumberResized(w),
        getNumberResized(10),
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
    //See: http://www.createjs.com/Docs/EaselJS/classes/Shadow.html for more
    preLoaderMC.shadow = new createjs.Shadow("rgba(0,0,127,0.35)", 0.5, 1.5, 5);
    //console.log(preLoaderMC.shadow);

    console.log("defaultTextFormat.font: ", defaultTextFormat.font);
    console.log("displayArea.fsDisplayWin: ", displayArea.fsDisplayWin);

    //getNumberResized(w) *
    resizeObserver = new ResizeObserver(function () {
        clearTimeout(timeout);
        timeout = setTimeout(reportScaled, delay);
    });
    resizeObserver.observe(displayArea.fsDisplayWin);
    simpleGalleryConfig._ticker = createjs.Ticker;
    ticker = simpleGalleryConfig._ticker;

    // ticker.timingMode = createjs.Ticker.RAF;
    // these are equivalent, 1000ms / 40fps (framerate) = 25ms (interval)
    //ticker.interval = 25;
    ticker.timingMode = ticker.RAF_SYNCHED;
    ticker.framerate = 30;
    ticker.addEventListener("tick", tick);

    subject = bgMC.getChildByName("subject");
    subject.setBounds(0, 0, stage.getBounds().width, stage.getBounds().height);
    //ticker.setFPS(6);
}

function initSimpleGallery() {
    simpleGalleryConfig._canvasEl = displayArea.fsDisplayWin;
    displayW = parseInt(getComputedStyle(displayArea.fsDisplayWin).width);
    displayH = parseInt(getComputedStyle(displayArea.fsDisplayWin).height);

    displayArea.width = displayW;
    displayArea.height = displayH;

    simpleGalleryConfig._ticker;
    simpleGalleryConfig._preLoader;
    simpleGalleryConfig._firstRun = true;
    simpleGalleryConfig._preLoaderDisplay;
    simpleGalleryConfig._mainStage;
    simpleGalleryConfig._collectionNames = ""; // #3d_renders,#<collection_name> --from the queryO
    simpleGalleryConfig._baseURLPortion = "images/fullsize/";
    simpleGalleryConfig._thumbURLPortion = "images/thumbs/";
    simpleGalleryConfig._canvasEl;
    simpleGalleryConfig._galleryCanResize = false;
    simpleGalleryConfig._isResizing = false;

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

    simpleGalleryConfig._baseText10px; //baseTextTo10Px
    simpleGalleryConfig._baseText16px; //baseTextTo16px
    simpleGalleryConfig._baseText10Percent; //baseTextTo10PxTo10Percent

    //  slide_objects:
    simpleGalleryConfig._originalImgSrc = "";
    simpleGalleryConfig._originalThumbSrc = "";
    simpleGalleryConfig._originalImg = "";
    simpleGalleryConfig._originalThumb = "";

    simpleGalleryConfig._effectName = "fade";
    //handle what happens at resize.
    //resize was here:
    //https://web.archive.org/web/20220714020647/https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
    //debouncing from here:
    //https://web.archive.org/web/20160611224002/http://codepen.io/bencentra/pen/PwapWX/
    //resize observer is like firing an event with resize and "debouncing" at the same time.

    //ie: blindsEffect, verticalSlatEffect, fadeEffect,
    //fade only avail. in v1
    return simpleGalleryConfig;
}

/*
split the loaded images into a grid

paginate items

single items load page details?

page details avail: ?

captions loaded with images? sure

break the config element down with this:
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
*/
//via a query string digest function:
//D:\pixel_streamer_files\Cleaned_Files\learning-cleaned\learning_xsl
//D:\pixel_streamer_files\Cleaned_Files\learning-cleaned\learning_javascript\mapping_query_strings
// Task-Centered Design Process--
//      Text (c) 1993, 1994 by Clayton Lewis and John Rieman.

class SimpleGallery {
    constructor(gallery_config_obj) {
        this._frag = document.createDocumentFragment();
        // this._galleryCanvas =
        //     gallery_config_obj._canvasEl || document.createElement("canvas");
        this._galleryContext; // this._galleryCanvas.getContext("2d");
        //holds all the configuration data for later reference through the
        this._config_obj = gallery_config_obj;
        this._clickableSlideArr = [];
        this.pageName = "";
        this.pageURL = "";
        this._isAppended = false;
        this.width = 0;
        //stores gallery_config_obj._queryObj._collectionNames given by makeQueryObj.
        this._queryObj = {};
        this.makeQueryObj();
    }
    init() {
        this._config_obj._collectionNames = this._queryObj.collections;
        /* console.log(
            "██:SimpleSlide gallery_config_obj._collectionNames —",
            this._config_obj._collectionNames
        ); */
    }
    makeQueryObj() {
        var searchString = new URLSearchParams(this.pageURL.search);
        var val_pairs = searchString.entries();
        var finalObj = {};
        for (let vals of val_pairs) {
            if (vals[1].toLowerCase() === "true") {
                finalObj[vals[0].toString()] = true;
            } else if (vals[1].toLowerCase() === "false") {
                finalObj[vals[0].toString()] = false;
            } else {
                //TODO: should I handle values that are numerals? Floating numbers too?
                if (vals[0].toString().toLowerCase() === "collections") {
                    var tempArr = vals[1].toString().split(",").slice();
                    finalObj[vals[0].toString()] = tempArr.forEach(function (
                        el,
                        index
                    ) {
                        tempArr[index] = "#" + el;
                        //console.log("tempArr[index]: ", tempArr[index]);
                    });
                    finalObj[vals[0].toString()] = tempArr.join(",");
                } else {
                    finalObj[vals[0].toString()] = vals[1].toString();
                }
            }
        }
        finalObj.originalArr = Array.from(searchString);
        this._queryObj = finalObj;
        return this._queryObj;
    }
    addToDom(locEl) {
        console.log(":::: addToDom ::::");
        if (!locEl) {
            try {
                document.body.appendChild(this._frag);
                this._isAppended = true;
            } catch (error) {
                console.log(
                    "I'm not sure what happened, but" +
                        "SimpleGallery can't be appended there. \n [" +
                        error.message +
                        "]"
                );
            }
        } else {
            if (this._isAppended === false) {
                locEl.appendChild(this._frag);
            }
        }
    }
}

Object.defineProperty(SimpleGallery.prototype, "pageURL", {
    get: function () {
        //return pageURL;
        return pageURL || new URL(window.location.href);
    },
    set: function (param) {
        pageURL = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGallery.prototype, "pageName", {
    get: function () {
        var tempURI = this.pageURL.pathname.toString();
        tempURI = tempURI.substring(
            tempURI.lastIndexOf("/") + 1,
            tempURI.length
        );
        pageName = tempURI;
        return pageName;
    },
    set: function (param) {
        pageName = param;
    },
    configurable: true,
});

class SimpleGalleryConfig extends Object {
    constructor() {
        super();
        this._ticker = null;
        this._firstRun = false;
        this._mainStage = null;
        this._preLoader = null;
        this._preLoaderDisplay = null;
        this._baseURLPortion = "";
        this._canvasEl = null;
        this._captionFontColor = "black";
        this._captionFontFamily = "sans serif";
        this._captionFontSize = 0;
        this._captionText = "";
        this._collectionNames = null;
        this._effectName = "";
        this._fullH = 0;
        this._fullW = 0;
        this._galleryCanResize = false;
        this._galleryFontColor = "black";
        this._galleryFontFamily = "sans serif";
        this._galleryFontSize = 0;
        this._hasCaptionsEnabled = false;
        this._hasGalleryText = false;
        this._isUsingGridLayout = false;
        this._originalImg = null;
        this._originalImgSrc = "";
        this._originalThumb = null;
        this._originalThumbSrc = "";
        this._thumbH = 0;
        this._thumbURLPortion = "";
        this._thumbW = 0;
        this._baseText10px = 0; //baseTextTo10Px simpleGalleryConfig.
        this._baseText16px = 0; //baseTextTo16px
        this._baseText10Percent = 0; //baseTextTo10PxTo10Percent
    }
}

//define these in the obj, until they can be loaded via xml (as well as the rest)
let simpleGalleryConfig = new SimpleGalleryConfig();
Object.defineProperty(SimpleGalleryConfig.prototype, "_baseURLPortion", {
    get: function () {
        //_baseURLPortion = "";
        return _baseURLPortion;
    },
    set: function (param) {
        _baseURLPortion = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_canvasEl", {
    get: function () {
        // _canvasEl = null; //no dom ready
        return _canvasEl;
    },
    set: function (param) {
        _canvasEl = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionFontColor", {
    get: function () {
        //_captionFontColor = "#450067";
        return _captionFontColor;
    },
    set: function (param) {
        _captionFontColor = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionFontFamily", {
    get: function () {
        //_captionFontFamily = "Arial";
        return _captionFontFamily;
    },
    set: function (param) {
        _captionFontFamily = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionFontSize", {
    get: function () {
        //_captionFontSize = 16;
        return _captionFontSize;
    },
    set: function (param) {
        _captionFontSize = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionText", {
    get: function () {
        //_captionText = "_captionText";
        return _captionText;
    },
    set: function (param) {
        _captionText = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_collectionNames", {
    get: function () {
        //_collectionNames = "";
        return _collectionNames;
    },
    set: function (param) {
        _collectionNames = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_effectName", {
    get: function () {
        //_effectName = "";
        return _effectName;
    },
    set: function (param) {
        _effectName = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_fullH", {
    get: function () {
        //_fullH = 150;
        return _fullH;
    },
    set: function (param) {
        _fullH = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_fullW", {
    get: function () {
        //_fullW = 150;
        return _fullW;
    },
    set: function (param) {
        _fullW = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryCanResize", {
    get: function () {
        //_galleryCanResize = false;
        return _galleryCanResize;
    },
    set: function (param) {
        _galleryCanResize = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryFontColor", {
    get: function () {
        //_galleryFontColor = "#450067";
        return _galleryFontColor;
    },
    set: function (param) {
        _galleryFontColor = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryFontFamily", {
    get: function () {
        //_galleryFontFamily = "Arial";
        return _galleryFontFamily;
    },
    set: function (param) {
        _galleryFontFamily = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryFontSize", {
    get: function () {
        // _galleryFontSize = 16;
        return _galleryFontSize;
    },
    set: function (param) {
        _galleryFontSize = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_hasCaptionsEnabled", {
    get: function () {
        //_hasCaptionsEnabled = false;
        return _hasCaptionsEnabled;
    },
    set: function (param) {
        _hasCaptionsEnabled = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_hasGalleryText", {
    get: function () {
        //_hasGalleryText = false;
        return _hasGalleryText;
    },
    set: function (param) {
        _hasGalleryText = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_isUsingGridLayout", {
    get: function () {
        //_isUsingGridLayout = false;
        return _isUsingGridLayout;
    },
    set: function (param) {
        _isUsingGridLayout = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalImg", {
    get: function () {
        // _originalImg = null;
        return _originalImg;
    },
    set: function (param) {
        _originalImg = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalImgSrc", {
    get: function () {
        //_originalImgSrc = "";
        return _originalImgSrc;
    },
    set: function (param) {
        _originalImgSrc = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalThumb", {
    get: function () {
        //_originalThumb = null;
        return _originalThumb;
    },
    set: function (param) {
        _originalThumb = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalThumbSrc", {
    get: function () {
        //_originalThumbSrc = "";
        return _originalThumbSrc;
    },
    set: function (param) {
        _originalThumbSrc = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_thumbH", {
    get: function () {
        //_thumbH = 150;
        return _thumbH;
    },
    set: function (param) {
        _thumbH = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_thumbURLPortion", {
    get: function () {
        // _thumbURLPortion = "";
        return _thumbURLPortion;
    },
    set: function (param) {
        _thumbURLPortion = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_thumbW", {
    get: function () {
        //_thumbW = 150;
        return _thumbW;
    },
    set: function (param) {
        _thumbW = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_mainStage", {
    get: function () {
        return _mainStage;
    },
    set: function (param) {
        _mainStage = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_isResizing", {
    get: function () {
        return _isResizing;
    },
    set: function (param) {
        _isResizing = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_preLoader", {
    get: function () {
        return _preLoader;
    },
    set: function (param) {
        _preLoader = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_preLoaderDisplay", {
    get: function () {
        return _preLoaderDisplay;
    },
    set: function (param) {
        _preLoaderDisplay = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_baseText10px", {
    get: function () {
        return _baseText10px;
    },
    set: function (param) {
        _baseText10px = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_baseText16px", {
    get: function () {
        return _baseText16px;
    },
    set: function (param) {
        _baseText16px = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_baseText10Percent", {
    get: function () {
        return _baseText10Percent;
    },
    set: function (param) {
        _baseText10Percent = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_firstRun", {
    get: function () {
        return _firstRun;
    },
    set: function (param) {
        _firstRun = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_ticker", {
    get: function () {
        return _ticker;
    },
    set: function (param) {
        _ticker = param;
    },
    configurable: true,
});

class SimpleImage extends Image {
    constructor(src, homeEl) {
        super();
        this._simpleImageInstance = this;
        this._domEl = homeEl || null;
        this._img = new Image();
        this._img.addEventListener(
            "load",
            handle_SimpleImage_load.bind(this._simpleImageInstance)
        );
        this._img.addEventListener(
            "error",
            handle_SimpleImage_error.bind(this._simpleImageInstance)
        );
        this._src = src;
        this._img.src = this._src;
    }
}

class SimpleCanvas extends Image {
    constructor(homeEl) {
        super();
        this._simpleCanvasInstance = this;
        this._domEl = homeEl || null;
        this._canvasEl = document.createElement("canvas");
        this._simpleCanvasContext;
        if (this._domEl === null) {
            this._domEl = document.body;
            this._domEl.appendChild(this._canvasEl);
            this._simpleCanvasContext = this._canvasEl.getContext("2d");
        }
    }
    addSimpleCanvasToDom(where) {
        this._domEl.appendChild(this._canvasEl);
        this._simpleCanvasContext = this._canvasEl.getContext("2d");
    }
}

function handle_SimpleImage_error(evt) {
    console.log(
        "::::handle_SimpleImage_error:::: something is wrong with the source:\n ",
        evt,
        evt.message,
        "this._src--- ",
        this._src
    );
}

function handle_SimpleImage_load(evt) {
    //console.log("███handle_SimpleImage_load████ this:",this," this image: ",this._img,evt);

    if (this._domEl) {
        this._domEl.appendChild(this._img);
    } else if (this._domEl === null) {
        console.log("can't attach " + this._src + " \n ... at this time.");
    } else {
        console.log(
            "something is wrong with the " + this._src + " \n image source."
        );
    }
}

class SimpleSlide {
    constructor(gallery_config_obj) {
        //store the fullsize image @ naturalWidth, @naturalHeight
        this._fullOrigBlob;
        //store the current thumbnail image @ naturalWidth, @naturalHeight
        this._thumbOriginalBlob;
        //stores the current thumbnail image @ naturalWidth, @naturalHeight
        this._currThumb;
        //stores the current thumbnail (based on thumbnail W and H)
        this._currFullSize;
        //the current _thumbOriginalBlob src string
        this._ThumbSrc;
        //the current _fullOrigBlob src string
        this._FullSrc;
        //the current effect in place to transition the slides in the owl slider.
        this._effectName;
    }
    init() {
        //console.log("██:SimpleSlide init:██");
        /*
        console.log(
            "██:SimpleSlide gallery_config_obj:██",
            this._config
        );
        */
    }
}

function initPageGallery(config_obj) {
    var color_options = { background: "#450067;" };
    //add a square to give the stage dimension

    displayArea.fsDisplayWin = document.querySelector(".fulldisplay");

    displayW = parseInt(getComputedStyle(displayArea.fsDisplayWin).width);
    displayH = parseInt(getComputedStyle(displayArea.fsDisplayWin).height);
    displayArea.width = displayW;
    displayArea.height = displayH;
    console.log("::displayW::", displayArea.height);
    aspect = Math.min(displayW, displayH) / Math.max(displayW, displayH);

    var stageHome = displayArea.fsDisplayWin;
    var stageContainer = document.createElement("canvas");
    stageContainer.setAttribute("id", "testCanvas");
    stageContainer.setAttribute(
        "style",
        "width:" +
            displayArea.width +
            "px" +
            ";" +
            "height:" +
            displayArea.height +
            "px;" +
            ""
    );

    //TODO: got to figure how createjs calculates the math for scale.
    //I think it's based on the page text size....

    //set up a home for the canvas visuals
    displayArea.fsDisplayWin.setAttribute("class", "fulldisplay cleared_top");
    stageHome.appendChild(stageContainer);
    document.body.insertBefore(stageHome, document.body.firstChild);

    simpleGalleryConfig._mainStage = new createjs.Stage("testCanvas");
    stage = simpleGalleryConfig._mainStage;
    stage.enableMouseOver();

    aspect =
        Math.min(displayArea.height, displayArea.width) /
        Math.max(displayArea.height, displayArea.width);
    // grab canvas width and height for later calculations:

    w = displayArea.width;
    h = displayArea.height;
    stage.setBounds(0, 0, w, h);

    console.log("displayArea", displayArea);

    stage.canvas.width = stage.getBounds().width;
    stage.canvas.height = stage.getBounds().height;

    //figure spaces for a header, footer, and mid-way display area. Don't forget, the text areas.
    // displayW; // width of expected area, with regard to the size of the display area.
    // displayH  ; // width of expected area, with regard to the size of the display area.

    //calc thumbnail ideal size: (for grid layout)
    /*
    console.log(
        ":::  simpleGalleryConfig._thumbW: ::::",
        simpleGalleryConfig._thumbW
    );
    */
    var resizeThumDim = resizeToKnownDimensions(
        250,
        200,
        displayW / Math.floor(displayW / 150),
        150
    );
    //simpleGalleryConfig._thumbW
    var tWCalc = resizeThumDim;

    // grab canvas width and height for later calculations:
    // console.log("::: init displayW: ::::", tWCalc);
    //  console.log("::: init config_obj: ::::", config_obj);
    if (window.event !== undefined) {
        isIE = true;
    }
    var gallery = new SimpleGallery(config_obj);
    gallery.init(config_obj);
    var someImg = new SimpleImage(
        "images/fullsize/3d_renders/basketball.png",
        document.body
    );
    var some_slide = new SimpleSlide(config_obj);

    some_slide.init();
    //  initCollections("3d_renders");

    init();
}

window.addEventListener("load", initPageGallery.bind(simpleGalleryConfig));

function removeChildren(withinEl) {
    while (withinEl.hasChildNodes()) {
        withinEl.removeChild(withinEl.childNodes[0]);
    }
}

/* 
function getFullSizeSrc(nodeArr, targetedCategory) {
    var categories = nodeArr;
    var fullsizeSrcArr = [];
    //assumes that simpleGallerConfig has been built
    var basePart = simpleGalleryConfig._baseURLPortion;
    for (var i = 0, len = categories.length; i < len; i++) {
        if (categories[i].classList.contains(targetedCategory)) {
            if (categories[i].classList.contains("full_size")) {
                fullsizeSrcArr.push(
                    basePart +
                        targetedCategory +
                        "/" +
                        categories[i].textContent.trim()
                );
            }
        }
    }
    return fullsizeSrcArr;
}
*/

/*
 function getThumbnailSrc(nodeArr, targetedCategory) {
    var categories = nodeArr;
    var thumbsSrcArr = [];
    //assumes that simpleGallerConfig has been built
    var thumbPart = simpleGalleryConfig._thumbURLPortion;
    for (var i = 0, len = categories.length; i < len; i++) {
        if (categories[i].classList.contains(targetedCategory)) {
            if (categories[i].classList.contains("thumbnail")) {
                thumbsSrcArr.push(thumbPart + categories[i].textContent.trim());
            }
        }
    }
    return thumbsSrcArr;
}
 */

//resizeToKnownDimensions returns an array with 3 members: [contentW, contentH, aspect];
function resizeToKnownDimensions(contentW, contentH, constraintW, constraintH) {
    var containerAspect = constraintW / constraintH;

    var fullW = contentW;
    var fullH = contentH;

    var aspect = fullW / fullH;

    var fullMax = Math.max(fullW, fullH);
    var fullMin = Math.min(fullW, fullH);

    var contnMax = Math.max(constraintW, constraintH);
    var contnMin = Math.min(constraintW, constraintH);

    if (aspect < 1 || aspect === 1) {
        //use contnMin/fullMax
        contentW = fullW * (contnMin / fullMax);
        contentH = fullH * (contnMin / fullMax);
    } else if (aspect > 1) {
        //use contnMax/fullMax unless the containerAspect is greater than aspect
        var greater = Math.max(aspect, containerAspect);
        if (greater === aspect) {
            //console.log("greater.... ASPECT!");
            contentW = fullW * (contnMax / fullMax);
            contentH = fullH * (contnMax / fullMax);
            aspect = contnMin / contnMax;
        } else {
            //console.log("greater.... CONTAINERASPECT!");
            contentW = fullW * (contnMin / fullMin);
            contentH = fullH * (contnMin / fullMin);
        }
    }
    //console.log(":: :: :: :: :: contentW, contentH: ", contentW, contentH);
    contentW = Math.floor(contentW);
    contentH = Math.floor(contentH);
    return [contentW, contentH, aspect];
}

function initCollections(param) {
    //console.log(":::initCollections:::");
    var canvasCollection = {};
    var cgC = canvasCollection;
    var categories = document.querySelectorAll("div.spotlight > a");

    var thumbsSrcArr = getThumbnailSrc(categories, param);
    var fullSizeSrcArr = getFullSizeSrc(categories, param);
    //var collectionRe = new RegExp(param, "gi");
    // console.log("thumbsSrcArr: ", thumbsSrcArr);
    //console.log("█├─── fullSizeSrcArr : ", fullSizeSrcArr);
    for (var str in cgC) {
        console.log("str: ", str);
    }
    // console.log("initCollections█", cgC);
    thumbsSrcArr.forEach(function (el1, index1) {
        //el1 is an array of 2.
        var someImg = new SimpleImage(el1, document.body);
    });
    fullSizeSrcArr.forEach(function (el2, index2) {
        var someImg = new SimpleImage(el2, document.body);
    });
    return cgC;
}
