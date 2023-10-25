/*
Quick Slides
*/
/*  
    // early from https://code.tutsplus.com/using-createjs-preloadjs-soundjs-and-tweenjs--net-36292t

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

/* class BMP extends createjs.Bitmap {
    constructor(src) {
        super(src);
        // this.on("fileload", this.handleFileLoad);
        // this.on("progress", this.handleFileProgress);
        // this.on("complete", this.loadComplete);
        // this.on("error", this.loadError);
        this.bmp = this;
        this.bmp.name = "full_size_";
        var boundBMP = this.BMPhasPopulated.bind(this.bmp);
        this.bmp.image.addEventListener("load", boundBMP);
        this.src = src;
    }
    handleFileLoad(event) {}
    handleFileProgress(event) {}
    loadComplete(event) {
        // console.log("PLEASE BE SOMETHING", event, this._src, event.target.getResult(event.target.name));
        // console.log("PLEASE BE SOMETHING", event, this._src );
    }
    loadError(event) {}
    BMPhasPopulated() {
        this.getResult().name += this.src;
        console.log("BMPhasPopulated", this.name);
        window.dispatchEvent(
            new CustomEvent("cardflip_evt_evtStr", {
                detail: { msg: ":::flip card", populatedBMP: this.getResult(), cardName: this.name },
            })
        );
        return this.bmp;
    }
    getResult() {
        return this.bmp;
    }
}
 */
//INITIAL SETUP OF THE BMP LOAD HANDLER (FULLSIZE DISPLAY)
const cardflip_evt = new CustomEvent("cardflip_evt_evtStr", {
    detail: { msg: ":::flip card" },
});

window.addEventListener("cardflip_evt_evtStr", cardEventHandler);

function cardEventHandler(e) {
    console.log("cardflip_evt was dispatched.... ");
}
//  window.dispatchEvent(cardflip_evt);

class SingleFileLoader extends createjs.LoadQueue {
    constructor(singleLoaderConfig) {
        super(singleLoaderConfig.prefersXHR);
        this.prefersXHR = singleLoaderConfig.prefersXHR;

        this.singleID = singleLoaderConfig.singleID;
        this.loadedProgressContainerScope = singleLoaderConfig.loadedProgressContainerScope;
        this.textX = singleLoaderConfig.textX;
        this.textY = singleLoaderConfig.textY;
        singleLoaderConfig.finalW === undefined || null
            ? (this.finalW = singleLoaderConfig.finalW)
            : (this.finalW = singleLoaderConfig.finalW = 0);
        singleLoaderConfig.finalH === undefined || null
            ? (this.finalH = singleLoaderConfig.finalH)
            : (this.finalH = singleLoaderConfig.finalH = 0);

        singleLoaderConfig.finalX === undefined || null ? (this.finalX = singleLoaderConfig.finalX) : (this.finalX = 0);
        singleLoaderConfig.finalY === undefined || null ? (this.finalY = singleLoaderConfig.finalY) : (this.finalY = 0);

        var anInstanceContainer = new createjs.Container();
        this.home = anInstanceContainer;

        this.loadedProgressContainerScope.addChild(this.home);
        this.loadedProgressContainerScope.addChild(this.home);
        this.instance = this;
        this.name = this.setName(this.singleID);
        this.bmp = null;
        // preload = new SingleFileLoader(true);
        // preload.installPlugin(createjs.Sound);      ? needed?
        this.instance.on("fileload", this.handleFileLoad);
        this.instance.on("progress", this.handleFileProgress);
        /*   loadInit(event) {
            console.log("☺☺ INIT! ☺☺", event);
        } */
        this.instance.on("complete", this.loadComplete);
        this.instance.on("error", this.loadError);

        // provided here for later-- not needed

        // console.log("singleLoaderConfig is '' ", singleLoaderConfig.manifestList === "");
        // console.log("singleLoaderConfig is undefined ", singleLoaderConfig.manifestList === undefined);
        // console.log("singleLoaderConfig is null ", singleLoaderConfig.manifestList === null);
        // console.log("this.progressText === undefined ", this.progressText === undefined);

        if (this.progressText === undefined || null) {
            var anInstanceTextContainer = new createjs.Container();
            this.textContainer = anInstanceTextContainer;
            this.progressText = new createjs.Text("LOADING:0123456789%", "16px 'Press Start 2P'", "#FFCC00");
            this.textContainer.x = this.textX;
            this.textContainer.y = this.textY;
            this.textContainer.addChild(this.progressText);
            this.home.addChild(this.textContainer);
        } else {
            this.textContainer.visible = true;
        }
        /* 
this needs for each thing to have  a color bar on it?
(instead of text)
*/
        this.progressText.text = "";

        if (typeof singleLoaderConfig.manifestList === "string") {
            if (
                singleLoaderConfig.manifestList === "" ||
                singleLoaderConfig.manifestList === undefined ||
                singleLoaderConfig.manifestList === null
            ) {
                // console.log("this.singleID", this.singleID);
                // console.log("this.manifestList", this.manifestList);
                // this.manifestList = singleLoaderConfig.manifestList;
                // manifest: [
                //     {
                //         id: this.singleID,
                //         crossOrigin: true,
                //         src: this.manifestList,
                //         type: createjs.Types.IMAGE,
                //     },
                // ],
                // console.log("♥♥♥♠♠♠this.manifestList :", this.manifestList, typeof this.manifestList);
            } else {
                this.manifestList = singleLoaderConfig.manifestList;
                console.log("FEED ME");
                console.log(
                    "○○○" + " this.manifestList :",
                    this.singleID || this.manifestList,
                    "○○○",
                    this.manifestList,
                    "○○○",
                    typeof this.manifestList,
                    "○○○",
                    this.progressText
                );
                // var shitList = new createjs.LoadQueue(true);
                this.instance.loadFile(this.manifestList);
            }
        }
    }

    handleFileLoad(event) {
        // console.log("☺☺ IMAGE LOADED! ☺☺", event);

        if (event.result.naturalWidth > 0) {
            // console.log("☺☺ img width:", event.result.naturalWidth);
            // this.bmp = this.setBMP(event.result);
            // window.dispatchEvent(gamePlay_evt);
            this.getBMP();
        }

        // console.log("♥♥♥♥♥♥" , event.result , "♥♥♥♥♥♥"); // event.result is html image tag popped with blob src

        // console.log("A file has loaded of type: " + event.item.type);
        // if (event.item.id == "logo") {
        //     console.log("Logo is loaded");
        //     //create bitmap here
        // }
    }
    handleFileProgress(event) {
        // console.log("►►► handleFileProgress ", ((this.instance.progress * 100) | 0) + " % Loaded" );
        // window.dispatchEvent(updateProgress_evt);
        this.progressText.text = ((this.instance.progress * 100) | 0) + " % Loaded";
        // console.log("handleFileProgress: : :", this.progressText.text);
    }
    loadComplete(event) {
        event.target.bmp = event.target.setBMP(event.target.getResult(event.target.name));
        console.log("►►► loadComplete THIS", event);
        return;
        // console.log("↕▬▬ ", event, " BMP Loaded");
        // console.log("Finished Loading Assets");
        // console.log(event.target );
        // String(this.getName()).toString().length === 1
        //     ? (this.progressText.text = " " + this.name + " is 100% Loaded")
        //     : (this.progressText.text = this.name + " is 100% Loaded");
        this.getTextContainer().visible = false;
        // return this.getBMP();

        var wBounds = parseInt(w - 64);
        var hBounds = parseInt(h - 64);

        var BMPContainer = new createjs.Container();

        console.log(wBounds, hBounds);

        var fsBMP = this.getBMP();
        var fsBMPimg = fsBMP.image;

        /* TODO: this needs something to resize the bitmap container, AFTER it is loaded.
                // advice from stack overflow : look to the image load event on the bitmap to facilitate resize
                //
                */

        var newDims = resizeToKnownDimensions(fsBMPimg.naturalWidth, fsBMPimg.naturalHeight, wBounds, hBounds);

        console.log(fsBMPimg.naturalWidth, newDims.scaleRatio, newDims);
        // BMPContainer.setBounds(0, 0, newDims.newW, newDims.newH);

        // BMPContainer.x = (BMPContainer.getBounds().width -  newDims.newW) / 2;
        // BMPContainer.y = (BMPContainer.getBounds().height - newDims.newH) / 2;

        BMPContainer.addChild(fsBMP);
        BMPContainer.scaleX = newDims.scaleRatio;
        BMPContainer.scaleY = newDims.scaleRatio;
        subject_content.addChild(BMPContainer);
        // console.log("loadedSliders: ", );
        // console.log("loadedSliders: ", loadedImg.name);

        window.dispatchEvent(
            new CustomEvent("cardflip_evt_evtStr", {
                // detail: { msg: ":::flip card", populatedBMP: boundBMP, cardName: boundNAME, stuff: boundSTUFF },
                detail: {
                    msg: ":::image loaded",
                },
            })
        );
    }
    getDetails() {
        return {
            loadery: this,
            populatedBMP: this.getBMP(),
            cardName: this.getName(),
            container: this.getContainer(),
        };
    }
    setBMP(param) {
        this.bmp = new createjs.Bitmap(param);
    }
    // async getBMP() {
    getBMP() {
        // gets a bitmap instance set up to be populated when the loader is finished, so I don't
        // have to dig up the reference, or make a new bmp.
        // console.log(this.bmp);
        // await this.spitOutBMP();
        this.spitOutBMP();
    }
    spitOutBMP() {
        return this.bmp;
    }
    // async getBMP(a, b) {
    //     let [res1, res2] = await Promise.all(this.loadError, function () {
    //         return this.bmp;
    //     });
    //     return [res1, res2];
    // }
    // async getBMP() {
    //     await Promise.resolve("OK");
    //     return this.bmp;
    //     // await Promise.resolve("OK");
    //     // alert("done");
    //     // Promise.resolve("OK").then(function () {
    //     //     return this.bmp;
    //     // });
    // }
    setName(param) {
        this.name = param;
    }
    getName() {
        return this.name;
    }
    getContainer() {
        return this.home;
    }
    getLoader() {
        return this.instance;
    }
    loadError(evt) {
        console.log("Error!", evt.text);
    }
    getTextContainer() {
        return this.textContainer;
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

    /* 
    TODO: ADD LOGIC FOR LOCATING IMAGES WITHOUTH THUMBNAILS/VICE VERSA
    */
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

/* function handleImageLoad(e) {
    // console.log("::handleImageLoad::", this);
    // var b = new createjs.Bitmap(this.fullURL);
 
    var wBounds = parseInt(w - 128);
    var hBounds = parseInt(h - 128);

    e.target.setBMP(e.target.getResult(this.targetID));
    var FSbmp = new createjs.Bitmap(this.fullURL);
    console.log("óó handleImageLoad ", this.fullURL, this.targetID);
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

        loadedImg.scaleX = newDims.scaleRatio;
        loadedImg.scaleY = newDims.scaleRatio;
        loadedContainer.setBounds(0, 0, newDims.newW, newDims.newH);
    } else {
        loadedContainer.setBounds(0, 0, loadedImg.image.naturalWidth, loadedImg.image.naturalHeight);
    }

    // TODO: ADD THE CONTENT TO AN ARRAY, AND GET READY TO ITERATE THROUGH THE CONTENT TO ADD EVENTS
    loadedContainer.addChild(loadedImg);

    loadedImg.x = (w - loadedContainer.getBounds().width) / 2;
    loadedImg.y = (h - loadedContainer.getBounds().height) / 2;

    var boundBmp = toggleHidden.bind({ target: e.target, fullSize: fsURL });
    loadedImg.addEventListener("click", boundBmp);
    // image_content.addChild(loadedImg);
    interactive_content.addChild(loadedImg);
    // subject_content.addChild(loadedImg);
}
 */

function toggleHidden(e) {
    // console.log(this.fullSize, e.target + "goes whoosh! ");

    /*
    createjs.Tween.get(e.target, {
        // loop: true,
        // override: true,
    }) 
*/

    var sendTarget = this.target;
    var sendBMPURL = this.fullSize;
    var newBoundToComplete = {
        target: sendTarget,
        fsURL: sendBMPURL,
    };

    // console.log("◘◘◘ toggleHidden ◘◘◘", this);

    var completeBound = tweenComplete.bind(newBoundToComplete);

    createjs.Tween.get(this.target)
        // .wait(500)
        // .to({ rotation: "-360" }, 1200)
        .to({ alpha: 0, visible: false }, 135)
        .call(completeBound);
}

function showLoaded() {
    // console.log("showLoaded ");
    for (var i = 0; i < loadedSliders.length; i++) {
        var bmp = loadedSliders[i].thumbLoader.getBMP();
        bmp.visible = true;
        bmp.alpha = 1;
        console.log("Σ Σ SHOW THIS! Σ Σ", bmp);
    }
}

function isLastID(param) {
    // console.log("isLastID ");
    var slidesAreAllOff = true;
    for (var i = 0; i < loadedSliders.length; i++) {
        // console.log(
        //     param.name,
        //     loadedSliders[i].thumbLoader.getID(),
        //     param.name === loadedSliders[i].thumbLoader.getID()
        // );
        // console.log(
        //     "☻☻",
        //     loadedSliders[i].thumbLoader.getBMP().visible,
        //     // loadedSliders[i].thumbLoader.instance.getResult(loadedSliders[i].thumbLoader.instance.getID())
        // );
        if (param.name === loadedSliders[i].thumbLoader.getID()) {
            // console.log("this slider is da bomb:", "is this thing on? ->> " + loadedSliders[i].getBMP().visible);
            // loadedSliders[i].getLoader().getResult(loadedSliders[i].getID()) // << -- path to img tag
            // console.log(loadedSliders[i].getBMP().parent);
            loadedSliders[i].thumbLoader.getBMP().visible = false;
        }
        if (loadedSliders[i].thumbLoader.getBMP().visible) {
            slidesAreAllOff = false;
        }
        if (i === parseInt(loadedSliders.length - 1)) {
            if (slidesAreAllOff === true) {
                console.log("ΣΣΣΣΣΣ SLIDES ARE ALL HIDDEN ΣΣΣΣΣΣΣ");
                showLoaded();
            }
        }
    }
}

function tweenComplete() {
    // console.log(" tweenComplete ", this);
    var wBounds = parseInt(w - 64);
    var hBounds = parseInt(h - 64);
    isLastID(this.target);
    var BMPContainer = new createjs.Container();

    // console.log("this.fsURL", this.fsURL); //fsURL====FSbmp
    var FSIMGConfig = {
        prefersXHR: true, //singleLoaderConfig.prefersXHR;
        /* load a single file! */ manifestList: this.fsURL, //singleLoaderConfig.manifestList;
        singleID: this.fsURL, //singleLoaderConfig.singleID;
        loadedProgressContainerScope: BMPContainer, //singleLoaderConfig.loadedProgressContainerScope;
        textX: 0, //singleLoaderConfig.textX;
        textY: 0, //singleLoaderConfig.textY;
        finalW: 0, //singleLoaderConfig.finalW
        finalH: 0, //singleLoaderConfig.finalH
        finalX: 0, //singleLoaderConfig.finalX
        finalY: 0, //singleLoaderConfig.finalY
    };

    // var singleFileLoader = new createjs.LoadQueue();

    var fullSizeFileLoader = new SingleFileLoader(FSIMGConfig);
    subject_content.addChild(BMPContainer);
    var fsBMP = fullSizeFileLoader.getBMP();

    console.log(fsBMP);

    // var newDims = resizeToKnownDimensions(fsBMP.image.naturalWidth, fsBMP.image.naturalHeight, wBounds, hBounds);

    // fullSizeFileLoader.getContainer().scaleX = newDims.scaleRatio;
    // fullSizeFileLoader.getContainer().scaleY = newDims.scaleRatio;
    // BMPContainer.addChild(fullSizeFileLoader.getContainer());
    // BMPContainer.setBounds(0, 0, wBounds, hBounds);

    // BMPContainer.x = (BMPContainer.getBounds().width - w) / 2;
    // BMPContainer.y = (BMPContainer.getBounds().height - h) / 2;

    // subject_content.addChild(BMPContainer);

    return fullSizeFileLoader;

    // lets make this easy-- I'm going to populate yet another container with the scaled image when done.

    var fsBMP = new SkinnedIcon(this.fsURL, wBounds, hBounds);

    /* TODO: this needs something to resize the bitmap container, AFTER it is loaded.
    // advice from stack overflow : look to the image load event on the bitmap to facilitate resize
    //
    */
    var newDims = resizeToKnownDimensions(fsBMP.getNaturalWidth(), fsBMP.getNaturalHeight(), wBounds, hBounds);

    fsBMP.getInstanceContainer().scaleX = newDims.scaleRatio;
    fsBMP.getInstanceContainer().scaleY = newDims.scaleRatio;
    BMPContainer.addChild(fsBMP.getInstanceContainer());
    BMPContainer.setBounds(0, 0, wBounds, hBounds);

    BMPContainer.x = (BMPContainer.getBounds().width - w) / 2;
    BMPContainer.y = (BMPContainer.getBounds().height - h) / 2;

    subject_content.addChild(BMPContainer);
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
    var thumbsUrl = e.target.getResult("renders").firstChild.attributes.thumbnails.value;
    var smallList = e.target.getResult("renders").getElementsByTagName("image");
    var smallListArr = [];

    for (var i = 0; i < smallList.length; i++) {
        smallListArr.push(smallList[i].attributes.src.value);

        var thumbnailConfig = {
            prefersXHR: true, //singleLoaderConfig.prefersXHR;
            manifestList: "", //singleLoaderConfig.manifestList;
            singleID: smallList[i].attributes.title.value, //singleLoaderConfig.singleID;
            loadedProgressContainerScope: subject_content, //singleLoaderConfig.loadedProgressContainerScope;
            textX: 0, //singleLoaderConfig.textX;
            textY: i * 20, //singleLoaderConfig.textY;
            finalW: 0, //singleLoaderConfig.finalW
            finalH: 0, //singleLoaderConfig.finalH
            finalX: 0, //singleLoaderConfig.finalX
            finalY: 0, //singleLoaderConfig.finalY
        };

        // var singleFileLoader = new createjs.LoadQueue();
        var singleFileLoader = new SingleFileLoader(thumbnailConfig);

        var thisImgPayload = {
            fullURL: window.location.search + renderUrl + "/" + smallListArr[i],
            targetID: smallList[i].attributes.title.value,
            imgSrc: smallList[i].attributes.src.value,
            message: "this loaded: " + i + " █",
            thumbLoader: singleFileLoader,
            thisThumbsUrl: thumbsUrl,
            thisThumbLoc:
                window.location.search +
                thumbsUrl +
                "/" +
                smallList[i].attributes.src.value.substring(0, smallList[i].attributes.src.value.lastIndexOf(".")) +
                "-t.png",
        };

        // TODO: WAIT TO ADD THE EVENTS UNTIL ALL THUMBS HAVE LOADED.
        // COLLECT DATA IN ARRAYS AND WAIT
        //   constructor(loadsInBackisTrue, manifestList, singleID, loadedSelfScope, textX, textY)

        loadedSliders.push(thisImgPayload);

        //   singleFileLoader.loadFile({ id: "myImg", src: "Background.png" });
        // https://stackoverflow.com/questions/15995411/preloadjs-in-createjs-is-not-working?rq=3
    }
    loadThumbs();
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

function handleThumbLoad(e) {
    //    console.log(":::handleThumbLoad::: ", e, this);
    var wBounds = parseInt(w - 128);
    var hBounds = parseInt(h - 128);

    // var s = new BMP(e.target.getResult(this.targetID));
    // var s = new createjs.Bitmap(e.target.getResult(this.targetID));
    return;

    e.target.setBMP(e.target.getResult(this.targetID));

    var loadedImg = e.target.getBMP();
    loadedImg.name = this.targetID;
    var loadedContainer = new createjs.Container();

    console.log("loadedImg.image", loadedImg.image);

    if (loadedImg.image.naturalWidth > wBounds || loadedImg.image.naturalHeight > hBounds) {
        var newDims = resizeToKnownDimensions(
            loadedImg.image.naturalWidth,
            loadedImg.image.naturalHeight,
            wBounds,
            hBounds
        );

        loadedImg.scaleX = newDims.scaleRatio;
        loadedImg.scaleY = newDims.scaleRatio;
        loadedContainer.setBounds(0, 0, newDims.newW, newDims.newH);
    } else {
        loadedContainer.setBounds(0, 0, loadedImg.image.naturalWidth, loadedImg.image.naturalHeight);
    }

    // TODO: ADD THE CONTENT TO AN ARRAY, AND GET READY TO ITERATE THROUGH THE CONTENT TO ADD EVENTS
    loadedContainer.addChild(loadedImg);

    loadedImg.x = (w - loadedContainer.getBounds().width) / 2;
    loadedImg.y = (h - loadedContainer.getBounds().height) / 2;

    var fsURL = this.fullURL; //for making the full bmp

    // console.log("PASS THIS: ", e.target || e.target.getBMP());
    // console.log("PASS THIS: ", e.target );
    // console.log("PASS THIS: ", s);
    var boundBmp = toggleHidden.bind({ target: e.target.getBMP(), fullSize: fsURL });
    loadedImg.addEventListener("click", boundBmp);
    // image_content.addChild(loadedImg);
    interactive_content.addChild(loadedImg);
    // subject_content.addChild(loadedImg);
}

function loadThumbs() {
    // console.log(":::loadThumbs::: ", loadedSliders[0]);

    /*     console.log(
        window.location.search + loadedSliders[0].imgSrc.substring(0, loadedSliders[0].imgSrc.lastIndexOf(".")) +
            "-t.png"
    ); */

    for (var i = 0; i < loadedSliders.length; i++) {
        // var boundThumbDetails = handleThumbLoad.bind({
        //     targetID: loadedSliders[i].targetID,
        //     fullURL: loadedSliders[i].fullURL,
        //     imgSrc: loadedSliders[i].imgSrc,
        // });

        // loadedSliders[i].thumbLoader.addEventListener("complete", boundThumbDetails);

        loadedSliders[i].thumbLoader.loadFile({
            id: loadedSliders[i].targetID,
            crossOrigin: true,
            src:
                window.location.search +
                loadedSliders[i].thisThumbsUrl +
                "/" +
                loadedSliders[i].imgSrc.substring(0, loadedSliders[i].imgSrc.lastIndexOf(".")) +
                "-t.png",
        });
    }
}
