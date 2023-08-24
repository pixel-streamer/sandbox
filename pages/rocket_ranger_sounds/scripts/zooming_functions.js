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
            zWin.y -= 5;
        }
        if (this == "down") {
            zWin.y += 5;
        }
        if (this == "left") {
            zWin.x -= 5;
        }
        if (this == "right") {
            zWin.x += 5;
        }

        this.movedLoc = {
            x: zWin.x,
            y: zWin.y,
        };

        // console.log("x: ", this.movedLoc.x);

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

/*██████████████████████████████████████████████████████████████████████████████ */
/*██████████████████████████████████████████████████████████████████████████████ */
/*██████████████████████████████████████████████████████████████████████████████ */
/*██████████████████████████████████████████████████████████████████████████████ */
/*██████████████████████████████████████████████████████████████████████████████ */
