
/* █████ */
 
    // Created for
    // http://stackoverflow.com/questions/26927051/createjs-masking-images-behind-the-bask
	//https://lab.gskinner.com/magnifier

    var stage = new createjs.Stage("canvas");
    stage.on("resize", handleResize);

    // Load the image so we can reference it below
    var src = glab.Capabilities.isIOS ? "image2.jpg" : "image.jpg";
    var loader = new createjs.LoadQueue(true, null, true);
    loader.on("progress", handleProgress);
    loader.on("fileload", handleComplete);
    loader.loadFile(src);

    window.addEventListener("mousemove", handleMouseMove, false);

	var bmp, magnifier,
		bitmapFill,
		scale = 0.5, radius = 200,
		pos,
		endListener = null, moveListener = null;

    function handleProgress(event) {
        LabTemplate.loadProgress(event.progress);
    }

    function handleMouseMove(event) {
        console.log(event.clientX, event.clientY);
    }

    function handleComplete(event) {
        image = event.result;
        bmp = new createjs.Bitmap(image).set({scaleX: scale, scaleY: scale}); // underlying image

        magnifier = new createjs.Shape().set({x:100,y:100});
        if (true || !LabTemplate.isMobile) {
            magnifier.shadow = new createjs.Shadow("#000", 0,0,10);
        }

        createMagnifier(null, false);

        stage.addChild(bmp, magnifier);

        LabTemplate.setupStageResize(stage);

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on("tick", tick);
        stage.on("stagemousedown", startDrag);
        createjs.Touch.enable(stage);

        LabTemplate.loadComplete();
    }

// Drag interactions (mainly to support mobile)
    function startDrag(event) {
        stage.off("stagemousemove", moveListener);
        stage.off("stagemousemove", endListener);

        endListener = stage.on("stagemouseup", endDrag);
        moveListener = stage.on("stagemousemove", doDrag);
        pos = new createjs.Point(event.stageX, event.stageY);
    }
    function doDrag(event) {
        pos.setValues(event.stageX, event.stageY);
    }
    function endDrag() {
        stage.off("stagemousemove", moveListener);
        stage.off("stagemousemove", endListener);
        moveListener = endListener = pos = null;
    }

// Only update the actual content on tick
    function tick(event) {
        // Position the magnifier at the mouse's stage position.
        var p = pos || new createjs.Point(stage.mouseX, stage.mouseY);

        if (p.x == magnifier.x && p.y == magnifier.y) { return; }
        magnifier.set(p);

        var newScale = 1;
        if (scale > 0.6) {
            newScale = 2; // Double the size of magnification on super large screens
        }

        // Translate the magnifier fill
        var mx = new createjs.Matrix2D();
        mx.translate((-p.x + bmp.x)/scale*newScale, (-p.y + bmp.y)/scale*newScale);
        mx.scale(newScale,newScale);
        bitmapFill.matrix = mx;

        stage.update();
    }

// Create different magnifier shapes
    function createMagnifier(type, update) {
        if (type == null) { type = "circle"; }
        var g = magnifier.graphics.clear().f("#090909");

        var r = radius;
        switch (type) {
            case "circle":
                g.dc(0,0,r/2);
                bitmapFill = g.bf(image, "no-repeat").command;
                g.dc(0,0,r/2);
                break;

            case "square":
                g.dr(-r/2,-r/2,r,r);
                bitmapFill = g.bf(image, "no-repeat").command;
                g.dr(-r/2,-r/2,r,r);
                break;

            case "star":
                g.dp(0,0, r, 5, 0.6, -90);
                bitmapFill = g.bf(image, "no-repeat").command;
                g.dp(0,0, r, 5, 0.6, -90);
                break;

            default: return;
        }

        // When changed on mobile, a refresh is required
        if (update != false) {
            magnifier.x = magnifier.y = 0;
            tick();
        }
    }

// On resize, determine a new scale/position for the background
    function handleResize(event) {
        var w = event.size.width,
                h = event.size.height,
                iw = bmp.image.width,
                ih = bmp.image.height;

        scale = Math.max(w/iw, h/ih)
        bmp.scaleX = bmp.scaleY = scale;

        bmp.x = w - iw*scale >> 1;
        bmp.y = h - ih*scale >> 1;
    }



/* █████ */