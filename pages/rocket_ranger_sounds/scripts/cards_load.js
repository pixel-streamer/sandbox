var stage,
    stageBounds,
    importantVideo,
    fontsHaveLoaded = false,
    ticker,
    subject_content,
    image_content,
    startup_content,
    fileLoader,
    bigArea = document.querySelector("#testCanvas"),
    w = parseInt(getComputedStyle(bigArea).width),
    h = parseInt(getComputedStyle(bigArea).height),
    bigCanvas = document.querySelector(".full_size_canvas"),
    generalPadding = 16,
    largeText = 0;

let nofullhover;

let resizeObserver,
    delay = 250,
    timeout;

let screenLog = document.querySelector("#screen-log");
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
window.addEventListener("startup_evtStr", addStartupText);

const gameSetup_evt = new CustomEvent("gameSetup_evtStr", {
    detail: { msg: ":::startup began, now setup stage" },
});
window.addEventListener("gameSetup_evtStr", setupGame);

const gamePlay_evt = new CustomEvent("gamePlay_evtStr", {
    detail: { msg: ":::startup began, now setup stage" },
});
window.addEventListener("gamePlay_evtStr", playGame);

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

    stage.addChild(startup_content);

    ticker = createjs.Ticker;
    ticker.timingMode = ticker.RAF_SYNCHED;
    ticker.addEventListener("tick", tick);
    //nofullhover = window.matchMedia("(hover:none), (hover:on-demand)").matches;
    interactive_content = new createjs.Container();
    interactive_content.name = "interactive_content";

    image_content = new createjs.Container();
    image_content.name = "image_content";

    subject_content = new createjs.Container();
    subject_content.name = "subject_content";
    stage.addChildAt(subject_content);
    stage.addChildAt(image_content);
    stage.addChild(interactive_content);

    addStartupText();
}

function tick(event) {
    stage.update(event);
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
    // console.log(
    //     "▄▄▄▄▄▄▄▄▄handle_Redraw▄▄▄▄▄▄▄▄",
    //     "find a way to add something to all corners of the stage, and re-dim that sucker"
    // );
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

function init() {
    // console.log("▄▄▄▄▄▄▄▄▄init▄▄▄▄▄▄▄▄");
}

/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
function addStartupText() {
    console.log("addStartupText");
    var nextLargerTextSize = getGoldenRatio(w) * 0.04;
    var largerTextContainer = new createjs.Container();

    var largerText = new createjs.Text(
        "click to begin".toUpperCase(),
        "normal " + nextLargerTextSize + "px 'Press Start 2P'",
        "#ffffff"
    );

    var largerTextMetrics = largerText.getMetrics();

    var textClickArea = new createjs.Shape();
    textClickArea.graphics
        .beginFill("#450067")
        .drawRect(
            0,
            0,
            largerTextMetrics.width + 32,
            largerTextMetrics.height + 32
        )
        .endFill();
    largerTextContainer.addChild(textClickArea);
    largerTextContainer.addChild(largerText);
    var largerTextW = largerTextMetrics.width;
    var largerTextH = largerTextMetrics.height;

    largerText.x = (stageBounds.width - largerTextMetrics.width) / 2;
    largerText.y = largerTextMetrics.height / 2;

    textClickArea.x = (stageBounds.width - (largerTextMetrics.width + 32)) / 2;
    textClickArea.y = largerText.y - (largerTextMetrics.height + 24) / 2;
    largerTextContainer.y = 0;
    interactive_content.addChild(largerTextContainer);

    largerTextContainer.addEventListener(
        "click",
        function () {
            largerTextContainer.visible = false;
            largerTextContainer.mouseEnabled = false;
            window.dispatchEvent(gameSetup_evt);
        },
        { once: true }
    );
}

function addInteractiveText(interactivePhrase) {
    largeText = getGoldenRatio(w) * 0.085;
    var interactiveTextHitArea = new createjs.Container();
    var interactiveTextMask = new createjs.Shape();

    var gamePlayText = new createjs.Text(
        interactivePhrase,
        "16px 'Press Start 2P'",
        "#FFCC00"
    );
    var textMetrics = gamePlayText.getMetrics();
    var textW = textMetrics.width;
    var textH = textMetrics.height;
    gamePlayText.x = 8;
    gamePlayText.y = 8;

    interactiveTextMask.graphics
        .beginFill("rgba(0,0,0,.3)")
        .drawRect(0, 0, textW + 16, textH + 16)
        .endFill();

    interactiveTextHitArea.regX = 0;
    interactiveTextHitArea.regY = 0;

    interactiveTextHitArea.addChild(interactiveTextMask);
    interactiveTextHitArea.addChild(gamePlayText);

    interactiveTextHitArea.x =
        (stageBounds.width - interactiveTextHitArea.getBounds().width) / 2;
    interactiveTextHitArea.y =
        (stageBounds.height - interactiveTextHitArea.getBounds().height) / 2;

    interactiveTextHitArea.addEventListener(
        "click",
        function () {
            console.log("clicked me one time!");
            interactiveTextHitArea.visible = false;
            interactiveTextHitArea.mouseEnabled = false;
            window.dispatchEvent(gamePlay_evt);
        },
        { once: true }
    );

    // handle_SoundsRegistry();
    interactive_content.addChild(interactiveTextHitArea);
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
function setupGame() {
    console.log("setupGame");
    var phraseAsStr = "Welcome to Cards.\n\t\t\tLet's Play.";
    addInteractiveText(phraseAsStr);
}
function playGame() {
    console.log("playGame");
    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("fileload", handle_ImageLoadReady);
    // fileLoader.on("progress", handle_ImageLoadProgress);
    fileLoader.on("complete", handle_ImageLoadComplete);
    // fileLoader.loadFile({
    //     src: "../images/ui_vectors/cards_all-copy.svg",
    //     id: "all_cards",
    //     type: createjs.Types.IMAGE,
    // });
    fileLoader.loadFile({
        src: "../images/ui_vectors/cards_all-copy.svg",
        id: "all_cards",
        crossOrigin: true,
        //type: createjs.Types.IMAGE,
        type: createjs.Types.SVG,
    });
    // displaySingleCard(getSuitCode("hearts"));
}

function handle_ImageLoadReady(e) {
    // console.log(":::::▄█ handle_ImageLoadReady █▄", e.item.type, e.result);
    // var svgElement = e.target.getResult("all_cards");
    // var svgElement = e.result;
    // var bg = new createjs.Bitmap(svgElement);
    // bg.image.onload = function () {
    //     console.log("OMG!", this.naturalWidth);
    // };
    // image_content.addChild(bg);

    return;
    // console.log(":::::▄█ handle_ImageLoadReady █▄", e.item.type, e.result);

    // var src = e.item.src;
    // var extension_trim = src.substring(src.lastIndexOf("/") + 1);
    // var extension = extension_trim.substring(
    //     extension_trim.lastIndexOf(".") + 1
    // );
    // console.log(":::::▄█ src █▄", e.result);
    // console.log(":::::▄█ src █▄", e.result.querySelector("#D-10"));

    // var bg = new createjs.Bitmap(e.result);
    // image_content.addChild(bg);
    // var fsBiggest = resizeToKnownDimensions(
    //     e.result.width,
    //     e.result.height,
    //     w,
    //     h
    // );
    // bg.scaleX = fsBiggest.scaleRatio;
    // bg.scaleY = fsBiggest.scaleRatio;
    //console.log(":::::▄█ svg first el █▄", e.result.querySelector( id ));

    /*  switch (extension) {
        case "svg":
            addSVG(e);
            break;
        // case "mp4":
        //     handleLoadedMovie(e);
        //     break;
        default:
            layoutImage(e);
            break;
    } */
}

function handle_ImageLoadComplete(e) {
    var svgElement = e.target.getResult("all_cards");
    console.log("svg .src ", e.target._loadItemsById.all_cards.src);
    console.log(
        " handle_ImageLoadComplete, svg has loaded ",
        svgElement.firstChild
    );
    console.log(":::::▄█ src █▄", svgElement.querySelector("#D-10"));

    var bg = new createjs.Bitmap(svgElement.firstChild);
    bg.image.onload = function () {
        console.log("OMG!", this.naturalWidth);
    };
    image_content.addChild(bg);

    imgCreator(
        e.target._loadItemsById.all_cards.src + "#D-10",
        function (img, scaledDims) {
            var newBG = new createjs.Bitmap(img);
            document.body.appendChild(img);
            interactive_content.addChild(newBG);
        }
    );

    // var xmlns = "http://www.w3.org/2000/svg";

    // var svg = document.createElementNS(xmlns, "svg");
    // svg.setAttributeNS(null, "viewBox", "0 0 " + 320 + " " + 320 + "");

    // var use = document.createElementNS(xmlns, "use");
    // //  svgElement.firstChild
    // use.setAttribute(
    //     "xlink:href",
    //     e.target._loadItemsById.all_cards.src + "#D-10"
    // );
    // use.setAttribute("href", e.target._loadItemsById.all_cards.src + "#D-10");
    // svg.appendChild(use);
    // document.body.appendChild(svg);

    return;

    // console.log(
    //     "handle_ImageLoadComplete",
    //     // e.target.getResult("all_cards").firstChild.getAttribute("width"),
    //     // e.target.getResult("all_cards").firstChild.getAttribute("height")
    // );

    // console.log(
    //     'e.target.getResult("all_cards")',
    //     e.target.getResult("all_cards"),
    //     e.target
    // );

    var svgElement = e.target.getResult("all_cards");
    var s = new XMLSerializer().serializeToString(svgElement);
    var imgSource = "data:image/svg+xml;base64," + window.btoa(s);

    // imgSource =
    //     "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/coke-bottle-render.png";

    var srcStr = imgSource.substring(0, 11);
    //  console.log("::: srcStr :::", srcStr);

    // if (srcStr === "data:image/") {
    //     console.log("this one's already an image");
    //     var bgImg = populateImg64(imgSource)
    //         .then(function (imgPopped) {
    //             console.log("▌▌▌ok, here's the final bit 'image'", imgPopped);
    //             // var canvas = document.createElement("canvas");
    //             // var ctx = canvas.getContext("2d");
    //             // var scaledDims2 = { newW: w, newH: h, scaleRatio: 1 };
    //             // canvas.setAttribute("width", scaledDims2.newW);
    //             // canvas.setAttribute("height", scaledDims2.newH);
    //             // ctx.drawImage(
    //             //     imgPopped,
    //             //     0,
    //             //     0,
    //             //     scaledDims2.newW,
    //             //     scaledDims2.newH
    //             // );
    //             // document.body.appendChild(canvas);
    //             // document.body.appendChild(imgPopped);
    //             // var bg = new createjs.Bitmap();

    //             var bg = new createjs.Bitmap(imgPopped);
    //             document.body.appendChild(imgPopped);
    //             // bg.scaleX = scaledDims2.scaleRatio;
    //             // bg.scaleY = scaledDims2.scaleRatio;
    //             // var BGgetBounds = bg.getBounds();
    //             // console.log("::: stageBounds :::", stageBounds);
    //             // console.log("::: BGgetBounds :::", BGgetBounds);
    //             image_content.addChild(bg);
    //             // bg.x = (stageBounds.width - BGgetBounds.width) / 2;
    //             // bg.y = (stageBounds.height - BGgetBounds.height) / 2;
    //             return imgPopped;
    //         })
    //         .catch(function (err) {
    //             return console.error(
    //                 "damn, that errored out.: ",
    //                 err,
    //                 err.target
    //             );
    //         });
    // } else {
    //     console.log("this one needs to load an image");
    //     var bgImg = imgCreator(imgSource, function (img, scaledDims) {
    //         var canvas = document.createElement("canvas");
    //         var ctx = canvas.getContext("2d");
    //         canvas.setAttribute("width", scaledDims.newW);
    //         canvas.setAttribute("height", scaledDims.newH);
    //         ctx.drawImage(img, 0, 0, scaledDims.newW, scaledDims.newH);
    //         document.body.appendChild(canvas);
    //         document.body.appendChild(img);
    //         var bg = new createjs.Bitmap(img);
    //         bg.scaleX = scaledDims.scaleRatio;
    //         bg.scaleY = scaledDims.scaleRatio;
    //         var BGgetBounds = bg.getBounds();
    //         console.log("::: stageBounds :::", stageBounds);
    //         console.log("::: BGgetBounds :::", BGgetBounds);
    //         image_content.addChild(bg);
    //         bg.x = (stageBounds.width - BGgetBounds.width) / 2;
    //         bg.y = (stageBounds.height - BGgetBounds.height) / 2;
    //     });
    // }

    // var bg = new createjs.Bitmap(imgSource);
    // var bg = new createjs.Bitmap(imgSource);
    // bg.image.onload = function () {
    //     console.log("OMG!", this.naturalWidth);
    //     image_content.addChild(bg);
    // };

    // var bg = new createjs.Bitmap(imgCreator(imgSource));
    // var bg = new createjs.DOMElement(imgCreator(imgSource));
    // interactive_content "rgba(0,0,0,.3)"
}

function imgCreator(imgSrc, callBack) {
    var imgPopped = loadImage(imgSrc)
        .then(function (imgPopped) {
            // var fsBiggest = resizeToKnownDimensions(
            //     imgPopped.naturalWidth,
            //     imgPopped.naturalHeight,
            //     w,
            //     h
            // );
            // var canvas = document.createElement("canvas");
            // var ctx = canvas.getContext("2d");
            // canvas.setAttribute("width", fsBiggest.newW);
            // canvas.setAttribute("height", fsBiggest.newH);
            // ctx.drawImage(imgPopped, 0, 0, fsBiggest.newW, fsBiggest.newH);
            // document.body.appendChild(canvas);
            return imgPopped;
        })
        .then(function (imgPopped) {
            var fsBiggest = resizeToKnownDimensions(
                imgPopped.naturalWidth,
                imgPopped.naturalHeight,
                w,
                h
            );
            console.log("::: width :::", imgPopped.naturalWidth);
            console.log("::: height :::", imgPopped.naturalWidth);
            console.log("::: fsBiggest.newW :::", fsBiggest.newW);
            console.log("::: fsBiggest.newH :::", fsBiggest.newH);
            imgPopped.setAttribute("width", fsBiggest.newW);
            imgPopped.setAttribute("height", fsBiggest.newH);
            callBack(imgPopped, fsBiggest);
        })
        .catch(function (err) {
            return console.error("damn, that errored out.: ", err, err.target);
        });
}
async function populateImg64(url) {
    //console.log("::: populateImg64 :::", url);
    return await new Promise(function (resolve, reject) {
        try {
            var img = new Image();
            img.src = url;
            return resolve(img);
        } catch (err) {
            return reject;
        }
    });
}

async function loadImage(url) {
    return await new Promise(function (resolve, reject) {
        var img = new Image();
        img.addEventListener("load", function () {
            //console.log("::: loadImage :::", img.naturalWidth);
            if (img.complete && img.naturalWidth > 0) {
                return resolve(img);
            }
        });
        img.addEventListener("error", function (err) {
            return reject(err);
        });
        img.src = url;
    });
}

// /**
//  * Load an image from a given URL
//  * @param {String} url The URL of the image resource
//  * @returns {Promise<Image>} The loaded image
//  */
// function loadImage(url) {
//     /*
//      * We are going to return a Promise which, when we .then
//      * will give us an Image that should be fully loaded
//      */
//     return new Promise(resolve => {
//       /*
//        * Create the image that we are going to use to
//        * to hold the resource
//        */
//       const image = new Image();
//       /*
//        * The Image API deals in even listeners and callbacks
//        * we attach a listener for the "load" event which fires
//        * when the Image has finished the network request and
//        * populated the Image with data
//        */
//       image.addEventListener('load', () => {
//         /*
//          * You have to manually tell the Promise that you are
//          * done dealing with asynchronous stuff and you are ready
//          * for it to give anything that attached a callback
//          * through .then a realized value.  We do that by calling
//          * resolve and passing it the realized value
//          */
//         resolve(image);
//       });
//       /*
//        * Setting the Image.src is what starts the networking process
//        * to populate an image.  After you set it, the browser fires
//        * a request to get the resource.  We attached a load listener
//        * which will be called once the request finishes and we have
//        * image data
//        */
//       image.src = url;
//     });
//   }

//   /*
//    * To use this we call the loadImage function and call .then
//    * on the Promise that it returns, passing a function that we
//    * want to receive the realized Image
//    */
//   loadImage("example.com/house.jpg").then(houseImage => {
//     ctx.drawImage(houseImage, 0, 0);
//   });

// loadImage("example.com/house.jpg")
//     .then(function (img) {
//         return console.log(
//             "w: ".concat(img.width, " | h: ").concat(img.height)
//         );
//     })
//     .catch(function (err) {
//         return console.error(err);
//     });

var galleryConfig = {};
galleryConfig.thumbnailW = 85;
galleryConfig.thumbnailH = 64;

function addSVG(e) {
    var bg = new createjs.Bitmap(e.result);
    image_content.addChild(bg);
    var fsBiggest = resizeToKnownDimensions(
        e.result.width,
        e.result.height,
        w,
        h
    );
    bg.scaleX = fsBiggest.scaleRatio;
    bg.scaleY = fsBiggest.scaleRatio;
}

function layoutImage(e) {
    var bg = new createjs.Bitmap(e.result);
    // bg.scaleX = galleryConfig.thumbnailW / e.result.width;
    // bg.scaleY = galleryConfig.thumbnailH / e.result.height;

    //add the images to the content
    image_content.addChild(bg);

    var fsBiggest = resizeToKnownDimensions(
        e.result.width,
        e.result.height,
        w,
        h
    );
    bg.scaleX = fsBiggest.scaleRatio;
    bg.scaleY = fsBiggest.scaleRatio;
}

function loadCards() {
    console.log("load in some cards");
}

function displaySingleCard() {
    console.log("display single card");

    var allCards = makeRegularDeck();
    var shortNameCards = [];
    allCards.forEach(function (member) {
        shortNameCards.push(member.short_name);
    });
    console.log(shortNameCards);

    var randomShortName = Math.floor(Math.random() * shortNameCards.length);
    var newSrc =
        "../images/ui_vectors/cards_all-copy.svg" +
        "#" +
        shortNameCards[randomShortName];

    console.log("newSrc: ", newSrc);

    //https://createjs.com/docs/preloadjs/classes/SVGLoader.html
    fileLoader.loadFile({
        src: newSrc,
        id: "all_cards",
        crossOrigin: true,
        //type: createjs.Types.IMAGE,
        type: createjs.Types.SVG,
        //type: "svg",
        //type: createjs.Types.XML,
    });
    // console.log(fileLoader);
}

function getSuitCode(suit) {
    console.log("getSuitCode");
    var symbol = suit.toLowerCase();
    var choice;
    switch (symbol) {
        case "spades":
            //♠262
            choice = "♠";
            break;
        case "hearts":
            //♥259
            choice = "♥";
            break;
        case "clubs":
            //♣261
            choice = "♣";
            break;
        case "diamods":
            //♦260
            choice = "♦";
            break;
        default:
            //
            break;
    }
    return choice;

    /*
·250 ■254 ☺257 ☻258 ♥259 ♦260 ♣261 ♠262 •263 ◘264
○265 ◙266 ♂267 ♀268 ♪269 ♫270 ☼271 ►272 ◄273 ↕274
‼275 ¶276 §277 ▬278 ↨279 ↑280 ↓281 →282 ←283 ↔285
▲286 ▼287 ▲30 ▼31 ·0183 ∙249 °248 “0147 ”0148
•0149 –0150 —0151 ™0153 ©0169 ¯0175 ‘0145 ’0146 
*/
}

/* 
makeRegularDeck IS FROM A DIFFERENT FILE... USE THE MODULE!
*/
function makeRegularDeck() {
    let deck = [];
    let tableauSpades = [];
    let tableauDiamonds = [];
    let tableauClubs = [];
    let tableauHearts = [];
    let countingJokersIn = [];
    let isUsingJokers = false;

    let acesLow = true;

    let card_01_h = {
        numeric_value: "1",
        short_name: "H-A",
        name: "ace",
        designation: "a",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_02_h = {
        numeric_value: "2",
        short_name: "H-2",
        name: "two",
        designation: "02",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_03_h = {
        numeric_value: "3",
        short_name: "H-3",
        name: "three",
        designation: "03",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_04_h = {
        numeric_value: "4",
        short_name: "H-4",
        name: "four",
        designation: "04",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_05_h = {
        numeric_value: "5",
        short_name: "H-5",
        name: "five",
        designation: "05",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_06_h = {
        numeric_value: "6",
        short_name: "H-6",
        name: "six",
        designation: "06",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_07_h = {
        numeric_value: "7",
        short_name: "H-7",
        name: "seven",
        designation: "07",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_08_h = {
        numeric_value: "8",
        short_name: "H-8",
        name: "eight",
        designation: "08",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_09_h = {
        numeric_value: "9",
        short_name: "H-9",
        name: "nine",
        designation: "09",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_10_h = {
        numeric_value: "10",
        short_name: "H-10",
        name: "ten",
        designation: "10",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_j_h = {
        numeric_value: "11",
        short_name: "H-J",
        name: "jack",
        designation: "j",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_q_h = {
        numeric_value: "12",
        short_name: "H-Q",
        name: "queen",
        designation: "q",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_k_h = {
        numeric_value: "13",
        short_name: "H-K",
        name: "king",
        designation: "k",
        suit: "hearts",
        suit_color: "red",
        ink_color: "various",
    };
    let card_a_h = card_01_h;

    if ((acesLow = false)) {
        card_a_h.numeric_value = "14";
    }

    let card_01_s = {
        numeric_value: "1",
        short_name: "S-A",
        name: "ace",
        designation: "a",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_02_s = {
        numeric_value: "2",
        short_name: "S-2",
        name: "two",
        designation: "02",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_03_s = {
        numeric_value: "3",
        short_name: "S-3",
        name: "three",
        designation: "03",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_04_s = {
        numeric_value: "4",
        short_name: "S-4",
        name: "four",
        designation: "04",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_05_s = {
        numeric_value: "5",
        short_name: "S-5",
        name: "five",
        designation: "05",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_06_s = {
        numeric_value: "6",
        short_name: "S-6",
        name: "six",
        designation: "06",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_07_s = {
        numeric_value: "7",
        short_name: "S-7",
        name: "seven",
        designation: "07",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_08_s = {
        numeric_value: "8",
        short_name: "S-8",
        name: "eight",
        designation: "08",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_09_s = {
        numeric_value: "9",
        short_name: "S-9",
        name: "nine",
        designation: "09",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_10_s = {
        numeric_value: "10",
        short_name: "S-10",
        name: "ten",
        designation: "10",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_j_s = {
        numeric_value: "11",
        short_name: "S-J",
        name: "jack",
        designation: "j",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_q_s = {
        numeric_value: "12",
        short_name: "S-Q",
        name: "queen",
        designation: "q",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_k_s = {
        numeric_value: "13",
        short_name: "S-K",
        name: "king",
        designation: "k",
        suit: "spades",
        suit_color: "black",
        ink_color: "various",
    };
    let card_a_s = card_01_s;

    if ((acesLow = false)) {
        card_a_s.numeric_value = "14";
    }

    let card_01_d = {
        numeric_value: "1",
        short_name: "D-A",
        name: "ace",
        designation: "a",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_02_d = {
        numeric_value: "2",
        short_name: "D-2",
        name: "two",
        designation: "02",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_03_d = {
        numeric_value: "3",
        short_name: "D-3",
        name: "three",
        designation: "03",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_04_d = {
        numeric_value: "4",
        short_name: "D-4",
        name: "four",
        designation: "04",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_05_d = {
        numeric_value: "5",
        short_name: "D-5",
        name: "five",
        designation: "05",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_06_d = {
        numeric_value: "6",
        short_name: "D-6",
        name: "six",
        designation: "06",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_07_d = {
        numeric_value: "7",
        short_name: "D-7",
        name: "seven",
        designation: "07",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_08_d = {
        numeric_value: "8",
        short_name: "D-8",
        name: "eight",
        designation: "08",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_09_d = {
        numeric_value: "9",
        short_name: "D-9",
        name: "nine",
        designation: "09",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_10_d = {
        numeric_value: "10",
        short_name: "D-10",
        name: "ten",
        designation: "10",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_j_d = {
        numeric_value: "11",
        short_name: "D-J",
        name: "jack",
        designation: "j",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_q_d = {
        numeric_value: "12",
        short_name: "D-Q",
        name: "queen",
        designation: "q",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_k_d = {
        numeric_value: "13",
        short_name: "D-K",
        name: "king",
        designation: "k",
        suit: "diamonds",
        suit_color: "red",
        ink_color: "various",
    };
    let card_a_d = card_01_d;

    if ((acesLow = false)) {
        card_a_d.numeric_value = "14";
    }

    let card_01_c = {
        numeric_value: "1",
        short_name: "C-A",
        name: "ace",
        designation: "a",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_02_c = {
        numeric_value: "2",
        short_name: "C-2",
        name: "two",
        designation: "02",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_03_c = {
        numeric_value: "3",
        short_name: "C-3",
        name: "three",
        designation: "03",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_04_c = {
        numeric_value: "4",
        short_name: "C-4",
        name: "four",
        designation: "04",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_05_c = {
        numeric_value: "5",
        short_name: "C-5",
        name: "five",
        designation: "05",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_06_c = {
        numeric_value: "6",
        short_name: "C-6",
        name: "six",
        designation: "06",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_07_c = {
        numeric_value: "7",
        short_name: "C-7",
        name: "seven",
        designation: "07",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_08_c = {
        numeric_value: "8",
        short_name: "C-8",
        name: "eight",
        designation: "08",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_09_c = {
        numeric_value: "9",
        short_name: "C-9",
        name: "nine",
        designation: "09",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_10_c = {
        numeric_value: "10",
        short_name: "C-10",
        name: "ten",
        designation: "10",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_j_c = {
        numeric_value: "11",
        short_name: "C-J",
        name: "jack",
        designation: "j",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_q_c = {
        numeric_value: "12",
        short_name: "C-Q",
        name: "queen",
        designation: "q",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_k_c = {
        numeric_value: "13",
        short_name: "C-K",
        name: "king",
        designation: "k",
        suit: "clubs",
        suit_color: "black",
        ink_color: "various",
    };
    let card_a_c = card_01_c;

    if ((acesLow = false)) {
        card_a_c.numeric_value = "14";
    }

    /* "short_name" is used to help locate the id designation of the svg vector image. */

    let card_joker_r = {
        numeric_value: "15",
        short_name: "J-R",
        name: "joker",
        designation: "q",
        ink_color: "red",
    }; //red or (smaller joker, when monochrome)
    let card_joker_b = {
        numeric_value: "16",
        short_name: "J-B",
        name: "joker",
        designation: "k",
        ink_color: "black",
    }; //black (larger) out-ranks red joker

    countingJokersIn[0] = card_joker_r;
    countingJokersIn[1] = card_joker_b;

    tableauHearts[0] = card_01_h;
    tableauHearts[1] = card_02_h;
    tableauHearts[2] = card_03_h;
    tableauHearts[3] = card_04_h;
    tableauHearts[4] = card_05_h;
    tableauHearts[5] = card_06_h;
    tableauHearts[6] = card_07_h;
    tableauHearts[7] = card_08_h;
    tableauHearts[8] = card_09_h;
    tableauHearts[9] = card_10_h;
    tableauHearts[10] = card_j_h;
    tableauHearts[11] = card_q_h;
    tableauHearts[12] = card_k_h;
    tableauHearts[13] = card_a_h;

    tableauSpades[0] = card_01_s;
    tableauSpades[1] = card_02_s;
    tableauSpades[2] = card_03_s;
    tableauSpades[3] = card_04_s;
    tableauSpades[4] = card_05_s;
    tableauSpades[5] = card_06_s;
    tableauSpades[6] = card_07_s;
    tableauSpades[7] = card_08_s;
    tableauSpades[8] = card_09_s;
    tableauSpades[9] = card_10_s;
    tableauSpades[10] = card_j_s;
    tableauSpades[11] = card_q_s;
    tableauSpades[12] = card_k_s;
    tableauSpades[13] = card_a_s;

    tableauDiamonds[0] = card_01_d;
    tableauDiamonds[1] = card_02_d;
    tableauDiamonds[2] = card_03_d;
    tableauDiamonds[3] = card_04_d;
    tableauDiamonds[4] = card_05_d;
    tableauDiamonds[5] = card_06_d;
    tableauDiamonds[6] = card_07_d;
    tableauDiamonds[7] = card_08_d;
    tableauDiamonds[8] = card_09_d;
    tableauDiamonds[9] = card_10_d;
    tableauDiamonds[10] = card_j_d;
    tableauDiamonds[11] = card_q_d;
    tableauDiamonds[12] = card_k_d;
    tableauDiamonds[13] = card_a_d;

    tableauClubs[0] = card_01_c;
    tableauClubs[1] = card_02_c;
    tableauClubs[2] = card_03_c;
    tableauClubs[3] = card_04_c;
    tableauClubs[4] = card_05_c;
    tableauClubs[5] = card_06_c;
    tableauClubs[6] = card_07_c;
    tableauClubs[7] = card_08_c;
    tableauClubs[8] = card_09_c;
    tableauClubs[9] = card_10_c;
    tableauClubs[10] = card_j_c;
    tableauClubs[11] = card_q_c;
    tableauClubs[12] = card_k_c;
    tableauClubs[13] = card_a_c;

    if (acesLow !== true) {
        tableauHearts.pop();
        tableauSpades.pop();
        tableauDiamonds.pop();
        tableauClubs.pop();
    }

    deck = tableauSpades
        .concat(tableauDiamonds)
        .concat(tableauClubs)
        .concat(tableauHearts);

    if (isUsingJokers) {
        deck = deck.concat(countingJokersIn);
    }
    return deck;
}
