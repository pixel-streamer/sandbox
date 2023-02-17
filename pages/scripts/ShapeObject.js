class ShapeObject extends createjs.Shape {
    constructor() {
        super();
        this.instance;
        //
        //
        if (this.instance === undefined) {
            this.instance = this;
            this.init();
        }
    }
    init() {
        if (this.instance === undefined) {
            this.instance = new createjs.Shape();
            console.log("ShapeObject:::::::: ");
        }
        return this.instance;
    }
    drawBox(x, y, x1, y1, color) {
        // <visual>.drawBox(0, 0, getNumberResized(10), getNumberResized(10),"#FF0000");
        this.instance.graphics.beginFill(color);
        this.instance.graphics.drawRect(x, y, x1, y1);
        this.instance.graphics.endFill();
        this.instance.setBounds(x, y, x1, y1);
    }
    redraw(centerOfW, centerOfH) {
        this.instance.x = parseInt(centerOfW / 2);
        this.instance.y = parseInt(centerOfH / 2);
    }
}
