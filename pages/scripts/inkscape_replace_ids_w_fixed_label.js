(function () {
    document.querySelectorAll("*[id]").forEach(function (el) {
        var label = el.getAttribute("inkscape:label");
        if (label !== null) {
            label = label.replace(/\W/g, "_");
            var id = label;
            el.setAttribute("id", id);
            el.setAttribute("inkscape:label", label);
            /*
			console.log(
                "label: ",
                el.getAttribute("inkscape:label"),
                "id: ",
                el.getAttribute("id")
            );
			*/
            return el;
        } else {
            return;
        }
    });
})();
