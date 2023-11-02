/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ UTILITY FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

//use PageTextClip from the SlideGallery.js
//(textContent, txtSize, fontFamily, textColor)
/* class InteractiveText extends createjs.Text {
    //this is a really crappy, fast class... use the other one (where?).
    constructor(interactivePhrase, atXPos, atYPos, fillCol, addWhere) {
        super();
        this.domContainer = addWhere || null;
        this.userText_xPos = atXPos;
        this.userText_yPos = atYPos;
        // largeText = getGoldenRatio(w) * 0.085;
        largeText = parseInt(
            Math.max(getGoldenRatio(w) * (0.0271 * 2), 32).toPrecision(2)
        ).toString();
        this.lineHeight = parseInt(largeText * 1.125);
        this.gamePlayText;
        this._fontCol = fillCol;
        this._fontChoice = "16px 'Press Start 2P'";
        //this._fontChoice = "32px 'Rum Raisin'";
        //this._fontChoice = "24px 'Press Start 2P'";
        //this._fontChoice = "24px 'Mystery Quest'";
        this.fontFamily = "Press Start 2P";
        //this.fontFamily = "Mystery Quest";
        // this.fontFamily = "Rum Raisin";
        // this.fontFamily = fontLoader.getItem("Press Start 2P");
        // this.fontFamily = fontLoader._faces("Press Start 2P");

        //console.log(" largeText: ", largeText);
        //console.log(" this.fontFamily: ", this.fontFamily);
        //  this._fontChoice =  (largeText + "px " + this.fontFamily) ;
        //console.log("  this._fontChoice  : ", this._fontChoice);
        this.interactiveTextHitArea = new createjs.Container();
        this.interactiveTextMask = new createjs.Shape();

        this.gamePlayText = new createjs.Text(
            interactivePhrase,
            this._fontChoice,
            this._fontCol
        ).set({ lineHeight: this.lineHeight });
        //:rolleyes: lineheight isn't a percentage of the font.
        var textMetrics = this.gamePlayText.getMetrics();
        var textW = textMetrics.width;
        var textH = textMetrics.height;
        // this.gamePlayText.x = 8;
        // this.gamePlayText.y = 8;

        this.interactiveTextMask.graphics
            .beginFill("rgba(0,0,0,.3)")
            .drawRect(0, 0, textW + 16, textH + 16);
        // .endFill();
        this.interactiveTextMask.setBounds(0, 0, textW + 16, textH + 16);
        this.interactiveTextHitArea.regX = 0;
        this.interactiveTextHitArea.regY = 0;

        this.interactiveTextHitArea.addChild(this.interactiveTextMask);
        this.interactiveTextHitArea.addChild(this.gamePlayText);

        this.interactiveTextHitArea.x =
            this.userText_xPos -
            this.interactiveTextHitArea.getBounds().width / 2;
        this.interactiveTextHitArea.y =
            this.userText_yPos -
            this.interactiveTextHitArea.getBounds().height / 2;

        this.textInfo = {
            font: this._fontChoice,
            textInfo: this.gamePlayText.getMetrics(),
            textSize: largeText,
            lineHeight: this.lineHeight,
            hitAreaW: this.interactiveTextHitArea.getBounds().width,
            hitAreaH: this.interactiveTextHitArea.getBounds().height,
        };
        // handle_SoundsRegistry();
        this.addToDom();
    }
    addToDom = function () {
        if (this.domContainer === null) {
            //add to a pre-determined container
            interactive_content.addChild(this.interactiveTextHitArea);
        } else {
            this.domContainer.addChild(this.interactiveTextHitArea);
        }
    };
    updateText = function (param) {
        // this.gamePlayText.font = this._fontChoice;
        // this.gamePlayText.text = param;
        // this.gamePlayText.color = this._fontCol;

        this.gamePlayText.set({
            color: this._fontCol,
            font: this._fontChoice,
            text: param,
        });
        var textMetrics = this.gamePlayText.getMetrics();
        var textW = textMetrics.width;
        var textH = textMetrics.height;
        this.interactiveTextMask.graphics
            .clear()
            .beginFill("rgba(0,0,0,.3)")
            .drawRect(0, 0, textW + 16, textH + 16)
            .endFill();
        // this.interactiveTextHitArea.x =
        //     this.userText_xPos -
        //     this.interactiveTextHitArea.getBounds().width / 2;
        // this.interactiveTextHitArea.y =
        //     this.userText_yPos -
        //     this.interactiveTextHitArea.getBounds().height / 2;
    };
    activate = function () {
        return this.interactiveTextHitArea;
    };
    getInstance = function () {
        //duplicate of "activate"
        return this.interactiveTextHitArea;
    };
    getTextInfo = function () {
        return this.textInfo;
    };
}
 */

class SmartPoint extends createjs.Point {
    constructor(x, y, pointName, textStr) {
        super(x, y);
        // new createjs.Point(0, 0)
        this.delta = null;
        this.name = pointName || undefined;
        this.someText = textStr;
    }
}
class SmartVector extends createjs.Point {
    /* 
    //from:
    https://math.stackexchange.com/questions/645672/what-is-the-difference-between-a-point-and-a-vector
 For a course like vector calculus, it is important to keep a good distinction between
 points and vectors. Points correspond to vectors that start at the origin,
 but we may need vectors that start at other points.

For example, given three points A
, B, and C in 3D space, we may want to find the equation of the plane that spans them,
 If we just knew the normal vector n⃗  of the plane, we could write the equation directly
 as n⃗ ⋅(x,y,z)=n⃗ ⋅A. So we need to find that normal n⃗ . To do that, we compute the
 cross product of the vectors AB→ and AC→. If we computed the cross product of A and C

instead (pretending they are vectors in standard position), we could not get the right
normal vector.

For example, if A=(1,0,0)
, B=(0,1,0), and C=(0,0,1), the normal vector of the corresponding plane would not be
parallel to any coordinate axis. But if we take any two of A, B, and C and compute a
cross product, we will get a vector parallel to one of the coordinate axes.  
    */
    constructor(x, y, z, vectorName) {
        super(x, y);
        this.z = z || null;
        this.vector = null;
        this.delta = null;
        this.magnitude = null; //A vector has magnitude (length)
        this.direction = null; //and direction
        this.normal = undefined;
        this.name = vectorName || undefined;
    }
    crossProduct(bx, by, bz) {
        /* 
            from   https://www.mathsisfun.com/algebra/vectors-cross-product.html
            The Cross Product a × b of two vectors is
            another vector that is at right angles to both:

            cross product
            And it all happens in 3 dimensions!

            The magnitude (length) of the cross product equals the area
            of a parallelogram with vectors a and b for sides:
            https://www.mathsisfun.com/algebra/images/cross-product-area.svg

            The cross product (blue) is:

                zero in length when vectors a and b point in the same, or opposite,
                direction reaches maximum length when vectors a and b are at right
                angles

            And it can point one way or the other!

            So how do we calculate it?

            We can calculate the Cross Product this way:

                    cross product with angle and unit vector

                    a × b = |a| |b| sin(θ) n

                    |a| is the magnitude (length) of vector a
                    |b| is the magnitude (length) of vector b
                    θ is the angle between a and b
                    n is the unit vector at right angles to both a and b

            So the length is: the length of "a" times the length of "b" times
            the sine of the angle between "a" and "b",

            Then we multiply by the vector "n" so it heads in the correct direction
            (at right angles to both a and b).

            OR we can calculate it this way:

            cross product components

            When a and b start at the origin point (0,0,0), the Cross Product will end at:

                    Cx = AyBz − AzBy
                    Cy = AzBx − AxBz
                    Cz = AxBy − AyBx

            https://www.mathsisfun.com/algebra/images/cross-product-components.svg


            Example: The cross product of a = (2,3,4) and b = (5,6,7)

                Cx = AyBz − AzBy = 3×7 − 4×6 = −3
                Cy = AzBx − AxBz = 4×5 − 2×7 = 6
                Cz = AxBy − AyBx = 2×6 − 3×5 = −3

            Answer: A × B = (−3,6,−3)

        */
        if (bx.x) {
            //assume a vector has been passed in
            console.log("crossProduct::: ", bx.x, bx.y, bx.z);
            console.log("this members::: ", this.x, this.y, this.z);
            if (bx.name !== undefined) {
                //if the second vector has a name
                return new SmartVector(
                    parseFloat(this.y * bx.z - this.z * bx.y),
                    parseFloat(this.z * bx.x - this.x * bx.z),
                    parseFloat(this.x * bx.y - this.y * bx.x),
                    this.name !== undefined
                        ? this.name + "-" + "cross_product" + "-" + bx.name
                        : "cross_product" + "-" + bx.name
                );
            } else {
                //oh well, there isn't a name for the second vector
                return new SmartVector(
                    parseFloat(this.y * bx.z - this.z * bx.y),
                    parseFloat(this.z * bx.x - this.x * bx.z),
                    parseFloat(this.x * bx.y - this.y * bx.x),
                    this.name !== undefined ? this.name + "-" + "cross_product" + "" : "cross_product" + "--2"
                );
            }
        } else {
            console.log("crossProduct::: ", bx, by, bz);
            console.log("this members::: ", this.x, this.y, this.z);
            return new SmartVector(
                parseFloat(this.y * bz - this.z * by),
                parseFloat(this.z * bx - this.x * bz),
                parseFloat(this.x * by - this.y * bx),
                this.name !== undefined ? this.name + "-" + "cross_product" : "cross_product"
            );
        }
    }
    findNormal() {
        //TODO: get the correct function for calculation of the normal
        //this is BOGUS:
        /*
            this.normal = new SmartVector(1, 1, 1, "normal");
            return this.normal;
        */
        return null;
    }
    dotProduct(bx, by, bz) {
        /* 
            https://www.mathsisfun.com/algebra/vectors-dot-product.html
            (with three inputs-- found it after I'd made it for two-- x and y)
        */
        /*
            from 
            https://www.mathsisfun.com/algebra/vectors-cross-product.html
            Dot Product

            The Cross Product gives a vector answer,
            and is sometimes called the vector product.

            But there is also the Dot Product which gives a scalar
            (ordinary number) answer, and is sometimes called the scalar product.


            ------

            a · b = |a| × |b| × cos(θ)
            a · b = 10 × 13 × cos(59.5°)
            a · b = 10 × 13 × 0.5075...
            a · b = 65.98... = 66 (rounded)

            OR

            a · b = ax × bx + ay × by
            a · b = -6 × 5 + 8 × 12
            a · b = -30 + 96
            a · b = 66

            OR WHEN THREE:
            We have 3 dimensions, so don't forget the z-components:

            a · b = ax × bx + ay × by + az × bz
            a · b = 9 × 4 + 2 × 8 + 7 × 10
            a · b = 36 + 16 + 70
            a · b = 122
        */
        if (bx.x) {
            //assume a vector has been passed in
            console.log("crossProduct::: ", bx.x, bx.y, bx.z);
            console.log("this members::: ", this.x, this.y, this.z);
            //if the second vector has a name
            return parseFloat(this.x * bx.x + this.y * bx.y);
        } else {
            console.log("crossProduct::: ", bx, by, bz);
            console.log("this members::: ", this.x, this.y, this.z);
            return parseFloat(this.x * bx + this.y * by);
        }
    }
}

class DomText {
    //this is a really crappy, fast class... use the other one (where?).
    // assumes that the interactive_content layer from the main stage is available.
    constructor(interactivePhrase, atXPos, atYPos, fillCol) {
        this.gamePlayText;
        this._fontCol = fillCol;
        this._fontChoice = "16px 'Press Start 2P'";
        this.fontFamily = "Press Start 2P";

        this.interactiveDom = document.createElement("p");
        this.gamePlayText = document.createTextNode(interactivePhrase);
        this.interactiveDom.appendChild(this.gamePlayText);

        this.textW = parseInt(this.gamePlayText.toString().split("").length * 16);
        this.textH = this.textW;

        interactive_content.addChild(new createjs.DOMElement(this.interactiveDom));
        //this object will return incorrect data.
        this.textInfo = {
            font: this._fontChoice,
            textInfo: {
                width: 16 * interactivePhrase.toString().split("").length,
                height: 16,
            },
            textSize: undefined,
            lineHeight: undefined,
            hitAreaW: undefined,
            hitAreaH: undefined,
        };
    }
    updateText = function (param) {
        this.gamePlayText = document.createTextNode(param);
        this.interactiveDom.innerHTML = "";
        this.interactiveDom.appendChild(this.gamePlayText);
    };
    activate = function () {
        return this.interactiveTextHitArea;
    };
    getInstance = function () {
        //duplicate of "activate"
        return this.interactiveTextHitArea;
    };
    getTextInfo = function () {
        return this.textInfo;
    };
}

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
    var containerAspect = constraintW / constraintH,
        fullW = contentW,
        fullH = contentH,
        aspect = fullW / fullH,
        imageAspect,
        constraintRatio = constraintW / constraintH,
        constraintAspect,
        newScaleRatio,
        fullMax,
        newCMax,
        constraintMin,
        constraintMax;

    fullMax = Math.max(fullW, fullH);
    constraintMax = Math.max(constraintW, constraintH);
    constraintMin = Math.min(constraintW, constraintH);

    imageAspect = aspect <= 1 ? "portrait" : "landscape";
    constraintAspect = constraintRatio <= 1 ? "portrait" : "landscape";
    aspect === 1 ? (imageAspect = "square") : (imageAspect = imageAspect);
    constraintRatio === 1 ? (constraintAspect = "square") : (constraintAspect = constraintAspect);

    newScaleRatio = constraintMax / fullMax;
    contentW = fullW * newScaleRatio;
    contentH = fullH * newScaleRatio;
    if (imageAspect === constraintAspect) {
        //DO NOTHING
    } else {
        if (contentW > constraintW || contentH > constraintH) {
            // console.log(" ██STILL██ ◄◄..BIGGER..►► (than constraint)");
            newCMax = Math.max(contentW, contentH);
            newScaleRatio = constraintMin / fullMax;
            contentW = fullW * newScaleRatio;
            contentH = fullH * newScaleRatio;
        }
    }

    /* 
    // newCMax = Math.max(contentW, contentH);

    // if (newCMax < constraintMax) {
    //     newScaleRatio = newCMax / constraintMax;
    //     contentW = fullW * newScaleRatio;
    //     contentH = fullH * newScaleRatio;
    // }

      if (fullW === fullH) {
        if (contentW > constraintW) {
            console.log("yeah, its ◘..SAME..◘");
            newScaleRatio = constraintW / fullW;
            contentW = fullW * newScaleRatio;
            contentH = fullH * newScaleRatio;
        }
        if (contentH > constraintH) { 
            console.log("yeah, its ◘..height is larger than constraint..◘");
            newScaleRatio = constraintH / fullH;
            contentW = fullW * newScaleRatio;
            contentH = fullH * newScaleRatio;
        }
    } 
    else {
        if (contentW > constraintW) {
            console.log("yeah, its ◄◄..BIGGER..►► (than constraint)");
            newScaleRatio = constraintW / fullW;
            contentW = fullW * newScaleRatio;
            contentH = fullH * newScaleRatio;
        }
        if (contentH > constraintH) {
            console.log(" ██STILL██ ◄◄..BIGGER..►► (than constraint)");
            newScaleRatio = constraintH / fullH;
            contentW = fullW * newScaleRatio;
            contentH = fullH * newScaleRatio;
        }
    } */
    var result;

    // if (contentW > constraintW || contentH > constraintH) {
    // console.log("yeah boss, it's still ΦTOO BIG↑ ");
    switch (imageAspect) {
        case "square":
            // console.log("imageAspect █..square..█");
            break;
        case "portrait":
            // console.log("imageAspect ▓..portrait..▓");
            break;
        case "landscape":
            // console.log("imageAspect ╔===╗..landscape..╔===╗");
            break;
        default:
            break;
    }
    switch (constraintAspect) {
        case "square":
            // console.log("constraintAspect █..square..█");
            break;
        case "portrait":
            // console.log("constraintAspect ▓..portrait..▓");
            break;
        case "landscape":
            // console.log("constraintAspect ╔===╗..landscape..╔===╗");
            break;
        default:
            break;
    }
    // }

    result = {
        imageAspect: imageAspect,
        aspect: containerAspect,
        scaleRatio: newScaleRatio,
        newW: contentW,
        newH: contentH,
    };
    return result;
}

/*-----------------------------------------*/

function outputHexFromRGBStr(rgb2Hex) {
    /* rgba(69, 0, 103,1); */
    var tempStr = "";
    /* for some reason I couldn't do the two operations on the same line? */
    tempStr = rgb2Hex.substr(rgb2Hex.indexOf("("), rgb2Hex.length);
    tempStr = tempStr.substr(1, tempStr.lastIndexOf(")") - 1);
    //convert to array temporarily
    tempStr = tempStr.split(",");

    var tempRcolorHex = parseInt(tempStr[0].toString(), 10).toString(16);
    var tempGcolorHex = parseInt(tempStr[1].toString(), 10).toString(16);
    var tempBcolorHex = parseInt(tempStr[2].toString(), 10).toString(16);

    tempRcolorHex.toString().length < 2 ? (tempRcolorHex = "0" + tempRcolorHex) : tempRcolorHex;
    tempGcolorHex.toString().length < 2 ? (tempGcolorHex = "0" + tempGcolorHex) : tempGcolorHex;
    tempBcolorHex.toString().length < 2 ? (tempBcolorHex = "0" + tempBcolorHex) : tempBcolorHex;

    var colorVal = "";
    colorVal = "#" + tempRcolorHex + tempGcolorHex + tempBcolorHex;

    //console.log("colorVal: ", colorVal);
    return colorVal;
}

function outputRGBFromHexStr(hex2RBG) {
    //chop off the first char "#"
    var new_hex = hex2RBG.substr(1);
    var colorVal = "";
    colorVal =
        "rgba(" +
        parseInt(new_hex.substr(0, 2), 16) +
        ", " +
        parseInt(new_hex.substr(2, 2), 16) +
        ", " +
        parseInt(new_hex.substr(4, 2), 16) +
        ",1);";

    // console.log(colorVal);
    return colorVal;
}

/*-----------------------------------------*/

/*----------------------- to store items: */

/*sessionStorage.setItem("months", JSON.stringify(months));


for the string version back: 
sessionStorage.getItem("months")
*/

class JSONsessionStore /* implements Web Storage API */ {
    constructor() {
        this.session = sessionStorage; //sets a reference for now.
        this.keyName;
        this.vanillaValue;
    }
    setItem(keyName, vanillaValue) {
        this.keyName = keyName;
        this.vanillaValue = JSON.stringify(vanillaValue);
        this.session.setItem(this.keyName, this.vanillaValue);
    }
    getItem(keyName) {
        return JSON.parse(this.session.getItem(keyName.toString()));
    }
    destroy(keyName) {
        // Remove saved data from sessionStorage
        this.session.removeItem(keyName);
    }
    clearAll() {
        this.session.clear();
    }
}

/* Object.defineProperty(JSONsessionStore.prototype, "key", {
    get: function () {
        //sessionStorage.getItem("key");
        return JSON.parse(this.session.getItem(key));
    },
    set: function (param) {
        this.key = param;
        console.log("trying to set key to ", param);
        this.session.setItem(this.key, param);
    },
    configurable: true,
}); */

/*----------------------- END to store items: ------------------------*/

/*----------------------- EXAMPLE OBJECT STORAGE: --------------------- 
Object.defineProperty(SimpleGallery.prototype, "pageName", {
    get: function () { 
        return pageName;
    },
    set: function (param) {
        pageName = param;
    },
    configurable: true,
});
 --------------------- END EXAMPLE OBJECT STORAGE: -------------------*/

/*----------------------- to log function names: ----------------------*/
//log functions here don't work with creatjs stringify (whah)
/* function getCallerFunctionName(callerObj) {
    var str = callerObj + "\n" + "";
    for (var i in this) {
        if (callerObj == this[i]) {
            return i.toString();
        }
    }
}

function logBegin() {
    var calledBy = getCallerFunctionName(arguments.callee.caller);
    var beginString = ":\t has begun";
    var statString =
        calledBy +
        beginString +
        "," +
        JSON.stringify(arguments.callee.caller.arguments);
   // console.log(statString);
    //specific to this one project:
    var screenLogText = document.createTextNode(statString);
    screen_log.appendChild(screenLogText);
    screen_log.appendChild(document.createElement("br"));
    return statString;
}

function logEnd() {
    var calledBy = getCallerFunctionName(arguments.callee.caller);
    var endingString = ":\t has ended";
    //TODO: look up using JSON.stringify and transmuting the objects from there.
    var statString = calledBy + endingString + " ";
 
    //specific to this one project:
    var screenLogText = document.createTextNode(statString);
    screen_log.appendChild(screenLogText);
    screen_log.appendChild(document.createElement("br"));
    return statString;
} */

/*----------------------- END to log function names: */

/*------------ only in createjs --------------------*/
function getGlobalBounds(child) {
    //from https://stackoverflow.com/questions/49516938/createjs-global-gettransformedbounds
    // this must only work on bitmaps?
    //if (child.image.width) {
    var tl = child.localToGlobal(0, 0);
    var tr = child.localToGlobal(child.image.width, 0);
    var br = child.localToGlobal(child.image.width, child.image.height);
    var bl = child.localToGlobal(0, child.image.height);
    // } else {
    //     var tl = child.localToGlobal(0, 0);
    //     var tr = child.localToGlobal(child.width, 0);
    //     var br = child.localToGlobal(child.width, child.height);
    //     var bl = child.localToGlobal(0, child.height);
    // }

    var minX = Math.min(tl.x, tr.x, br.x, bl.x);
    var maxX = Math.max(tl.x, tr.x, br.x, bl.x);
    var minY = Math.min(tl.y, tr.y, br.y, bl.y);
    var maxY = Math.max(tl.y, tr.y, br.y, bl.y);

    return new createjs.Rectangle(minX, minY, maxX - minX, maxY - minY);
}
//----- example https://jsfiddle.net/2kr23/58/
/*------------ end only in createjs --------------------*/
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF UTILITY FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
// TODO: have a look at coloring a bitmap thru code:
// from: https://stackoverflow.com/questions/40717868/easeljs-using-bitmap-for-filling-rectangle

/* 
///from here: 
// https://stackoverflow.com/questions/29667877/easeljs-domelement-issue-with-devicepixelratio
//this extends DOMElement so that it can be scaled.

var DOMElement = function (htmlElement) {
    this.DOMElement_constructor(htmlElement);

    this.globalScale = CanvasUtils.getScale();

    this.acceleratedCompositing = Modernizr.csstransforms3d;
};
var p = createjs.extend(DOMElement, createjs.DOMElement);

///
 //@override
 // //Overrides default createjs DOMElement.
 // //overrides _handleDrawEnd
 //Sets 3d transform (translateZ)
 //
p._handleDrawEnd = function (evt) {
    var o = this.htmlElement;
    if (!o) {
        return;
    }
    var style = o.style;

    var props = this.getConcatenatedDisplayProps(this._props),
        mtx = props.matrix;

    // use display instead of visibility
    var display = props.visible ? "" : "none";
    if (display != style.display) {
        style.display = display;
    }
    if (!props.visible) {
        return;
    }

    var oldProps = this._oldProps,
        oldMtx = oldProps && oldProps.matrix;
    var n = 10000; // precision

    if (!oldMtx || !oldMtx.equals(mtx)) {
        var str = "";

        if (this.acceleratedCompositing) {
            str += "translateZ(0)";
        }

        str +=
            "matrix(" +
            ((mtx.a * n) | 0) / n / this.globalScale +
            "," +
            ((mtx.b * n) | 0) / n +
            "," +
            ((mtx.c * n) | 0) / n +
            "," +
            ((mtx.d * n) | 0) / n / this.globalScale +
            "," +
            ((mtx.tx + 0.5) | 0) / this.globalScale;

        style.transform =
            style.WebkitTransform =
            style.OTransform =
            style.msTransform =
                str + "," + ((mtx.ty + 0.5) | 0) / this.globalScale + ")";

        style.MozTransform =
            str + "px," + ((mtx.ty + 0.5) | 0) / this.globalScale + "px)";

        if (!oldProps) {
            oldProps = this._oldProps = new createjs.DisplayProps(true, NaN);
        }
        oldProps.matrix.copy(mtx);
    }

    if (oldProps.alpha != props.alpha) {
        style.opacity = "" + ((props.alpha * n) | 0) / n;
        oldProps.alpha = props.alpha;
    }
};

createjs.DOMElement = createjs.promote(DOMElement, "DOMElement");
 */
