/*
from:
https://jsfiddle.net/8EvUX/

staskexchange:
https://stackoverflow.com/questions/21732795/createjs-caching-object-object-now-does-not-animate-on-stage
*/

var background;
var stage;
var mapWidth = 800;
var mapHeight = 600;

function createWorld() {
    stage = new createjs.Stage("world");
    createjs.Ticker.addEventListener("tick", stage);
    background = new createjs.Container();      

    for (var y = 0; y < mapWidth; y+=32) {
        for (var x = 0; x < mapHeight; x+=32) {
            var tile = new createjs.Bitmap('data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLBRYFBQUFDQ8UCRAKIBElFhQRExMYKDQgHxolGyITITEhJSksLi4uHB8zODM4NygtLiwBCgoKDQwNGg4PGisfHyUrLCsrLSs3LDcrNys3Kys3KysrKy4sKywrKyssKyw3KyssKywrKysrKysrKysrKysrK//AABEIACAAIAMBIgACEQEDEQH/xAAYAAEBAAMAAAAAAAAAAAAAAAADAgABB//EAB8QAAIBBAIDAAAAAAAAAAAAAAARAgMSIWETQSIxMv/EABYBAQEBAAAAAAAAAAAAAAAAAAABBP/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwDntOFjy2TWkkFGSN/ekZUPGV3QVGNzyJUnYsNkVJ+sEDEU53vCRMpcW2TWlcsAJyaM5NEU/N9IOMkUj//Z');
            tile.x = x;
            tile.y = y;
            background.addChild(tile);
        }
    }
    background.cache(0, 0, mapWidth, mapHeight);
    stage.addChild(background); 
}

createWorld();