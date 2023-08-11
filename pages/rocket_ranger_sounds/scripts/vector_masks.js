var stage,
    stageBounds,
    importantVideo,
    fontsHaveLoaded = false,
    ticker,
    subject_content,
    image_content,
    interactive_content,
    startup_content,
    fileLoader,
    bigArea = document.querySelector("#testCanvas"),
    w = parseInt(getComputedStyle(bigArea).width),
    h = parseInt(getComputedStyle(bigArea).height),
    bigCanvas = document.querySelector("#big_stage"),
    generalPadding = 16,
    largeText = 0,
    update = true;

/*
using createjs, 
create a single webpage
displays photographic details within sections
based on selection
or the visited url  (make use of: URLSearchParams)

when visiting the web page, it has channels based on the url location

visit a location in the following categories:


*/

// let fontSize = 32;
let fontSize = 64;

let screen_log = document.querySelector("#screen-log");

// loadGoogleFonts inside font-loading_module.js
window.addEventListener("load", loadGoogleFonts);
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
    bigCanvas.getContext("2d").imageSmoothingEnabled = false;
    stage = bigCanvas;
    // stage = new createjs.StageGL("big_stage",{transparent:true});
    stage = new createjs.Stage("big_stage");
    stage.setBounds(0, 0, w, h);

    stageBounds = stage.getBounds();

    startup_content = new createjs.Container();
    startup_content.name = "startup_content";

    stage.addChild(startup_content);

    ticker = createjs.Ticker;
    ticker.timingMode = ticker.RAF_SYNCHED;
    ticker.addEventListener("tick", tick);
    interactive_content = new createjs.Container();
    interactive_content.name = "interactive_content";

    image_content = new createjs.Container();
    image_content.name = "image_content";

    subject_content = new createjs.Container();
    subject_content.name = "subject_content";
    stage.addChildAt(subject_content);
    stage.addChildAt(image_content);
    stage.addChild(interactive_content);
    stage.snapToPixel = true;

    // enable touch interactions if supported on the current device:
    createjs.Touch.enable(stage);
    stage.mouseMoveOutside = false;
    addStartupText();
}
function stop() {
    ticker.removeEventListener("tick", tick);
}
function tick(event) {
    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
    if (update) {
        update = false; // only update once
        stage.update(event);
    }
    stage.update(event);
}
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF STAGE SETUP FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

/*  // load in google fonts through the manifest... (cleaner.)
queue.loadManifest(
    [
        { src: "https://fonts.googleapis.com/css?family=Press+Start+2P", type: "fontcss" }
    ]
);
*/
window.addEventListener("fontload_evtStr", setupStageForInteraction);
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF FONT LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ RESIZE FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
//RESIZE VARIABLES
let resizeObserver,
    delay = 250,
    timeout;

resizeObserver = new ResizeObserver((entries) => {});
resizeObserver.observe(document.querySelector("#testCanvas"));
window.addEventListener("resize", function () {
    clearTimeout(timeout);
    timeout = setTimeout(handle_Redraw, delay);
    return;
});

function handle_Redraw() {
    //ensure this draw captures both canvases.
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
    window.dispatchEvent(gameSetup_evt);
}

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/

// var outputTextClip;
function setupGame() {
    console.log("setupGame");
    window.dispatchEvent(gamePlay_evt);
}

function loadAssets() {
    //TODO: file load
    console.log("playGame", "loadAssets");
    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("complete", handle_OLD_MAP_LOAD);

    fileLoader.loadManifest({
        manifest: [
            {
                src: "./assets/legend-data-pass1_copy.xml",
                id: "cities",
                crossOrigin: true,
                type: createjs.Types.XML,
            },
            {
                src: "./assets/map_whole.jpg",
                id: "map",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
            {
                src: "./assets/icon_sheet.png",
                id: "icons",
                crossOrigin: true,
                type: createjs.Types.IMAGE,
            },
        ],
    });
}

function playGame() {
    loadAssets();
}

/*
 ******************************************************************
 ******************************************************************
 ******************************************************************
 */

function handle_OLD_MAP_LOAD(e) {
    // outputTextClip = new InteractiveText(
    //     "city name appears here",
    //     stageBounds.width - 210,
    //     stageBounds.height - 65,
    //     //needs to update with the current object, and set the text in a subsequent function
    //     // stageBounds.width - outputTextClip.getTextInfo.hitAreaW,
    //     // stageBounds.height - outputTextClip.getTextInfo.hitAreaH,
    //     "#FFCC00"
    //     // ).mouseEnabled=false;  //using this throws error...
    // );

    outputTextClip = new DomText(
        "city name appears here",
        stageBounds.width - 210,
        stageBounds.height - 65,
        //needs to update with the current object, and set the text in a subsequent function
        // stageBounds.width - outputTextClip.getTextInfo.hitAreaW,
        // stageBounds.height - outputTextClip.getTextInfo.hitAreaH,
        "#FFCC00"
        // ).mouseEnabled = false; //using this throws error...
    );

    /*  
 
 // e.target.getResult("food").getElementsByTagName("location_name")[0].firstChild.data

    var bigFoodStr = e.target
        .getResult("food")
        .getElementsByTagName("food")[0].textContent;

    // bigFoodStr = bigFoodStr.replace(/\\n/g, "*");
    // bigFoodStr = bigFoodStr.replace("*", "");
    // bigFoodStr = bigFoodStr.replace(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g, "@");
    // var bigFoodArr = bigFoodStr.split("*"); //.join("").split(",");
    // console.log(bigFoodArr);

    var objArr = JSON.stringify(bigFoodStr);
    //if the data is only a string...
    objArr = JSON.parse(objArr)
        .replace(/\n/g, "@")
        .split("@")
        .join(",")
        .replace(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g, "@")
        .split("@");

    //take out the empties...  (they are the % 25th cell in the csv)
    // objArr = objArr.filter((word) => word.length > 0);

    // buildXMLOutput(objArr);
    //buildTable(objArr); 

    */

    console.log("██: : :handle_ImageLoadComplete: : : ██");

    var loadedMap = e.target.getResult("map");

    var loadedArrow = new createjs.Bitmap(e.target.getResult("arrow"));

    let icons = {
        images: [e.target.getResult("icons")],
        frames: {
            numFrames: 5,
            width: 32,
            height: 32,
            regX: 0,
            regY: 0,
            spacing: 0,
            margin: 0,
        },
        animations: {
            magnifying_glass: [0, 0, "magnifying_glass"],
            top: [2, 2, "top"],
            right: [3, 3, "right"],
            bottom: [4, 4, "bottom"],
            left: [1, 1, "left"],
        },
    };

    var spriteSheetIcons = new createjs.SpriteSheet(icons);

    var mag_glass = new createjs.Sprite(spriteSheetIcons, "magnifying_glass");
    var top_icon = new createjs.Sprite(spriteSheetIcons, "top");
    var right_icon = new createjs.Sprite(spriteSheetIcons, "right");
    var bottom_icon = new createjs.Sprite(spriteSheetIcons, "bottom");
    var left_icon = new createjs.Sprite(spriteSheetIcons, "left");

    mag_glass.name = "icon_mag_glass";
    top_icon.name = "icon_top";
    right_icon.name = "icon_right";
    bottom_icon.name = "icon_bottom";
    left_icon.name = "icon_left";

    mag_glass.addEventListener("click", icon_clickHandler);
    top_icon.addEventListener("click", icon_clickHandler);
    right_icon.addEventListener("click", icon_clickHandler);
    bottom_icon.addEventListener("click", icon_clickHandler);
    left_icon.addEventListener("click", icon_clickHandler);

    var map = new createjs.Bitmap(loadedMap);
    var mapContainer = new createjs.Container();
    var zoomContainer = new createjs.Container();
    var zoomMover = new createjs.Container();

    // update the canvas with the part of the image that has loaded as a background...
    //overlay the smaller image (scaled) on the larger one, like a magnifying glass

    // var citiesMapW = 13124;
    // var citiesMapH = 9600;

    // var bigRect = new createjs.Rectangle(
    //         0,
    //         0,
    //         // map.image.naturalWidth,
    //         // map.image.naturalHeight
    //         map.image.naturalWidth / 6,
    //         map.image.naturalHeight / 6
    //     ),
    //     p = new createjs.Point(0, 0),
    //     mx = new createjs.Matrix2D();

    // var alphaBox = new createjs.Shape();

    //this can be omitted if the container will be filled, and simply clipped.
    // alphaBox.graphics.beginLinearGradientFill(
    //     ["#000000", "rgba(0, 0, 0, 0)"],
    //     [0, 1],
    //     bigRect.x,
    //     bigRect.y,
    //     bigRect.width,
    //     bigRect.height
    // );

    // mx.translate(p.x, p.y);
    // mx.scale(0.33, 0.33);
    // mx.rotate(22.5);

    // var pos = new createjs.Point();
    // stage.on("stagemousedown", function(event) {
    //     pos.setValues(event.stageX, event.stageY);
    // })

    // mask of the whole gradient-- this one is "filled (solid)"
    // alphaBox.graphics
    //     .beginFill("#FF0000")
    //     .drawRect(bigRect.x, bigRect.y, bigRect.width, bigRect.height)
    //     .endFill();

    //this one has a gradient, because it has no "fill"
    // alphaBox.graphics.drawRect(
    //     bigRect.x,
    //     bigRect.y,
    //     bigRect.width,
    //     bigRect.height
    // );
    // alphaBox.cache(bigRect.x, bigRect.y, bigRect.width, bigRect.height);
    // var maskedMap = map;
    // var alphaFilter = new createjs.AlphaMaskFilter(alphaBox.cacheCanvas);
    // maskedMap.filters = [alphaFilter];
    // //this mask x,y must be in tandem with above
    // maskedMap.cache(bigRect.x, bigRect.y, bigRect.width, bigRect.height);

    // alphaBox.transformMatrix = maskedMap.transformMatrix = mx;

    var citiesContainer = new createjs.Container();

    createCitiesMap(
        e,
        citiesContainer,
        loadedMap.naturalWidth,
        loadedMap.naturalHeight
    );

    // full-size image scale adjustment
    var fsMapDims = resizeToKnownDimensions(
        loadedMap.naturalWidth,
        loadedMap.naturalHeight,
        w,
        h
    );
    var MapContainerScaleX = fsMapDims.scaleRatio;
    var MapContainerScaleY = fsMapDims.scaleRatio;

    //cities get the same scale?
    // citiesContainer.scaleX = MapContainerScaleX;
    // citiesContainer.scaleY = MapContainerScaleY;

    citiesContainer.addEventListener("click", function (e) {
        // var clickedCity = e.target.constructor.prototype ;
        var typeName = e.target.constructor.name;
        console.log("e.target.parent: ", e.target.parent);
        console.log("typeName: ", typeName);
        if (typeName === "Shape") {
            createjs.Tween.get(e.target.parent, {
                loop: true,
                override: true,
            })
                .to({ rotation: "-360" }, 1200)
                .call(tweenComplete);

            outputTextClip.updateText(
                e.target.city_info.xPos +
                    ", " +
                    e.target.city_info.yPos +
                    " " +
                    e.target.name
            );
        }
        // activateZoomer(e, stage.mouseX, stage.mouseY, rec.x, rec.y);
    });

    // createdCities.scaleX will be a factor in sizing the final locations.
    //however, the final numbers should be output in two places:
    // an interim location (with calculations)
    // and a "final" location that will house the output locations without squirreling the data

    //image_content.addChild(mapContainer);

    mapContainer.addChild(map);
    mapContainer.addChild(citiesContainer);
    mapContainer.cache(0, 0, loadedMap.naturalWidth, loadedMap.naturalHeight);
    mapContainer.scaleX = MapContainerScaleX;
    mapContainer.scaleY = MapContainerScaleY;
    image_content.addChild(mapContainer);

    var someText = new createjs.Text(
        "thing here",
        "12px 'Press Start 2P'",
        "#FFCC00"
    );

    image_content.addChild(someText);
    //  interactive_content.addChild(outputTextClip);

    //something is wrong with the outputtextclip as it is.
    /*
    TODO: zoom parts:
    display cache of rectangle below at normal size....
    */

    var zoomFrameW = parseInt(256);
    var zoomFrameH = parseInt(256 * 0.75);

    var zoomFrameBtnW = 32;
    var zoomFrameBtnH = 32;
    var zoomFrameLineW = 6;
    var zoomFrameLineH = zoomFrameLineW;

    var zoomContainerBMP = new createjs.Bitmap(mapContainer.cacheCanvas);

    // console.log(zoomContainerBMP);
    // var zoomContainerBMP = new createjs.Bitmap();
    // zoomContainerBMP.cacheCanvas = mapContainer.cacheCanvas;
    // zoomContainerBMP.bitmapCache = zoomContainerBMP.bitmapCache;
    zoomContainerBMP.cache(0, 0, zoomFrameW, zoomFrameH);
    zoomContainerBMP.regX = 0;
    zoomContainerBMP.regY = 0;
    zoomContainerBMP.x = 0;
    zoomContainerBMP.y = 0;
    zoomContainerBMP.name = "map_cache";
    zoomContainerBMP.city_info = {};
    zoomContainerBMP.city_info.MapContainerScaleX = MapContainerScaleX;
    zoomContainerBMP.city_info.MapContainerScaleY = MapContainerScaleY;
    zoomContainerBMP.city_info.fsMapDims = fsMapDims;
    zoomContainerBMP.city_info.origDims = {};
    zoomContainerBMP.city_info.origDims.w = zoomFrameW;
    zoomContainerBMP.city_info.origDims.h = zoomFrameH;

    var zoomFrame = new createjs.Shape();
    var zoomBackground = new createjs.Shape();

    zoomFrame.graphics.beginStroke("#FF0000");
    zoomFrame.graphics.setStrokeStyle(
        zoomFrameLineW,
        "butt",
        "miter",
        10,
        true
    );
    zoomFrame.graphics.drawRect(
        zoomFrameLineW / 2,
        zoomFrameLineW / 2,
        zoomFrameW,
        zoomFrameH
    );
    zoomFrame.setBounds(
        zoomFrameLineW / 2,
        zoomFrameLineW / 2,
        zoomFrameW,
        zoomFrameH
    );

    zoomBackground.graphics.beginFill("#FFFFFF");
    zoomBackground.graphics.drawRect(0, 0, zoomFrameW, zoomFrameH);

    /*
    setStrokeStyle(width, "butt", "miter", 10, true)
    setStrokeStyle(width, caps, joints, miterLimit, ignoreScale)
    width Number
    [caps="butt"] String optional
    [joints="miter"] String optional
    [miterLimit=10] Number optional
    [ignoreScale=false] Boolean optional
*/
    zoomFrame.name = "zoomFrame";
    zoomContainer.name = "zoomContainer";
    zoomContainer.addChild(zoomBackground);
    zoomContainer.addChild(zoomContainerBMP);
    zoomContainer.addChild(zoomFrame);
    zoomContainer.addChild(zoomMover);

    zoomContainer.visible = false;
    zoomContainer.mouseEnabled = false;

    var zoomFrameButtonsContainer = new createjs.Container();
    var zoomFrameButtonContainer0 = new createjs.Container();
    var zoomFrameButtonContainer1 = new createjs.Container();
    var zoomFrameButtonContainer2 = new createjs.Container();
    var zoomFrameButtonContainer3 = new createjs.Container();
    var zoomFrameButtonContainer4 = new createjs.Container();

    var zoomFrameW = zoomFrame.getBounds().width;
    var zoomFrameH = zoomFrame.getBounds().height;

    var btnW = left_icon.getBounds().width;
    var btnH = left_icon.getBounds().height;

    var tPoint = new SmartPoint(
        (zoomFrameW - btnW) / 2,
        zoomFrameLineH / 2 - zoomFrameLineH / 2 - btnH / 2,
        "top_center",
        "this moves north"
    );
    var rPoint = new SmartPoint(
        zoomFrameW - btnW / 2,
        zoomFrameH / 2 - zoomFrameLineH / 2 - btnW / 2,
        "right_center",
        "this moves east"
    );
    var bPoint = new SmartPoint(
        (zoomFrameW - btnH) / 2 + zoomFrameLineW / 2,
        zoomFrameH - zoomFrameLineH / 2 - btnH / 2,
        "bottom_center",
        "this moves south"
    );
    var lPoint = new SmartPoint(
        zoomFrameLineW - btnW / 2,
        zoomFrameH / 2 - zoomFrameLineW / 2 - btnW / 2,
        "left_center",
        "this moves west"
    );

    left_icon.x = lPoint.x;
    left_icon.y = lPoint.y;
    var leftBound = moveZoom.bind("left");
    zoomFrameButtonContainer1.addChild(left_icon);
    zoomFrameButtonContainer1.addEventListener("click", leftBound);
    zoomFrameButtonsContainer.addChild(zoomFrameButtonContainer1);

    right_icon.x = rPoint.x;
    right_icon.y = rPoint.y;
    var rightBound = moveZoom.bind("right");
    zoomFrameButtonContainer2.addChild(right_icon);
    zoomFrameButtonContainer2.addEventListener("click", rightBound);
    zoomFrameButtonsContainer.addChild(zoomFrameButtonContainer2);

    bottom_icon.x = bPoint.x;
    bottom_icon.y = bPoint.y;
    var bottomBound = moveZoom.bind("down");
    zoomFrameButtonContainer3.addChild(bottom_icon);
    zoomFrameButtonContainer3.addEventListener("click", bottomBound);
    zoomFrameButtonsContainer.addChild(zoomFrameButtonContainer3);

    top_icon.x = tPoint.x;
    top_icon.y = tPoint.y;
    var topBound = moveZoom.bind("up");
    zoomFrameButtonContainer4.addChild(top_icon);
    zoomFrameButtonContainer4.addEventListener("click", topBound);
    zoomFrameButtonsContainer.addChild(zoomFrameButtonContainer4);

    zoomFrameButtonContainer0.addChild(mag_glass);
    mag_glass.x = zoomFrameButtonContainer0.x - btnW / 2;
    mag_glass.y = zoomFrameButtonContainer0.y - btnH / 2;
    mag_glass.mouseEnabled = false;
    zoomFrameButtonContainer1.addChild(zoomFrameButtonContainer0);

    var zoomLockBtn = new InteractiveText(
        "zoom\nlock",
        stageBounds.width / 2,
        stageBounds.height / 2,
        "#FFCC00"
    );

    zoomLockBtn.getInstance().addEventListener("click", function () {
        zoomContainer.mouseEnabled = !zoomContainer.mouseEnabled;
        if (zoomContainer.mouseEnabled) {
            zoomLockBtn.updateText("zoom\nlock");
            zoomContainer.mouseEnabled = true;
        } else {
            zoomLockBtn.updateText("zoom\nunlock");
        }
    });

    zoomLockBtn.getInstance().x =
        stageBounds.width -
        zoomLockBtn.getTextInfo().hitAreaW -
        zoomLockBtn.getTextInfo().hitAreaW / 8 -
        fontSize * 0.29;
    zoomLockBtn.getInstance().y = zoomLockBtn.getTextInfo().hitAreaH + 20;

    var zoomButton = new InteractiveText(
        "start zoom",
        stageBounds.width / 2,
        stageBounds.height / 2,
        "#FFCC00"
    );
    zoomButton.getInstance().addEventListener(
        "click",
        function () {
            zoomContainer.visible = !zoomContainer.visible;
            zoomContainer.mouseEnabled = !zoomContainer.mouseEnabled;
            if (zoomContainer.visible) {
                zoomButton.updateText("end zoom");
                zoomContainer.mouseEnabled = true;
            } else {
                zoomButton.updateText("start zoom");
                zoomLockBtn.updateText("zoom\nlock");
            }
        }
        //{ once: true }
    );

    zoomContainer.addChild(zoomFrameButtonsContainer);
    image_content.addChild(zoomButton);
    image_content.addChild(zoomContainer);

    zoomButton.getInstance().y = zoomButton.getTextInfo().hitAreaH / 8;
    zoomButton.getInstance().x =
        stageBounds.width -
        zoomButton.getTextInfo().hitAreaW -
        zoomButton.getTextInfo().hitAreaW / 8;

    zoomContainer.cursor = "pointer";

    zoomContainer.on("mousedown", function (evt) {
        this.offset = { x: this.x - evt.stageX, y: this.y - evt.stageY };
    });

    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    zoomContainer.on("pressmove", dragZoom);

    /*   zoomContainer.on("rollover", function (evt) {
        // this.scale = this.originalScale * 1.2;
        // update = true;
    });

    zoomContainer.on("rollout", function (evt) {
        //  this.scale = this.originalScale;
        // update = true;
    }); */

    /**************************************  XML LOCATIONS */
    var showXMLlocations = new InteractiveText(
        "show XML locations",
        stageBounds.width / 2,
        stageBounds.height / 2,
        "#FFCC00"
    );
    showXMLlocations.getInstance().x =
        stageBounds.width - showXMLlocations.getInstance().getBounds().width;
    showXMLlocations.getInstance().y =
        stageBounds.height - showXMLlocations.getInstance().getBounds().height;
    showXMLlocations.getInstance().addEventListener("click", function () {
        //    handle this with a DOMElement (because of interaction)
        //tasks:
        //toggle UI for xml engagement visible/not
        //show UI for xml engagement
        //      UI for xml engagement should have a "close" button?
        //      UI for xml engagement should have a "copy" button
        //      UI for xml engagement should have a "paste" button
        //      UI for xml engagement should have a "save" button  -- xml to session store
        //      UI for xml engagement on paste, should compare to current xml?
        //                  complications?
        //  UI for engagement shouldn't need to be continually viewed (but why?)
        //build UI for engagement when map loads & createCities is run.
        // ??  disable button for UI engagement UNTIL cities are built (can this happen?)
        //
    });
    /**************************************  END XML LOCATIONS */

    image_content.snapToPixel = true;
    zoomContainer.snapToPixel = true;
}
function updateZoomedCache(e) {
    console.log("updateZoomedCache");
}

function dragZoom(evt) {
    // console.log(" evt.target.parent : ", evt.target.parent);
    // console.log(evt.target.typeName );
    // console.log(evt.target.name);

    var zWin = evt.target.parent;

    if (zWin.name == "zoomContainer") {
        var zFrame = zWin.getChildByName("zoomFrame");
        var zoomFrameW = zFrame.getBounds().width;
        var zoomFrameH = zFrame.getBounds().height;

        var zoomContainerBMP = zWin.getChildByName("map_cache");

        var MapContainerScaleX = zoomContainerBMP.city_info.MapContainerScaleX;
        var MapContainerScaleY = zoomContainerBMP.city_info.MapContainerScaleY;

        var scaledW = 1 / MapContainerScaleX;
        var scaledH = 1 / MapContainerScaleY;
        //var fsMapDims = zoomContainerBMP.city_info.fsMapDims;

        this.movedLoc = {
            x: evt.stageX + this.offset.x,
            y: evt.stageY + this.offset.y,
        };
        this.zoomPoint = new SmartPoint(
            evt.stageX + this.offset.x,
            evt.stageY + this.offset.y,
            "zoom_point"
        );
        this.MappedLoc = this.globalToLocal(this.movedLoc.x, this.movedLoc.y);

        this.MappedZoom = this.globalToLocal(
            zoomFrameW + this.x,
            zoomFrameH + this.y
        );
        // zoomContainerBMP.cacheCanvas = mapContainer.cacheCanvas;
        // zoomContainerBMP.bitmapCache = zoomContainerBMP.bitmapCache;
        //   * (1 / MapContainerScaleX) --- this is the scale of the original map

        zoomContainerBMP.cache(
            this.movedLoc.x / MapContainerScaleX,
            this.movedLoc.y / MapContainerScaleY,
            zoomFrameW,
            zoomFrameH
        );

        this.x = this.movedLoc.x;
        this.y = this.movedLoc.y;

        //sync the movement of the cached bmp
        zoomContainerBMP.regX = this.x * (1 / MapContainerScaleX);
        zoomContainerBMP.regY = this.y * (1 / MapContainerScaleY);
        // indicate that the stage should be updated on the next tick:
        // stage.update();
    }
}

function moveZoom(e) {
    var zWin = e.target.parent.parent.parent;

    if (e.target.parent.parent.parent.name == "zoomContainer") {
        var zFrame = zWin.getChildByName("zoomFrame");
        var zoomFrameW = zFrame.getBounds().width;
        var zoomFrameH = zFrame.getBounds().height;

        var zoomContainerBMP = zWin.getChildByName("map_cache");

        var MapContainerScaleX = zoomContainerBMP.city_info.MapContainerScaleX;
        var MapContainerScaleY = zoomContainerBMP.city_info.MapContainerScaleY;
        // console.log("MapContainerScaleX", MapContainerScaleX);
        //these are backward? They shouldn't be dirivitive? of 1
        var scaledW = MapContainerScaleX;
        var scaledH = MapContainerScaleY;

        if (this == "up") {
            zWin.y -= 10;
        }
        if (this == "down") {
            zWin.y += 10;
        }
        if (this == "left") {
            zWin.x -= 10;
        }
        if (this == "right") {
            zWin.x += 10;
        }

        this.movedLoc = {
            x: zWin.x,
            y: zWin.y,
        };

        console.log("x: ", this.movedLoc.x);

        zoomContainerBMP.cache(
            zWin.x / MapContainerScaleX,
            zWin.y / MapContainerScaleY,
            zoomFrameW,
            zoomFrameH
        );

        zoomContainerBMP.regX = this.movedLoc.x * (1 / MapContainerScaleX);
        zoomContainerBMP.regY = this.movedLoc.y * (1 / MapContainerScaleY);

        // zWin.x += 10;
        // zWin.y += 10;

        // zoomContainerBMP.regX = this.movedLoc.x * (1 / MapContainerScaleX);
        // zoomContainerBMP.regY = this.movedLoc.x * (1 / MapContainerScaleY);
        // zoomContainerBMP.regX = this.movedLoc.x / MapContainerScaleX;
        // zoomContainerBMP.regY = this.movedLoc.x / MapContainerScaleY;
    }
}

function createCitiesMap(e, citiesContainer, mapW, mapH) {
    var cities = e.target.getResult("cities").querySelectorAll("location");
    var towns = [];
    var citiesMapW = mapW;
    var citiesMapH = mapH;
    var insideParenRE = /(?:\()(?:.*?)(?:\))/gm;
    var cityNS = "http://www.w3.org/2000/svg";

    var citySVG = new createjs.Container();

    citySVG.setBounds(0, 0, citiesMapW, citiesMapH);

    var cityRectW = 32;

    var cityRectH = 32;

    var cityRectHalfW = cityRectW / 2;

    cities.forEach(function (param2) {
        // var rectangleColor = "#450067";
        var rectangleColor = "#450067";
        var strokeColor = "#00FF00";
        var townTextColor = "#450067";
        var cityG = new createjs.Container();
        var hasParens = false;
        var parenLocation = 0;
        var location_name =
            param2.getElementsByTagName("location_name")[0].firstChild.data;
        /*
        <root>
            <location>
                <location_name>Tol-in-Gaurhoth (Isle of Werewolves) (Sauron's Isle) (Tol Sirion)</location_name>
                <lattitude>731</lattitude>
                <longitude>159</longitude>
                <legend_code>0</legend_code>
            </location>
        </root>
        */
        parenLocation = location_name.indexOf("(");
        if (!(parenLocation === -1)) {
            hasParens = true;
        }
        if (hasParens) {
            //  var location_first_part = location_name.substring(0, parenLocation);
            // var location_first_part = location_name.matchAll(insideParenRE).split(" ")[0];
            var location_first_part =
                location_name.substring(0, parenLocation).trim() +
                "\n" +
                location_name.match(insideParenRE).join("\n");
            // location_first_part//
        } else {
            var location_first_part = location_name.trim();
        }

        var latitude =
            param2.getElementsByTagName("lattitude")[0].firstChild.data;
        var longitude =
            param2.getElementsByTagName("longitude")[0].firstChild.data;

        location_first_part = location_first_part.trim();
        towns.push(location_first_part);
        towns.push(latitude);
        towns.push(longitude);

        // original Ys seem to be oriented north, rather than south)
        // ie, IronHills are SOUTHeast, rather than NORTHEAST of MountainsofMirkwood
        var rectX = parseInt(longitude * 10) + 220;
        var rectY = parseInt(latitude * 10 * -1 + parseInt(citiesMapH - 600));

        var rec = new createjs.Shape();
        rec.graphics.beginStroke(strokeColor);
        rec.graphics.beginFill(rectangleColor);
        rec.graphics.drawRect(0, 0, cityRectW, cityRectH);

        rec.regX = cityRectW / 2;
        rec.regY = cityRectH / 2;

        rec.x = rectX;
        rec.y = rectY;

        // TODO: have a look at coloring a bitmap thru code:
        // from: https://stackoverflow.com/questions/40717868/easeljs-using-bitmap-for-filling-rectangle

        rec.name = location_first_part;
        rec.city_info = {
            xPos: rectX,
            yPos: rectY,
            name: location_first_part,
        };

        cityG.addChild(rec);

        var textEl = new createjs.Text(
            location_first_part,
            +fontSize * 0.67 + "px " + "American Uncial MN",
            townTextColor
        );

        textEl.x = rectX + cityRectW - fontSize * 0.333 + 16;
        textEl.y = parseInt(rectY - cityRectHalfW);
        cityG.name = "city_group";
        cityG.addChild(textEl);

        cityG.regX = rectX;
        cityG.regY = rectY;

        cityG.x = rectX;
        cityG.y = rectY;

        rec.compositeOperation = "difference";

        citySVG.addChild(cityG);
    });

    citiesContainer.addChild(citySVG);

    return citiesContainer;
}

function tweenComplete() {
    //  do nothing
}

/*██████████████████████████████████████████████████████████████████████████████ */
/*██████████████████████████████████████████████████████████████████████████████ */
/*██████████████████████████████████████████████████████████████████████████████ */
/*██████████████████████████████████████████████████████████████████████████████ */
/*██████████████████████████████████████████████████████████████████████████████ */
function zipZoom() {
    var canvas = document.getElementById("myCanvas");
    var stage = new createjs.Stage("myCanvas");
    console.log("stage.scaleX: ", stage.scaleX);
    console.log("stage.scaleY: ", stage.scaleY);

    function addCircle(r, x, y) {
        var g = new createjs.Graphics()
            .beginFill("#ff0000")
            .drawCircle(0, 0, r);
        var s = new createjs.Shape(g);
        s.x = x;
        s.y = y;

        s.on("pressmove", function (ev) {
            var localpos = stage.globalToLocal(ev.stageX, ev.stageY);
            s.x = localpos.x;
            s.y = localpos.y;
            stage.update();
        });

        stage.addChild(s);
        stage.update();
    }

    // create a rectangle 'background' Shape object to cover the stage
    // (to allow for capturing mouse drags on anything except other shapes).
    bg = new createjs.Shape();
    bg.graphics
        .beginFill("LightGray")
        .drawRect(10, 10, stage.canvas.width - 20, stage.canvas.height - 20);
    //deliberately smaller for debugging purposes (easier to see if it moves).
    bg.x = 0;
    bg.y = 0;
    stage.addChild(bg);
    stage.update();

    //create a rectangle frame to represent the position of the stage.
    stageborder = new createjs.Shape();
    stageborder.graphics
        .beginStroke("Black")
        .drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stageborder.x = 0;
    stageborder.y = 0;
    stage.addChild(stageborder);
    stage.update();

    // MOUSEWHEEL ZOOM LISTENER - anywhere on canvas.
    var factor;
    canvas.addEventListener("wheel", function (e) {
        if (Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)) > 0) {
            factor = 1.1;
        } else {
            factor = 1 / 1.1;
        }

        var local = stage.globalToLocal(stage.mouseX, stage.mouseY);
        stage.regX = local.x;
        stage.regY = local.y;
        stage.x = stage.mouseX;
        stage.y = stage.mouseY;

        stage.scaleX = stage.scaleX * factor;
        stage.scaleY = stage.scaleY * factor;

        bg.graphics.command.w = bg.graphics.command.w / factor;
        bg.graphics.command.h = bg.graphics.command.h / factor;
        console.log("cover width is ", bg.graphics.command.w);

        var localzero = stage.globalToLocal(0, 0);

        bg.x = localzero.x;
        bg.y = localzero.y;

        stage.update();
    });

    canvas.addEventListener("dblclick", function () {
        var localpos = stage.globalToLocal(stage.mouseX, stage.mouseY);
        addCircle(10, localpos.x, localpos.y);
    });

    bg.addEventListener("mousedown", function (ev1) {
        var mousedownPos0 = { x: ev1.stageX, y: ev1.stageY };
        var stagePos0 = { x: stage.x, y: stage.y };
        var bgPos0 = { x: bg.x, y: bg.y };

        bg.addEventListener("pressmove", function (ev2) {
            stageDelta = {
                x: ev2.stageX - mousedownPos0.x,
                y: ev2.stageY - mousedownPos0.y,
            };
            stage.x = stagePos0.x + stageDelta.x;
            stage.y = stagePos0.y + stageDelta.y;

            var localzero = stage.globalToLocal(0, 0);
            bg.x = localzero.x;
            bg.y = localzero.y;

            stage.update();
        });
    });
}

function reportName(theName) {
    console.log("█████████████ name_report");
    console.log(theName);
}

function icon_clickHandler(e) {
    console.log("█████████████ icon_clickHandler");
    //discovery of shape branch, then:
    var icon_choice = e.target.name.toLowerCase();

    /*  switch (icon_choice) {
        case "top":
            // console.log(" go up ");
            reportName(icon_choice);
            break;
        case "bottom":
            // console.log(" go down ");
            reportName(icon_choice);
            break;
        case "left":
            // console.log(" go left ");
            reportName(icon_choice);
            break;
        case "right":
            //go right
            // console.log(" go right ");
            reportName(icon_choice);
            break;
        default:
            // console.log("icon_choice: ", icon_choice);
            break;
    } */
}
