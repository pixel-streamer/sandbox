window.addEventListener("load", loadGoogleFonts);
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
// import { loadGoogleFonts }
// import "font-loading_module.js";

var fontsHaveLoaded = false;
var importantVideo;

function loadFonts(config) {
    var loader = new createjs.FontLoader(config, true);
    loader.on("complete", handleFontLoad);
    loader.load();
}

const fontload_evt = new CustomEvent("fontload_evtStr", {
    detail: { msg: ":::fontloaded, now setup stage" },
});

function handleFontLoad(e) {
    //console.log("handleFontLoad and detail", e.detail);
    fontsHaveLoaded = true;
    window.dispatchEvent(fontload_evt);
}
//window.addEventListener("load", init); //called now from under font loaded event.
window.addEventListener("fontload_evtStr", setupStage);
//fonts are now loaded, so start putting things onto the stage.

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

var stage;
var stageBounds;
var nofullhover;
function setupStage(e) {
    //nofullhover = window.matchMedia("(hover:none), (hover:on-demand)").matches;

    bigCanvas.setAttribute("width", w);
    bigCanvas.setAttribute("height", h);
    stage = bigCanvas;
    stage = new createjs.Stage("big_stage");
    var bigFill = new createjs.Shape();
    bigFill.graphics.beginFill("#0000FF");
    bigFill.graphics.drawRect(0, 0, w, h);
    bigFill.name = "stage_main";
    stage.addChild(bigFill);
    stage.setBounds(0, 0, w, h);
    stageBounds = stage.getBounds();
    console.log("▌▌▌▌▌▀▀▀▀▌▌▌▌▌▌▌▌:::::::stageBounds::: ", stageBounds);

    background_content = new createjs.Container();
    var anotherBigFill = new createjs.Shape();
    anotherBigFill.graphics.beginFill("#0000FF").drawRect(0, 0, w, h);
    background_content.addChild(anotherBigFill);
    background_content.regX = 0;
    background_content.regY = 0;
    background_content.name = "background_content";

    image_content = new createjs.Container();
    image_content.name = "image_content";

    subject_content = new createjs.Container();
    subject_content.name = "subject_content";

    stage.addChild(background_content);
    stage.addChild(image_content);
    stage.addChild(subject_content);
    stage.update();
    ticker = createjs.Ticker;

    // ticker.timingMode = createjs.Ticker.RAF;
    // these are equivalent, 1000ms / 40fps (framerate) = 25ms (interval)
    // ticker.interval = 25;
    ticker.timingMode = ticker.RAF_SYNCHED;
    // createjs.Ticker.timingMode = createjs.Ticker.RAF;
    // ticker.framerate = 30;
    // ticker.delta=4;
    ticker.addEventListener("tick", tick);

    init();
    makeSomeText();
}

function tick(event) {
    //var deltaS = event.delta / 1000;
    //var position = <clip>.x + 15 * deltaS;
    //var moverW = <clip>.getBounds().width * <clip>.scaleX;
    //<clip>.x = position >= w + moverW ? -moverW : position;
    stage.update(event);
}
var ticker;

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
let resizeObserver;
let delay = 250;
let timeout;

/*
ResizeObserver.disconnect()
    Unobserves all observed Element targets of a particular observer.
ResizeObserver.observe()
    Initiates the observing of a specified Element.
ResizeObserver.unobserve()
    Ends the observing of a specified Element.
*/
resizeObserver = new ResizeObserver((entries) => {});
resizeObserver.observe(document.querySelector("#testCanvas"));
window.addEventListener("resize", function () {
    clearTimeout(timeout);
    timeout = setTimeout(handle_Redraw, delay);
    return;
});

function handle_Redraw() {
    console.log(
        "▄▄▄▄▄▄▄▄▄handle_Redraw▄▄▄▄▄▄▄▄",
        "find a way to add something to all corners of the stage, and re-dim that sucker"
    );
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

var fileLoader, videoLoader;
var bigArea = document.querySelector("#testCanvas");
var subject_content;
var image_content;
var background_content;
var w = parseInt(getComputedStyle(bigArea).width);
var h = parseInt(getComputedStyle(bigArea).height);
var bigCanvas = document.querySelector(".full_size_canvas");
var imageCount = 0;
var yCount = 0;
var x;
var y;
var generalPadding = 16;
let progress = document.querySelector("#progress");
let gallery = document.querySelector("#gallery");
var largeText = 0;

function init() {
    console.log("▄▄▄▄▄▄▄▄▄init▄▄▄▄▄▄▄▄");
    x = 0;
    y = 0;

    var queue = new createjs.LoadQueue(false);
    queue.on("fileload", handle_fileComplete);
    queue.on("progress", handle_progress);
    queue.on("complete", handle_preloadComplete);
    queue.loadFile("testing_numbers/testing.xml");
    fileLoader = new createjs.LoadQueue(false);
    videoLoader = new createjs.LoadQueue(false);
}

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ PRELOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

function handle_progress(e) {
    //console.log(Math.floor(parseFloat(e.progress * 100).toPrecision(2)));
}

function handle_preloadComplete(e) {
    //console.log(":::final func after loading xml. handle_preloadComplete:::");
}

function handle_fileComplete(e) {
    //console.log("whoohoo xml loaded ", e);
    var basePath = e.result.querySelector("base_path").getAttribute("url");
    var green_colored = e.result
        .querySelector("green_colored")
        .getAttribute("url");
    var greens_extension = e.result
        .querySelector("green_colored")
        .getAttribute("extensions");
    var peach_colored = e.result
        .querySelector("peach_colored")
        .getAttribute("url");
    var peachs_extension = e.result
        .querySelector("peach_colored")
        .getAttribute("extensions");
    var imagesNodeList = e.result.querySelectorAll("image");

    //fileLoader = new createjs.LoadQueue(false);
    fileLoader.on("fileload", handle_ImageLoadReady);
    fileLoader.on("progress", handle_ImageLoadProgress);
    fileLoader.on("complete", handle_ImageLoadComplete);

    videoLoader.on("fileload", handle_ImageLoadReady);
    videoLoader.on("progress", handle_ImageLoadProgress);
    videoLoader.on("complete", handle_ImageLoadComplete);

    imagesNodeList.forEach(function (member) {
        var extension_trim = member.getAttribute("src");
        extension_trim = extension_trim.substring(
            0,
            extension_trim.lastIndexOf(".")
        );

        fileLoader.loadFile(
            basePath +
                "/" +
                peach_colored +
                "/" +
                extension_trim +
                peachs_extension
        );
        fileLoader.loadFile(
            basePath +
                "/" +
                green_colored +
                "/" +
                extension_trim +
                greens_extension
        );
    });

    fileLoader.loadFile({
        src: "../images/ui_vectors/work_selections-copy.svg",
        //src: "../images/ui_vectors/playhead-buttons-copy.svg",
        //src: "../images/ui_vectors/rec.svg",
        id: "playhead",
        type: createjs.Types.IMAGE,
    });

    videoLoader.loadFile({
        src: "../video/error_page/woody-disappointed_copy.mp4",
        // src: "https://voolatech.github.io/banner/vpaid/videos/video.mp4",
        id: "disappointed",
        type: createjs.Types.VIDEO,
    });
}

var galleryImageLinks = [
    "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/haphalloween.jpg",
    "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/animations/snuff.gif",
    "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/bottle.jpg",
    "https://pixel-streamer.github.io/sandbox/pages/images/thumbs/coke-bottle-render-t.png",
    "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/coke-bottle-render.png",
];

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF PRELOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
function handle_ImageLoadReady(e) {
    //console.log(":::::▄█ handle_ImageLoadReady █▄", e.item.type);

    var src = e.item.src;
    var extension_trim = src.substring(src.lastIndexOf("/") + 1);
    var extension = extension_trim.substring(
        extension_trim.lastIndexOf(".") + 1
    );

    switch (extension) {
        case "svg":
            addSVG(e);
            break;
        case "mp4":
            handleLoadedMovie(e);
            break;
        default:
            layoutImage(e);
            break;
    }
}
function handle_ImageLoadProgress(e) {
    // //console.log(Math.floor(parseFloat(e.progress * 100).toPrecision(2)));
}

function handle_ImageLoadComplete(e) {
    //console.log(":::handle_ImageLoadComplete:::", e);
    //addErrorVideo();
}

function getGoldenRatio(num) {
    /*
    sin(54°) = φ/2

    Golden ratio formula is ϕ = 1 + (1/ϕ). ϕ is also equal to 2 × sin (54°)
    If we take any two successive Fibonacci Numbers, their ratio is very close
    to the value 1.618 (Golden ratio).  cos(36°)*2
    From en.wikipedia.org/wiki/Golden_ratio#Alternative_forms :
    "These correspond to the fact that the length of the diagonal of a regular
    pentagon is φ times the length of its side" 
    */
    return parseFloat(num / 1.618).toPrecision(3);
}

function makeSomeText() {
    //console.log(":::makeSomeText:::");
    largeText = getGoldenRatio(w) * 0.075;
    console.log(":::getGoldenRatio:::", getGoldenRatio(largeText));
    var text = new createjs.Text(
        "WHO IS THIS GUY?",
        "italic " + largeText + "px 'Bungee'",
        "#ff8A00"
    );
    var textSmaller = new createjs.Text(
        "(click on a section to see my work)",
        "800 italic " +
            getGoldenRatio(largeText) * 0.67 +
            "px 'Barlow Semi Condensed'",
        "#ff8A00"
    );
    //console.log(":::text:::", text);
    // subject_content.addChild(text);
    stage.addChild(text);
    var textMetrics = text.getMetrics();
    var textW = textMetrics.width;
    var textH = textMetrics.height;

    text.x = (stageBounds.width - textW) / 2;
    text.y = 85;

    // subject_content.addChild(textSmaller);
    stage.addChild(textSmaller);
    var textSmallerMetrics = textSmaller.getMetrics();
    var textSmallerW = textSmallerMetrics.width;
    var textSmallerH = textSmallerMetrics.height;

    textSmaller.x = (stageBounds.width - textSmallerW) / 2;
    textSmaller.y = text.y + (textH - textH / 3) + generalPadding;

    addInteractiveText();
    stage.update();
}

function addSVG(e) {
    var svg = fileLoader.getResult("playhead");
    var bg = new createjs.Bitmap(svg);
    var bgDims = bg.getTransformedBounds();
    bg.x = (stageBounds.width - bgDims.width) / 2;
    bg.y = (stageBounds.height - bgDims.height) / 2;
    subject_content.addChild(bg);
    stage.update();
}

var galleryConfig = {};
galleryConfig.thumbnailW = 85;
galleryConfig.thumbnailH = 64;

function layoutImage(e) {
    var bg = new createjs.Bitmap(e.result);
    bg.scaleX = galleryConfig.thumbnailW / e.result.width;
    bg.scaleY = galleryConfig.thumbnailH / e.result.height;
    //add the images to the content
    image_content.addChild(bg);
    var subjBounds = image_content.getBounds();
    image_content.x = (stageBounds.width - subjBounds.width) / 2;
    image_content.y = (stageBounds.height - subjBounds.height) / 2;

    var xWidth = parseInt(imageCount * galleryConfig.thumbnailW);

    if (xWidth >= parseInt(w - galleryConfig.thumbnailW)) {
        yCount = parseInt(yCount + 1);
        imageCount = 0;
    }

    xWidth = parseInt(imageCount * galleryConfig.thumbnailW);
    x = xWidth;
    y = parseInt(yCount * galleryConfig.thumbnailH);

    bg.x = x;
    bg.y = y;

    imageCount++;
    stage.update();
}

function handleLoadedMovie(e) {
    // console.log("▄▀▌▀▌▄:::handleLoadedMovie:::▄▀▌▀▌▄", e);
    // console.log(
    //     "▄▀▌▀▌▄:::handleLoadedMovie:::▄▀▌▀▌▄",
    //     e.target.getResult("disappointed")
    // );
    // console.log(
    //     "▄▀▌▀▌▄:::handleLoadedMovie:::▄▀▌▀▌▄",
    //     e.target.getResult("disappointed").src
    // );

    //  let video = document.createElement("video");
    importantVideo = e.target.getResult("disappointed");

    let vWidth = importantVideo.videoWidth;
    let vHeight = importantVideo.videoHeight;
    importantVideo.setAttribute("preload", "metadata");
    importantVideo.setAttribute("autoplay", "");
    importantVideo.setAttribute("muted", "");
    importantVideo.setAttribute("loop", "");
    importantVideo.setAttribute("playsinline", "");

    var newDims = resizeToKnownDimensions(vWidth, vHeight, w, h);

    addVideoToStage({
        w: newDims.newW,
        h: newDims.newH,
        vid: importantVideo,
        scaledToWindow: newDims.scaleRatio,
    });

    // importantVideo.addEventListener(
    //     "loadedmetadata",
    //     new Promise((resolve) => {
    //         // retrieve dimensions
    //         //using "this" to refer to the video height was another request!
    //         let vWidth = importantVideo.videoWidth;
    //         let vHeight = importantVideo.videoHeight;
    //         importantVideo.setAttribute("preload", "metadata");
    //         importantVideo.setAttribute("autoplay", "");
    //         importantVideo.setAttribute("muted", "");
    //         importantVideo.setAttribute("loop", "");
    //         importantVideo.setAttribute("playsinline", "");
    //         var newDims = resizeToKnownDimensions(vWidth, vHeight, w, h);
    //         console.log(newDims);
    //         return resolve(
    //             addVideoToStage({
    //                 w: newDims.newW,
    //                 h: newDims.newH,
    //                 vid: importantVideo,
    //                 scaledToWindow: newDims.scaleRatio,
    //             })
    //         );
    //     }, false)
    // );
}

function addInteractiveText() {
    var interactiveTextHitArea = new createjs.Container();
    var interactiveTextMask = new createjs.Shape();
    var videoPlayText = new createjs.Text(
        "play the f-in video, Chrome",
        "16px 'Press Start 2P'",
        "#ff8A00"
    );
    var textMetrics = videoPlayText.getMetrics();
    var textW = textMetrics.width;
    var textH = textMetrics.height;
    videoPlayText.x = 8;
    videoPlayText.y = 8;

    interactiveTextMask.graphics
        // .beginFill("#FF00FF")
        .beginFill("rgba(255,0,255,.3)")
        .drawRect(0, 0, textW + 16, textH + 16)
        .endFill();

    interactiveTextHitArea.regX = 0;
    interactiveTextHitArea.regY = 0;
    interactiveTextHitArea.addChild(videoPlayText);
    interactiveTextHitArea.addChild(interactiveTextMask);

    interactiveTextHitArea.x =
        (stageBounds.width - interactiveTextHitArea.getBounds().width) / 2;
    interactiveTextHitArea.y =
        (stageBounds.height - interactiveTextHitArea.getBounds().height) / 2;
    interactiveTextHitArea.addEventListener("click", function () {
        handle_VideoControls();
        handle_SoundControls("pop");
    });
    handle_SoundsRegistry();

    subject_content.addChild(interactiveTextHitArea);
}

function addVideoToStage(newVideoProps) {
    var videoContentContainer = new createjs.Container();
    var bmp = new createjs.Bitmap(newVideoProps.vid);
    // bmp.setBounds(0, 0, newVideoProps.w, newVideoProps.h);
    bmp.scaleX = newVideoProps.scaledToWindow;
    bmp.scaleY = newVideoProps.scaledToWindow;
    bmp.setBounds(0, 0, newVideoProps.w, newVideoProps.h);
    console.log("☻☺◙Ö:::bmp::♪◙☺☻", bmp.getBounds().width);
    videoContentContainer.addChild(bmp);
    background_content.addChild(videoContentContainer);
    videoContentContainer.x = (stageBounds.width - newVideoProps.w) / 2;
    videoContentContainer.y = (stageBounds.height - newVideoProps.h) / 2;

    // console.log("☻☺◙Ö:::video::♪◙☺☻", videoContentContainer.getBounds());

    stage.update();
}

var videoWillPlay = true;
function handle_VideoControls() {
    var instance = importantVideo;

    switch (videoWillPlay) {
        case true:
            videoWillPlay = false;
            instance.play();
            break;
        case false:
            videoWillPlay = true;
            instance.pause();
            break;
        default:
            break;
    }
}

function handle_SoundsRegistry() {
    createjs.Sound.registerSound(
        "../rocket_ranger_sounds/sounds/landing-copy.mp3",
        "pop"
    );
}

var soundWillPlay = true;
function handle_SoundControls(soundID) {
    var instance = createjs.Sound.play(soundID, {
        // interrupt: createjs.Sound.INTERRUPT_ANY,
        interrupt: createjs.Sound.INTERRUPT_NONE,
        //loop: -1,
    });
    // console.log(" ▌▌▌ ▌▌▌ ▌▌▌ ", instance);

    switch (soundWillPlay) {
        case true:
            soundWillPlay = false;
            instance.play();
            // console.log(
            //     "╘╘╘╝╘▌▌▌playSound" + "paused? (true) ▌",
            //     instance.getPaused()
            // );
            break;
        case false:
            soundWillPlay = true;
            instance.setPaused(true);
            // console.log(
            //     "╘╘╘╝╘▌▌▌playSound" + "paused? (false) ▌",
            //     instance.getPaused()
            // );
            break;
        default:
            break;
    }
    // createjs.Sound.play("pop", {
    //     // interrupt: createjs.Sound.INTERRUPT_ANY,
    //     interrupt: createjs.Sound.INTERRUPT_NONE,
    //     loop: -1,
    // });
}

/*
 * Ready-to-use video scale promise-based function
 * https://stackoverflow.com/questions/4129102/html5-video-dimensions
 */

function resizeToKnownDimensions(contentW, contentH, constraintW, constraintH) {
    var containerAspect = constraintW / constraintH;

    var fullW = contentW;
    var fullH = contentH;

    var aspect = fullW / fullH;

    var fullMax = Math.max(fullW, fullH);
    var fullMin = Math.min(fullW, fullH);

    var contentMax = Math.max(constraintW, constraintH);
    var contentMin = Math.min(constraintW, constraintH);

    let newScaleRatio;

    if (aspect < 1 || aspect === 1) {
        //use contentMin/fullMax
        newScaleRatio = contentMin / fullMax;
        contentW = fullW * newScaleRatio;
        contentH = fullH * newScaleRatio;
    } else if (aspect > 1) {
        //use contentMax/fullMax unless the containerAspect is greater than aspect
        var greater = Math.max(aspect, containerAspect);
        if (greater === aspect) {
            //console.log("greater.... ASPECT!");
            newScaleRatio = contentMax / fullMax;
            contentW = fullW * newScaleRatio;
            contentH = fullH * newScaleRatio;
        } else {
            //console.log("greater.... CONTAINERASPECT!");
            newScaleRatio = contentMin / fullMin;
            contentW = fullW * newScaleRatio;
            contentH = fullH * newScaleRatio;
        }
    }
    return {
        aspect: containerAspect,
        scaleRatio: newScaleRatio,
        newW: contentW,
        newH: contentH,
    };
}

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ UTILITY FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

function getRandomHexNum() {
    // get a random hex value for the color of something:
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF UTILITY FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
