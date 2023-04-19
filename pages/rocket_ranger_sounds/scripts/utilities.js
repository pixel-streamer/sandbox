
/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ UTILITY FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

class InteractiveText extends createjs.Text {
    //this is a really crappy, fast class... use the other one.
    constructor(interactivePhrase, atXPos, atYPos, fillCol) {
        super();
        this.userText_xPos = atXPos;
        this.userText_yPos = atYPos;
        // largeText = getGoldenRatio(w) * 0.085;
        largeText = parseInt(
            Math.max(getGoldenRatio(w) * (0.0271 * 2), 32).toPrecision(2)
        ).toString();
        this.lineHeight = parseInt(largeText * 1.125);
        this.gamePlayText;
        this._fontCol = fillCol;
        // this._fontChoice = "16px 'Press Start 2P'";
        this._fontChoice = "32px 'Rum Raisin'";
        this._fontChoice = "24px 'Press Start 2P'";
        this._fontChoice = "24px 'Mystery Quest'";
        //this.fontFamily = "Press Start 2P";
        this.fontFamily = "Mystery Quest";
        // this.fontFamily = "Rum Raisin";
        // this.fontFamily = fontLoader.getItem("Press Start 2P");
        // this.fontFamily = fontLoader._faces("Press Start 2P");

        console.log(" largeText: ", largeText);
        console.log(" this.fontFamily: ", this.fontFamily);
        //  this._fontChoice =  (largeText + "px " + this.fontFamily) ;
        console.log("  this._fontChoice  : ", this._fontChoice);
        this.interactiveTextHitArea = new createjs.Container();
        this.interactiveTextMask = new createjs.Shape();

        this.gamePlayText = new createjs.Text(
            interactivePhrase,
            this._fontChoice,
            this._fontCol
        );
        //:rolleyes: lineheight isn't a percentage of the font.
        this.gamePlayText.set({ lineHeight: this.lineHeight });
        var textMetrics = this.gamePlayText.getMetrics();
        var textW = textMetrics.width;
        var textH = textMetrics.height;
        this.gamePlayText.x = 8;
        this.gamePlayText.y = 8;

        this.interactiveTextMask.graphics
            .beginFill("rgba(0,0,0,.3)")
            .drawRect(0, 0, textW + 16, textH + 16)
            .endFill();

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

        // handle_SoundsRegistry();
        interactive_content.addChild(this.interactiveTextHitArea);
    }
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
        this.interactiveTextHitArea.x =
            this.userText_xPos -
            this.interactiveTextHitArea.getBounds().width / 2;
        this.interactiveTextHitArea.y =
            this.userText_yPos -
            this.interactiveTextHitArea.getBounds().height / 2;
    };
    activate = function () {
        return this.interactiveTextHitArea;
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