function handleFSClick(e) {
    console.log("handleFSClick");
    e = e || window.event;
    var target = e.target || e.srcElement;
    var fsDisplay = target.parentNode.parentNode;
    var fsDisplayCSS = fsDisplay.style.cssText;
    //if (fsDisplayCSS.match("visible"))
    console.log(fsDisplay,fsDisplayCSS);
   /*  if (!fsDisplayCSS.match("visible")) {
        fsDisplayCSS += "hidden";
    } else if (fsDisplayCSS.match("hidden")) {
        fsDisplayCSS.replace("hidden", "visible");
    } */
}

function buildFullSizeDisplay(link_param) {
    console.log(" link: ", link_param);
    var fsDisplay = document.querySelector(".fullsize_display");
    if ((fsDisplay == null) | undefined) {
        var docfrag = document.createDocumentFragment();
        var el = document.createElement("div");
        el.setAttribute("class", "fullsize_display");
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
    /*set the target to the correct target*/
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
}
window.addEventListener("load", hookUpThumbnails);
