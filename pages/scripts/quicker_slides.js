const cardflip_evt = new CustomEvent("cardflip_evt_evtStr", {
    detail: { msg: ":::flip card" },
});
window.addEventListener("cardflip_evt_evtStr", cardEventHandler);

// // HOW CAN THIS BE LOCALIZED, SO THAT CREATED OBJECTS FIRE OFF THE EVENTS?
// const imageLoaded_evt = new CustomEvent("imageLoaded_evt_evtStr", {
//     detail: { msg: ":::imageLoaded_evt dispatched" },
// });
// // imageLoaded_evt
window.addEventListener("imageLoaded_evt_evtStr", imageLoadedHandler);

var lastY = 0;

function imageLoadedHandler(e) {
    console.log("::: ◄►◄ image has loaded :::", e.detail.deetContainer);
    var thumbshome = new createjs.Container();
    thumbshome.addChild(e.detail.deetContainer.getBMP());
    interactive_content.addChild(thumbshome);
    return;
    thumbBMP.x = 0;
    thumbBMP.y += lastY;
    lastY = thumbBMP.y;
}

function cardEventHandler(e) {
    // console.log("cardflip_evt was dispatched.... ", e.detail);
    // console.log("cardflip_evt was dispatched.... ", e.detail.deetContainer.getID());
    for (var i = 0; i < loadedSliders.length; i++) {
        if (loadedSliders[i].thumbLoader.getInstance().getID() === e.detail.deets) {
            var BMPContainer = new createjs.Container();
            var FSIMGConfig = {
                prefersXHR: true, //singleLoaderConfig.prefersXHR;
                /* load a single file! */ manifestList: loadedSliders[i].fullURL, //singleLoaderConfig.manifestList;
                singleID: loadedSliders[i].fullURL, //singleLoaderConfig.singleID;
                loadedProgressContainerScope: BMPContainer, //singleLoaderConfig.loadedProgressContainerScope;
                textX: 0, //singleLoaderConfig.textX;
                textY: 0, //singleLoaderConfig.textY;
                finalW: 0, //singleLoaderConfig.finalW
                finalH: 0, //singleLoaderConfig.finalH
                finalX: 0, //singleLoaderConfig.finalX
                finalY: 0, //singleLoaderConfig.finalY
                fullURL: loadedSliders[i].fullURL, //singleLoaderConfig.fullURL
                thumbURL: loadedSliders[i].fullURL, //singleLoaderConfig.thumbURL
            };
            e.detail.thumbBMP.addEventListener("click", function () {
                return new SingleFileLoader(FSIMGConfig);
            });
            subject_content.addChild(BMPContainer);
        }
    }
}

class imgLoadEvent extends Event {
    constructor() {
        super();
    }
}

class MyEventTarget extends EventTarget {
    constructor(mySecret) {
        super();
        this._secret = mySecret;
    }

    get secret() {
        return this._secret;
    }
}

// class BMP extends createjs.Bitmap {
class BMP extends createjs.LoadQueue {
    constructor(src, bmpContainer, param2) {
        // super();
        super(true);
        this._src = src;
        this.instance = this;
        this.isPopulatedLater = false;
        this.callback = param2 || null;
        this.container = bmpContainer;
        if (bmpContainer === undefined || null) {
            this.container = new createjs.Container();
        }
        if (bmpContainer === null) {
            this.isPopulatedLater = true; // user expects to populate item in UI after load process.
        }
        //create loading bar indicator

        this.indicator = new createjs.Container();

        this.indicator_bar = new createjs.Shape();
        this.indicator_bar.graphics;

        // zoomFrame.graphics.beginStroke("#FF0000");
        // zoomFrame.graphics.setStrokeStyle(2, "butt", "miter", 10, true);
        this.indicator_bar.graphics.beginFill("#450067");
        this.indicator_bar.graphics.drawRect(0, 0, w, 4);
        this.indicator.setBounds(0, 0, w, 4);
        this.indicator_bar.scaleX = 0;
        this.indicator.addChild(this.indicator_bar);
        // this.container.addChild(this.indicator);
        interactive_content.addChild(this.indicator);

        //indicator color

        // if (this.callback !== null) {
        //     //    WHAT KIND OF THING IS IT??
        //     // TODO: THIS NEEDS WORK-- TYPEOF ISN'T RIGHT
        //     // if (this.callback === typeof (this.callback === "function")) {
        //     //     this.image.addEventListener("load", this.loadBMP);
        //     // }
        // }

        // THIS NEEDS TO BE "IF SRC IS 200, OR SOMETHING, AS USER WOULD EXPECT BMP TO LOAD BY ID"
        // MAYBE NEED "PLAIN BMP class"
        /* ***** -- if SRC=== 200 */
        this.loadFile(this._src);
        this._bmp = new createjs.Bitmap(this._src);
        var thisBound = this.loadComplete.bind(this, this._bmp);
        this._bmp.image.addEventListener("load", thisBound);
        /* ***** -- END if SRC=== 200 */

        // HOW CAN THIS BE LOCALIZED, SO THAT CREATED OBJECTS FIRE OFF THE EVENTS?
        this.imageLoaded_evt = new CustomEvent("imageLoaded_evt_evtStr", {
            detail: { msg: ":::imageLoaded_evt dispatched" },
        });
        // imageLoaded_evt
        this.instance.addEventListener("imageLoaded_evt_evtStr", imageLoadedHandler);

        /*     
            // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ EVENTTARGET 
            let myEventTarget = new MyEventTarget(5);
            let value = myEventTarget.secret; // === 5

            console.log(value);
            myEventTarget.addEventListener("foo", (e) => {
            myEventTarget._secret = e.detail;
            });

            let event = new CustomEvent("foo", { detail: 7 });
            myEventTarget.dispatchEvent(event);
            let newValue = myEventTarget.secret; // === 7
            console.log(newValue);
            // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ END EVENTTARGET USAGE
        */

        this.instance.on("fileload", this.handleFileLoad);
        this.instance.on("progress", this.handleFileProgress);
        this.instance.on("complete", this.loadComplete);
        this.instance.on("error", this.loadError);
    }
    getBMP() {
        return this._bmp;
    }
    getID() {
        return false;
    }
    handleFileLoad(e) {
        this.indicator.visible = true;
        // console.log(":::::handleFileLoad);
    }
    handleFileProgress(e) {
        // console.log(":::::handleFileProgress);
        // this.progressText.text = (Math.floor(this.instance.progress * 100) | 0) + " % Loaded";
        var progress = Math.floor(this.instance.progress * 100) | 0;
        console.log(progress + " % Loaded");
        this.indicator_bar.scaleX = this.instance.progress;
    }
    loadComplete(param, e) {
        //hide indicator:
        this.indicator.visible = false;
        // console.log(":::::loadComplete);
        // console.log(":::::loadComplete", "█this", this, "█e", e, "█param", param);
        // console.log(":::::loadComplete", this.getBMP());

        // console.log(typeof param === "object");
        // console.log( param instanceof Object );

        //checks if draw (on display object VS event)
        if (param.constructor.prototype.draw == undefined) {
            //an event is present, and the BITMAP needs to be assigned.
            this._bmp = new createjs.Bitmap(this._src);
        } else {
            this._bmp = param;
        }

        // if (this._poppedLater === true) {
        //     // console.log(":::::loadComplete -->  this._poppedLater ", this.getBMP());
        //     // return this.getBMP();
        // } else {
        //     this.container.addChild(this.getBMP());
        // }
        // this.container.addChild(this._bmp);
        this.popBMP();
    }
    loadError(e) {
        // console.log(":::::loadError);
    }
    // loadBMP() {
    //     console.log("◘◘◘ BMP ○•○•○•○•◘◘◘ loaded ", this._src, this.callback);
    //     this.instance = new createjs.Bitmap(this._src);
    //     // this.callback();
    // }
    popBMP() {
        var imgLoadEvent = new CustomEvent("imageLoaded_evt_evtStr", {
            detail: {
                msg: ":::Thumbnail image has loaded ",
                deetContainer: this,
            },
        });
        // this.instance.addEventListener("imageLoaded_evt_evtStr", imageLoadedHandler);
        window.dispatchEvent(imgLoadEvent);
    }
}

// class SingleFileLoader extends createjs.LoadQueue {
//     constructor(singleLoaderConfig) {
//         super(singleLoaderConfig.prefersXHR);
//         this.prefersXHR = singleLoaderConfig.prefersXHR;
//         this.fullURL = singleLoaderConfig.fullURL;
//         this.thumbURL = singleLoaderConfig.thumbURL;
//         this.singleID = singleLoaderConfig.singleID;
//         this.loadedProgressContainerScope = singleLoaderConfig.loadedProgressContainerScope;
//         this.textX = singleLoaderConfig.textX;
//         this.textY = singleLoaderConfig.textY;
//         singleLoaderConfig.finalW === undefined || null
//             ? (this.finalW = singleLoaderConfig.finalW)
//             : (this.finalW = singleLoaderConfig.finalW = 0);
//         singleLoaderConfig.finalH === undefined || null
//             ? (this.finalH = singleLoaderConfig.finalH)
//             : (this.finalH = singleLoaderConfig.finalH = 0);
//         singleLoaderConfig.finalX === undefined || null ? (this.finalX = singleLoaderConfig.finalX) : (this.finalX = 0);
//         singleLoaderConfig.finalY === undefined || null ? (this.finalY = singleLoaderConfig.finalY) : (this.finalY = 0);

//         this._thumbnail = false;
//         var anInstanceContainer = new createjs.Container();
//         this.home = anInstanceContainer;

//         this.loadedProgressContainerScope.addChild(this.home);
//         this.loadedProgressContainerScope.addChild(this.home);
//         this.instance = this;
//         this.name = this.setName(this.singleID);
//         // this.bmp = null;

//         this.instance.on("fileload", this.handleFileLoad);
//         this.instance.on("progress", this.handleFileProgress);
//         this.instance.on("complete", this.loadComplete);
//         this.instance.on("error", this.loadError);

//         if (this.progressText === undefined || null) {
//             var anInstanceTextContainer = new createjs.Container();
//             this.textContainer = anInstanceTextContainer;
//             this.progressText = new createjs.Text("LOADING:0123456789%", "16px 'Press Start 2P'", "#FFCC00");
//             this.textContainer.x = this.textX;
//             this.textContainer.y = this.textY;
//             this.textContainer.addChild(this.progressText);
//             this.home.addChild(this.textContainer);
//         } else {
//             this.textContainer.visible = true;
//         }

//         this.progressText.text = "";

//         if (typeof singleLoaderConfig.manifestList === "string") {
//             // if (
//             //     singleLoaderConfig.manifestList === "" ||
//             //     singleLoaderConfig.manifestList === undefined ||
//             //     singleLoaderConfig.manifestList === null
//             // ) {
//             //     this._thumbnail = true;
//             //     this.manifestList = this.singleID;
//             // } else {
//             //     this._thumbnail = false;
//             //     this.manifestList = singleLoaderConfig.manifestList;
//             //     // console.log(
//             //     //     "○○○" + " this.manifestList :",
//             //     //     this.singleID || this.manifestList,
//             //     //     "○○○",
//             //     //     this.manifestList,
//             //     //     "○○○",
//             //     //     typeof this.manifestList,
//             //     //     "○○○",
//             //     //     this.progressText
//             //     // );
//             //     // var sList = new createjs.LoadQueue(true);
//             //     this.instance.loadFile(this.manifestList);
//             // }
//             this.manifestList = this.singleID;
//             // this.manifestList = singleLoaderConfig.manifestList;
//             // console.log(this.manifestList);
//             this.instance.loadFile(this.manifestList);
//         }
//     }
//     getInstance() {
//         return this.instance;
//     }
//     stuffRaw(param) {
//         this._raw = param;
//     }
//     getRaw() {
//         return this._raw;
//     }
//     handleFileLoad(event) {
//         console.log("::: handleFileLoad :::");
//         /*    if (event.result.naturalWidth > 0) {
//             this.getBMP();
//         } */
//     }
//     handleFileProgress(event) {
//         this.progressText.text = (Math.floor(this.instance.progress * 100) | 0) + " % Loaded";
//     }
//     loadComplete(event) {
//         /*
//             console.log(
//                 "::: LOAD COMPLETE :::",
//                 "this.manifestList,",
//                 this.manifestList,
//                 " this.singleID,",
//                 this.singleID,
//                 this.manifestList === this.singleID
//             );
//         */
//         var boundThang = this.continuedComplete.bind(this);

//         return;
//         this.bmp = new BMP(this.getRaw(), boundThang);
//         /*
//             if (this.manifestList === this.singleID) {
//             this.stuffRaw(event.target.getResult(event.target.singleID));
//             // this.setBMP(this.getRaw());

//             this.bmp = new BMP(this.getRaw(), boundThang);
//             // this.bmp = new createjs.Bitmap(this.getRaw());
//             // this.bmp.image.addEventListener("load", function () {
//             //     console.log("onload");
//             //     boundThang;
//             //     stage.update();
//             // });
//             // this.bmp.image.onload = function () {
//             //     console.log("onload");
//             //     boundThang;
//             //     stage.update();
//             // };
//         } */
//     }
//     getBMP() {
//         return this.bmp;
//     }
//     continuedComplete() {
//         console.log(" loaded •○•○•○•");

//         this.getTextContainer().visible = false;

//         var wBounds = parseInt(w - 64);
//         var hBounds = parseInt(h - 64);

//         var BMPContainer = new createjs.Container();

//         if (this._thumbnail === true) {
//             var fsBMP = this.getBMP();
//             // console.log(" thumb has loaded ", this.getID());
//             fsBMP = new createjs.Bitmap(this.getRaw());
//             var fsBMPimg = fsBMP.image;

//             BMPContainer.addChild(fsBMP);
//             BMPContainer.setBounds(0, 0, fsBMP.getBounds().width, fsBMP.getBounds().height);
//             BMPContainer.x = (w - fsBMP.getBounds().width) / 2;
//             BMPContainer.y = (h - fsBMP.getBounds().height) / 2;
//             subject_content.addChild(BMPContainer);

//             var cE = new CustomEvent("cardflip_evt_evtStr", {
//                 detail: {
//                     msg: ":::Thumbnail image has loaded ",
//                     deets: this.getID(),
//                     thumbBMP: fsBMP,
//                     deetContainer: this,
//                 },
//             });

//             window.dispatchEvent(cE);
//         } else {
//             console.log(" fullsize image has loaded ");
//             console.log(this.getRaw());
//             console.log(this.getID());

//             var fsBMP = new createjs.Bitmap(this.getRaw());
//             var fsBMPimg = fsBMP.image.naturalWidth;

//             var newDims = resizeToKnownDimensions(fsBMPimg.naturalWidth, fsBMPimg.naturalHeight, wBounds, hBounds);

//             // console.log(fsBMPimg.naturalWidth, newDims.scaleRatio, newDims);

//             BMPContainer.addChild(fsBMP);
//             BMPContainer.scaleX = newDims.scaleRatio;
//             BMPContainer.scaleY = newDims.scaleRatio;

//             BMPContainer.setBounds(
//                 0,
//                 0,
//                 fsBMP.getBounds().width * newDims.scaleRatio,
//                 fsBMP.getBounds().height * newDims.scaleRatio
//             );
//             BMPContainer.x = (w - fsBMP.getBounds().width) / 2;
//             BMPContainer.y = (h - fsBMP.getBounds().height) / 2;
//             subject_content.addChild(BMPContainer);

//             // window.dispatchEvent(
//             //     new CustomEvent("cardflip_evt_evtStr", {
//             //         detail: {
//             //             msg: ":::Fullsize image has loaded",
//             //         },
//             //     })
//             // );
//         }
//     }

//     setName(param) {
//         this.name = param;
//     }
//     getName() {
//         return this.name;
//     }
//     getContainer() {
//         return this.home;
//     }
//     getLoader() {
//         return this.instance;
//     }
//     loadError(evt) {
//         // text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
//         // text-shadow: 1px 1px 0px white, 0 0 0 blue, 0 0 0 blue;
//         console.log(
//             "%cError!",
//             "color: red; background: #661111; font-size: 2rem; padding:1rem; border:3px solid #cdcdcd; text-shadow: 2px 0px 0px white, 0px 2px 0px white, -2px 0px 0px white, 0px -2px 0px white; box-sizing: content-box; ",
//             evt.title,
//             evt.data.src + ": didn't load as expected"
//         );
//     }
//     getTextContainer() {
//         return this.textContainer;
//     }
//     getID() {
//         return this.singleID;
//     }
// }

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

    fileLoader.loadManifest({
        manifest: [
            {
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

function toggleHidden(e) {
    var sendTarget = this.target;
    var sendBMPURL = this.fullSize;
    var newBoundToComplete = {
        target: sendTarget,
        fsURL: sendBMPURL,
    };

    var completeBound = tweenComplete.bind(newBoundToComplete);

    createjs.Tween.get(this.target)

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
    var wBounds = parseInt(w - 64);
    var hBounds = parseInt(h - 64);
    isLastID(this.target);
    var BMPContainer = new createjs.Container();

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

    var fullSizeFileLoader = new SingleFileLoader(FSIMGConfig);
    subject_content.addChild(BMPContainer);
    var fsBMP = fullSizeFileLoader.getBMP();

    console.log(fsBMP);

    return fullSizeFileLoader;

    var fsBMP = new SkinnedIcon(this.fsURL, wBounds, hBounds);

    var newDims = resizeToKnownDimensions(fsBMP.getNaturalWidth(), fsBMP.getNaturalHeight(), wBounds, hBounds);

    fsBMP.getInstanceContainer().scaleX = newDims.scaleRatio;
    fsBMP.getInstanceContainer().scaleY = newDims.scaleRatio;
    BMPContainer.addChild(fsBMP.getInstanceContainer());
    BMPContainer.setBounds(0, 0, wBounds, hBounds);

    BMPContainer.x = (BMPContainer.getBounds().width - w) / 2;
    BMPContainer.y = (BMPContainer.getBounds().height - h) / 2;

    subject_content.addChild(BMPContainer);
}

function handle_OLD_MAP_LOAD(e) {
    console.log(":::handle_ImageLoadComplete:::");
    stage.snapToPixel = true;
    var renderUrl = e.target.getResult("renders").firstChild.attributes.url.value;
    var thumbsUrl = e.target.getResult("renders").firstChild.attributes.thumbnails.value;
    var smallList = e.target.getResult("renders").getElementsByTagName("image");
    var smallListArr = [];

    for (var i = 0; i < smallList.length; i++) {
        smallListArr.push(smallList[i].attributes.src.value);
        var thumbLoc =
            window.location.search +
            thumbsUrl +
            "/" +
            smallList[i].attributes.src.value.substring(0, smallList[i].attributes.src.value.lastIndexOf(".")) +
            "-t.png";

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
            fullURL: window.location.search + renderUrl + "/" + smallListArr[i], //singleLoaderConfig.fullURL
            thumbURL: thumbLoc, //singleLoaderConfig.thumbURL
        };

        var thisImgPayload = {
            fullURL: window.location.search + renderUrl + "/" + smallListArr[i],
            targetID: smallList[i].attributes.title.value,
            imgSrc: smallList[i].attributes.src.value,
            message: "this loaded: " + i + " █",
            thumbLoader: thumbnailConfig,
            thisThumbsUrl: thumbsUrl,
            thisThumbLoc: thumbLoc,
        };

        loadedSliders.push(thisImgPayload);
    }
    packLoadArray();
}

/* function handleThumbLoad(e) {
    console.log(":::handleThumbLoad:::");
    var wBounds = parseInt(w - 128);
    var hBounds = parseInt(h - 128);
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

    loadedContainer.addChild(loadedImg);

    loadedImg.x = (w - loadedContainer.getBounds().width) / 2;
    loadedImg.y = (h - loadedContainer.getBounds().height) / 2;

    var fsURL = this.fullURL;

    var boundBmp = toggleHidden.bind({ target: e.target.getBMP(), fullSize: fsURL });
    loadedImg.addEventListener("click", boundBmp);

    interactive_content.addChild(loadedImg);
}
 */

function popBMPs(bmp) {
    stage.addChild(bmp);
}

function packLoadArray() {
    console.log(":::packLoadArray:::");

    for (var i = 0; i < loadedSliders.length; i++) {
        // thumbLoader is now the "thumbnailConfig"-- but the singleFileLoader instance needs to be made.
        // var singleFileLoader;
        // singleFileLoader = new SingleFileLoader();
        // this.bmp = new BMP(this.getRaw(), boundThang);
        // console.log(
        //     "SRC: ",
        //     window.location.search +
        //         loadedSliders[i].thisThumbsUrl +
        //         "/" +
        //         loadedSliders[i].imgSrc.substring(0, loadedSliders[i].imgSrc.lastIndexOf(".")) +
        //         "-t.png"
        // );

        var thumbBMP;

        //cardflip_evt_evtStr
        // thumbBMP.addEventListener("imageLoaded_evt", imageLoadedHandler);
        thumbBMP = new BMP(
            window.location.search +
                loadedSliders[i].thisThumbsUrl +
                "/" +
                loadedSliders[i].imgSrc.substring(0, loadedSliders[i].imgSrc.lastIndexOf(".")) +
                "-t.png",
            null,
            null
        );
        // thumbBMP.addEventListener("click", function () {
        //     console.log("clicked on ", thumbBMP.getBMP());
        // });
        // loadedSliders[i].thumbLoader.loadFile({
        //     id: loadedSliders[i].targetID,
        //     crossOrigin: true,
        //     src:
        //         window.location.search +
        //         loadedSliders[i].thisThumbsUrl +
        //         "/" +
        //         loadedSliders[i].imgSrc.substring(0, loadedSliders[i].imgSrc.lastIndexOf(".")) +
        //         "-t.png",
        // });
    }
}
