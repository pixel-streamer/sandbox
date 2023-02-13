function init() {
  console.log("this is sounds from a list.");

  //intended_dom_placement, class_list, id_designation

  /* 
  research canvasjs blur, so that the background we use can look lit, just with a blurred white oval.
  */
  //var galleryDiv = new PlainDiv("aclass", "not_tucked").getEl();
  var galleryDiv = document.querySelector("#testCanvas");

  var galleryImageLinks = [
    {
      image_link_class: "aclass",
      image_link_id: "not_tucked",
      image_link_text: "see the halloween skull",
      image_link_url:
        "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/haphalloween.jpg",
    },
    {
      image_link_class: "aclass",
      image_link_id: "not_tucked",
      image_link_text: "see the snuff can animation",
      image_link_url:
        "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/animations/snuff.gif",
    },
   /*  {
      image_link_class: "aclass",
      image_link_id: "not_tucked",
      image_link_text: "see an early coke bottle",
      image_link_url:
        "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/bottle.jpg",
    }, */
    {
      image_link_class: "aclass",
      image_link_id: "not_tucked",
      image_link_text: "see an early coke bottle",
      image_link_url:
        "https://pixel-streamer.github.io/sandbox/pages/images/thumbs/coke-bottle-render-t.png",
    },
    {
      image_link_class: "aclass",
      image_link_id: "not_tucked",
      image_link_text: "see the final coke bottle",
      image_link_url:
        "https://pixel-streamer.github.io/sandbox/pages/images/fullsize/3d_renders/coke-bottle-render.png",
    },
  ];

  function makeGalleryLinks() {
    galleryImageLinks.forEach(function (el, index) {
      var link = new PlainLinkedAnchor(
        el.image_link_class,
        el.image_link_id,
        el.image_link_text,
        el.image_link_url
      );
      galleryDiv.appendChild(link.getEl());
      galleryDiv.appendChild(new PlainEl("br", null, null).getEl());
    });
  }
  
  var thingP = new PlainTextMessageP(
    "something_jumbo_class",
    "p_id",
    "a very long message from the hello world band."
  ).getEl();
  
  //document.body.appendChild(thingP).appendChild(galleryDiv);
  galleryDiv.appendChild(thingP);
  galleryDiv.appendChild(document.createTextNode("here's some rouge text."));
  galleryDiv.appendChild(
    new PlainEl("div", "wonderful_class", "wonderful_id").getEl()
  );
  galleryDiv.appendChild(
    document.createTextNode(
      "and here's some MORE rogue text after the first entry."
    )
  );
  galleryDiv.appendChild(new PlainEl("br", null, null).getEl());
  makeGalleryLinks();
}

class PlainEl {
  constructor(intended_tag, class_list, id_designation) {
    // console.log("this is PlainEl");
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
    //console.log("this is PlainTextMessageP", this);
    this._text_content = text_content || "this has no content.";
    this._text_node = document.createTextNode(this._text_content);
    this._element.appendChild(this._text_node);
  }
}

class PlainLinkedAnchor extends PlainEl {
  /* 
  this class creates dom elements when the anchor is clicked, bypassing the normal
  function of the link.
  Clicking doesn't go to a location. Clicking the link builds a pseudo-window that
  operates like a lightbox; it displays the content of the link in a clickable,
  modal space that is as large as the view space.
  */
  constructor(class_list, id_designation, text_content, url) {
    super("a", class_list, id_designation);
    //console.log("this is PlainTextMessageP", this);
    this._text_content = text_content || "this has no content.";
    this._url = url || "this has no url.";
    this._text_node = document.createTextNode(this._text_content);
    this._element.setAttribute("href", this._url);
    this._element.appendChild(this._text_node);
    var _self = this;
    // this._linkBound = this.buildLinkLightbox.bind(_self);
    this._element.addEventListener("click", this.buildLinkLightbox);

    this._lightBox = document.createElement;
  }

  buildLinkLightbox(e) {
    /* 
    TODO:
    this needs to be a "lightBox" class.
    */
    console.log("you've just clicked on this: ", e.target.href);
    e.preventDefault();
    let light_boxContainer;
    let lightBoxHome = document.querySelector("#testCanvas");
    let lightBoxHomeTrash = document.querySelector("#light_box");
    if (lightBoxHomeTrash) {
      lightBoxHomeTrash.removeEventListener("click", toggleVisible);
      lightBoxHomeTrash.outerHTML = "";
    }

    let lightboxModal = new PlainDiv(
      "custom_lightbox_modal",
      "light_box"
    ).getEl();

    lightBoxHome.appendChild(lightboxModal);
    let lightbox = new PlainDiv(
      "custom_lightbox_window",
      "light_box_window"
    ).getEl();
    lightboxModal.appendChild(lightbox);
    let spotlight_box = new PlainDiv("spotlight_box", null).getEl();
    lightbox.appendChild(spotlight_box);
    let spotlightImage = new Image();

    console.log("::: this :::", this);

    spotlightImage.addEventListener("load", function () {
      spotlight_box.appendChild(this);
      this.setAttribute("class", "lightbox_img spotlight_fullsize");
    });
    spotlightImage.src = e.target.href;
    light_boxContainer = document.querySelector(".custom_lightbox_modal");
    light_boxContainer.addEventListener("click", toggleVisible);
  }
}

function toggleVisible(e) {
  //"change style to: 'suppressed'"
  if (e) {
    console.log("this is going to hide: ", e.target);
  } else {
    console.log("this is going to hide: ", this);
  }
  this.classList.toggle("suppressed");
}

class PlainDiv extends PlainEl {
  constructor(class_list, id_designation) {
    super("div", class_list, id_designation);
    //console.log("this is PlainDiv init", this);
    /*
    (reference for an input field with a prompt. It was new to the author.)
    //below prompts the user to input a name field that is stored in the "this.name" variable slot,
    //with the "Tom Bombadil" string as the default, should the user not choose to input anything,
    //and dismiss the prompt window.
    
    this.name = prompt("Name, please?:", "Tom Bombadil");
    */
  }
}

window.addEventListener("load", init);

/* 
 func:
 use preloader to load list for page use. 

 Crawling the dom won't be done right now, but that's something that needs to be researched.
 how does one crawl the dom of the canvas in createjs?

 add animation after preloader fetches it.

 use a loading bar to show how much of the content is being loaded.

 
 */
