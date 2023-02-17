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

var t = null;
var anImg = null;
var tryCount = 0;

var loadedImgs = null;
var thumbnailCanvases = null;
var canvasCount = 0;

var pgReady = null;

var firstRun = true;
/*
		EVENTS:
		*/
/* 
		function pageReady(evt){
			console.log(evt.detail);
			var tgt=evt.target;
			tgt.click();
			//ran once
			//evt.target.querySelectorAll(".click_thumb").item(0);
			//console.log(document.querySelector(".click_thumb"));
			//;
		}
		
		//Listen for the event
		window.addEventListener("pageReady", pageReady, false);
		
		//Dispatch an event
		var evt = document.createEvent("CustomEvent");
		evt.initCustomEvent("pageReady", true, true, {detail:"message 1"});
		
		function doSomething(e) {
			var targ;
			if (!e) var e = window.event;
			if (e.target) targ = e.target;
			else if (e.srcElement) targ = e.srcElement;
			if (targ.nodeType == 3) // defeat Safari bug
				targ = targ.parentNode;
				
			return targ;
		}
		 */
/*
		END EVENTS
		*/
/* 
		var timer=0;
		function fade(){
		   var _self=this;
		   var opacity=0;
		   var ctx=_self.getContext("2d");
			if (timer < 10){
				timer++;
		   ctx.globalAlpha = opacity+.03;
		   console.log("_self.style.opacity: ",opacity );
				requestAnimationFrame(
			   fade.bind(_self)
				   );
			}
		   //if (opacity <= 1){
		   //	//var opaque=parseInt( );
		   //	 
		   //	opacity+=.03;
		   //  
		   //	 
		   // 	requestAnimationFrame(
		   //	 fade.bind(_self)
		   // 	);
		   //	 		
		   //}
		   //else{
		   //	opacity=1;
		   //}	 
		} */

function getImage() {
    clearTimeout(t);
    try {
        //anImg=document.querySelector("#hiddenimg img");
        anImg = this;
        //console.log('getImage: ',anImg);
        var img = anImg.imgDom;
        img.onload = function () {
            if (img.complete && (img.width > 0 || img.naturalWidth > 0)) {
                renderImage.call(img);
                reportSuccess.call(img);
                return img;
            }
        };
        img.onerror = function () {
            reportError.call(img);
        };
        img.src = anImg.img_src;
    } catch (e) {
    } finally {
        tryCount += 1;
        //console.log("finally!");
        if (anImg !== (undefined || null)) {
            clearTimeout(t);
            //console.log("success");
        } else if (tryCount > 5) {
            //console.log("tryCount is too high. Stop: ",tryCount);
            clearTimeout(t);
            var img = { src: "unverified image source" };
            reportError.call(img);
        } else {
            //console.log("tryCount: ",tryCount);
            //console.log("not yet-- trying again: ");
            clearTimeout(t);
            t = setTimeout(getImage, 125);
        }
    }
}

function transitionImage() {
    console.log("transitionImage");
    console.log("copy buffer into blank canvas");
    console.log("fades in new full size image");
}

function renderImage() {
    var img = this;
    //document.body.appendChild(img);
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", "128");
    canvas.setAttribute("height", "128");
    canvas.setAttribute("name", img.src);
    canvas.setAttribute("class", "click_thumb");
    var ctx = canvas.getContext("2d");

    //add it to where?
    var thumbHolder = document.querySelector(".thumbnail_area .content");
    thumbHolder.appendChild(canvas);

    //draw the loaded image into the canvas
    var thumbDims = resizeImgDims.call(img, 128, 128, true);

    //add a thumbnail to the list of loadedImgs global array.
    //loadedImgs refreshes with pageload.
    loadedImgs.push(img); //renderImage
    thumbnailCanvases.push(canvas);

    ctx.drawImage(
        img,
        (canvas.width - thumbDims[0]) / 2,
        (canvas.height - thumbDims[1]) / 2,
        thumbDims[0],
        thumbDims[1]
    );

    ctx.restore();

    var fullSizeDisplayCanvas = document.querySelector(".display_area canvas");

    canvas.onclick = function () {
        //console.log(canvas);
        var fsDims = resizeImgDims.call(
            img,
            fullSizeDisplayCanvas.width,
            fullSizeDisplayCanvas.height,
            false
        );
        fsCtx = fullSizeDisplayCanvas.getContext("2d");
        fsCtx.clearRect(
            0,
            0,
            fullSizeDisplayCanvas.width,
            fullSizeDisplayCanvas.height
        );
        fsCtx.drawImage(
            img,
            (fullSizeDisplayCanvas.width - fsDims[0]) / 2,
            (fullSizeDisplayCanvas.height - fsDims[1]) / 2,
            fsDims[0],
            fsDims[1]
        );
        //fullSizeDisplayCanvas.style.opacity=0;
        //fsCtx.globalAlpha=0;
        //transitionImage();
        //requestAnimationFrame(fade.bind(fullSizeDisplayCanvas));

        var len = thumbnailCanvases.length;
        for (var i = 0; i < len; i++) {
            var contx = thumbnailCanvases[i].getContext("2d");
            if (thumbnailCanvases[i] !== canvas) {
                //console.log(contx);
                contx.clearRect(0, 0, canvas.width, canvas.height);
                var tDims = resizeImgDims.call(loadedImgs[i], 128, 128, true);
                contx.drawImage(
                    loadedImgs[i],
                    (canvas.width - tDims[0]) / 2,
                    (canvas.height - tDims[1]) / 2,
                    tDims[0],
                    tDims[1]
                );
            } else {
                contx.clearRect(0, 0, canvas.width, canvas.height);
                var tDims = resizeImgDims.call(loadedImgs[i], 128, 128, true);
                contx.drawImage(
                    loadedImgs[i],
                    (canvas.width - tDims[0]) / 2,
                    (canvas.height - tDims[1]) / 2,
                    tDims[0],
                    tDims[1]
                );
                strokeThis.call(canvas, "rgba(69, 0, 103,1)", 5);
            }
        }
    };
    if (firstRun === true) {
        firstRun = false;
        thumbnailCanvases[0].click();
    }
    return loadedImgs;
}

function reportError() {
    //console.log("reportError: ", this.src +" "+"didn't load");
}
function reportSuccess() {
    //console.log("reportSuccess: ", this.src +" "+"loaded Successfully");
}

function updateCount(direction, num) {
    //console.log("direction: ",direction);
    //get total page count from gallery.
    var high = this.getPageCount();
    //console.log("updateCount this: ",this);
    //assume low=0;
    var low = 0;
    var currentCount = this.getCurrentPage();
    if (direction === "down") {
        if (currentCount - 1 >= low) {
            currentCount--;
        } else {
            //keep the count from becoming greater than the array
            currentCount = high - 1;
        }
    } else if (direction === null) {
        currentCount = num;
    } else {
        if (currentCount + 1 < high) {
            currentCount++;
        } else {
            currentCount = 0;
        }
    }
    this.setCurrentPage(currentCount);
    //console.log("currentCount: ",currentCount);
    //console.log("this.getCurrentPage(): ",this.getCurrentPage());
}

function removeChildren(withinEl) {
    while (withinEl.hasChildNodes()) {
        withinEl.removeChild(withinEl.childNodes[0]);
    }
}

function removeElement(ELname) {
    //removes a SINGLE element from the dom
    //	console.log("typeof ELname",typeof ELname);
    this.onload = null;
    var tempParent;
    if (typeof ELname === "string") {
        var temp = document.getElementById(ELname);
        tempParent = temp.parentNode;
        tempParent.removeChild(temp);
    } else {
        tempParent = ELname.parentNode;
        tempParent.removeChild(ELname);
    }
}
function setupGUI(gallery) {
    var lastPage = document.querySelector(
        ".thumbnail_area .thumb_nav_arrow.left"
    );
    var nextPage = document.querySelector(
        ".thumbnail_area .thumb_nav_arrow.right"
    );
    var thumbArea = document.querySelector(".thumbnail_area .content");

    var domControls = {};
    domControls.left = {
        direction: "down",
        domEl: lastPage,
        callback: previous,
    };
    domControls.right = { direction: "up", domEl: nextPage, callback: next };
    domControls.thumbArea = { domEl: thumbArea };
    function previous() {
        removeChildren(domControls.thumbArea.domEl);
        gallery.populatePage(
            updateCount.call(gallery, domControls.left.direction)
        );
    }
    function next() {
        removeChildren(domControls.thumbArea.domEl);
        gallery.populatePage(
            updateCount.call(gallery, domControls.right.direction)
        );
    }
    gallery.setDomControls(domControls);
}

function getCollections() {
    this._canvasCollection = {};
    var cgC = this._canvasCollection;
    var categories = document.querySelectorAll(".category");
    for (var i = 0, len = categories.length; i < len; i++) {
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
    }
    return cgC;
}

function getImages() {
    //console.log("determine offsetWidth and offsetHeight properties.
    //Most of the time these are the same as width and height of
    //getBoundingClientRect(), or clientWidth and clientHeight properties");
    //	looking to remove the need for globals like these two arrays
    //	loadedImgs=[];
    //	thumbnailCanvases=[];

    var cG = new CanvasGallery();
    //var collection =document.querySelectorAll("img.displayimg");

    //	var collection = document.querySelectorAll("#hiddenimg a");
    var collection = getCollections.call(cG);
    console.log(collection);

    //populate page based on categories, now it's all stuffed into the collections array:

    var len = collection["category_2"]["images"].length;

    cG.setCurrentPage(0);
    setupGUI(cG);

    var tempArr = [];
    for (var i = 0; i < len; i++) {
        var img = new Image();
        //var imgObj = { imgDom: img, img_src: collection.item(i).href };
        var imgObj = {
            imgDom: img,
            img_src: collection["category_2"]["images"][i],
        };
        //tempArr.push(collection.item(i));
        tempArr.push(imgObj);
    }
    // pages are divided up based on the amt of area in the thumbnail area
    cG.setPages(paginateMe.call(tempArr.slice(), 5));
    cG.setImageDomArray(tempArr);
    cG.setImageCount(len);
    cG.setImageCollection(collection);
    cG.setCanvasCount(cG.getImageCollection().length);
    canvasCount = len;
    cG.populatePage(cG.getCurrentPage());
}

function strokeThis(strokeColor, lineWidth) {
    //called or bound with canvas of thing to stroke, width as param
    //context doesn't need to be saved in the context of the small page buttons
    var ctx = this.getContext("2d");
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(0, 0, this.width, this.height);
}

//utility function for scaling scoped asset
function resizeImgDims(contW, contH, fillSpace) {
    //returns an array containing a new width and height
    //@fillSpace  boolen-- zoom to fill space
    //var ThumbAspect=thumbW/thumbH;
    var containerAspect = contW / contH;
    var fullW = this.width;
    var fullH = this.height;
    var aspect = fullW / fullH;
    var fullMax = Math.max(fullW, fullH);
    var fullMin = Math.min(fullW, fullH);
    var contnMax = Math.max(contW, contH);
    var contnMin = Math.min(contW, contH);

    var newW = fullW;
    var newH = fullH;

    if (aspect < 1 || aspect === 1) {
        // use contnMin/fullMax
        newW = fullW * (contnMin / fullMax);
        newH = fullH * (contnMin / fullMax);
    } else if (aspect > 1) {
        // use contnMax/fullMax unless the container ratio is larger!
        var greater = Math.max(aspect, containerAspect);
        if (greater === aspect) {
            newW = fullW * (contnMax / fullMax);
            newH = fullH * (contnMax / fullMax);
        } else {
            //greater containerAspect
            newW = fullW * (contnMin / fullMin);
            newH = fullH * (contnMin / fullMin);
        }
    }

    if (fillSpace !== undefined) {
        if (fillSpace !== false && fillSpace !== "false") {
            return [Math.floor(newW), Math.floor(newH)];
        } else {
            if (newW > fullW || newH > fullH) {
                //console.log("true width is smaller than display");
                return [Math.floor(fullW), Math.floor(fullH)];
            } else {
                //console.log("true width is LARGER than display");
                return [Math.floor(newW), Math.floor(newH)];
            }
        }
    } else {
        //some calls to this function haven't implemented the fullsize feature
        return [Math.floor(newW), Math.floor(newH)];
    }
}

function paginateMe(divisions) {
    //uses a passed-in array and returns a 2d one, divided as spec'd in divisions.
    /* var arr=[];
			for (var i=0; i<57; i++){
				arr[i]=i;
			}
			console.log(paginateMe.call(arr,3)); */
    var tempArr = this.slice();
    var pagesArr = [];
    var tempCuts = Math.floor(tempArr.length / divisions);

    for (var i = 0; i < tempCuts; i++) {
        //TODO- needs study to eliminate dealing with remainder
        var page = tempArr.splice(i % tempCuts, divisions - 1);
        page.push(tempArr[i]);
        pagesArr.push(page);
        //handle remainder if last cut
        if (i === tempCuts - 1) {
            var remainder = tempArr.splice(i + 1, divisions);
            if (remainder.length > 0) {
                pagesArr.push(remainder.slice());
            } // don't do anything if the remainder is 0
        }
    }
    delete tempArr;
    return pagesArr;
}

var CanvasGallery = function () {
    this._domControls = undefined;
    this._canvasCount = undefined;
    this._totImgCount = undefined;
    this._currentPage = undefined;
    this._pageCount = undefined;
    this._paginatedArray = undefined;
    this._imgCollection = undefined;
    this._imgDoms = undefined;
    this._canvasCollection = undefined;
};

CanvasGallery.prototype.getDomControls = function () {
    return this._domControls;
};
CanvasGallery.prototype.setDomControls = function (domControls) {
    //sugar for control access
    //domControls= {left:{domEl:something, callback:func},right:{domEl:something, callback:func} }
    this._domControls = {};
    this._domControls.left = domControls.left.domEl;
    this._domControls.right = domControls.right.domEl;

    this._domControls.left.behavior = domControls.left.callback;
    this._domControls.right.behavior = domControls.right.callback;

    this._domControls.left.onclick = this._domControls.left.behavior;
    this._domControls.right.onclick = this._domControls.right.behavior;

    this._domControls.thumbArea = domControls.thumbArea.domEl;
    return this._domControls;
};

CanvasGallery.prototype.setImageDomArray = function (p) {
    this._imgDoms = p;
};
CanvasGallery.prototype.setImageCollection = function (p) {
    this._imgCollection = p;
};
CanvasGallery.prototype.setCurrentPage = function (p) {
    this._currentPage = p;
};
CanvasGallery.prototype.setPageCount = function (p) {
    this._pageCount = p;
};
CanvasGallery.prototype.buildPageControls = function () {
    //buildPageControls
    var thumbArea = this._domControls.thumbArea;
    var _self = this;
    var group_holder = document.createElement("div");
    thumbArea.appendChild(group_holder);
    group_holder.setAttribute("class", "page_group");
    var len = this._pageCount;

    var currentPage = this.getCurrentPage();
    for (var i = 0; i < len; i++) {
        var pgNum = document.createElement("canvas");
        pgNum.setAttribute("width", "32");
        pgNum.setAttribute("height", "32"); /* */
        group_holder.appendChild(pgNum);

        var ctx = pgNum.getContext("2d");
        ctx.font = "1em Arial";
        ctx.fillStyle = "#000000";
        if (i < 9) {
            ctx.fillText(i + 1, 12, 21);
        } else {
            ctx.fillText(i + 1, 7, 21);
        }
        if (currentPage == i) {
            strokeThis.call(pgNum, "#450067", 5);
        }
        //creates a closure for the page population so scoping the increment works
        function popPage(num) {
            removeChildren(thumbArea);
            _self.setCurrentPage(num);
            //console.log("inc: ",num);
            //console.log("this._currentPage: ",_self.getCurrentPage());
            updateCount.call(_self, null, _self.getCurrentPage());
            _self.populatePage(_self.getCurrentPage());
        }
        //binds the i to the scope
        pgNum.onclick = popPage.bind(_self, i);
    }
};
CanvasGallery.prototype.setPages = function (p) {
    this._paginatedArray = p;
    this._pageCount = this._paginatedArray.length;
};
CanvasGallery.prototype.setImageCount = function (p) {
    this._totImgCount = p;
};
CanvasGallery.prototype.setCanvasCount = function (p) {
    this._canvasCount = p;
};
CanvasGallery.prototype.getCurrentPage = function () {
    return this._currentPage;
};
CanvasGallery.prototype.getImageDomArray = function () {
    return this._imgDoms;
};
CanvasGallery.prototype.getImageCollection = function () {
    return this._imgCollection;
};
CanvasGallery.prototype.getPageCount = function () {
    return this._pageCount;
};
CanvasGallery.prototype.getPages = function () {
    return this._paginatedArray;
};
CanvasGallery.prototype.getImageCount = function () {
    return this._totImgCount;
};
CanvasGallery.prototype.getCanvasCount = function () {
    return this._canvasCount;
};
CanvasGallery.prototype.populatePage = function () {
    //@whichPage :number
    //assumes that the setPages has ran, and is populated with a page
    var getThePage = this.getPages()[this.getCurrentPage()];
    //console.log("getThePage:  ",getThePage);
    //console.log("this.getPages():  ",this.getPages());
    //console.log("populatePage.whichPage:  ",this.getCurrentPage());
    var len = getThePage.length;
    //clear page images:
    loadedImgs = [];
    thumbnailCanvases = [];
    for (var i = 0; i < len; i++) {
        getImage.call(getThePage[i]);
        //set up the user interaction in the renderImage method
    }
    //console.log("thumbnailCanvases:  ",thumbnailCanvases);
    this.buildPageControls();
};
CanvasGallery.prototype = Object.create(CanvasGallery.prototype);
CanvasGallery.prototype.constructor = CanvasGallery;

/*
// SimpleGallery TODO:
//  pass a configure object to this simple gallery (with xml, or query string)
//  to control:
//  can the gallery be resized?
//      _galleryCanResize
//  thumbnail dims:
//      assumes a grid with square thumbs, but both dims can be consumed.
//      _thumbW
//      _thumbH
//  fullSize dims (max)
//      assumes a grid with square thumbs, but both dims can be consumed.
//      _fullW
//      _fullH
//  slide_objects:
//      _originalImg
//      _originalThumb?  <<< --- derived from the original size image. (sounds best)
//      holds the full, and thumb, so that if resized, can be re-rendered
//  gallery grid (or not) config
//      _isUsingGridLayout
//      _hasCaptionsEnabled
//  does this gallery have text?
//      _hasGalleryText
//      _galleryFont
//      _galleryFontColor
//      _galleryFontSize
//  text to include as captions (or not)
//      _captionText
//      _captionFont?
//      _captionFontSize?
//      _captionFontColor
//      _captionFontSize
//  caption_location
//  header for gallery (font enabled)
//  footer for gallery
//  date and time stamp of gallery render?
*/

//via a query string digest function:
//D:\pixel_streamer_files\Cleaned_Files\learning-cleaned\learning_xsl
//D:\pixel_streamer_files\Cleaned_Files\learning-cleaned\learning_javascript\mapping_query_strings
// Task-Centered Design Process--
//      Text (c) 1993, 1994 by Clayton Lewis and John Rieman.

/*
split the loaded images into a grid

paginate items

single items load page details?

page details avail: ?

captions loaded with images? sure

break the config element down with this:
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
*/

class SimpleGallery {
    constructor(SimpleGalleryConfig) {
        this._frag = document.createDocumentFragment();
        // this._galleryCanvas =
        //     SimpleGalleryConfig._canvasEl || document.createElement("canvas");
        this._galleryContext; // this._galleryCanvas.getContext("2d");
        this._clickableSlideArr = [];
        this.pageName = "";
        this.pageURL = "";
        this._isAppended = false;
        this.width = 0;
    }
    init() {
        //!(this instanceof SimpleGallery)
        console.log(":::: SimpleGallery init ::::");
        console.log(":::: this.width ::::", this.width);
        console.log(":::: this.pageURL ::::", this.pageURL);
        console.log(":::: this.pageName ::::", this.pageName);
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
        return pageURL || window.location.href;
    },
    set: function (param) {
        pageURL = param;
    },
    configurable: true,
});
Object.defineProperty(SimpleGallery.prototype, "pageName", {
    get: function () {
        var tempURI = this.pageURL.substring(
            this.pageURL.lastIndexOf("/") + 1,
            this.pageURL.length
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
        _captionFontColor = "black";
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
        _galleryFontColor = "black";
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
    constructor(Config_obj) {
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
var simpleGalleryConfig = new SimpleGalleryConfig();
simpleGalleryConfig._collectionName = "";
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
simpleGalleryConfig._galleryFontFamily = "Arial";
simpleGalleryConfig._galleryFontColor = "black";
simpleGalleryConfig._galleryFontSize = 16;

simpleGalleryConfig._captionText = "gallery";
simpleGalleryConfig._captionFontFamily = "Arial";
simpleGalleryConfig._captionFontColor = "black";
simpleGalleryConfig._captionFontSize = 16;

//  slide_objects:
simpleGalleryConfig._originalImgSrc = "";
simpleGalleryConfig._originalThumbSrc = "";
simpleGalleryConfig._originalImg = "";
simpleGalleryConfig._originalThumb = "";

simpleGalleryConfig._effectName = "fade"; //ie: blindsEffect, verticalSlatEffect, fadeEffect, //fade only avail. in v1

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

    var some_slide = new SimpleSlide(SimpleGalleryConfig);

    some_slide.init();
    // console.log(something.pageURL);
    // console.log(something.pageName);
    // getImages();
}

window.addEventListener("load", init);
/* Object.defineProperty(SimpleGallery.prototype, "width", {
    get: function () {
        return width;
    },
    set: function (param) {
        width = param;
    },
    configurable: true,
    // writable: true, <<-- this errored out because writable
    // can't accompany configurable. ALSO: width must be present in constructor to work.
}); */
/*
window.addEventListener("load", init);

function initGallery() {
  readyCollection();
  createGUI();
}

function createGUI() {
  console.log(" :::createGUI::: ");
}

function assembleRelevantData() {
  console.log(" :::assembleRelevantData::: ");
}

function preloadFixedCount() {
  console.log(" :::preloadFixedCount::: ");
}

function readyCollection() {
  console.log(" :::readyCollection::: ");
  assembleRelevantData();
  preloadFixedCount();
}

class Preloader {
  constructor() {}
}

class SimpleImage extends Image {
  constructor(src, domContainerEl) {
    super();
    this._loaded = false;
    this._src = src;
    this._containerEl = domContainerEl;
    //https://developer.mozilla.org/en-US/docs/Web/API/
    var _self = this;
    //return _self.readyForDom.call(response, _self);
    this._img = new Image();

    this._imgContent = fetch(this._src)
      .then(function (response) {
        return response.blob();
      })
      .then(function (commits) {
       //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL  
        var reader = new FileReader();

        reader.addEventListener(
          "load",
          function () {
            // convert image file to base64 string
            _self._img.src = reader.result;
          },
          false
        );
        reader.addEventListener(
          "error",
          function (err) {
            console.log("error reading in the file: ", err);
          },
          false
        );

        if (commits) {
          reader.readAsDataURL(commits);
          _self._img.src = reader.result;
          // _self._containerEl.appendChild(_self._img);
          return commits;
        }
        resolve(_self._img);
      });
  }
  //TODO: real handlers for events, based on promises?

  getImageContent() {
    return this._imgContent;
  }
  getImg() {
    return this._img;
    //return this._img;
  }

  setSrc(val) {
    this._img.src = val;
  }
}

class Fullsize extends SimpleImage {
  constructor(src) {
    super(src);
  }
}

class Thumbnail extends SimpleImage {
  constructor(src) {
    super(src);
  }
}

class CanvasImg extends SimpleImage {
  constructor(src) {
    super(src);
    this._source = src;
    this.t;
    this._canvasRepresention = document.createElement("canvas");
    this._context = this._canvasRepresention.getContext("2d");
  }
  setCanvasSize(w, h) {
    this._canvasRepresention.width = w;
    this._canvasRepresention.height = h;
    return this._canvasRepresention;
  }
  getCanvas() {
    return this._canvasRepresention;
  }
  getCanvasContext() {
    return this._context;
  }
  getImageContent() {
    //console.log("::: CanvasImg getImageContent :::", super.getImg());
    return super.getImg();
  }
  getImageData() {
    //console.log("::: CanvasImg super.getImg().data :::", super.getImg().data);
    return super.getImg().data;
  }
  drawImgToCanvas(x, y) {
    var someimg = super.getImg();
    var ctx = this._context;
    this.t = setTimeout(function () {
      ctx.drawImage(someimg, x, y);
    }, 50);
    return this._canvasRepresention;
  }
  drawImgToDestinationCanvas(cnvs, x, y, destW, destH) {
    var someimg = super.getImg();

    var ctx = cnvs.getContext("2d");
    this.t = setTimeout(function () {
      ctx.drawImage(someimg, x, y, destW, destH);
    }, 50);
    return super.getImg();
  }
  drawCustomTextContent(
    textContent,
    textHexColor,
    fontStyle,
    fontSize,
    fontFam,
    xPos,
    yPos
  ) {
    var spaceRE = /^\s*$/g;
    var padding = parseInt(fontSize.substring(0, fontSize.length - 2)) / 2;
    var ctx = this._context;
    var fontDetails;
    if (fontStyle === null) {
      fontDetails = fontSize + " " + fontFam;
    } else {
      fontDetails = fontStyle + " " + fontSize + " " + fontFam;
    }
    // set the font to determine font size and width.
    ctx.font = fontDetails;
    var textDims = ctx.measureText(textContent);
    if (spaceRE.test(this._source)) {
      //console.log("textDims: ", textDims);
      this.setCanvasSize(textDims.width + padding * 2, padding * 2);
    }
    //reset the font to be nice after canvas resize.
    ctx.font = fontDetails;
    console.log("this._imgIsBlank", this._imgIsBlank);
    ctx.fillStyle = textHexColor;
    ctx.fillText(textContent, padding + xPos, yPos);
    return this._canvasRepresention;
  }
}

class SimpleButton {
  constructor(container, labelTxt, classStr) {
    this._container = container;
    this._labelTxt = labelTxt;
    this._classString = classStr;
    this._button = this.createButton();
    if (labelTxt !== undefined) {
      this._buttonText = this.createLabel();
    }
    this.init();
    this.setClasses(this._classString);
  }
  init() {
    if (this._buttonText) {
      this._button.appendChild(this._buttonText);
    }
    this._container.appendChild(this._button);
    return this._button;
  }
  createButton() {
    this._button = document.createElement("button");
    return this._button;
  }
  createLabel() {
    this._buttonText = document.createTextNode(this._labelTxt);
    return this._buttonText;
  }
  setClasses(classes) {
    this._button.setAttribute("class", classes);
  }
  setAction(type, fn) {
    this._button.addEventListener(type, fn);
  }
  removeAction(type, fn) {
    this._button.removeEventListener(type, fn);
  }
}

class SkinnedButton extends SimpleButton {
  constructor(container, labelTxt, src, classStr) {
    super(container, labelTxt);
    this._img = new SimpleImage(src).getImg();
    this._buttonFrag = document.createDocumentFragment();
    this._populateListener = this.populateDom.bind(this);
    this._img.addEventListener("success", this._populateListener);
    if (classStr) {
      this._classString = classStr;
    }
  }
  populateDom() {
    console.log(":::SkinnedButton populateDom:::", this._img);
    this._buttonFrag.appendChild(this._button);
    //this._button.style.background = "url(" + this._img.src + ")";
    this._button.appendChild(this._img);
    this._button.setAttribute("class", this._classString);
    this._container.appendChild(this._buttonFrag);
  }
}

class PageControls {
  constructor() {}
}

class Interactions {
  constructor() {}
  doStuff(event) {
    console.log("some stuff has been done.");
  }
  doMoreStuff(event) {
    //console.log("doMoreStuff   has been done.");
    console.log("doMoreStuff target: ", event.target);
  }
}

class CanvasWithClicks {
  constructor(containerEl) {
   //intended one-off use to return a canvas with an array holder for elements that can
   // be called as click targets 
    this._containerEl = containerEl || document.body;
    this._frag = document.createDocumentFragment();
    this._canvasEl = document.createElement("canvas");
    this._clickableElArr = [];
    //init();
  }
  init() {}
  getMainContext() {
    return this._canvasEl.getContext("2d");
  }
  getMainCanvas() {
    return this._canvasEl;
  }
  getElementsArr() {
    return this._clickableElArr;
  }
  populateDom() {
    //console.log("CanvasWithClicks: populateDom");
    this._frag.appendChild(this._canvasEl);
    this._containerEl.appendChild(this._frag);
  }
}

class DeviceView {
  constructor() {
    this._width;
    this._height;
    this.init();
  }
  init() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }
  set innerWidth(val) {
    this._width = val;
  }
  get innerWidth() {
    return this._width;
  }
  set innerHeight(val) {
    this._height = val;
  }
  get innerHeight() {
    return this._height;
  }
}

class PromiseToPaintIntoDom {
  constructor(src, fsSrc, containerEl, xPos, yPos) {
    var _self = this;
    this._img;
    this._yCount = 0;
    this._src = src;
    this._FSsrc = fsSrc;
    this._FSimg;
    this._xPos = xPos;
    this._yPos = yPos;
    this._loaded = false;
    this._container = containerEl;
    this._resolution = new Promise(function (resolve, reject) {
      return this._img;
    })
      .then(this.makeImg())
      .catch(function (error) {
        if (!_self._img.complete) {
          _self.failureCallback.apply(_self, error);
        } else {
          this.getPromise();
        }
      });
    
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 
    
  }
  get_xPos() {
    return this._xPos;
  }
  get_yPos() {
    return this._yPos;
  }
  getSrc() {
    return this._src;
  }
  get_fsSrc() {
    return this._FSsrc;
  }
  getPromise() {
    return this._resolution;
  }

  makeImg(resolve, reject) {
    //console.log(":::makeImg::: ");
    if (this._img === undefined) {
      this._img = new Image();
    }
    //var thisLoadBind = this.addToDom.bind(this.getResolution());
    var thisLoadBind = this.addToDom.bind(this);
    this._img.addEventListener("load", thisLoadBind);
    this._img.src = this._src;
    return this._img;
  }

  loadFS() {
    console.log(":::loadFS:::");
    if (this._FSimg === undefined) {
      this._FSimg = new Image();
    }
    var thisLoadBind = this.addFStoDom.bind(this);
    this._FSimg.addEventListener("load", thisLoadBind);
    this._FSimg.src = this.get_fsSrc();
    return this._FSimg;
  }

  addFStoDom() {
    console.log(":::addFStoDom:::");
    this._FSimg.addEventListener("click", function () {
      console.log("you clicked on my thingy");
      //TODO: do a resize of the larger image to fit into the canvas at center.
      //TODO: draw resized full image to canvas at center.
      //TODO: set Event of a click to hide the larger image, and return to the
      //previous canvas state. 
      //so there needs to be a "save" on the canvas BEFORE the render of the image
      //and then the canvas can be restored to the state that records clicks to
      //bring up the enlarged image! 
    });
    document.body.appendChild(this._FSimg);
  }

  addToDom() {
    //window.dispatchEvent(img_loaded_evt);
    this._loaded = true;
    window.dispatchEvent(
      new CustomEvent("img_loaded", {
        detail: { msg: "█image loaded:" + this.getSrc() + "\n", payload: this },
      })
    );

    //console.log("this:████ ready to addToDom", this);
    var promRes = this.getResolution();

    var rectName = {};
    rectName.name = "rect_" + global_counter++;
    rectName.left = this._xPos;
    rectName.top = this._yPos;
    rectName.width = promRes.width;
    rectName.height = promRes.height;
    rectName.src = promRes.src;
    rectName.FSsrc = this._FSsrc;
    rectName.asset = this;
    elArr.push(rectName);
    
    //  TODO: this should be able to be a clickable thing within the canvas!
    //  _img.addEventListener("click", function () {
    //    console.log("you clicked on this:: ", _img.src);
    //  });
    
    return this._img;
  }

  getIsLoaded() {
    return this._loaded;
  }

  getResolution() {
    return this._img;
  }

  failureCallback(error) {
    console.log("do failureCallback.", this._src, error);
    return this.getResolution();
  }
}

 
//from card_deck_mod.js
// 
//console.log(makeRegularDeck()); 
 export {makeRegularDeck,layoutDeck}; 
// 

 
//from the only function in ./scripts/fischer-yates-shuffle_mod.js
export { kShuffle };
 

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>cards and megaball</title>
    <script src="https://code.createjs.com/1.0.0/preloadjs.min.js"></script>
    <script type="module" src="./scripts/card_deck_mod.js"></script>
    <script type="module" src="./scripts/fischer-yates-shuffle_mod.js"></script>
    <link rel="stylesheet" href="./css/shuffling.css" />
  </head>
  

  <script type="module">

import * as carModVars from "./scripts/card_deck_mod.js";
import * as shufflerMod from "./scripts/fischer-yates-shuffle_mod.js";

//enables any script to use my preloader over and over.
export const preloader = new createjs.LoadQueue();


 function doShuffle() {
        deck = shufflerMod.kShuffle(carModVars.makeRegularDeck());
        card_output = document.querySelector("#card_output");
		
		
		//old class style:
		 
		 var aImgGallery = function () {
        //eventControl keeps a list of event types, and their functions to facilitate removal
        this.eventControl = {};
        this.navigationElement = null;
        //next
        //previous
        //restart
        return this;
      };
      aImgGallery.prototype = new aImgGallery();
      Object.defineProperty(aImgGallery.prototype, "baseURL", {
        get: function () {
          return baseURL;
        },
        set: function (param) {
          baseURL = param;
        },
        configurable: true,
      });
      Object.defineProperty(aImgGallery.prototype, "baseURL", {
        writable: true,
      });
      Object.defineProperty(aImgGallery.prototype, "cachedImages", {
        writable: true,
      });
      aImgGallery.prototype.displayImages = function (where) {
        ps_lib.clearKids(where);
        var len = this.cachedImages.length;
        for (var i = 0; i < len; i++) {
          where.appendChild(this.cachedImages[i]);
        }
      };

*/
