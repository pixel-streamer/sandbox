function buildFullSizeDisplay(link_param) {
    // fullsize_display
    console.log(" link: ", link_param);
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
