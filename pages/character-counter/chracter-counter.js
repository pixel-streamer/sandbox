var clot = "some stuff \n more stuff\n even-- it doesn't matter. ";

var UI = function () {
    this.te = document.createElement("textarea");
    this.btn = document.createElement("button");
    document.body.append(this.te);
    this.btn.append(document.createTextNode("click it"));
    this.btn.addEventListener("click", countCharacters);
    this.btn._parent = this;
    document.body.append(this.btn);
};

UI.prototype.destroy = function () {
    try {
        clearEl(this.te);
    } catch (noTe) {
        console.log("there was no textarea");
    }
    try {
        clearEl(this.btn);
    } catch (noBtn) {
        console.log("there was no btn");
    }
    this.te = null;
    this.btn = null;
    delete this;
};

function countCharacters(e) {
    console.log("::: countCharacters :::");
    this.removeEventListener("click", countCharacters);
    result = document
        .querySelector("textarea")
        .value.toString()
        .split(" ")
        .join("");

    var outputText = document.createTextNode(
        "your content contained this many characters:" + result.length
    );

    var outputText = document.createTextNode(
        "your content contained this many characters:" + result.length
    );
    document.body.appendChild(outputText);

    console.log(result.length, result);
    this._parent.destroy();
    resetMe();
}

function makeUI() {
    var something = new UI();
}

/*utils:*/
function clearEl(param) {
    if (param == document.body) {
        while (document.body.hasChildNodes()) {
            document.body.removeChild(document.body.firstChild);
        }
    } else {
        if (param.hasChildNodes()) {
            while (param.hasChildNodes()) {
                param.removeChild(param.firstChild);
            }
            param.parentNode.removeChild(param);
        } else {
            param.parentNode.removeChild(param);
        }
    }
}

function init(e) {
    console.clear();
    this.removeEventListener("click", init);
    /*  e.target=null;   ? leave it like this??*/
    clearEl(document.body);
    makeUI();
}

function resetMe() {
    console.log("███ resetMe ███");
    var clickBtn = document.createElement("button");
    clickBtn.append(document.createTextNode("reset me"));
    clickBtn.addEventListener("click", init);
    document.body.append(document.createElement("br"));
    document.body.append(clickBtn);
    //debugger;
}

init();

/*
while(document.body.hasChildNodes()){
document.body.removeChild(document.body.firstChild);
}

var te = document.createElement("textarea");
document.body.append(te);
var clickBtn = document.createElement("button");

clickBtn.append(document.createTextNode("click it"));
clickBtn.addEventListener("click", getSome);
document.body.append(clickBtn);

function getSome(param) {
	this.removeEventListener("click", getSome);
	result = te.value.toString().split("").join("").replace(/\s/g, "");
	console.log(result.length, result);
	return result;
}
*/
