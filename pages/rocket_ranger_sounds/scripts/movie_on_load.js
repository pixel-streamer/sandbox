var stage,
    stageBounds,
    importantVideo,
    fontsHaveLoaded = false,
    ticker,
    subject_content,
    image_content,
    startup_content,
    background_content,
    video_content,
    fileLoader,
    bigArea = document.querySelector("#testCanvas"),
    w = parseInt(getComputedStyle(bigArea).width),
    h = parseInt(getComputedStyle(bigArea).height),
    bigCanvas = document.querySelector(".full_size_canvas"),
    generalPadding = 16,
    largeText = 0;

let nofullhover;

let videoLoader,
    videoWillPlay = true,
    soundWillPlay = true;

let resizeObserver,
    delay = 250,
    timeout;

/*
ResizeObserver.disconnect()
    Unobserves all observed Element targets of a particular observer.
ResizeObserver.observe()
    Initiates the observing of a specified Element.
ResizeObserver.unobserve()
    Ends the observing of a specified Element.
*/
window.addEventListener("load", loadGoogleFonts);
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
// import { loadGoogleFonts }
// import "font-loading_module.js";

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

window.addEventListener("fontload_evtStr", setupStageForInteraction);

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

const startup_evt = new CustomEvent("startup_evtStr", {
    detail: { msg: ":::startup began, now setup stage" },
});

window.addEventListener("startup_evtStr", setupStage);

function setupStageForInteraction() {
    init();
    bigCanvas.setAttribute("width", w);
    bigCanvas.setAttribute("height", h);
    stage = bigCanvas;
    stage = new createjs.Stage("big_stage");
    stage.setBounds(0, 0, w, h);
    stageBounds = stage.getBounds();

    startup_content = new createjs.Container();
    startup_content.name = "startup_content";

    video_content = new createjs.Container();
    video_content.name = "video_content";
    stage.addChild(video_content);
    stage.addChild(startup_content);

    ticker = createjs.Ticker;
    ticker.timingMode = ticker.RAF_SYNCHED;
    ticker.addEventListener("tick", tick);

    console.log("█▀ █▀setupStageForInteraction▀▌▀▌");

    console.log(":::makeSomeText:::");
    var nextLargerTextSize = getGoldenRatio(w) * 0.04;
    console.log(":::getGoldenRatio:::", getGoldenRatio(nextLargerTextSize));
    var largerTextContainer = new createjs.Container();

    var largerText = new createjs.Text(
        "click to start everything up",
        "normal " + nextLargerTextSize + "px 'Barlow'",
        "#ffffff"
    );

    var largerTextMetrics = largerText.getMetrics();

    var textClickArea = new createjs.Shape();
    textClickArea.graphics
        .beginFill("rgba(128, 64, 255,.75)")
        .drawRect(
            0,
            0,
            largerTextMetrics.width + 16,
            largerTextMetrics.height + 16
        )
        .endFill();
    largerTextContainer.addChild(textClickArea);
    largerTextContainer.addChild(largerText);
    var largerTextW = largerTextMetrics.width;
    var largerTextH = largerTextMetrics.height;

    largerText.x = (stageBounds.width - largerTextW) / 2;
    largerText.y = largerTextH;

    textClickArea.x = largerText.x - 8;
    textClickArea.y = largerText.y - 6;
    largerTextContainer.y = 0;
    startup_content.addChild(largerTextContainer);
    largerTextContainer.addEventListener(
        "click",
        function () {
            largerTextContainer.visible = false;
            largerTextContainer.mouseEnabled = false;
            importantVideo.play();
            window.dispatchEvent(startup_evt);
        },
        { once: true }
    );
}

function setupStage(e) {
    //nofullhover = window.matchMedia("(hover:none), (hover:on-demand)").matches;
    interactive_content = new createjs.Container();
    interactive_content.name = "interactive_content";

    subject_content = new createjs.Container();
    subject_content.name = "subject_content";
    stage.addChildAt(subject_content, stage.getChildIndex("video_content") + 1);
    stage.addChild(interactive_content);
    makeSomeText();
}

function tick(event) {
    stage.update(event);
    //var deltaS = event.delta / 1000;
    //var position = <clip>.x + 15 * deltaS;
    //var moverW = <clip>.getBounds().width * <clip>.scaleX;
    //<clip>.x = position >= w + moverW ? -moverW : position;
}

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
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

function init() {
    console.log("▄▄▄▄▄▄▄▄▄init▄▄▄▄▄▄▄▄");

    videoLoader = new createjs.LoadQueue(true);
    // videoLoader.on("fileload", handleLoadedMovie);
    videoLoader.on("progress", handle_progress);
    videoLoader.on("complete", handle_loadMovieComplete);
    videoLoader.loadFile({
        src: "../video/error_page/woody-disappointed_copy.mp4",
        // src: "https://voolatech.github.io/banner/vpaid/videos/video.mp4",
        id: "disappointed",
        type: createjs.Types.VIDEO,
    });
}

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ VIDEO LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

const videoload_evt = new CustomEvent("videoload_evtStr", {
    detail: { msg: ":::video loaded, now play it" },
});

function handle_progress(e) {
    console.log(Math.floor(parseFloat(e.progress * 100).toPrecision(2)));
}

function handle_loadMovieComplete(e) {
    console.log(
        ":::final func after loading video. handle_loadMovieComplete:::"
    );
    window.dispatchEvent(videoload_evt);
}

window.addEventListener("videoload_evtStr", handleVideoLoad);

function handleVideoLoad(e) {
    // console.log("▄▀▌▀▌▄:::handleVideoLoad:::▄▀▌▀▌▄", e);
    importantVideo = videoLoader.getResult("disappointed");
    importantVideo.addEventListener("loadedmetadata", testingFunction);
    // console.log("importantVideo ", importantVideo);
}

function testingFunction() {
    addVideoToStage.apply({
        vid: importantVideo,
    });
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF VIDEO LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

function makeSomeText() {
    //console.log(":::makeSomeText:::");
    largeText = getGoldenRatio(w) * 0.085;
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
    interactive_content.addChild(interactiveTextHitArea);
}

function addVideoToStage() {
    console.log("obj: ", this);

    let vWidth = this.vid.videoWidth;
    let vHeight = this.vid.videoHeight;
    this.vid.setAttribute("preload", "metadata");
    this.vid.setAttribute("autoplay", "");
    this.vid.setAttribute("muted", "");
    this.vid.setAttribute("loop", "");
    this.vid.setAttribute("playsinline", "");
    var newDims = resizeToKnownDimensions(vWidth, vHeight, w, h);

    var videoContentContainer = new createjs.Container();
    var vidBMP = new createjs.Bitmap(this.vid);
    vidBMP.scaleX = newDims.scaleRatio;
    vidBMP.scaleY = newDims.scaleRatio;
    vidBMP.regX = 0;
    vidBMP.regY = 0;
    vidBMP.setBounds(0, 0, newDims.newW, newDims.newH);
    videoContentContainer.addChild(vidBMP);
    video_content.addChild(videoContentContainer);
    vidBMP.x = (stageBounds.width - newDims.newW) / 2;
    vidBMP.y = (stageBounds.height - newDims.newH) / 2;
    console.log("☻☺◙Ö:::newVideoProps::♪◙☺☻", newDims);
}

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
    );createjs.Sound.volume = 1;
}

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

function resizeToKnownDimensions(contentW, contentH, constraintW, constraintH) {
    var containerAspect = constraintW / constraintH;

    var fullW = contentW;
    var fullH = contentH;

    var aspect = fullW / fullH;
    var imageAspect;

    var fullMax = Math.max(fullW, fullH);
    var fullMin = Math.min(fullW, fullH);

    var contentMax = Math.max(constraintW, constraintH);
    var contentMin = Math.min(constraintW, constraintH);

    let newScaleRatio;

    imageAspect = aspect <= 1 ? "portrait" : "landscape";

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
        imageAspect: imageAspect,
        aspect: containerAspect,
        scaleRatio: newScaleRatio,
        newW: contentW,
        newH: contentH,
    };
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF UTILITY FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
