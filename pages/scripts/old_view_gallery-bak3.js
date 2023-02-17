//tasks:
//preloader
//quick animation built with css, or js?
//css: everyone can see it			con:it's got to be really flat
//script: take long to load?		con:discovery time

//load content
//create iframe, src= gallery_non_js.htm
//raise event when content fully loaded
//add anchors to memory, array  Page Guts obj?
//remove loading iframe

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

function removeChildren(withinEl) {
    while (withinEl.hasChildNodes()) {
        withinEl.removeChild(withinEl.childNodes[0]);
    }
}

class SimpleGallery {
    constructor(gallery_config_obj) {
        this._frag = document.createDocumentFragment();
        // this._galleryCanvas =
        //     gallery_config_obj._canvasEl || document.createElement("canvas");
        this._galleryContext; // this._galleryCanvas.getContext("2d");
        this._clickableSlideArr = [];
        this.pageName = "";
        this.pageURL = "";
        this._isAppended = false;
        this.width = 0;
        this._queryObj;
    }
    init() {
        //!(this instanceof SimpleGallery)

        console.log(":::: SimpleGallery init ::::");
        console.log(":::: this.width ::::", this.width);
        console.log(":::: this.pageURL ::::", this.pageURL);
        console.log(":::: this.pageURL.href ::::", this.pageURL.href);
        console.log(":::: this.pageName ::::", this.pageName);
        console.log(":::: this.pageURL search::::", this.pageURL.search);
        console.log(":::: this.makeQueryObj() ::::", this.makeQueryObj());
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
                finalObj[vals[0].toString()] = vals[1].toString();
            }
        }
        finalObj.originalArr = Array.from(searchString);
        this._queryObj = finalObj;
        return this._queryObj;
    }
    addToDom(locEl) {
        console.log(":::: addToDom ::::");
        if (!locEl) {
            //  this._frag
            try {
                //var rando_p = document.createElement("p");
                //rando_p.setAttribute("class", "not_rando");
                //this._frag.appendChild(rando_p);
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
        /* var tempURI = this.pageURL
            .toString()
            .substring(
                this.pageURL.toString().lastIndexOf("/") + 1,
                this.pageURL.toString().length
            );
        pageName = tempURI; */
        var tempURI = this.pageURL.pathname.toString();
        tempURI = tempURI.substring(tempURI.lastIndexOf("/") + 1, tempURI.length);
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
        this._baseURLPortion;
        this._canvasEl;
        this._captionFontColor;
        this._captionFontFamily;
        this._captionFontSize;
        this._captionText;
        this._collectionName;
        this._effectName;
        this._fullH;
        this._fullW;
        this._galleryCanResize;
        this._galleryFontColor;
        this._galleryFontFamily;
        this._galleryFontSize;
        this._hasCaptionsEnabled;
        this._hasGalleryText;
        this._isUsingGridLayout;
        this._originalImg;
        this._originalImgSrc;
        this._originalThumb;
        this._originalThumbSrc;
        this._thumbH;
        this._thumbURLPortion;
        this._thumbW;
    }
}
Object.defineProperty(SimpleGalleryConfig.prototype, "_baseURLPortion", {
    get: function () {
        _baseURLPortion = "";
        return _baseURLPortion;
    },
    set: function (param) {
        _baseURLPortion = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_canvasEl", {
    get: function () {
        _canvasEl = null; //no dom ready
        return _canvasEl;
    },
    set: function (param) {
        _canvasEl = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionFontColor", {
    get: function () {
        _captionFontColor = "#450067";
        return _captionFontColor;
    },
    set: function (param) {
        _captionFontColor = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionFontFamily", {
    get: function () {
        _captionFontFamily = "Arial";
        return _captionFontFamily;
    },
    set: function (param) {
        _captionFontFamily = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionFontSize", {
    get: function () {
        _captionFontSize = 16;
        return _captionFontSize;
    },
    set: function (param) {
        _captionFontSize = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_captionText", {
    get: function () {
        _captionText = "_captionText";
        return _captionText;
    },
    set: function (param) {
        _captionText = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_collectionName", {
    get: function () {
        _collectionName = "";
        return _collectionName;
    },
    set: function (param) {
        _collectionName = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_effectName", {
    get: function () {
        _effectName = "";
        return _effectName;
    },
    set: function (param) {
        _effectName = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_fullH", {
    get: function () {
        _fullH = 150;
        return _fullH;
    },
    set: function (param) {
        _fullH = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_fullW", {
    get: function () {
        _fullW = 150;
        return _fullW;
    },
    set: function (param) {
        _fullW = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryCanResize", {
    get: function () {
        _galleryCanResize = false;
        return _galleryCanResize;
    },
    set: function (param) {
        _galleryCanResize = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryFontColor", {
    get: function () {
        _galleryFontColor = "#450067";
        return _galleryFontColor;
    },
    set: function (param) {
        _galleryFontColor = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryFontFamily", {
    get: function () {
        _galleryFontFamily = "Arial";
        return _galleryFontFamily;
    },
    set: function (param) {
        _galleryFontFamily = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_galleryFontSize", {
    get: function () {
        _galleryFontSize = 16;
        return _galleryFontSize;
    },
    set: function (param) {
        _galleryFontSize = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_hasCaptionsEnabled", {
    get: function () {
        _hasCaptionsEnabled = false;
        return _hasCaptionsEnabled;
    },
    set: function (param) {
        _hasCaptionsEnabled = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_hasGalleryText", {
    get: function () {
        _hasGalleryText = false;
        return _hasGalleryText;
    },
    set: function (param) {
        _hasGalleryText = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_isUsingGridLayout", {
    get: function () {
        _isUsingGridLayout = false;
        return _isUsingGridLayout;
    },
    set: function (param) {
        _isUsingGridLayout = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalImg", {
    get: function () {
        _originalImg = null;
        return _originalImg;
    },
    set: function (param) {
        _originalImg = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalImgSrc", {
    get: function () {
        _originalImgSrc = "";
        return _originalImgSrc;
    },
    set: function (param) {
        _originalImgSrc = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalThumb", {
    get: function () {
        _originalThumb = null;
        return _originalThumb;
    },
    set: function (param) {
        _originalThumb = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_originalThumbSrc", {
    get: function () {
        _originalThumbSrc = "";
        return _originalThumbSrc;
    },
    set: function (param) {
        _originalThumbSrc = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_thumbH", {
    get: function () {
        _thumbH = 150;
        return _thumbH;
    },
    set: function (param) {
        _thumbH = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_thumbURLPortion", {
    get: function () {
        _thumbURLPortion = "";
        return _thumbURLPortion;
    },
    set: function (param) {
        _thumbURLPortion = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGalleryConfig.prototype, "_thumbW", {
    get: function () {
        _thumbW = 150;
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
        this._src
    );
}

function handle_SimpleImage_load(evt) {
    //console.log("███handle_SimpleImage_load████ this:",this," this image: ",this._img,evt);
    console.log("this._domEl: ", this._domEl);
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
        this._fullBlob;
        this._thumbBlob;
        this._currThumb;
        this._currFullSize;
        this._ThumbSrc;
        this._FullSrc;
        this._effectName;
        //init();
    }
    init() {
        console.log(":::SimpleSlide init:::");
    }
}

//define these in the obj, until they can be loaded via xml (as well as the rest)
let simpleGalleryConfig = new SimpleGalleryConfig();
simpleGalleryConfig._collectionName = "3d_renders"; //[3d_renders]
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
//ie: blindsEffect, verticalSlatEffect, fadeEffect, //fade only avail. in v1

var isIE = false;

function init() {
    if (window.event !== undefined) {
        isIE = true;
    }
    var something = new SimpleGallery();
    something.init();

    var someImg = new SimpleImage(
        "images/fullsize/3d_renders/basketball.png",
        document.body
    );

    var some_slide = new SimpleSlide(simpleGalleryConfig);

    some_slide.init();
    // console.log(something.pageURL);
    // console.log(something.pageName);
    // getImages();
}

window.addEventListener("load", init);
