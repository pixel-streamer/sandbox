function handle_MapLoadComplete(e) {
    console.log("██: : :handle_MapLoadComplete: : : ██");

    var loadedMapSm = new createjs.Bitmap(e.target.getResult("interface_sm"));
    // var loadedMap = new createjs.Bitmap(e.target.getResult("interface_img"));
    var loadedMap = loadedMapSm;
    var mapPiece = new createjs.Bitmap();
    var mapContainer = new createjs.Container();
    loadedMap.snapToPixel = true;
    mapPiece = loadedMap.clone();
    // update the canvas with the part of the image that has loaded as a background...
    //overlay the smaller image (scaled) on the larger one, like a magnifying glass

    var citiesMapW = 13124;
    var citiesMapH = 9600;
    mapPiece.cache(
        0,
        0,
        Math.min(loadedMap.image.naturalWidth, citiesMapW),
        Math.min(loadedMap.image.naturalHeight, citiesMapH)
    );
    mapContainer.addChild(mapPiece);

    var ZoomMap = mapPiece.clone();
    /*
    TODO: zoom parts:
    display cache of rectangle below at normal size....
    */
    image_content.addChild(ZoomMap);
}
