const cardflip_evt = new CustomEvent("cardflip_evt_evtStr", {
    detail: { msg: ":::flip card" },
});
window.addEventListener("cardflip_evt_evtStr", cardEventHandler);
function cardEventHandler(e) {
    console.log("cardflip_evt was dispatched.... ", e.detail);
}

window.addEventListener("imageLoaded_evt_evtStr", imageLoadedHandler);
function imageLoadedHandler(e) {
    console.log("::: ◄►imageLoaded_evt_evtStr :::", e.detail);
}

var lastY = 0,
    gridY = 0,
    gridX = 0,
    gridXCount = 0,
    gridYCount = 0,
    thumbW,
    thumbH,
    generalPadding = 0,
    title;

// class BMP extends createjs.Bitmap {
class BMP extends createjs.LoadQueue {
    constructor(src, bmpContainer, destX, destY, tw, th, callbackTrigger, callbackData, callbackFunc) {
        // THIS BMP LOADER IS DEFINITELY FOR ONLY A SINGLE IMAGE.
        super(true);
        this._w = tw;
        this._h = th;
        this._destX = destX;
        this._destY = destY;
        this._src = src;
        this._progress = 0;
        this.instance = this;
        this._loadedIMG = null;
        this._imgNatW = 0;
        this._imgNatH = 0;
        this.isPopulatedLater = false;
        this.callbackTrigger = callbackTrigger;
        this.callbackData = callbackData;
        this.callbackFunc = callbackFunc;
        this.home = bmpContainer;
        this.loaderContainer = new createjs.Container();
        this.container = new createjs.Container();
        this.indicator = new createjs.Container();
        this.indicator_bar = new createjs.Shape();
        // this.indicatorText = new createjs.Text("loading:", "8px Arial", "#ffcc00");
        this.indicator.addChild(this.indicator_bar);
        this.container.addChild(this.indicator);
        this.loaderContainer.addChild(this.container);
        this.home.addChild(this.loaderContainer);
        // this.home.addChild(this.indicatorText);
        this.indicator_bar.graphics.beginFill("#450067").drawRect(0, 0, this._w, 6);
        this.indicator.setBounds(0, 0, this._w, 6);
        this.indicator_bar.scaleX = 0;
        this.loadFile(this._src);
        // this._bmp = new createjs.Bitmap(this._src);
        this.instance.on("fileload", this.handleFileLoad);
        this.instance.on("progress", this.handleFileProgress);
        this.instance.on("complete", this.loadComplete);
        this.instance.on("error", this.loadError);
        var boundObj = this.callbackData;
        var callbackFunc = this.callbackFunc;
        var binded = callbackFunc.bind(boundObj);
        this.container.addEventListener(this.callbackTrigger, binded);
    }
    getBMP() {
        return this._bmp;
    }
    handleFileLoad(e) {
        // console.log(this._src.substring(this._src.lastIndexOf("/") + 1));
    }
    handleFileProgress(e) {
        this._progress = (this.instance.progress * 100) | 0;
        // console.log("\thandleFileProgress", this._progress + " % Loaded");
        this.indicator_bar.scaleX = this.instance.progress;
        // console.log(" this._progress", this._progress);
        // this.indicatorText.text = this._progress + " % Loaded";
        stage.update();
    }
    loadComplete(e) {
        // console.log("\t☺ loadComplete", this._progress + " % Loaded");
        this._progress = (this.instance.progress * 100) | 0;
        this.indicator.visible = false;
        this.popBMP();
    }
    loadError(e) {
        console.log(":::::loadError");
    }
    popBMP() {
        // console.log(":::::popBMP", this._src);
        this._loadedIMG = this.getResult(this._src);
        this._imgNatW = this._loadedIMG.naturalWidth;
        this._imgNatH = this._loadedIMG.naturalHeight;
        var smaller = resizeToKnownDimensions(this._imgNatW, this._imgNatH, this._w, this._h);
        // console.log(this._imgNatW, this._imgNatH);
        this._bmp = new createjs.Bitmap(this._loadedIMG);
        // console.log(this._imgNatW, this._imgNatH);
        // console.log(this._imgNatW * smaller.scaleRatio + "," + this._imgNatH * smaller.scaleRatio);

        this.container.addChild(this._bmp);
        // this.container.x = (this.loaderContainer.getBounds().width - this.container.getBounds().width) / 2;
        // this.container.y =
        //     (this.loaderContainer.getBounds().height - this.container.getBounds().height) / 2;

        this.loaderContainer.scaleX = smaller.scaleRatio;
        this.loaderContainer.scaleY = smaller.scaleRatio;
        this.home.addChild(this.loaderContainer);
        this.loaderContainer.x = this._destX;
        this.loaderContainer.y = this._destY;

        // console.log(this._destX, this._destY);
        this.home.x = (w - this.home.getBounds().width) / 2;
        this.home.y = (h - this.home.getBounds().height) / 2;
        // this.home.x = (this._w - this.home.getBounds().width) / 2;
        // this.home.y = (this._h - this.home.getBounds().height) / 2;
    }
}

/*
     ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     */
var big_map;
var big_mapIsLoaded = false;
var fileLoader;
var loadedSliders = [];
// var cCanvas=document.querySelector("#testCanvas canvas")

function playGame() {
    loadAssets();
}

function loadAssets() {
    var context = stage.canvas.getContext("2d");

    context.imageSmoothingEnabled = context.webkitImageSmoothingEnabled = context.mozImageSmoothingEnabled = true;
    // stage.snapToPixel = true;
    console.log("stage", context);
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

function handle_OLD_MAP_LOAD(e) {
    console.log(":::handle_OLD_MAP_LOAD:::");
    var smallListArr = [];
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
    var paddedTW = parseInt(thumbW + generalPadding);
    var paddedTH = parseInt(thumbH + generalPadding);
    var gridXCount = parseInt((w - generalPadding) / paddedTW);

    var bmpContainer = new createjs.Container();
    var bmpContainerBG = new createjs.Shape();

    bmpContainerBG.graphics
        .beginFill("rgba(0, 128, 255,.25)")
        .drawRect(
            0,
            0,
            paddedTW * gridXCount - generalPadding,
            parseInt(Math.ceil(smallList.length / gridXCount) * paddedTH - generalPadding * 1)
        )
        .endFill();
    bmpContainer.addChild(bmpContainerBG);

    for (var i = 0; i < smallList.length; i++) {
        var bmpConfig = {
            src: window.location.search + thumbsUrl + "/" + smallList[i].attributes.thumbsrc.value,
            bmpContainer: bmpContainer,
            destX: (i % gridXCount) * paddedTW,
            destY: gridY * paddedTH,
            tw: thumbW,
            th: thumbH,
            callbackTrigger: "click",
            callbackData: {
                fsURL: window.location.search + renderUrl + "/" + smallList[i].attributes.src.value,
                fsTitle: smallList[i].attributes.title.value,
            },
            callbackFunc: report,
        };
        new BMP(
            bmpConfig.src,
            bmpConfig.bmpContainer,
            bmpConfig.destX,
            bmpConfig.destY,
            bmpConfig.tw,
            bmpConfig.th,
            bmpConfig.callbackTrigger,
            bmpConfig.callbackData,
            bmpConfig.callbackFunc
        );
        gridX += 1;
        if (gridX > gridXCount - 1) {
            gridY += 1;
            gridX = 0;
        }
    }
    subject_content.addChild(bmpContainer);
}

function hideFS(e) {
    console.log("::: hideFS ::: ", e.target, this);
    interactive_content.removeAllChildren();
}
function report(e) {
    // full image src and title passed in as scope ("this")
    //  console.log("::: report ::: ", e.target, this);
    var fsContainer = new createjs.Container();
    interactive_content.addChild(fsContainer);
    var fsConfig = {
        src: this.fsURL,
        bmpContainer: fsContainer,
        destX: 0,
        destY: 0,
        tw: w - generalPadding * 2,
        th: h - generalPadding * 2,
        callbackTrigger: "click",
        callbackData: this.fsTitle,
        callbackFunc: hideFS,
    };

    var fsDisplay = new BMP(
        fsConfig.src,
        fsConfig.bmpContainer,
        fsConfig.destX,
        fsConfig.destY,
        fsConfig.tw,
        fsConfig.th,
        fsConfig.callbackTrigger,
        fsConfig.callbackData,
        fsConfig.callbackFunc
    );
}
