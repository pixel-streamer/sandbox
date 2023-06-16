var outputTextClip;
var domElementHome = document.querySelector("#dom_elements");

function name_report(param) {
    // console.log("icon_choice: ", param);
}

function icon_clickHandler(e) {
    //discovery of shape branch, then:
    var icon_choice = e.target.name.toLowerCase();

    switch (icon_choice) {
        case "top":
            // console.log(" go up ");
            name_report(icon_choice);
            break;
        case "bottom":
            // console.log(" go down ");
            name_report(icon_choice);
            break;
        case "left":
            // console.log(" go left ");
            name_report(icon_choice);
            break;
        case "right":
            //go right
            // console.log(" go right ");
            name_report(icon_choice);
            break;
        default:
            // console.log("icon_choice: ", icon_choice);
            break;
    }
}

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

    mag_glass.name = "mag_glass";
    top_icon.name = "top";
    right_icon.name = "right";
    bottom_icon.name = "bottom";
    left_icon.name = "left";

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

    /*createCitiesMap(
e,
citiesContainer,
loadedMap.naturalWidth,
loadedMap.naturalHeight
);
*/

    // var zoomedCityContainer = new createjs.Container();

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

    // var someText = new createjs.Text("thing here", "16px Arial", "#FFCC00");

    var someTextContainer = new createjs.Container();
    // var someTextClickStopper = new createjs.Shape();
    // someTextClickStopper.graphics.drawRect(0, 0, 32, 32);
    var someText = document.createElement("p");
    var someTextProper = document.createTextNode("this is DOMElement text.");
    var domElementTextFormat = "";
    // domElementTextFormat += "selectable:none; ";
    domElementTextFormat += "color: #450067; ";
    domElementTextFormat += "font:normal normal 10px/125% 'Press Start 2P'; ";
    domElementTextFormat += "position:absolute; ";
    domElementTextFormat += "top:0; ";
    domElementTextFormat += "left:0; ";
    domElementTextFormat += "z-index: 12000; ";
    domElementTextFormat += "opacity: 1; ";
    someText.appendChild(someTextProper);
    someText.setAttribute("style", domElementTextFormat);
    someText.setAttribute("class", "no_select");

    domElementHome.appendChild(someText);
    var someTextDOM = new createjs.DOMElement(someText);

    var ghostLayer = ghostStage.getChildByName("ghostLayer");
    ghostLayer.addChild(someTextDOM); 
    ghostLayer.cache(0, 0, w, h);
/* 
ATTEMPTS WITH THE GHOSTLAYER FAILED. 

THEY WERE DEPENDENT ON ASSUMED CACHE METHODS OF THE DOMElement class THAT ENDED
UP BEING NON-APPLICABLE TO THAT CONSTRUCT.

THE GOAL WAS TO HAVE A BITMAP REPRESENTATION OF WHAT WAS IN THE DOMelement TO USE LATER
ON DOWN THE LINE
*/
  /*   var someTextDOMbmp = new createjs.Bitmap();
    someTextDOMbmp.cache(0, 0, w, h);

    console.log("██ cCanvas:", someTextDOMbmp);

    someTextDOMbmp.rotation = -45;
    someTextDOMbmp.x = 88;
    someTextDOMbmp.y = 150;
    image_content.addChild(someTextDOMbmp);
 */
    stage.alpha = 0;

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
    // var zoomContainerBMP = new createjs.Bitmap();
    // zoomContainerBMP.cacheCanvas = mapContainer.cacheCanvas;
    // zoomContainerBMP.bitmapCache = zoomContainerBMP.bitmapCache;
    zoomContainerBMP.cache(0, 0, zoomFrameW, zoomFrameH);
    zoomContainerBMP.regX = 0;
    zoomContainerBMP.regY = 0;
    zoomContainerBMP.x = 0;
    zoomContainerBMP.y = 0;

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
        // zoomButton.activate().visible = false;
        // zoomButton.activate().mouseEnabled = false;
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
    zoomContainer.on("pressmove", function (evt) {
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
        // zoomContainerBMP.cache(
        //     this.movedLoc.x * (1 / MapContainerScaleX),
        //     this.movedLoc.y * (1 / MapContainerScaleY),
        //     this.MappedZoom.x,
        //     this.MappedZoom.y
        // );

        zoomContainerBMP.cache(
            this.movedLoc.x * (1 / MapContainerScaleX),
            this.movedLoc.y * (1 / MapContainerScaleY),
            this.MappedZoom.x,
            this.MappedZoom.y
        );
        this.x = this.movedLoc.x;
        this.y = this.movedLoc.y;
        //sync the movement of the cached bmp
        zoomContainerBMP.regX = this.x * (1 / MapContainerScaleX);
        zoomContainerBMP.regY = this.y * (1 / MapContainerScaleY);
        // indicate that the stage should be updated on the next tick:
        //update = true;
    });

    zoomContainer.on("rollover", function (evt) {
        // this.scale = this.originalScale * 1.2;
        // update = true;
    });

    zoomContainer.on("rollout", function (evt) {
        //  this.scale = this.originalScale;
        // update = true;
    });

    image_content.snapToPixel = true;
    zoomContainer.snapToPixel = true;
}

function dragZoom(e) {
    console.log(e.target.parent !== undefined);
}

function moveZoom(e) {
    console.log("e.target.textContent: ", e.target.textContent);
    var movedLoc = {
        x: e.stageX + e.target.parent.parent.parent.offset.x,
        y: e.stageY + e.target.parent.parent.parent.offset.y,
    };
    // e.target.parent.parent.parent.x = movedLoc.x;
    // e.target.parent.parent.parent.y = movedLoc.y;
    console.log("movedLoc.x, movedLoc.y: ", movedLoc.x, movedLoc.y);

    if (this == "up") {
        e.target.parent.parent.parent.y -= 10;
    }
    if (this == "down") {
        e.target.parent.parent.parent.y += 10;
    }
    if (this == "left") {
        e.target.parent.parent.parent.x -= 10;
    }
    if (this == "right") {
        e.target.parent.parent.parent.x += 10;
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

    // create a rectangle 'background' Shape object to cover the stage (to allow for capturing mouse drags on anything except other shapes).
    bg = new createjs.Shape();
    bg.graphics
        .beginFill("LightGray")
        .drawRect(10, 10, stage.canvas.width - 20, stage.canvas.height - 20); //deliberately smaller for debugging purposes (easier to see if it moves).
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

        //re-size the 'background' shape to be the same as the canvas size.
        bg.graphics.command.w = bg.graphics.command.w / factor;
        bg.graphics.command.h = bg.graphics.command.h / factor;
        console.log("cover width is ", bg.graphics.command.w);

        // re-position the 'background' shape to it's original position of (0,0) in the global space.
        var localzero = stage.globalToLocal(0, 0);

        bg.x = localzero.x;
        bg.y = localzero.y;

        stage.update();
    });

    // listener to add circles to the canvas.
    canvas.addEventListener("dblclick", function () {
        var localpos = stage.globalToLocal(stage.mouseX, stage.mouseY);
        addCircle(10, localpos.x, localpos.y);
    });

    bg.addEventListener("mousedown", function (ev1) {
        // purpose of this listener is to be able to capture drag events on the 'background' to pan the whole stage.
        // it needs to be a separate 'shape' object (rather than the stage itself), so that it doesn't fire when other shape objects are drag-moved around on the stage.

        // get the initial positions of the stage, background, and mousedown.
        var mousedownPos0 = { x: ev1.stageX, y: ev1.stageY };
        var stagePos0 = { x: stage.x, y: stage.y };
        var bgPos0 = { x: bg.x, y: bg.y };

        bg.addEventListener("pressmove", function (ev2) {
            //logic is to pan the stage, which will automatically pan all of it's children (shapes).
            // except we want the 'background' shape to stay where it is, so we need to offset it in the opposite direction to the stage movement so that it stays where it is.
            stageDelta = {
                x: ev2.stageX - mousedownPos0.x,
                y: ev2.stageY - mousedownPos0.y,
            };

            //adjust the stage position
            stage.x = stagePos0.x + stageDelta.x;
            stage.y = stagePos0.y + stageDelta.y;

            // return the 'background' shape to global(0,0), so that it doesn't move with the stage.
            var localzero = stage.globalToLocal(0, 0);
            bg.x = localzero.x;
            bg.y = localzero.y;

            stage.update();
        });
    });
}

/* //testing how to store objects in the session queue:
//test util:
screenLog("testing util begin and end function");
screenLog("something", { response: "thing" });

var JSONsesh = new JSONsessionStore();
// JSONsesh.months =;
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
JSONsesh.setItem("months", months);

screenLog("::: JSONsesh.getItem('months') :::", JSONsesh.getItem("months"));

function screenLog(param) {
    logBegin(); //from utilities
    //fadeIn(mc);
    logEnd(); //from utilities
}
 */
