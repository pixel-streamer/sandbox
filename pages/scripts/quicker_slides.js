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

var lastY = 0,
    gridY = 0,
    gridX = 0,
    gridXCount = 0,
    gridYCount = 0,
    thumbW,
    thumbH,
    generalPadding = 0,
    title;

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

/*
class imgLoadEvent extends Event {
    constructor() {
        super();
    }
}
*/

/*
class MyEventTarget extends EventTarget {
    constructor(mySecret) {
        super();
        this._secret = mySecret;
    }

    get secret() {
        return this._secret;
    }
} 
*/

// class BMP extends createjs.Bitmap {
class BMP extends createjs.LoadQueue {
    constructor(src, bmpContainer, destX, destY, tw, th, callbackTrigger, callbackData, callbackFunc) {
        // THIS BMP LOADER IS DEFINITELY FOR ONLY A SINGLE IMAGE.
        super();
        // super(true);
        /* 
        from: 
        https://medium.com/@walpolea/loading-cors-enabled-images-with-createjs-e5308ad53f33
        var loadItem = new createjs.LoadItem().set({src:url, crossOrigin:"Anonymous"});
        */
        // super(true, null, true);
        this._loaded = false;
        this._w = tw;
        this._h = th;
        this._destX = destX;
        this._destY = destY;
        this._src = src;
        this._progress = 0;
        this.instance = this;
        this._imgNatW = 0;
        this._imgNatH = 0;
        this.isPopulatedLater = false;
        this.callbackTrigger = callbackTrigger;
        this.callbackData = callbackData;
        this.callbackFunc = callbackFunc;
        this.home = bmpContainer;
        this.home.visible = false;

        this.container = new createjs.Container();

        if (bmpContainer === undefined || null) {
            this.home = new createjs.Container();
        }
        if (bmpContainer === null) {
            this.home = new createjs.Container();
            this.isPopulatedLater = true; // user expects to populate item in UI after load process.
        }
        this.indicator = new createjs.Container();
        this.indicatorText = new createjs.Text("loading:", "8px Arial", "#ffcc00");
        // this.indicatorText.x = this._destX;
        // this.indicatorText.y = this._destY;
        this.indicator_bar = new createjs.Shape();
        this.indicator_bar.graphics;
        //  this.indicator_bar.graphics.beginStroke("#FF0000");
        //  this.indicator_bar.graphics.setStrokeStyle(2, "butt", "miter", 10, true);
        this.indicator_bar.graphics.beginFill("#450067");
        this.indicator_bar.graphics.drawRect(0, 0, this._w, 12);
        this.indicator.setBounds(0, 0, this._w, 12);
        this.indicator_bar.scaleX = 0;
        this.indicator.addChild(this.indicator_bar);
        this.container.addChild(this.indicator);
        this.container.addChild(this.indicatorText);

        this.loadFile(this._src);
        this._bmp = new createjs.Bitmap(this._src);
        /*    var thisBound = this.loadComplete.bind(this.getInstance(), this.getBMP());
this._bmp.image.addEventListener("load", thisBound); */

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
    // getInstance() {
    //     return this.instance;
    // }
    handleFileLoad(e) {
        this.home.visible = true;
        this.indicator.visible = true;
        // console.log(":::::handleFileLoad);
    }
    handleFileProgress(e) {
        // console.log(":::::handleFileProgress);
        // this.progressText.text = (Math.floor(this.instance.progress * 100) | 0) + " % Loaded";
        this._progress = Math.ceil(this.instance.progress * 100) | 0;
        this.indicatorText.text = this._progress + " % Loaded";
        // console.log(progress + " % Loaded");
    }
    loadComplete(param, e) {
        this._progress = Math.floor(this.instance.progress * 100) | 0;
        if (this._progress === 100) {
            //checks if draw (on display object VS event)
            if (param.constructor.prototype.draw == undefined) {
                //an event is present, and the BITMAP needs to be assigned.
                this._bmp = new createjs.Bitmap(this._src);
                this.checkIsPoppedLater();
            } else {
                this._bmp = param;
                this.checkIsPoppedLater();
            }
        }
        return this._bmp;
    }
    loadError(e) {
        console.log(":::::loadError");
    }
    checkIsPoppedLater() {
        if (this.isPopulatedLater === true) {
            var imgLoadEvent = new CustomEvent("imageLoaded_evt_evtStr", {
                detail: {
                    msg: ":::Thumbnail image has loaded ",
                    deetContainer: this,
                },
            });
            // this.instance.addEventListener("imageLoaded_evt_evtStr", imageLoadedHandler);
            window.dispatchEvent(imgLoadEvent);
        } else {
            this.popBMP();
        }
    }
    // loadBMP() {
    //     this.instance = new createjs.Bitmap(this._src);
    // }
    popBMP() {
        if (this._progress === 100) {
            this._loaded = true;
            //hide indicator:
            this.indicator.visible = false;
            this.indicator_bar.visible = false;
        }

        // console.log("◘◘◘ BMP ○•○•○•○•◘◘◘ loaded ", this._src, this._bmp);
        this.containerShape = new createjs.Shape();
        this.container.addChild(this.containerShape);
        // this.containerShape.graphics
        //     .beginBitmapFill(this.getBMP())
        //     // .drawRect(0, 0, this.getBMP().getBounds().width, this.getBMP().getBounds().height)
        //     .drawRect(0, 0, this._w, this._h)
        //     ;

        var charlie = this.getBMP().image;
        this._imgNatW = charlie.naturalWidth;
        this._imgNatH = charlie.naturalHeight;

        var figuredScale = resizeToKnownDimensions(this._imgNatW, this._imgNatH, this._w, this._h);

        this.containerShape.graphics
            // .beginBitmapFill(charlie, "no-repeat")
            .beginBitmapFill(charlie)
            .drawRect(0, 0, this._imgNatW, this._imgNatH)
            .endFill();

        this.containerShape.setBounds(
            0,
            0,
            parseInt(this._imgNatW * figuredScale.scaleRatio),
            parseInt(this._imgNatH * figuredScale.scaleRatio)
        );

        this.container.setBounds(
            0,
            0,
            parseInt(this._imgNatW * figuredScale.scaleRatio),
            parseInt(this._imgNatH * figuredScale.scaleRatio)
        );
        this.containerShape.scaleX = figuredScale.scaleRatio;
        this.containerShape.scaleY = figuredScale.scaleRatio;

        // this.container.x = (this.home.getBounds().width - this.container.getBounds().width) / 2;
        // this.container.y = (this.home.getBounds().height - this.container.getBounds().height) / 2;

        this.container.x = 0;
        this.container.y = 0;

        // console.log(this.home.getBounds().width, this.home.getBounds().height);
        // console.log(this.home.getBounds().width, this.home.getBounds().height);

        this.home.addChild(this.container);
        var boundObj = this.callbackData;
        var callbackFunc = this.callbackFunc;
        var binded = callbackFunc.bind(boundObj);
        this.home.x = this._destX;
        this.home.y = this._destY;
        this.home.addEventListener(this.callbackTrigger, binded);
        this.home.filters = [new createjs.ColorFilter(0, 0, 0, 1, "r(255), r(0), r(255), 1")];

        var newBoundToComplete = {
            target: this.home,
            fsURL: boundObj,
        };

        var completeBound = tweenComplete.bind(newBoundToComplete);

        createjs.Tween.get(this.home).to({ alpha: 100, visible: true }, 135).call(completeBound);
    }
}

function showFullSize(e, param) {
    //called from BMP, with args payload of fullsize img src

    var fsBoundsW = w - thumbW;
    var fsBoundsH = h - thumbH;

    var FSDisplayContainer = new createjs.Container();
    var FSDisplay = new createjs.Container();
    var FSDisplayShape = new createjs.Shape();
    FSDisplayShape.graphics.beginFill("rgba(69, 0, 103,.25)").drawRect(0, 0, fsBoundsW, fsBoundsH).endFill();
    FSDisplayShape.setBounds(0, 0, fsBoundsW, fsBoundsH);
    FSDisplayContainer.setBounds(0, 0, fsBoundsW, fsBoundsH);
    FSDisplay.setBounds(0, 0, fsBoundsW, fsBoundsH);
    FSDisplay.addChild(FSDisplayShape);
    FSDisplayContainer.addChild(FSDisplay);
    FSDisplayContainer.x = (w - FSDisplay.getBounds().width) / 2;
    FSDisplayContainer.y = (h - FSDisplay.getBounds().height) / 2;
    interactive_content.addChild(FSDisplay);

    var fsBMPConfig = {
        fsURL: this.fullSizeImage,
        fsDestinationContainer: FSDisplay,
        fsDestinationX: (w - FSDisplay.getBounds().width) / 2,
        fsDestinationY: (h - FSDisplay.getBounds().height) / 2,
        fsDestinationW: fsBoundsW,
        fsDestinationH: fsBoundsH,
        fsInteractionType: "click",
        fsInteractionContainer: FSDisplayContainer,
        fsHandler: hideFullSize,
    };
    var fsBMP = new BMP(
        fsBMPConfig.fsURL,
        fsBMPConfig.fsDestinationContainer,
        fsBMPConfig.fsDestinationX,
        fsBMPConfig.fsDestinationY,
        fsBMPConfig.fsDestinationW,
        fsBMPConfig.fsDestinationH,
        fsBMPConfig.fsInteractionType,
        fsBMPConfig.fsInteractionContainer,
        fsBMPConfig.fsHandler
    );
}

function hideFullSize(e, param) {
    console.log("e", e, "param", param, "this", this);
    // e.currentTarget.visible = false;
    e.currentTarget.removeAllChildren();
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
    // console.log(this);
    //  createjs.Tween.get(this.target).to({ alpha: 0, visible: false }, 135).call(tweenComplete);
}

function handle_OLD_MAP_LOAD(e) {
    console.log(":::handle_ImageLoadComplete:::");
    stage.snapToPixel = true;
    var renders = e.target.getResult("renders");
    var renderUrl = renders.firstChild.attributes.url.value;
    var thumbsUrl = renders.firstChild.attributes.thumbnails.value;
    title = renders.firstChild.attributes.title.value;
    var smallList = renders.getElementsByTagName("image");
    var thumbnailConfig = renders.getElementsByTagName("thumb_config")[0];
    var general_config = e.target.getResult("renders").getElementsByTagName("general_config")[0];
    generalPadding = parseInt(general_config.attributes.padding.value);

    thumbW = parseInt(thumbnailConfig.attributes.w.value);
    thumbH = parseInt(thumbnailConfig.attributes.h.value);

    var smallListArr = [];

    for (var i = 0; i < smallList.length; i++) {
        smallListArr.push(smallList[i].attributes.src.value);

        // var thumbLoc =
        //     window.location.search +
        //     thumbsUrl +
        //     "/" +
        //     smallList[i].attributes.src.value.substring(0, smallList[i].attributes.src.value.lastIndexOf(".")) +
        //     "-t.png";
        var thumbLoc = window.location.search + thumbsUrl + "/" + smallList[i].attributes.thumbsrc.value;

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

function packLoadArray() {
    console.log(":::packLoadArray:::", loadedSliders.length);

    var titleContainer = new createjs.Container();
    var titleText = new createjs.Text(title, "72px Arial", "#00CCFF");
    titleContainer.addChild(titleText);
    var thumbsGalleryContainer = new createjs.Container();

    for (var i = 0; i < loadedSliders.length; i++) {
        /*
        // thumbLoader is now the "thumbnailConfig"-- but the singleFileLoader instance needs to be made.
        var singleFileLoader;
        singleFileLoader = new SingleFileLoader();
        this.bmp = new BMP(this.getRaw(), boundThang);
        console.log(
            "SRC: ",
            window.location.search +
                loadedSliders[i].thisThumbsUrl +
                "/" +
                loadedSliders[i].imgSrc.substring(0, loadedSliders[i].imgSrc.lastIndexOf(".")) +
                "-t.png"
        ); 
        */

        gridXCount = parseInt((w - (thumbW + generalPadding * 4)) / thumbW);

        var thumbBMP, thumbBMPContainer, thumbBMPStandin, thumbBMPStandinShape;
        thumbBMPContainer = new createjs.Container();
        thumbBMP = new createjs.Container();
        thumbBMPStandin = new createjs.Container();
        thumbBMPStandinShape = new createjs.Shape();
        thumbBMPStandinShape.graphics.beginFill("rgba(0,0,0,.25)").drawRect(0, 0, thumbW, thumbH);
        thumbBMPStandin.setBounds(0, 0, thumbW, thumbH);
        thumbBMPStandinShape.setBounds(0, 0, thumbW, thumbH);
        thumbBMP.setBounds(0, 0, thumbW, thumbH);
        thumbBMPStandin.addChild(thumbBMPStandinShape);
        thumbBMP.addChild(thumbBMPStandin);

        // TODO: can't do anymore -- missing two thumbnails!

        thumbBMPContainer.addChild(thumbBMP);
        thumbsGalleryContainer.addChild(thumbBMPContainer);
        thumbBMP.x = (i % gridXCount) * (thumbW + generalPadding * 0.67);

        if (gridX > gridXCount - 1) {
            gridX = 1;
            gridYCount += thumbH + generalPadding * 0.67;
        } else {
            gridX++;
        }
        thumbBMP.y = gridYCount + generalPadding;

        var boundObj = { fullSizeImage: loadedSliders[i].fullURL, ID: loadedSliders[i].targetID };
        var boundFunc = showFullSize.bind(boundObj);
        // need to make slider objects at this Point  , and start with the rectangles that represent the thumbnails

        var thmBMPConfig = {
            thmURL:
                window.location.search +
                loadedSliders[i].thisThumbsUrl +
                "/" +
                loadedSliders[i].imgSrc.substring(0, loadedSliders[i].imgSrc.lastIndexOf(".")) +
                "-t.png",
            thmDestinationContainer: thumbBMP,
            thmDestinationX: (i % gridXCount) * (thumbW + generalPadding * 0.67),
            thmDestinationY: gridYCount + generalPadding,
            thmDestinationW: thumbW,
            thmDestinationH: thumbH,
            thmInteractionType: "click",
            thmInteractionContainer: boundObj,
            thmHandler: boundFunc,
        };

        var thumbBMP = new BMP(
            thmBMPConfig.thmURL,
            thmBMPConfig.thmDestinationContainer,
            thmBMPConfig.thmDestinationX,
            thmBMPConfig.thmDestinationY,
            thmBMPConfig.thmDestinationW,
            thmBMPConfig.thmDestinationH,
            thmBMPConfig.thmInteractionType,
            thmBMPConfig.thmInteractionContainer,
            thmBMPConfig.thmHandler
        );

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
    thumbsGalleryContainer.setBounds(0, 0, w - thumbW, h - thumbH);
    thumbsGalleryContainer.x = (w - thumbsGalleryContainer.getBounds().width) / 2;
    thumbsGalleryContainer.y = (h - thumbsGalleryContainer.getBounds().height) / 2;
    thumbsGalleryContainer.y += 65 + generalPadding;

    titleContainer.setBounds(0, 0, titleText.getMetrics().width, titleText.getMetrics().height);
    titleContainer.x = (w - titleContainer.getBounds().width) / 2;
    titleContainer.y = generalPadding;
    interactive_content.addChild(titleContainer);

    interactive_content.addChild(thumbsGalleryContainer);
}
