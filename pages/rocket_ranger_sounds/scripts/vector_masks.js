/*
 ******************************************************************
 ******************************************************************
 ******************************************************************
 */
var outputTextClip;
var layoutLatResultY = 0;
var buttonDynamics = {};

buttonDynamics.textContent = "♠BTN♠";
buttonDynamics.txtSize = 10;
buttonDynamics.fontFamily = "Arial";
buttonDynamics.textColor = "#FFFFFF";
buttonDynamics.fillColor = "#00A0FF";
buttonDynamics.fillOpacity = 100;
buttonDynamics.outlined = true;
buttonDynamics.outlineW = 2;
buttonDynamics.outlineColor = "#00A0FF";
buttonDynamics.outlineHiLiteColor = "#BADA55";
buttonDynamics.textAlign = "center";

function handle_OLD_MAP_LOAD(e) {
    //use PageTextClip from the SlideGallery.js
    // interactivePhrase, atXPos, atYPos, fillCol, addWhere

    /*  TODO: display XML locations for the city data:
 
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

    // mag_glass.addEventListener("click", icon_clickHandler);
    // top_icon.addEventListener("click", icon_clickHandler);
    // right_icon.addEventListener("click", icon_clickHandler);
    // bottom_icon.addEventListener("click", icon_clickHandler);
    // left_icon.addEventListener("click", icon_clickHandler);

    var loadedMap;
    var map;

    if (!big_mapIsLoaded) {
        loadedMap = e.target.getResult("map");
        map = new createjs.Bitmap(loadedMap);
    } else {
        loadedMap = new createjs.Bitmap(big_map);
        map = loadedMap;
    }

    var mapContainer = new createjs.Container();
    var zoomContainer = new createjs.Container();
    var zoomMover = new createjs.Container();
    /* 
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
    */
    outputTextClip = new MapPageButton(
        "city name appears here",
        buttonDynamics.txtSize,
        buttonDynamics.fontFamily,
        buttonDynamics.textColor,
        buttonDynamics.fillColor,
        buttonDynamics.fillOpacity,
        buttonDynamics.outlined,
        buttonDynamics.outlineW,
        buttonDynamics.outlineColor,
        buttonDynamics.outlineHiLiteColor
        // "center"
    );
    outputTextClip.setText("city name appears here");
    // console.log(outputTextClip);

    /*     outputTextClip = new DomText(
        "city name appears here",
        stageBounds.width - 210,
        stageBounds.height - 65,
        //needs to update with the current object, and set the text in a subsequent function
        // stageBounds.width - outputTextClip.getTextInfo.hitAreaW,
        // stageBounds.height - outputTextClip.getTextInfo.hitAreaH,
        "#FFCC00"
        // ).mouseEnabled = false; //using this throws error...
    ); */

    var lodW;
    var lodH;

    if (big_mapIsLoaded) {
        lodW = loadedMap.image.naturalWidth;
        lodH = loadedMap.image.naturalHeight;
        console.log(" lodW,lodH ", lodW, lodH);
    } else {
        lodW = loadedMap.naturalWidth;
        lodH = loadedMap.naturalHeight;
        console.log(" lodW,lodH ", lodW, lodH);
    }

    var citiesContainer = new createjs.Container();

    createCitiesMap(e, citiesContainer, lodW, lodH);

    // full-size image scale adjustment
    var fsMapDims = resizeToKnownDimensions(lodW, lodH, w, h);
    var MapContainerScaleX = fsMapDims.scaleRatio;
    var MapContainerScaleY = fsMapDims.scaleRatio;

    //cities get the same scale?
    // citiesContainer.scaleX = MapContainerScaleX;
    // citiesContainer.scaleY = MapContainerScaleY;

    citiesContainer.addEventListener("click", function (e) {
        var clickedOn = e.target.parent.parent;
        var clickedKid = clickedOn.children[0];
        // console.log(clickedOn);
        // console.log(clickedKid);
        if (e.target.constructor.name === "Shape") {
            // TODO: find the correct "button" that was clicked on!
            // createjs.Tween.get(outputTextClip.getInstanceContainer(), {
            //     loop: true,
            //     override: true,
            // })
            //     .to({ rotation: "-360" }, 1200)
            //     .call(tweenComplete);

            outputTextClip.setText(
                clickedKid.city_info.xPos + ", " + clickedKid.city_info.yPos + " " + clickedKid.name
            );

            var oldY = layoutLatResultY;
            if (
                outputTextClip.getInstanceContainer().y + outputTextClip.getInstanceContainer().getBounds().height >
                stageBounds.height
            ) {
                var newY =
                    outputTextClip.getInstanceContainer().y - outputTextClip.getInstanceContainer().getBounds().height;
                outputTextClip.getInstanceContainer().y = (newY + oldY) / 2;
            } else {
                outputTextClip.getInstanceContainer().y = oldY;
            }
        } else {
            return false;
        }
        // activateZoomer(e, stage.mouseX, stage.mouseY, rec.x, rec.y);
    });

    // createdCities.scaleX will be a factor in sizing the final locations.
    //however, the final numbers should be output in two places:
    // an interim location (with calculations)
    // and a "final" location that will house the output locations without squirreling the data

    mapContainer.addChild(map);
    mapContainer.addChild(citiesContainer);
    mapContainer.cache(0, 0, lodW, lodH);

    // var someText = new PageTextClip(
    //     // (textContent, txtSize, fontFamily, textColor)  // ?? "12px 'Press Start 2P'",
    //     "things here",
    //     "8",
    //     "'Press Start 2P'",
    //     "#FFCC00"
    // );
    /*
    var someText = new MapPageButton(
        "things here",
        buttonDynamics.txtSize,
        buttonDynamics.fontFamily,
        buttonDynamics.textColor,
        buttonDynamics.fillColor,
        // buttonDynamics.fillOpacity,
        65,
        buttonDynamics.outlined,
        buttonDynamics.outlineW,
        buttonDynamics.outlineColor,
        buttonDynamics.outlineHiLiteColor,
        buttonDynamics.textAlign
    );

    someText.getInstanceContainer().x = 16;
    someText.getInstanceContainer().y = 16;
*/
    // layoutLatResultY = stageBounds.height - stageBounds.height / 6.33;
    // layoutLatResultY = showXMLlocations.getInstanceContainer().x;
    layoutLatResultY = outputTextClip.getInstanceContainer().getBounds().height + 125;

    outputTextClip.getInstanceContainer().x =
        stageBounds.width - outputTextClip.getInstanceContainer().getBounds().width;
    outputTextClip.getInstanceContainer().y = layoutLatResultY;

    mapContainer.scaleX = MapContainerScaleX;
    mapContainer.scaleY = MapContainerScaleY;
    image_content.addChild(mapContainer);
    // image_content.addChild(someText.getInstanceContainer());
    image_content.addChild(outputTextClip.getInstanceContainer());
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
    zoomFrame.graphics.setStrokeStyle(zoomFrameLineW, "butt", "miter", 10, true);
    zoomFrame.graphics.drawRect(zoomFrameLineW / 2, zoomFrameLineW / 2, zoomFrameW, zoomFrameH);
    zoomFrame.setBounds(zoomFrameLineW / 2, zoomFrameLineW / 2, zoomFrameW, zoomFrameH);

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

    var zoomLockBtn = new MapPageButton(
        "zoom\nlock",
        buttonDynamics.txtSize,
        buttonDynamics.fontFamily,
        buttonDynamics.textColor,
        buttonDynamics.fillColor,
        // buttonDynamics.fillOpacity,
        65,
        buttonDynamics.outlined,
        buttonDynamics.outlineW,
        buttonDynamics.outlineColor,
        buttonDynamics.outlineHiLiteColor,
        buttonDynamics.textAlign
    );

    zoomLockBtn.getInstanceContainer().x = stageBounds.width / 2;
    zoomLockBtn.y = 65;

    zoomLockBtn.getInstanceContainer().addEventListener("click", function () {
        zoomContainer.mouseEnabled = !zoomContainer.mouseEnabled;
        if (zoomContainer.mouseEnabled) {
            zoomLockBtn.setText("zoom\nlock");
            zoomContainer.mouseEnabled = true;
        } else {
            zoomLockBtn.setText("zoom\nunlock");
        }
    });

    zoomLockBtn.getInstanceContainer().x =
        stageBounds.width -
        zoomLockBtn.getInstanceContainer().getBounds().width -
        zoomLockBtn.getInstanceContainer().getBounds().width / 8 -
        fontSize * 0.29;
    zoomLockBtn.getInstanceContainer().y = zoomLockBtn.getInstanceContainer().getBounds().height + 20;

    var zoomButton = new MapPageButton(
        "start zoom",
        buttonDynamics.txtSize,
        buttonDynamics.fontFamily,
        buttonDynamics.textColor,
        buttonDynamics.fillColor,
        // buttonDynamics.fillOpacity,
        65,
        buttonDynamics.outlined,
        buttonDynamics.outlineW,
        buttonDynamics.outlineColor,
        buttonDynamics.outlineHiLiteColor,
        buttonDynamics.textAlign
    );

    zoomButton.getInstanceContainer().x = stageBounds.width / 2;
    zoomButton.getInstanceContainer().y = stageBounds.height / 2;

    zoomButton.getInstanceContainer().addEventListener(
        "click",
        function () {
            zoomContainer.visible = !zoomContainer.visible;
            zoomContainer.mouseEnabled = !zoomContainer.mouseEnabled;
            if (zoomContainer.visible) {
                zoomButton.setText("end zoom");
                zoomContainer.mouseEnabled = true;
            } else {
                zoomButton.setText("start zoom");
                zoomLockBtn.setText("zoom\nlock");
            }
        }
        //{ once: true }
    );

    zoomContainer.addChild(zoomFrameButtonsContainer);
    image_content.addChild(zoomButton.getInstanceContainer());
    image_content.addChild(zoomLockBtn.getInstanceContainer());
    image_content.addChild(zoomContainer);

    zoomButton.getInstanceContainer().y = zoomButton.getInstanceContainer().getBounds().height / 8;
    zoomButton.getInstanceContainer().x =
        stageBounds.width -
        zoomButton.getInstanceContainer().getBounds().width -
        zoomButton.getInstanceContainer().getBounds().width / 8;

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

    /**************************************  XML LOCATIONS *********************/

    var showXMLlocations = new MapPageButton(
        // (textContent, txtSize, fontFamily, textColor)  // ?? "12px 'Press Start 2P'",
        "show XML locations",
        buttonDynamics.txtSize,
        buttonDynamics.fontFamily,
        buttonDynamics.textColor,
        buttonDynamics.fillColor,
        // buttonDynamics.fillOpacity,
        65,
        buttonDynamics.outlined,
        buttonDynamics.outlineW,
        buttonDynamics.outlineColor,
        buttonDynamics.outlineHiLiteColor,
        "center"
    );

    showXMLlocations.setText(" show XML locations ");

    showXMLlocations.getInstanceContainer().x = zoomLockBtn.getInstanceContainer().x - 48;
    showXMLlocations.getInstanceContainer().y =
        zoomLockBtn.getInstanceContainer().y + zoomLockBtn.getLabelHeight() + 32;

    showXMLlocations.getInstanceContainer().addEventListener("click", showXMLlocales);

    // image_content.snapToPixel = true;
    // zoomContainer.snapToPixel = true;

    // w, h, x, y, fillColor, fillOpacity, sides, size
    //rotation tweaks the shape to rotate it
    var numSides = 8;
    var rotation = Math.degrees(Math.radians(45)); //45 is good for rectangles
    // var dinky = new DrawnShape(45, 120, 65, 120, "#FF00FF", 100, numSides, 10 / 2, rotation);
    var dinky = new DrawnShape(50, 120, 0, 0, "#FF00FF", 100, numSides, 10, rotation);

    var sq = new createjs.Shape();
    sq.graphics.clear().beginFill("#450067").drawRect(25, 25, 10, 10).endFill();
    sq.setBounds(0, 0, 10, 10);
    sq.regX = 0;
    sq.regY = 0;
    sq.x = 1;
    sq.y = 1;

    dinky.x = 20;
    dinky.y = 20;

    image_content.addChild(sq);
    image_content.addChild(dinky);
    image_content.addChild(showXMLlocations.getInstanceContainer());
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
        var location_name = param2.getElementsByTagName("location_name")[0].firstChild.data;
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
                location_name.substring(0, parenLocation).trim() + "\n" + location_name.match(insideParenRE).join("\n");
            // location_first_part//
        } else {
            var location_first_part = location_name.trim();
        }

        var latitude = param2.getElementsByTagName("lattitude")[0].firstChild.data;
        var longitude = param2.getElementsByTagName("longitude")[0].firstChild.data;

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

        // var textEl = new PageTextClip(
        //     location_first_part,
        //     fontSize * 0.67,
        //     "American Uncial MN",
        //     townTextColor,
        //     "left"
        // );

        var textEl = new MapPageButton(
            location_first_part,
            fontSize * 0.67 * 0.67,
            "American Uncial MN",
            buttonDynamics.textColor,
            // buttonDynamics.fillColor,
            "#222288",
            // buttonDynamics.fillOpacity,
            65,
            buttonDynamics.outlined,
            buttonDynamics.outlineW,
            buttonDynamics.outlineColor,
            buttonDynamics.outlineHiLiteColor,
            "center"
        );

        textEl.getInstanceContainer().x = parseInt(rectX + cityRectW - fontSize * 0.333 + 8);
        textEl.getInstanceContainer().y = parseInt(rectY - cityRectHalfW);
        cityG.name = "city_group";
        cityG.addChild(textEl.getInstanceContainer());

        cityG.regX = rectX;
        cityG.regY = rectY;

        cityG.x = rectX;
        cityG.y = rectY;

        rec.compositeOperation = "difference";

        citySVG.addChild(cityG);

        // TODO: update the xml location when changed
    });

    citiesContainer.addChild(citySVG);

    return citiesContainer;
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
