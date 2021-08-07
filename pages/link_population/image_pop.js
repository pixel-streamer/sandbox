function handleFSClick(e) {
    console.log("handleFSClick");
    var target = document.querySelector("#fsdisplay");
    var fsDisplay = target;
    var fsDisplayCSS = fsDisplay.classList;

    if (!fsDisplayCSS.value.match("visible")) {
        fsDisplayCSS.value += " hidden";
    } else if (fsDisplayCSS.value.match("hidden")) {
        fsDisplayCSS.value.replace("hidden", "visible");
    }
}

function buildFullSizeDisplay(link_param) {
    console.log(" link: ", link_param);
    var fsDisplay = document.querySelector(".fullsize_display");
    if ((fsDisplay == null) | undefined) {
        var docfrag = document.createDocumentFragment();
        var el = document.createElement("div");
        el.setAttribute("class", "fullsize_display");
        el.setAttribute("id", "fsdisplay");
        var fsContainer = document.createElement("div");
        fsContainer.setAttribute("class", "fullsize");
        el.appendChild(fsContainer);
        docfrag.appendChild(el);
        var img = new Image();
        img.addEventListener("load", function (e) {
            console.log(e);
            fsContainer.appendChild(img);
            document.body.appendChild(docfrag);
            el.onclick = handleFSClick;
        });
        img.src = link_param;
    } else {
        fsDisplay.innerHTML = "";
        fsDisplay.setAttribute("class", "fullsize_display");
        var fsContainer2 = document.createElement("div");
        fsContainer2.setAttribute("class", "fullsize");
        fsDisplay.appendChild(fsContainer2);

        var img = new Image();
        img.addEventListener("load", function (e) {
            console.log(e);
            fsContainer2.appendChild(img);
        });
        img.src = link_param;
    }
}
function handleThumbClick(e) {
    /*  set the target to the correct target    */
    e = e || window.event;
    var target = e.target || e.srcElement;
    var targetFullsize = target.parentNode.getAttribute("link");
    //  alert(targetFullsize);
    e.preventDefault();
    buildFullSizeDisplay(targetFullsize);
}
function hookUpThumbnails() {
    var thumbnails = document.querySelectorAll(".thumb_link");
    thumbnails.forEach(function (item, index) {
        item.addEventListener("click", handleThumbClick);
    });

    setupMoreCaptions();
}
window.addEventListener("load", hookUpThumbnails);

/* 
Agean Sea, from Aboard the
 */

function setupMoreCaptions() {
    var allScs = document.querySelectorAll(".short_caption");
    allScs.forEach(function (item, index) {
        console.log(item.textContent.toString().length > 20);
       /*  if (item.textContent.toString().length > 20) {
            item.setAttribute("class", "more_caption");
            item.addEventListener("click", showWholeCaption);
        } */
    });
}

function showWholeCaption(e) {
    /*  set the target to the correct target    */
    e = e || window.event;
    var target = e.target || e.srcElement;

    /*  try to set up a click without memory leak */
    switch (true) {
        case target.getAttribute("class", "more_caption"):
            target.setAttribute("class", "short_caption");
            break;
        case target.getAttribute("class", "short_caption"):
            target.setAttribute("class", "more_caption");
            break;
        default:
            break;
    }
}
