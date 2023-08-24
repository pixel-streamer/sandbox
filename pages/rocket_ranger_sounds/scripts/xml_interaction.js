
var builtXMLUI = false;

function createXMLinteractionUI() {
    if (builtXMLUI === false) {
        console.log("createXMLinteractionUI: ");
        var closeBtn = createHTMLButton("close", null, function () {
            console.log(this);
        });
        var copyBtn = createHTMLButton("copy", null, function () {
            console.log(this);
        });
        var pasteBtn = createHTMLButton("paste", null, function () {
            console.log(this);
        });
        var saveBtn = createHTMLButton("save", null, function () {
            console.log(this);
        });

        xml_locations.appendChild(closeBtn);
        xml_locations.appendChild(copyBtn);
        xml_locations.appendChild(pasteBtn);
        xml_locations.appendChild(saveBtn);
    }
    builtXMLUI = true;
}

function showXMLlocales(e) {
    console.log("showXMLlocales: ", e);
    //    handle this with a DOMElement (because of interaction)
    //tasks:
    //toggle UI for xml engagement visible/not
    //show UI for xml engagement
    //      UI for xml engagement should have a "close" button?
    //      UI for xml engagement should have a "copy" button
    //      UI for xml engagement should have a "paste" button
    //      UI for xml engagement should have a "save" button  -- xml to session store
    //      UI for xml engagement on paste, should compare to current xml?
    //                  complications?
    //  UI for engagement shouldn't need to be continually viewed (but why?)
    //build UI for engagement when map loads & createCities is run.
    // ??  disable button for UI engagement UNTIL cities are built (can this happen?)
    // ??  (does this have to happen?)
    //

    //createHTMLButton (label,config_OBJ,callback)
    createXMLinteractionUI();
}

function updateXMLlocales() {}

function createHTMLButton(label, config_OBJ, callback) {
    var btn = document.createElement("button");
    var btnLabel = document.createTextNode(label);
    console.log("createHTMLButton", btnLabel);
    if (config_OBJ !== null) {
        for (var str in config_OBJ) {
            btn.setAttribute(str, config_OBJ[str]);
        }
    } else {
    }
    btn.appendChild(btnLabel);
    if (callback !== null) {
        var boundFunc = callback; //needs binding function?
        btn.addEventListener("click", boundFunc);
    } else {
    }

    // TODO: needs "for" label information for accessibility
    return btn;
}

function createXMLwindow() {
    var div = document.createElement("div");
    //  appendto : xml_locations
    return div;
}
/**************************************  END XML LOCATIONS *********************/

/************************************* COVERAGE FOR TOOLS **********************************/

function interactionForXMLreadout() {}
/************************************* END COVERAGE FOR TOOLS ******************************/
