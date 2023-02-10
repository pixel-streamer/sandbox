function init() {
  console.log("this is sounds from a list.");

  //intended_dom_placement, class_list, id_designation

  //TODO:
  //    find a way to have the elements created and returned, in order to
  //    nest them any way that's needed into wherever they need to go....
  //    ie: don't have a renderDom method in the classes, but have a shortener
  //    that allows the same function.
  //    ie: use <thing>.appCh for appendChild
  var thingDiv = new PlainDiv("aclass", "not_tucked");

  var thingP = new PlainTextMessageP(
    "something_jumbo_class",
    "p_id",
    "a very long message from the hello world band."
  );
  //TODO: fix it where the element can be added to the dom.
  document.body.appendChild(thingP.getEl()).appendChild(thingDiv.getEl());
}

window.addEventListener("load", init);

/* 
"Plain" elements use helper: helper_PlainElAttribs
 */

class PlainEl {
  constructor(intended_tag, class_list, id_designation) {
    console.log("this is PlainEl");
    this._intendedTag = intended_tag || null;
    this._class_list = class_list || null;
    this._id_designation = id_designation || null;
    this._element = this.helper_PlainElAttribs.call(
      this,
      this._intendedTag,
      this._class_list,
      this._id_designation
    );
  }
  getEl() {
    return this._element;
  }
  helper_PlainElAttribs() {
    if (this._intendedTag !== null) {
      this._element = document.createElement(this._intendedTag);
    }
    if (this._class_list !== null) {
      this._element.setAttribute("class", this._class_list);
    }
    if (this._id_designation !== null) {
      this._element.setAttribute("id", this._id_designation);
    }
    return this.getEl();
  }
}

class PlainTextMessageP extends PlainEl {
  constructor(class_list, id_designation, text_content) {
    super("p", class_list, id_designation);
    console.log("this is PlainTextMessageP", this);
    this._text_content = text_content || "this has no content.";
    this._text_node = document.createTextNode(this._text_content);
    this._element.appendChild(this._text_node);
  }
}

class PlainDiv extends PlainEl {
  constructor(class_list, id_designation) {
    super("div", class_list, id_designation);
    console.log("this is PlainDiv init", this);
    /*
    //below prompts the user to input a name field that is stored in the "this.name" variable slot,
    //with the "Tom Bombadil" string as the default, should the user not choose to input anything,
    //and dismiss the prompt window.
    
    this.name = prompt("Name, please?:", "Tom Bombadil");
    */
  }
}
