class MovieClip extends createjs.MovieClip {
    constructor() {
        super();
        this.movieClip;
        this.name = "mc_" + Math.floor(Math.random() * 1000);

        if (this.movieClip === undefined) {
            this.movieClip = this;
            this.init();
        }
        this.width;
        this.height;
    }
    clear() {
        this.removeAllChildren();
        //  this.movieClip.removeAllChildren();
        // this.movieClip.cache(0, 0, this.movieClip.width, this.movieClip.height);
    }

    init() {
        if (this.movieClip === undefined) {
            this.movieClip = new createjs.MovieClip();
            //  this.movieClip.setBounds
            console.log("MovieClip:::::::: ", this.width, this.height);
        }
        return this.movieClip;
    }
    setDims(param) {
        this.width = param.width;
        this.height = param.height;
    }
}