/*
from:
https://stackoverflow.com/questions/17242381/html5-canvas-moving-panning-world-with-arrow-keys-in-easeljs


more info on distance formula here:
https://stackoverflow.com/questions/27661920/is-pinch-zoom-supported-in-createjs
(see last function in the comments)

*/

var stage, canvasWidth, canvasHeight;
var world, worldWidth, worldHeight;
var player;
var fpsText;
var DEG_TO_RAD = Math.PI / 180;
playerMoveSpeed = 200; //pixels per second
playerTurnSpeed = 60; //degrees per second
var canvas;

function init() {
    // canvas = document.getElementById("testCanvas");
    // stage = new createjs.Stage("testCanvas");
    canvas = document.getElementById("big_stage");
    stage = new createjs.Stage("big_stage");

    stage.canvas.width = canvasWidth = window.innerWidth;
    stage.canvas.height = canvasHeight = window.innerHeight;
    // worldWidth = 3000; //canvasWidth * 5;
    // worldHeight = 3000; //canvasHeight * 5;
    worldWidth = 640; //canvasWidth * 5;
    worldHeight = 640; //canvasHeight * 5;

    world = new createjs.Container();

    //make afloor for the world so we know when we are near the edge
    var worldShape = new createjs.Shape();
    worldShape.graphics
        .beginFill("#c5dbf7")
        .setStrokeStyle(10)
        .beginStroke("#819ec3")
        .drawRect(0, 0, worldWidth, worldHeight);
    worldShape.x = -worldWidth / 2;
    worldShape.y = -worldHeight / 2;

    //adding this first so it is drawn first, everything else will be on top of this.
    world.addChild(worldShape);

    //move the world to center player in teh middle of the canvas
    world.x = canvasWidth / 2;
    world.y = canvasHeight / 2;

    //create a bunch of random shapes
    for (var i = 0; i < 10; i++) {
        var r = Math.floor(Math.random() * 5) + 1;
        var hue = Math.random() * 360;
        var saturation = 50 + Math.random() * 50;
        var lightness = 75 + Math.random() * 25;
        var shape = new createjs.Shape();

        shape.graphics
            .setStrokeStyle(2)
            .beginFill(createjs.Graphics.getHSL(hue, saturation, lightness))
            .beginStroke(
                createjs.Graphics.getHSL(hue, saturation, lightness / 1.5)
            );

        var w, h;
        switch (r) {
            case 1:
                shape.graphics.drawCircle(0, 0, 50 + Math.random() * 100);
                break;
            case 2:
                w = 50 + Math.random() * 100;
                h = 50 + Math.random() * 100;
                shape.graphics.drawEllipse(-w / 2, -h / 2, w, h);
                break;
            case 3:
                shape.graphics.drawPolyStar(
                    0,
                    0,
                    50 + Math.random() * 10,
                    Math.floor(3 + Math.random() * 5),
                    0.2 + Math.random() * 0.7,
                    Math.random() * 360
                );
                break;
            case 4:
                w = 50 + Math.random() * 100;
                h = 50 + Math.random() * 100;
                shape.graphics.drawRect(-w / 2, -h / 2, w, h);
                break;
            case 5:
                w = 50 + Math.random() * 100;
                h = 50 + Math.random() * 100;
                shape.graphics.drawRoundRect(
                    -w / 2,
                    -h / 2,
                    w,
                    h,
                    5 + Math.random() * 10
                );
                break;
        }

        shape.x = (Math.random() - 0.5) * worldWidth;
        shape.y = (Math.random() - 0.5) * worldHeight;
        shape.rotation = Math.random() * 360;

        //Shows the central point of the shape.
        // shape.graphics
        //     .setStrokeStyle(1)
        //     .moveTo(0, 0)
        //     .beginFill("#FF00FF00")
        //     .beginStroke("#FF00FF")
        //     .drawCircle(0, 0, 10);

        world.addChild(shape);
    }

    //this is the player container and shapes
    player = new createjs.Container();

    var playerShape = new createjs.Shape();
    playerShape.graphics
        .setStrokeStyle(2)
        .beginFill("#1bf338")
        .beginStroke("#14c72c")
        .drawCircle(0, 0, 25)
        .moveTo(25, 0)
        .lineTo(0, 0);

    player.x = 0;
    player.y = 0;
    player.rotation = -90;

    player.addChild(playerShape);
    world.addChild(player);
    stage.addChild(world);

    fpsText = new createjs.Text("-", "20px Arial", "#ff7700");
    fpsText.x = 10;
    fpsText.y = 20;
    fpsText.textBaseline = "alphabetic";

    //we append the counter to the stage NOT the world, as everything in the world gets rotated/transitioned
    stage.addChild(fpsText);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);

    setEventListeners();
}

function tick(event) {
    fpsText.text = createjs.Ticker.getMeasuredFPS().toFixed(2);

    if (
        inputs.moveForwards ||
        inputs.moveBackwards ||
        inputs.moveLeft ||
        inputs.moveRight
    ) {
        var r = player.rotation * DEG_TO_RAD;
        var cos = Math.cos(r);
        var sin = Math.sin(r);

        var tx =
            (inputs.moveForwards ? 1 : 0) + (inputs.moveBackwards ? -1 : 0);
        var ty = (inputs.moveLeft ? 1 : 0) + (inputs.moveRight ? -1 : 0);

        //Normalise the movement so we dont go faster than max speed when moving at a diagonal.
        var m = Math.sqrt(tx * tx + ty + ty);
        if (m > 1) {
            tx = tx / m;
            ty = ty / m;
        }

        if (tx != 0 || ty != 0) {
            player.x +=
                (cos * tx + sin * ty) * playerMoveSpeed * (event.delta / 1000);
            player.y +=
                (sin * tx - cos * ty) * playerMoveSpeed * (event.delta / 1000);
        }
    }

    if (inputs.turnLeft || inputs.turnRight) {
        var tr = (inputs.turnLeft ? 1 : 0) + (inputs.turnRight ? -1 : 0);
        if (tr != 0) {
            player.rotation -= tr * playerTurnSpeed * (event.delta / 1000);
        }
    }

    //make the player the center of the world
    world.regX = player.x;
    world.regY = player.y;

    if (inputs.toggleRotateCamera) {
        inputs.toggleRotateCamera = false;
        rotateCamera = !rotateCamera;
        if (!rotateCamera) {
            world.rotation = 0;
        }
    }
    //rotate the world around the player
    if (rotateCamera) {
        world.rotation = -player.rotation - 90;
    }

    //ZOOM!
    world.scaleX = world.scaleY = zoomLevel;

    //stage.update(event);
}

var rotateCamera = true;
var zoomLevel = 1;
var inputs = {
    turnLeft: false,
    moveForwards: false,
    turnRight: false,
    moveBackwards: false,
    moveLeft: false,
    moveRight: false,
    toggleRotateCamera: false,
};

var keyMappings = [];
keyMappings[37] = "turnLeft"; //left arrow
keyMappings[38] = "moveForwards"; //up arrow
keyMappings[39] = "turnRight"; //right arrow
keyMappings[40] = "moveBackwards"; //down arrow

keyMappings[87] = "moveForwards"; //w
keyMappings[83] = "moveBackwards"; //s
keyMappings[65] = "moveLeft"; // a
keyMappings[68] = "moveRight"; // d

keyMappings[69] = "toggleRotateCamera"; //e

function setEventListeners() {
    document.addEventListener(
        "keydown",
        function (event) {
            event.preventDefault();
            var keyName = keyMappings[event.which];
            if (keyName != undefined) {
                inputs[keyName] = true;
            }
        },
        true
    );

    document.addEventListener(
        "keyup",
        function (event) {
            event.preventDefault();
            var keyName = keyMappings[event.which];
            if (keyName != undefined) {
                inputs[keyName] = false;
            }
        },
        true
    );

    canvas.addEventListener(
        "mousewheel",
        function (event) {
            event.preventDefault();
            // we divide by the existing zoom level so we get a smoother scalling over the entire range.
            zoomLevel -= event.deltaY / (1000 / zoomLevel);
            var min = 0.1,
                max = 5;
            zoomLevel = Math.min(Math.max(min, zoomLevel), max);
        },
        true
    );

    canvas.addEventListener("click", function (event) {
        window.focus();
        canvas.focus();
    });

    window.focus();
    canvas.focus();
}

window.addEventListener("load", init);

/*
stage.on("mousedown", function (evt : createjs.MouseEvent) {
    if (evt.pointerID == 0 || evt.pointerID == -1) { //touch 1 or mouse
        touch1 = new createjs.Point(stage.globalToLocal(evt.stageX, 0).x, stage.globalToLocal(0, evt.stageY).y);
    } else if (evt.pointerID == 1) { //touch 2
        touch2 = new createjs.Point(stage.globalToLocal(evt.stageX, 0).x, stage.globalToLocal(0, evt.stageY).y);
    }
});

stage.on("pressup", function (evt : createjs.MouseEvent) {
    if (evt.pointerID == 0 || evt.pointerID == -1) { //touch 1 or mouse
        touch1 = null;
    } else if (evt.pointerID == 1) { //touch 2
        touch2 = null;
    }
});

stage.on("pressmove", function(evt : createjs.MouseEvent) {
    if (evt.pointerID == -1 || evt.pointerID == 0) {
        var touch = touch1;
    } else if (evt.pointerID == 1) {
        var touch = touch2;
    }

    var dX = stage.globalToLocal(evt.stageX, 0).x - touch.x;
    var dY = stage.globalToLocal(0, evt.stageY).y - touch.y;

    if (touch1 && touch2) var oldDist = distanceP(touch1, touch2);

    touch.x += dX;
    touch.y += dY;

    //if both fingers are used zoom and move the canvas
    if (touch1 && touch2) {
        var newDist = distanceP(touch1, touch2);
        var newZoom = zoom * newDist / oldDist;
        zoomMap(newZoom, new createjs.Point((touch1.x+touch2.x)/2, (touch1.y + touch2.y)/2))

        //if both fingers are used apply only half of the motion to each of them
        dX /= 2;
        dY /= 2;
    }

    map.x += dX;
    map.y += dY;

    stage.update();
});

function distanceP(p1 : createjs.Point, p2 : createjs.Point) : number {
    return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
}
*/
