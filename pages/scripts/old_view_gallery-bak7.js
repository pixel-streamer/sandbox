//tasks:
//preloader
//quick animation built with css, or js?

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
    }
}
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

let displayArea = {};
//define these in the obj, until they can be loaded via xml (as well as the rest)
let simpleGalleryConfig = new SimpleGalleryConfig();
simpleGalleryConfig._collectionNames = ""; // #3d_renders,#<collection_name> --from the queryO
simpleGalleryConfig._baseURLPortion = "images/fullsize/";
simpleGalleryConfig._thumbURLPortion = "images/thumbs/";
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

//  slide_objects:
simpleGalleryConfig._originalImgSrc = "";
simpleGalleryConfig._originalThumbSrc = "";
simpleGalleryConfig._originalImg = "";
simpleGalleryConfig._originalThumb = "";

simpleGalleryConfig._effectName = "fade";
//ie: blindsEffect, verticalSlatEffect, fadeEffect,
//fade only avail. in v1

var isIE = false;
function makeDisplayArea(w, h, xpos, ypos) {
    return;
}

function initPageGallery(config_obj) {
    displayArea.fsDisplayWin = document.querySelector(".fulldisplay");

    var displayW = parseInt(getComputedStyle(displayArea.fsDisplayWin).width);
    var displayH = parseInt(getComputedStyle(displayArea.fsDisplayWin).height);

    displayArea.width = displayW;
    displayArea.height = displayH;
    console.log(
        "█├─── getComputedStyle : ",
        displayW,
        displayH,
        displayArea.fsDisplayWin
    );
    console.log(
        "█├─── reportStretched dims : ",
        displayW,
        displayH,
        displayArea.fsDisplayWin
    );
    var color_options = { background: "#450067;" };

    //figure spaces for a header, footer, and mid-way display area. Don't forget, the text areas.
    var w = displayW; // width of expected area, with regard to the size of the display area.
    var h = displayH - 125; // width of expected area, with regard to the size of the display area.
    var xpos = 150; // width of expected area, with regard to the size of the display area.
    var ypos = 90; // width of expected area, with regard to the size of the display area.
    var headerBox = makeDisplayArea(w, h, xpos, ypos, color_options);

    //calc thumbnail ideal size: (for grid layout)
    /* console.log(
        ":::  simpleGalleryConfig._thumbW: ::::",
        simpleGalleryConfig._thumbW
    ); */
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
    initCollections("3d_renders");
    init();
}

window.addEventListener("load", initPageGallery.bind(simpleGalleryConfig));

function removeChildren(withinEl) {
    while (withinEl.hasChildNodes()) {
        withinEl.removeChild(withinEl.childNodes[0]);
    }
}

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
        /*
        var cat = {};
        cat["name"] = categories.item(i).id.trim();
        cat["base"] = categories
            .item(i)
            .querySelector(".base")
            .textContent.trim();
        cat["images"] = [];
        cgC["category_" + i] = cat;
        var catImgs = categories.item(i).querySelectorAll("a");

        if (catImgs.length > 0) {
            for (var j = 0, lenj = catImgs.length; j < lenj; j++) {
                var tempAnchor = catImgs.item(j).href;
                tempAnchor = tempAnchor.substring(
                    tempAnchor.lastIndexOf("/") + 1,
                    tempAnchor.length -
                        tempAnchor.lastIndexOf(window.location.href)
                );
                cgC["category_" + i]["images"].push(
                    cgC["category_" + i]["base"] + tempAnchor
                );
            }
        }
        */
    }
    return fullsizeSrcArr;
}

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

/*******************************************************************************************/
/*******************************************************************************************/
/*******************************************************************************************/
/*******************************************************************************************/

class textClip extends createjs.Text {
    constructor() {
        super();
        this.textStr; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textStyle; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textSize; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textFontFamily; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textColor; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textReference; //these are all set with the makeTextClip function. (and font is all style options combined)
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

        this.textClip = new createjs.MovieClip();
        textClip.prototype.snapToPixel = true;
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
        this.textClip.addChild(this);
        return this.textClip;
    }
}
/*

//█
//resize was here: 
//https://web.archive.org/web/20220714020647/https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
//debouncing from here:
//https://web.archive.org/web/20160611224002/http://codepen.io/bencentra/pen/PwapWX/
var w = document.querySelector("#width"),
    h = document.querySelector("#height"),
    c = document.querySelector("#calls"),
    timeout = false, // holder for timeout id
    delay = 250, // delay after event is "complete" to run callback
    calls = 0;

// window.resize callback function
function getDimensions() {
    w.innerHTML = window.innerWidth;
    h.innerHTML = window.innerHeight;
    calls += 1;
    c.innerHTML = calls;
}

// window.resize event listener
window.addEventListener("resize", function () {
    // clear the timeout
    clearTimeout(timeout);
    // start timing for event "completion"
    timeout = setTimeout(getDimensions, delay);
});

getDimensions();
//█
*/

var aspect, stage, w, h, loader;
var trackingMC, bgMC, bg;
var sky, grant, ground, hill, hill2;
var stageTextSize,
    baseTextTo10PxThenPercent,
    baseTextTo10Px,
    testdimsTextSize,
    scaleFactor = 0;

function init() {
    // examples.showDistractor();

    //add a square to give the stage dimension
    var stageHome = document.createDocumentFragment();
    var stageTemp = document.createElement("canvas");
    stageTemp.setAttribute("id", "testCanvas");
    stageTemp.setAttribute(
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

    //TODO: got to figure this lousy math. I think it's based on the page
    //text size... more on that later.
    stageTemp.setAttribute("class", "fulldisplay cleared_top");
    stageHome.appendChild(stageTemp);
    document.body.insertBefore(stageHome, document.body.firstChild);

    stage = new createjs.Stage("testCanvas");

    // grab canvas width and height for later calculations:
    console.log(" displayArea.width: ", displayArea.width);
    aspect =
        Math.min(displayArea.height, displayArea.width) /
        Math.max(displayArea.height, displayArea.width);
    console.log("aspect", aspect);
    w = displayArea.width;
    h = displayArea.height * aspect;
    stage.setBounds(0, 0, w, h);

    //clarify: this sets the width and height attributes on the canvas element
    //within the page.
    stage.canvas.width = stage.getBounds().width;
    stage.canvas.height = stage.getBounds().height;

    console.log("  w  ,  h  : ", w, h);
    console.log(" stage.getBounds().width: ", stage.getBounds().width);
    console.log(" stage.getBounds().height: ", stage.getBounds().height);

    //stage.addEventListener("resize", reportScaled);

    bgMC = new createjs.MovieClip();
    bgMC.setBounds(0, 0, w, h);
    bg = new createjs.Shape();
    bg.graphics.beginFill("#BADA55").drawRect(0, 0, w, h).endFill();
    bgMC.addChild(bg);
    stage.addChild(bgMC);
    var newW = bgMC.getBounds().width;
    var newH = bgMC.getBounds().height;
    scaleFactor =
        parseInt(
            parseFloat(
                resizeToKnownDimensions(newW, newH, newW, newH)[2] * 0.61125 // 0.275
            ) * 1000
        ) /
        1000 /
        2;

    console.log("║ this scaleFactor: ", scaleFactor);

    //scale the base text 10px based on the displayArea.width 1000
    //baseTextTo10PxThenPercent = (w * 0.01);
    //the text is passed an undefined at this time. Not sure how that doesn't break, so it's the
    //start of the big mystery of scaling. it might go off of the page text size?

    //so lets scale the text to 10px based on the screen size of displayArea width (1000)

    baseTextSizeFromDims = new textClip();
    baseTextSizeFromDims.makeTextClip(
        "M",
        "normal",
        undefined,
        "sans-serif",
        "#000000"
    );

    testdimsTextSize = parseFloat(baseTextSizeFromDims.getMeasuredWidth());

    baseTextTo10PxThenPercent = testdimsTextSize * 1.2005 * (w * 0.01) * 0.1;
    baseTextTo10Px = parseInt(parseFloat(testdimsTextSize * 1.2005 * 0.1) * 10);
    console.log("baseTextTo10Px: ", baseTextTo10Px * 10);

    //then scale the text to the percentage of the screen for a comfortable view:
    console.log("baseTextTo10PxThenPercent: ", baseTextTo10PxThenPercent);

    baseTextTo10PxThenPercent = baseTextTo10PxThenPercent * 1.601;
    // stage.addChild(baseTextSizeFromDims);

    var baseTextSizeFromDims = new textClip();
    baseTextSizeFromDims.makeTextClip(
        "M",
        "normal",
        baseTextTo10Px,
        "sans-serif",
        "#000000"
    );
    stage.addChild(baseTextSizeFromDims);

    console.log(baseTextSizeFromDims.getBounds());

    /*
    load the manifest, and hope for the best
    */

    // loader = new createjs.LoadQueue(false);
    // loader.addEventListener("complete", stageSetupNowStart);
    // loader.loadManifest(manifest, true, "./scripts/testimgs/");

    //when loading, this event starts:
    stageSetupNowStart();
}

function reportSizeChange(event) {
    console.log("say:resize");
}

//const was defined before, make it LET now. (hoisted-- testing.)
let resizeObserver;

function reportScaled() {
    console.log("███└└say:reportScaled");
}

function reportClick() {
    console.log("say: clicked on something");
    console.log(" bgMC.width: ", bgMC.getBounds().width);

    // console.log(getNumberResized(20));
    // getNumberResized

    var text = new textClip();
    text.makeTextClip(
        scaleFactor,
        "normal",
        baseTextTo10PxThenPercent,
        //"Nunito",
        "Barlow",
        "#0000FF"
    );

    bgMC.addChild(text);

    var theTextSize = parseFloat(text.getMeasuredWidth());

    console.log("theTextSize: ", theTextSize);
    stage.update();
}

function getNumberResized(num) {
    var temp = num * scaleFactor * 100;
    //bad reassignment
    temp = parseInt(parseFloat(temp) / 10) / 10;
    return temp;
}

function stageSetupNowStart() {
    console.log(
        "█├───stageSetupNowStart  getComputedStyle : "
        //stage.canvas.width=
        //  displayArea.fsDisplayWin
    );
    var tempClip = new createjs.Shape();
    tempClip.graphics
        .setStrokeStyle(getNumberResized(1), "square", "bevel", "round")
        //        .beginStroke("#FFcc00")
        .beginStroke("#FF0000")
        .drawRect(
            getNumberResized(1),
            getNumberResized(100),
            getNumberResized(100),
            getNumberResized(100)
        );

    // tempClip.scaleX = getNumberResized(1);
    // tempClip.scaleY = getNumberResized(1);
    //  examples.hideDistractor();
    //  sky = new createjs.Shape();
    //  sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);
    //  <skyholder> =  new createjs.MovieClip();
    //  skyholder.addChild(<sky> );
    //  bgMC.addChild(<sky> );

    //  bgMC.addEventListener("stagemousedown", handleJumpStart);

    bgMC.addChild(tempClip);
    /*  tempClip.regX = 0;
    tempClip.regY = 0;  */
    stage.addEventListener("stagemousedown", reportClick);
    bgMC.addEventListener("resize", reportScaled);
    // bgMC.cache(0, 0, bgMC.width, bgMC.height);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);

    //added resize to test :: adding in stageSetupNowStart because of init probs

    resizeObserver = new ResizeObserver((entries) => {
        //for (const entry of entries) {
        //if (entry.contentBoxSize) {
        //  const contentBoxSize = entry.contentBoxSize[0];
        //  h1Elem.style.fontSize = `${Math.max(1.5, contentBoxSize.inlineSize / 200)}rem`;
        //  pElem.style.fontSize = `${Math.max(1, contentBoxSize.inlineSize / 600)}rem`;
        //} else {
        //  h1Elem.style.fontSize = `${Math.max(1.5, entry.contentRect.width / 200)}rem`;
        //  pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;
        //}
        //}
    });

    resizeObserver.observe(displayArea.fsDisplayWin);

    window.addEventListener("resize", () => {
        /*  if (checkbox.checked) {
          resizeObserver.observe(divElem);
        } else {
          resizeObserver.unobserve(divElem);
        } */
        console.log("you resized me.....");
    });
}

function handleJumpStart() {
    //jump handler
    //<grant>.gotoAndPlay("jump");
}

function tick(event) {
    //var deltaS = event.delta / 1000;
    //var position = <clip>.x + 15 * deltaS;
    //var moverW = <clip>.getBounds().width * <clip>.scaleX;
    //<clip>.x = position >= w + moverW ? -moverW : position;
    //console.log("random info");
    stage.update(event);
}
