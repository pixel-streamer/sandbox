
class SimpleSlide {
    constructor(gallery_config_obj) {
        //store the fullsize image @ naturalWidth, @naturalHeight
        this._fullOrigBlob;
        //store the current thumbnail image @ naturalWidth, @naturalHeight
        this._thumbOriginalBlob;
        //stores the current thumbnail image @ naturalWidth, @naturalHeight
        this._currThumb;
        //stores the current thumbnail (based on thumbnail W and H)
        this._currFullSize;
        //the current _thumbOriginalBlob src string
        this._ThumbSrc;
        //the current _fullOrigBlob src string
        this._FullSrc;
        //the current effect in place to transition the slides in the owl slider.
        this._effectName;
    }
    init() {
        //console.log("██:SimpleSlide init:██");
        /*
        console.log(
            "██:SimpleSlide gallery_config_obj:██",
            this._config
        );
        */
    }
}