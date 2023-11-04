

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
    // console.log("stage", context);
    // console.log("playGame", "loadAssets");

    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("complete", handle_THUMBNAIL_POPULATE);

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

function handle_THUMBNAIL_POPULATE(e) {
    console.log(":::handle_THUMBNAIL_POPULATE:::");
    var smallListArr = [];
    var renders = e.target.getResult("renders");
    var renderUrl = renders.firstChild.attributes.url.value;
    var thumbsUrl = renders.firstChild.attributes.thumbnails.value;
    title = renders.firstChild.attributes.title.value;
    var smallList = renders.getElementsByTagName("image");
    var thumbnailConfig = renders.getElementsByTagName("thumb_config")[0];
    var general_config = e.target.getResult("renders").getElementsByTagName("general_config")[0];
    generalPadding = parseInt(general_config.attributes.padding.value) * 0.67;
    thumbW = parseInt(thumbnailConfig.attributes.w.value);
    thumbH = parseInt(thumbnailConfig.attributes.h.value);
    var paddedTW = parseInt(thumbW + generalPadding);
    var paddedTH = parseInt(thumbH + generalPadding);
    var gridXCount = parseInt((w - generalPadding) / paddedTW);

    var bmpContainer = new createjs.Container();
    // var bmpContainerBG = new createjs.Shape();
    // bmpContainerBG.graphics
    //     .beginFill("rgba(0, 128, 255,.25)")
    //     .drawRect(
    //         0,
    //         0,
    //         paddedTW * gridXCount - generalPadding,
    //         parseInt(Math.ceil(smallList.length / gridXCount) * paddedTH - generalPadding * 1)
    //     )
    //     .endFill();
    // bmpContainer.addChild(bmpContainerBG);

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
            callbackFunc: populateFullSize,
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
    // console.log("::: hideFS ::: ", e.target, this);
    var completeBound = tweenComplete.bind(e.target);
    createjs.Tween.get(e.target).to({ alpha: 0, visible: false }, 135).call(completeBound);
}
function tweenComplete(e) {
    // console.log("::: tweenComplete ::: ", e, e.target, this);
    interactive_content.removeAllChildren();
}
function populateFullSize(e) {
    // full image src and title passed in as scope ("this")
    //   console.log("::: populateFullSize ::: ", e.target, this);
    var fsContainer = new createjs.Container();

    var targW = w - generalPadding * 2;
    var targH = h - generalPadding * 2;

    // var fsContainerBG = new createjs.Shape();
    // fsContainerBG.graphics.beginFill("rgba(128, 0, 255,.25)").drawRect(0, 0, targW, targH).endFill();
    // fsContainerBG.setBounds(0, 0, targW, targH);
    // fsContainer.addChild(fsContainerBG);

    tweenComplete(); //--hides any displayed fullsize

    interactive_content.addChild(fsContainer);
    var fsConfig = {
        src: this.fsURL,
        bmpContainer: fsContainer,
        destX: 0,
        destY: 0,
        tw: targW,
        th: targH,
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
