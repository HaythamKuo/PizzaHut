import View from "./View.js";

class AddRecipe extends View {
  _parentEl = document.querySelector(".upload");
  _message = "成功!";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._handlerShowWindow();
    this._handlerHideWindow();
  }

  _toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _handlerShowWindow() {
    this._btnOpen.addEventListener("click", this._toggleWindow.bind(this));
  }

  _handlerHideWindow() {
    this._btnClose.addEventListener("click", this._toggleWindow.bind(this));
    this._overlay.addEventListener("click", this._toggleWindow.bind(this));
  }

  handlerUpload(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      //這裡的data即為controller裡的uploadRecipe()參數
      console.log(data);
      handler(data);
    });
  }
  _renderhtml() {}
}
export default new AddRecipe();
