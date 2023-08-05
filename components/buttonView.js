import View from "./View.js";
const nav = document.querySelector(".nav");
const btnUp = document.querySelector(".btn--up");
const container = document.querySelector(".container");
//const navGap = nav.getBoundingClientRect().height;

function obsfn(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.target === nav) {
      // Button is outside .nav and leaving viewport
      btnUp.style.bottom = "30px";
    } else {
      // Button is inside .nav or still in viewport
      btnUp.style.bottom = ""; // Reset back to default color
    }
  });
}
const obsOpts = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(obsfn, obsOpts);
observer.observe(nav);

btnUp.addEventListener("click", () => {
  container.scrollIntoView({ behavior: "smooth" });
});

class BtnVew extends View {
  _parentEl = document.querySelector(".btntip");
  _modelTrigger = document.querySelector(".gooday");
  _formTrigger = document.querySelector(".btnForm");
  _overlay = document.querySelector(".overlaies");

  constructor() {
    super();
    this.hideWindow();
  }

  toggleWindow() {
    this._formTrigger.classList.toggle("hidden");
    this._modelTrigger.classList.toggle("hidden");
  }

  handlerBtn() {
    this._parentEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn--quest")) this.toggleWindow();
    });
  }

  hideWindow() {
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }
}
export default new BtnVew();
