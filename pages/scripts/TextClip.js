
class TextClip extends createjs.Text {
    constructor() {
        super();
        this.textStr; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textStyle; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textSize; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textFontFamily; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textColor; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.textReference; //these are all set with the makeTextClip function. (and font is all style options combined)
        this.hit;
    }
    makeTextClip(
        textStr,
        textStyle,
        textSize,
        textFontFamily,
        textColor,
        textReference
    ) {
        this.textStr = textStr;
        this.textStyle = textStyle;
        this.textSize = textSize;
        this.textColor = textColor;
        this.textFontFamily = textFontFamily;
        this.textReference = textReference;

        if (this.textClip === undefined) {
            this.textClip = new MovieClip();
            this.textClip.name = this.textStr.toString().split(" ").join("_");
        }
        TextClip.prototype.snapToPixel = true;
        this.set({
            text: this.textStr,
            font:
                this.textStyle +
                " " +
                this.textSize +
                "px" +
                " " +
                this.textFontFamily,
            color: this.textColor,
        });
        this.textClip.clear();
        this.textClip.addChild(this);

        this.hit = new createjs.Shape();
        this.hit.graphics
            .beginFill("#FF0000")
            .drawRect(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
        this.hitArea = this.hit;
        this.textWidth = this.getMeasuredWidth();
        this.textHeight = this.getMeasuredHeight();
        this.textClip.setDims({
            width: this.getMeasuredWidth(),
            height: this.getMeasuredHeight(),
        });
        this.textClip.cache(0, 0, this.textWidth, this.textHeight);
        return this.textClip;
    }
    getDims() {
        return this.textClip.getBounds();
    }
}
