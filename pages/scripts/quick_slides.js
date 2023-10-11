/*
Quick Slides
*/
/*  
    // most from https://code.tutsplus.com/using-createjs-preloadjs-soundjs-and-tweenjs--net-36292t

    or alternatively from here:
    https://github.com/tutsplus/createjs-preload-sound-tweenjs/tree/master

    this seems like a good candidate for the reusing preloaders to load multiple images:    
    https://github.com/CreateJS/PreloadJS/issues/232
     
*/
/*
    var someText = new PageTextClip(
        // (textContent, txtSize, fontFamily, textColor)  // ?? "12px 'Press Start 2P'",
        "things here",
        "8",
        "'Press Start 2P'",
        "#FFCC00"
    );
 */
class SingleFileLoader extends createjs.LoadQueue {
    constructor(loadsInBackisTrue, manifestList, singleID, loadedProgressContainerScope, textX, textY) {
        super(loadsInBackisTrue);
        var anInstanceContainer = new createjs.Container();
        this.home = anInstanceContainer;
        loadedProgressContainerScope.addChild(this.home);
        this.instance = this;
        this.name = singleID;
        this.bmp = null;
        // preload = new SingleFileLoader(true);
        // preload.installPlugin(createjs.Sound);      ? needed?
        this.instance.on("fileload", this.handleFileLoad);
        this.instance.on("progress", this.handleFileProgress);
        this.instance.on("complete", this.loadComplete);
        this.instance.on("error", this.loadError);
        // provided here for later-- not needed
        this.manifestList = manifestList;
        if (this.progressText === undefined || null) {
            this.progressText = new createjs.Text("LOADING:0123456789%", "16px 'Press Start 2P'", "#FFCC00");
        } else {
            this.progressText.visible = true;
        }
        this.progressText.x = textX;
        this.progressText.y = textY;
        this.home.addChild(this.progressText);
        /* 
                            this needs for each thing to have  a color bar on it.
                            (instead of text)
                            */
        this.progressText.text = "";
        //  this.instance.getProgress();
    }
    handleFileLoad(event) {
        // console.log("A file has loaded of type: " + event.item.type);
        // if (event.item.id == "logo") {
        //     console.log("Logo is loaded");
        //     //create bitmap here
        // }
    }
    setBMP(param) {
        this.bmp = new createjs.Bitmap(param);
    }
    getBMP() {
        // gets a bitmap instance set up to be populated when the loader is finished, so I don't
        // have to dig up the reference, or make a new bmp.
        return this.bmp;
    }
    getContainer() {
        return this.home;
    }
    getLoader() {
        return this.instance;
    }
    loadError(evt) {
        // console.log("Error!", evt.text);
    }
    handleFileProgress(event) {
        // window.dispatchEvent(gamePlay_evt);
        // window.dispatchEvent(updateProgress_evt);
        this.progressText.text = ((this.instance.progress * 100) | 0) + " % Loaded";
        // console.log("handleFileProgress: : :", this.progressText.text);
    }
    loadComplete(event) {
        // console.log("Finished Loading Assets");
        this.name.toString().length === 1
            ? (this.progressText.text = " " + this.name + " is 100% Loaded")
            : (this.progressText.text = this.name + " is 100% Loaded");
        this.progressText.visible = false;
    }
    getID() {
        return this.name;
    }
}

/*
function startPreload() {
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}
function handleFileLoad(event) {
    console.log("A file has loaded of type: " + event.item.type);
    if(event.item.id == "logo"){
        console.log("Logo is loaded");
        //create bitmap here
    }
}
function loadError(evt) {
    console.log("Error!",evt.text);
}
function handleFileProgress(event) {
    progressText.text = (preload.progress*100|0) + " % Loaded";
    stage.update();
}
function loadComplete(event) {
    console.log("Finished Loading Assets");
}
        
*/
/*
// https://stackoverflow.com/questions/48835561/createjs-preloadjs-what-is-tag-loading

// https://www.dmxzone.com/go/22436/using-createjs-preloadjs-soundjs-and-tweenjs/

find more from that user: https://www.dmxzone.com/user/446872/contributions/
Most content can be loaded using tags. The main exceptions are anything text-based and webaudio.

complete: fired when a queue completes loading all files
error: fired when the queue encounters an error with any file.
progress: the progress for when the entire queue has changed.
fileload: for when a single file has completed loading.
fileprogress: the progress for when a single file has changes.
Please note that only files loaded with XHR (or possibly by plugins)
will fire progress events, other than zero or 100%.

// Tag loading uses HTML tags to load content.

// For example, this is a tag loaded image:

// var img = document.createElement("img");
// img.src = "path/to/image.jpg";


// Tag-loaded images are handled by the browser, and download to the browser cache.
// They don't provide things like progress events, which is why PreloadJS prefers to load with XHR.
// That said, tag-loading works better with the browser cache,
// so if you plan on using string-paths with your content (and not passing references
// to preloaded content), stick with tag-loaded images :)  -Lanny

function loadImages(manifest) {
    window.queue = new createjs.LoadQueue(true, null, true);

    queue.loadManifest({src: manifest, type: "manifest"}, true);

    queue.on("fileload", this.handleFileLoaded);

    queue.on("progress", function(event) {
    console.log("progress " + event.progress);
    });

    queue.on("fileprogress", function(event) {
    console.log("file progress " + event.progress);
    });

    queue.on("error", function(event) {
    console.log("file error");
    });

    queue.on("complete", function(event) {
    console.log("queue complete");
    console.log(event);
    });

    queue.load();
    return queue;
}
*/

/*
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
var big_map;
var big_mapIsLoaded = false;
var fileLoader;
var loadedSliders = [];

function playGame() {
    loadAssets();
}

function loadAssets() {
    console.log("playGame", "loadAssets");

    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("complete", handle_OLD_MAP_LOAD);

    big_map = document.querySelector("#big_map");
    /*
file loader, needs to be added to the SlideGallery.js 
uses SingleFileLoader loader for the image load and the progress
*/
    // this.instance.loadManifest();
    fileLoader.loadManifest({
        manifest: [
            // {
            //     // already loaded-- see if this helps.
            //     src: window.location.search + "./images/fullsize/3d_renders/bed.jpg",
            //     id: "bed",
            //     crossOrigin: true,
            //     type: createjs.Types.IMAGE,
            // },
            {
                // already loaded-- see if this helps.
                src: window.location.search + "./images/renders.xml",
                id: "renders",
                crossOrigin: true,
                type: createjs.Types.XML,
            },
        ],
    });
}

/*
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

function handleImageLoad(e) {
    // console.log("::handleImageLoad::", this);
    // var b = new createjs.Bitmap(e.target.getResult("0"));
    var wBounds = parseInt(w - 128);
    var hBounds = parseInt(h - 128);

    e.target.setBMP(e.target.getResult(this.targetID));
    // console.log("óó handleImageLoad ", this, e.target.getBMP());
    var loadedImg = e.target.getBMP();
    loadedImg.name = this.targetID;
    var loadedContainer = new createjs.Container();

    if (loadedImg.image.naturalWidth > wBounds || loadedImg.image.naturalHeight > hBounds) {
        var newDims = resizeToKnownDimensions(
            loadedImg.image.naturalWidth,
            loadedImg.image.naturalHeight,
            wBounds,
            hBounds
        );
        /*
returns {
imageAspect: imageAspect,
aspect: containerAspect,
scaleRatio: newScaleRatio,
newW: contentW,
newH: contentH,
};
*/

        loadedImg.scaleX = newDims.scaleRatio;
        loadedImg.scaleY = newDims.scaleRatio;
        loadedContainer.setBounds(0, 0, newDims.newW, newDims.newH);
    } else {
        loadedContainer.setBounds(0, 0, loadedImg.image.naturalWidth, loadedImg.image.naturalHeight);
    }
    loadedContainer.addChild(loadedImg);

    loadedImg.x = (w - loadedContainer.getBounds().width) / 2;
    loadedImg.y = (h - loadedContainer.getBounds().height) / 2;

    var boundBmp = toggleHidden.bind(e.target.getBMP());
    loadedImg.addEventListener("click", boundBmp);
    image_content.addChild(loadedImg);
    // subject_content.addChild(loadedImg);
}

function toggleHidden(e) {
    // console.log(e.target + "goes whoosh! ");

    /*
    createjs.Tween.get(e.target, {
        // loop: true,
        // override: true,
    }) 
*/

    // console.log("toggleHidden bound>:", this);
    createjs.Tween.get(this)
        // .wait(500)
        // .to({ rotation: "-360" }, 1200)
        .to({ alpha: 0, visible: false }, 135)
        .call(tweenComplete);
}

function showLoaded() {
    // console.log("showLoaded ");
    for (var i = 0; i < loadedSliders.length; i++) {
        loadedSliders[i].getBMP().visible = true;
        loadedSliders[i].getBMP().alpha = 1;
        // console.log("Σ Σ SHOW THIS! Σ Σ", loadedSliders[i]);
    }
}

function isLastID(param) {
    // console.log("isLastID ");
    var slidesAreAllOff = true;
    for (var i = 0; i < loadedSliders.length; i++) {
        if (param.name === loadedSliders[i].getID()) {
            // console.log("this slider is da bomb:", "is this thing on? ->> " + loadedSliders[i].getBMP().visible);
            // loadedSliders[i].getLoader().getResult(loadedSliders[i].getID()) // << -- path to img tag
            // console.log(loadedSliders[i].getBMP().parent);
        }
        if (loadedSliders[i].getBMP().visible) {
            slidesAreAllOff = false;
        }
        if (i === parseInt(loadedSliders.length - 1)) {
            if (slidesAreAllOff === true) {
                // console.log("ΣΣΣΣΣΣ SLIDES ARE ALL HIDDEN ΣΣΣΣΣΣΣ");
                showLoaded();
            }
        }
    }
}

function tweenComplete() {
    // console.log(" tweenComplete ");
    //do something?
    //   this.visible = this.visible;
    // console.log("this is what? ", this.name);
    //if all are hidden, then:
    //TODO:
    //
    isLastID(this);

    // console.log("loadedSliders: ", );
    // console.log("loadedSliders: ", loadedImg.name);
}

function handle_OLD_MAP_LOAD(e) {
    console.log(":::handle_ImageLoadComplete:::");
    stage.snapToPixel = true;
    // image_content.snapToPixel = true;
    // subject_content.snapToPixel = true;
    /*
                    FROM JSON file, loading is different:
                    {
                        "path":"https://images.unsplash.com/",
                        "type":"manifest",
                        "manifest": [
                            {
                                "src":"photo-1542838454-d4dce2a7cfde?fit=crop&w=500&q=60",
                                "id":"stair_boy",
                                "type":"image"
                            },
                            {
                                "src":"photo-1549948558-1c6406684186?fit=crop&w=500&q=60",
                                "id":"night_bridge",
                                "type":"image"
                            }
                    ]}

The loadManifest call supports four types of manifests:

    1) A string path, which points to a manifest file, which is a JSON file that contains a "manifest" property,
    which defines the list of files to load, and can optionally contain a "path" property, which will be
    prepended to each file in the list.

    2) An object which defines a "src", which is a JSON or JSONP file. A "callback" can be defined for JSONP file.
    The JSON/JSONP file should contain a "manifest" property, which defines the list of files to load, and can
    optionally contain a "path" property, which will be prepended to each file in the list.

    3) An object which contains a "manifest" property, which defines the list of files to load, and can optionally
    contain a "path" property, which will be prepended to each file in the list.

    4) An Array of files to load. 
    */

    var renderUrl = e.target.getResult("renders").firstChild.attributes.url.value;

    var smallList = e.target.getResult("renders").getElementsByTagName("image");

    var smallListArr = [];

    for (var i = 0; i < smallList.length; i++) {
        smallListArr.push(smallList[i].attributes.src.value);

        // var singleFileLoader = new createjs.LoadQueue();
        var singleFileLoader = new SingleFileLoader(
            true,
            "",
            smallList[i].attributes.title.value,
            subject_content,
            0,
            i * 20
        );

        var thisImgPayload = {
            targetID: smallList[i].attributes.title.value,
            message: "this loaded: " + i + " █",
            thisThing: singleFileLoader,
        };

        //   constructor(loadsInBackisTrue, manifestList, singleID, loadedSelfScope, textX, textY)
        var thisImgBoundHandler = handleImageLoad.bind(thisImgPayload);
        singleFileLoader.addEventListener("complete", thisImgBoundHandler);
        loadedSliders.push(singleFileLoader);
        singleFileLoader.loadFile({
            id: smallList[i].attributes.title.value,
            crossOrigin: true,
            src: window.location.search + renderUrl + "/" + smallListArr[i],
        });

        //   singleFileLoader.loadFile({ id: "myImg", src: "Background.png" });
        // https://stackoverflow.com/questions/15995411/preloadjs-in-createjs-is-not-working?rq=3
    }

    /*
    e.target.getResult("renders").getElementsByTagName("renders ")[0].firstChild.data
    e.target.getResult("renders").firstChild  //main node

    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("complete", handle_OLD_MAP_LOAD);

    big_map = document.querySelector("#big_map");

    // if (big_map === null || big_map === undefined) {
    fileLoader.loadManifest({
        manifest: [
            // {
            //     // already loaded-- see if this helps.
            //     src: window.location.search + "./images/fullsize/3d_renders/bed.jpg",
            //     id: "bed",
            //     crossOrigin: true,
            //     type: createjs.Types.IMAGE,
            // },
            {
                // already loaded-- see if this helps.
                src: window.location.search + "./images/renders.xml",
                id: "renders",
                crossOrigin: true,
                type: createjs.Types.XML,
            },
        ],
    });
*/
}
