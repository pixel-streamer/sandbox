/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
var big_map;
var big_mapIsLoaded=false;
function loadAssets() {
    //TODO: file load
    console.log("playGame", "loadAssets");
    fileLoader = new createjs.LoadQueue(true);
    fileLoader.on("complete", handle_OLD_MAP_LOAD);

    big_map = document.querySelector("#big_map");

    if (big_map === null || big_map === undefined) { 
        fileLoader.loadManifest({
            manifest: [
                {
                    // already loaded-- see if this helps.
                    src: "./assets/map_whole-sm.jpg",
                    id: "map",
                    crossOrigin: true,
                    type: createjs.Types.IMAGE,
                },
                {
                    src: "./assets/legend-data-pass1_copy.xml",
                    id: "cities",
                    crossOrigin: true,
                    type: createjs.Types.XML,
                },
                {
                    src: "./assets/icon_sheet.png",
                    id: "icons",
                    crossOrigin: true,
                    type: createjs.Types.IMAGE,
                },
            ],
        });
    } else {
        big_mapIsLoaded=true;
        fileLoader.loadManifest({
            manifest: [
                {
                    src: "./assets/legend-data-pass1_copy.xml",
                    id: "cities",
                    crossOrigin: true,
                    type: createjs.Types.XML,
                },
                {
                    src: "./assets/icon_sheet.png",
                    id: "icons",
                    crossOrigin: true,
                    type: createjs.Types.IMAGE,
                },
            ],
        });
    }
}

function playGame() {
    loadAssets();
}

/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF IMAGE LOAD FUNCTIONS ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/
