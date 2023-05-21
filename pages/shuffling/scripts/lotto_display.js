// import * as carModVars from "./scripts/card_deck_mod.js";
// import * as shufflerMod from "./scripts/fischer-yates-shuffle_mod.js";

// export const preloader = new createjs.LoadQueue();

const preloader = new createjs.LoadQueue();
let balls_svg,
  balls_svg_defs,
  output,
  card_output,
  deck = [],
  xmlns = "http://www.w3.org/2000/svg",
  allGs,
  elementsArr = [],
  megaPicksArr = [],
  megaTattle = undefined,
  simpleCounter = 0,
  megaBtn,
  shuffleBtn,
  alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

function doShuffle() {
  // deck = shufflerMod.kShuffle(carModVars.makeRegularDeck());
  deck = kShuffle(makeRegularDeck());
  card_output = document.querySelector("#card_output");
  var outputPreFrag = document.createDocumentFragment();
  var outputPre = document.createElement("pre");
  var outputText = "";
  deck.forEach(function (element) {
    outputText += element["name"] + " of " + element["suit"] + " " + "\n"; // element["designation"] + "\n";
  });
  outputPre.textContent = outputText;
  outputPreFrag.appendChild(outputPre);
  card_output.appendChild(outputPreFrag);
}

/*
        function breakStringIntoArray(str) {
          return str.toLowerCase().toString().split("");
        }
      */

const picks_ready_evt = new CustomEvent("picks_ready_evtStr", {
  detail: { msg: "this is the picks are ready event." },
  //window.dispatchEvent(picks_ready_evt);
});
window.addEventListener("picks_ready_evtStr", function (e) {
  //console.log(":::picks_ready_evtStr:::", e.type);
  // console.log(e.detail.msg);
  handler_picks_ready(e);
});
function handler_picks_ready(e) {
  //  slowDraw(megaPicksArr);
  // console.log("::::e.detail.megapicks:::::", e.detail.megapicks);
  // slowDraw(e.detail.megapicks);
  drawBalls(e.detail.megapicks);
  //displayPicks(letterNum, color, indexCounter)
}

const drawball_evt = new CustomEvent("drawball_evtStr", {
  detail: { msg: "this is the drawball event." },
  //window.dispatchEvent(drawball_evt);
});
window.addEventListener("drawball_evtStr", function (e) {
  //console.log(":::drawball_evtStr:::", e.type);
  //console.log(e.detail.msg);
  handler_drawball(e);
});
function handler_drawball(e) {
  // console.log(e.detail.color, e.detail.letterIndex, e.detail.loopIndex);
  displayPicks(e.detail.letterIndex, e.detail.color, e.detail.loopIndex);
}

window.addEventListener("load", handler_beginContentLoad, { once: true });

function handler_beginContentLoad(event) {
  // preloader.addEventListener("fileload", init, { once: true });
  // preloader.addEventListener("fileload", init );
  // preloader.loadFile("./lotto-balls-all.svg");
  // preloader.loadFile("./../lotto_w_fills.svg");

  //lotto_svg
  preloader.on("complete", init);

  preloader.loadManifest({
    manifest: [
      {
        src: "../lotto_w_fills.svg",
        id: "lotto_svg",
        crossOrigin: true,
        type: createjs.Types.SVG,
      },
      // {
      //   src: "./assets/assets_atlas_3.png",
      //   id: "beef",
      //   crossOrigin: true,
      //   type: createjs.Types.IMAGE,
      // },
    ],
  });
}

function drawBalls(param) {
  // console.log(":: drawBalls :: ");
  // console.log("elementsArr: ", elementsArr);
  // console.log("elementsArr[simpleCounter]: ", param[simpleCounter]);
  var color = "GOLD__A";

  //TODO: I'm not sure what's WRONG HERE!
  for (var i = 0; i < param.length; i++) {
    displayPicks(param[simpleCounter], color, simpleCounter);
  }
}

function makeShuffleButton() {
  var buttonHome = document.querySelector("#button_home");
  shuffleBtn = document.createElement("button");
  var shuffleBtn_txt = document.createTextNode("shuffle");
  shuffleBtn.addEventListener("click", doShuffle, { once: true });
  shuffleBtn.appendChild(shuffleBtn_txt);
  buttonHome.appendChild(shuffleBtn);
}

function makeMegaButton() {
  var buttonHome = document.querySelector("#button_home");
  megaBtn = document.createElement("button");
  var megaBtn_txt = document.createTextNode("mega_draw");
  megaBtn.addEventListener("click", doDraw);
  megaBtn.appendChild(megaBtn_txt);
  buttonHome.appendChild(megaBtn);
}

function init(e) {
  // balls_svg = e.result;
  balls_svg_defs = e.target
    .getResult("lotto_svg")
    .getElementsByTagName("defs")[0];

  balls_svg = e.target.getResult("lotto_svg");
  makeShuffleButton();
  makeMegaButton();
}

function doDraw() {
  console.log(":::::doDraw");
  var svgHome = document.querySelector("#output");

  // var newStuff = new Image();
  // newStuff.addEventListener("load", function () {
  //   document.body.appendChild(newStuff);
  // });
  // newStuff.src =
  //   "data:image/svg+xml;" +
  //   "base64," +
  //   window.btoa(unescape(encodeURIComponent(balls_svg.innerHTML)));
  //  console.log("newStuff", newStuff);

  if (!svgHome) {
    //  now add the lotto balls svg to the document if it isn't there
    var svgHouseFrag = document.createDocumentFragment();
    var svgHouse = document.createElement("div");
    var citySVG = document.createElementNS(xmlns, "svg");
    citySVG.setAttributeNS(null, "version", "1.0");
    citySVG.setAttributeNS(null, "viewBox", "0 0 640 96");
    citySVG.setAttributeNS(null, "width", "640");
    citySVG.setAttributeNS(null, "height", "96");
    citySVG.setAttributeNS(null, "id", "ball_wash");
    //citySVG.setAttributeNS(null, "xml:lang", "en");

    //   citySVG.appendChild(balls_svg_defs);
    svgHouse.appendChild(citySVG);

    //balls_svg
    // var svgDefs = balls_svg.querySelectorAll("#lotto_number_defs");
    var svgDefs = balls_svg;

    svgHouse.setAttribute("id", "output");
    svgHouseFrag.appendChild(svgHouse);
    var home = document.querySelector("#megaball_numbers");

    //if the lottoballs haven't already been shown...
    if (home) {
      home.appendChild(svgHouseFrag);
    } else {
      card_output.parentElement.appendChild(svgHouseFrag);
    }
    svgHome = svgHouse;
  }

  //grab all direct decendent elements from within the svg.
  if (allGs === undefined) {
    allGs = svgHouse.querySelectorAll("defs > g");
    allGs.forEach(function (el2) {
      return elementsArr.push(el2);
    });
  }
  if (allGs) {
    var lottoHome = document.querySelector(
      "#megaball_numbers #output #lotto_result"
    );

    //  flushEL(lottoHome);
    simpleCounter = 0;
    console.log("███ simpleCounter", simpleCounter);

    if (document.querySelector("#tattle") !== null) {
      //console.log("flushing");
      var m = document.querySelector("#tattle");
      console.log("tattle", m);
      m.parentElement.removeChild(m);
    }

    //var letters = ["C", "O", "L", "100", "H", "U", "H"];
    //var letters = breakStringIntoArray("cool,huh?");
    var pick5_Arr = undefined;
    var pick1_Arr = undefined;

    pick5_Arr = pick5(5, 70).sort();
    pick1_Arr = pick1(1, 25).sort();

    megaPicksArr = pick5_Arr.concat(pick1_Arr).slice();

    var megaDrawText =
      "megapick numbers should read:  \n" +
      megaPicksArr.slice().join(", ") +
      ".";
    megaTattle = document.createElement("p");
    megaTattle.appendChild(document.createTextNode(megaDrawText));
    megaTattle.setAttributeNS(xmlns, "id", "tattle");
    svgHome.parentNode.appendChild(megaTattle);

    getGoodData(megaPicksArr);

    //slowDraw(megaPicksArr);
    window.dispatchEvent(
      new CustomEvent("picks_ready_evtStr", {
        detail: {
          megapicks: megaPicksArr,
        },
      })
    );
  }
  return false;
}

function getGoodData(param) {
  /* 
  TODO: I want to gut this "program" so that it loads in the SVG completely,
   and then I can work with file to learn other techniques. 
   THIS VERSION 1 works in edge, chrome, and Firefox

   V2:
    save states in cookies to prevent reloads in phones.
  */
  //defs go from 1 to 100, and a-z for each color, gold or blue

  // balls_svg_defs.querySelector("#blue__100")
  // console.log(balls_svg_defs.querySelector(elementsArr[locate].id));

  param.forEach(function (pMem, pIndex) {
    var pName;
    var pStr = parseInt(pMem);
    if (parseInt(pStr === NaN)) {
      pStr = pMem.toUpperCase();
    }
    if (pIndex < 5) {
      pName = "#" + "gold__" + pStr; 
    } else if (pIndex === 5) {
      pName = "#" + "blue__" + pStr; 
    }

    var groupG = document.createElementNS(xmlns, "g");
    groupG = balls_svg_defs.querySelector(pName).cloneNode(true);
    var distX = parseInt(pIndex * 96);
    groupG.setAttributeNS(null, "x", distX);
    groupG.setAttributeNS(null, "y", 0);
    groupG.setAttributeNS(null, "width", 96);
    groupG.setAttributeNS(null, "height", 96);
    groupG.setAttributeNS(
      null,
      "transform",
      "translate(" + distX + " 0) scale(1 1)"
    );

    // putHere.appendChild(balls_svg_defs.querySelector(pName));
    document.querySelector("#ball_wash").appendChild(groupG);
  });

  /* for (var i = 1; i < 101; i++) {
    console.log(balls_svg_defs.querySelector("#" + "gold__" + i));
    console.log(balls_svg_defs.querySelector("#" + "blue__" + i));
  }

  for (var k = 1; k < 26; k++) {
    console.log(balls_svg_defs.querySelector("#" + "gold__" + k));
    console.log(balls_svg_defs.querySelector("#" + "blue__" + k));
  }

  for (var ii = 0; ii < alphabet.length; ii++) {
    console.log(
      balls_svg_defs.querySelector("#" + "gold__" + alphabet[ii].toUpperCase())
    );
    console.log(
      balls_svg_defs.querySelector("#" + "blue__" + alphabet[ii].toUpperCase())
    );
  } */
}

function findLottoBalls(arr, lottoID) {
  var someID = lottoID.toUpperCase();

  lottoID = lottoID.toLowerCase();
  return arr.findIndex(function (lottoBallEl, index2) {
    if (lottoBallEl.id.toLowerCase() === lottoID) {
      return arr[index2].id;
    }
  });
}
/*
      //implement slow iterate for the functions to catch up! something is wrong.
      for some reason, promises don't work. I'm not sure what's wrong.
      */
//modification of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
async function slowDraw(arr) {
  console.log("::: slowDraw :::");
  var littleF = function () {
    console.log("::: littleF :::");
    var lottoBallColor = "GOLD__A";

    //reset the color for the megaball
    if (arr.length === 1) {
      lottoBallColor = "BLUE__A";
    }
    if (arr.length === 0) {
      return false;
    }
    //displayPicks(arr[0], lottoBallColor, arr.length)
    window.dispatchEvent(
      new CustomEvent("drawball_evtStr", {
        detail: {
          color: lottoBallColor,
          letterIndex: arr[0],
          loopIndex: arr.length,
        },
      })
    );
    arr.shift();
    slowDraw(arr);
  };

  await promiseToDisplay(littleF());
}

async function promiseToDisplay(param) {
  return new Promise(function (resolve) {
    var t = setTimeout(function () {
      return resolve(param);
    }, 333); // <-- replace with your desired delay (in milliseconds)
  });
}

async function displayPicks(letterNum, color, indexCounter) {
  // console.log("::: displayPicks :::", letterNum, color, indexCounter);

  var displayF = function () {
    var lottoID = color;
    // var lottoID = "BLUE__A";
    lottoID = lottoID.substring(0, lottoID.length - 1) + letterNum;
    lottoID = lottoID.toLowerCase();

    var locate = findLottoBalls(elementsArr, lottoID);

    if (locate != -1) {
      //console.log( "╫╫╫╫╫╫╫╫locate: ", locate);
      // console.log(
      //   "╫╫╫╫╫╫╫╫╫╫╫╫╫lottoFinalLocate: ",
      //   elementsArr[locate].id
      // );

      var letterUse = document.createElementNS(xmlns, "use");

      letterUse.setAttributeNS(null, "x", parseInt(simpleCounter * 96));
      letterUse.setAttributeNS(null, "y", 0);
      letterUse.setAttributeNS(null, "width", 96);
      letterUse.setAttributeNS(null, "height", 96);
      letterUse.setAttributeNS(null, "href", "#" + elementsArr[locate].id);

      document.querySelector("#output #lotto_result").appendChild(letterUse);

      simpleCounter++;
    }
  };
  await promiseToDisplay(displayF());
}

function returnArbitraryArrOfNums(arbitrary_amt, arbitrary_num) {
  var arb_arr = [];
  var arr_result_a = [];
  var res = [];
  var counter = 0;

  for (var n = 0; n < arbitrary_num; n++) {
    counter++;
    if (counter < 10) {
      var num_str = "0" + counter;
      arb_arr[n] = num_str;
    } else {
      arb_arr[n] = counter.toString();
    }
  }

  for (var i = 0; i < arbitrary_amt; i++) {
    // res = shufflerMod.kShuffle(arb_arr).pop();
    res = kShuffle(arb_arr).pop();
    arr_result_a.push(res);
  }
  return arr_result_a;
}

function pick1(amt, outOf) {
  //pick 1 numbers out of 25
  return returnArbitraryArrOfNums(amt, outOf);
}

function pick5(amt, outOf) {
  //pick 5 numbers out of 70
  return returnArbitraryArrOfNums(amt, outOf);
}

function flushEL(whatEl) {
  while (whatEl.firstChild) {
    whatEl.removeChild(whatEl.firstChild);
  }
}
