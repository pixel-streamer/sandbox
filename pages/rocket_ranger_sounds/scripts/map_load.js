function handle_OLD_MAP_LOAD(e) {
    console.log("██: : :handle_ImageLoadComplete: : : ██");

    // var loadedMap = new createjs.Bitmap(e.target.getResult("interface_img"));
    // var loadedMap = e.target.getResult("interface_img");
    var loadedMap = e.target.getResult("map");
    var loadedArrow = new createjs.Bitmap(e.target.getResult("arrow"));

    // var loadedMap = new createjs.Bitmap(e.target.getResult("interface_img"));

    var map = new createjs.Bitmap(loadedMap);
    var mapContainer = new createjs.Container();
    var zoomContainer = new createjs.Container();
    var zoomMover = new createjs.Container();

    // update the canvas with the part of the image that has loaded as a background...
    //overlay the smaller image (scaled) on the larger one, like a magnifying glass

    // var citiesMapW = 13124;
    // var citiesMapH = 9600;

    var citiesContainer = new createjs.Container();
    createCitiesMap(
        e,
        citiesContainer,
        loadedMap.naturalWidth,
        loadedMap.naturalHeight
    );
    var zoomedCityContainer = new createjs.Container();
    var zoomedCities = createCitiesMap(
        e,
        zoomedCityContainer,
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
    mapContainer.scaleX = MapContainerScaleX;
    mapContainer.scaleY = MapContainerScaleY;
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

    /*  zoomedCityContainer.addEventListener("click", function (e) {
        // var clickedCity = e.target.constructor.prototype ;
        var typeName = e.target.constructor.name;
        console.log("e.target.parent: ", e.target.parent);
        console.log("typeName: ", typeName);
        if (typeName === "Shape") {
            outputTextClip.updateText(
                e.target.city_info.xPos +
                    ", " +
                    e.target.city_info.yPos +
                    " " +
                    e.target.name
            );
        }
        // activateZoomer(e, stage.mouseX, stage.mouseY, rec.x, rec.y);
    }); */

    zoomedCityContainer.addEventListener("click", function (e) {
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
    image_content.addChild(mapContainer);

    /*
    TODO: zoom parts:
    display cache of rectangle below at normal size....
    */

    var zoomFrameW = 320;
    var zoomFrameH = 256;

    var zoomFrameBtnW = zoomFrameW / 10;
    var zoomFrameBtnH = zoomFrameH / 4;
    var zoomFrameLineW = 6;

    var zoomContainerBMP = new createjs.Bitmap(loadedMap);
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
    // these cities shouldn't be here-- they should map to the image, and stick with that
    //zoomContainer.addChild(zoomedCityContainer);
    zoomContainer.addChild(zoomFrame);
    zoomContainer.addChild(zoomMover);

    zoomContainer.visible = false;
    zoomContainer.mouseEnabled = false;

    var zoomFrameButtonsContainer = new createjs.Container();
    var zoomFrameButtonContainer = new createjs.Container();
    var zoomFrameButton = new createjs.Shape(); //left side
    var zoomFrameButtonClickTarget = new createjs.Shape(); //left side

    zoomFrameButton.graphics.beginFill("#FF0000");
    zoomFrameButton.graphics.drawRect(0, 0, zoomFrameBtnW, zoomFrameBtnH);
    zoomFrameButton.setBounds(0, 0, zoomFrameBtnW, zoomFrameBtnH);
    zoomFrameButton.regX = zoomFrameLineW / 2;
    zoomFrameButton.regY = zoomFrameButton.getBounds().height / 2;
    zoomFrameButton.x = zoomFrameLineW / 2;
    zoomFrameButton.y = zoomFrame.getBounds().height / 2;

    zoomFrameButtonClickTarget.graphics.beginFill("rgba(0,0,0,0)");
    zoomFrameButtonClickTarget.graphics.drawRect(
        0,
        0,
        zoomFrameBtnW,
        zoomFrameBtnH
    );
    zoomFrameButtonClickTarget.setBounds(0, 0, zoomFrameBtnW, zoomFrameBtnH);
    zoomFrameButtonClickTarget.regX = zoomFrameLineW / 2;
    zoomFrameButtonClickTarget.regY = zoomFrameButton.getBounds().height / 2;
    zoomFrameButtonClickTarget.x = zoomFrameLineW / 2;
    zoomFrameButtonClickTarget.y = zoomFrame.getBounds().height / 2;

    loadedArrow.scaleX = 0.5;
    loadedArrow.scaleY = 0.5;
    loadedArrow.regX = loadedArrow.image.naturalWidth / 2;
    loadedArrow.regY = loadedArrow.image.naturalHeight / 2;
    loadedArrow.x =
        zoomFrameButton.getBounds().width / 2 - zoomFrameButton.x / 2;
    loadedArrow.y = zoomFrameButton.getBounds().height + zoomFrameButton.y / 2;
    loadedArrow.mouseEnabled = false;

    zoomFrameButtonContainer.addChild(zoomFrameButton);
    zoomFrameButtonContainer.addChild(loadedArrow);
    zoomFrameButtonContainer.addChild(zoomFrameButtonClickTarget);
    zoomFrameButtonsContainer.addChild(zoomFrameButtonContainer);
    var button1BoundName = moveZoom.bind("right");
    zoomFrameButtonContainer.addEventListener("click", button1BoundName);

    var zoomFrameButton2 = zoomFrameButtonContainer.clone(true); //top side
    zoomFrameButton2.x =
        zoomFrame.getBounds().width - zoomFrameButton.getBounds().height / 2;
    zoomFrameButton2.y = 0;
    zoomFrameButton2.rotation = 90;
    zoomFrameButtonsContainer.addChild(zoomFrameButton2);
    var button2BoundName = moveZoom.bind("down");
    zoomFrameButton2.addEventListener("click", button2BoundName);

    var zoomFrameButton3 = zoomFrameButtonContainer.clone(true); //right side
    zoomFrameButton3.x = zoomFrame.getBounds().width;
    zoomFrameButton3.y = zoomFrame.getBounds().height;
    zoomFrameButton3.rotation = 180;
    zoomFrameButtonsContainer.addChild(zoomFrameButton3);
    var button3BoundName = moveZoom.bind("left");
    zoomFrameButton3.addEventListener("click", button3BoundName);

    var zoomFrameButton4 = zoomFrameButtonContainer.clone(true);
    zoomFrameButton4.rotation = -90;
    zoomFrameButton4.x =
        (zoomFrame.getBounds().width - zoomFrameButton.getBounds().height) / 4 -
        zoomFrameButton.getBounds().height / 2;
    zoomFrameButton4.y = zoomFrame.getBounds().height;
    zoomFrameButtonsContainer.addChild(zoomFrameButton4);
    var button4BoundName = moveZoom.bind("up");
    zoomFrameButton4.addEventListener("click", button4BoundName);

    var zoomButton = new InteractiveText(
        "start zoom",
        stageBounds.width / 2,
        stageBounds.height / 2,
        "#FFCC00"
    );
    zoomButton.getInstance().addEventListener(
        "click",
        function () {
            // zoomButton.activate().visible = false;
            // zoomButton.activate().mouseEnabled = false;
            zoomContainer.visible = !zoomContainer.visible;
            zoomContainer.mouseEnabled = !zoomContainer.mouseEnabled;
            console.log("do something zoomy");
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

        this.MappedLoc = this.globalToLocal(this.movedLoc.x, this.movedLoc.y);

        this.MappedZoom = this.globalToLocal(
            zoomFrameW + this.x,
            zoomFrameH + this.y
        );

        //   * (1 / MapContainerScaleX) --- this is the scale of the original map
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
        stage.update();
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
}

function dragZoom(e) {
    console.log(e.target.parent !== undefined);
}

function moveZoom(e) {
    console.log(e.target.textContent);
    if (this == "up") {
        e.target.parent.parent.parent.y -= 10;
    }
    if (this == "down") {
        e.target.parent.parent.parent.y += 10;
    }
    if (this == "right") {
        e.target.parent.parent.parent.x += 10;
    }
    if (this == "left") {
        e.target.parent.parent.parent.x -= 10;
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

    var cityRectW = 32 * 3;
    var cityRectH = 32 * 3;

    cities.forEach(function (param2) {
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
        rec.graphics.beginStroke("#450067");
        rec.graphics.beginFill("#450067");
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
            +fontSize + "px " + "American Uncial MN",
            "#000000"
        );

        textEl.x = rectX;
        textEl.y = parseInt(rectY + cityRectH + cityRectH / 2);
        cityG.name = "city_group";
        cityG.addChild(textEl);

        cityG.regX = rectX;
        cityG.regY = rectY;

        cityG.x = rectX;
        cityG.y = rectY;

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
