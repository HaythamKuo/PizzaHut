import icons from "../public/img/icons.svg";
import View from "./View.js";

class RecipeView extends View {
  _parentEl = document.querySelector(".recipe");

  //錯誤訊息應該要是私有屬性
  _errMessage = "找不到此菜單，請嘗試另外一個 🤓";

  //正確訊息
  _message = "";

  //publisher (Publisher-Subscriber design pattern)
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, handler));
  }

  //publisher (Publisher-Subscriber design pattern)
  handlerUpdateServing(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--increase-servings");
      if (!btn) return;

      const num = +btn.dataset.update;
      if (num > 0) handler(num);
    });
  }

  //publisher (Publisher-Subscriber design pattern)
  handlerBookMarked(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      console.log(this._data);
      handler();
    });
  }
  //單獨行使return html的方法
  _renderhtml() {
    return ` <figure class="recipe__fig">
            <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${this._data.title}</span>
            </h1>
          </figure>
  
          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
                this._data.cookingTime
              }</span>
              <span class="recipe__info-text">分鐘</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${
                this._data.servings
              }</span>
              <span class="recipe__info-text">人份</span>
  
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings" data-update="${
                  this._data.servings - 1
                }">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings" data-update="${
                  this._data.servings + 1
                }" >
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="recipe__user-generated ${
              this._data.key ? "" : "hidden"
            }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round btn--bookmark">
              <svg class="">
                <use href="${icons}#icon-bookmark${
      this._data.bookMarked ? "-fill" : ""
    }"></use>
              </svg>
            </button>
          </div>
  
          <div class="recipe__ingredients">
            <h2 class="heading--2">料理資訊</h2>
            <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map((ing) => {
                return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                !ing.quantity ? 0 : ing.quantity
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
              })
              .join("")}
              
            </ul>
          </div>
  
          <div class="recipe__directions">
            <h2 class="heading--2">料理準則</h2>
            <p class="recipe__directions-text">
              來自大廚
              <span class="recipe__publisher">${
                this._data.publisher
              }</span>設計的菜單，用心設計與無數次試吃
            </p>
            <a
              class="btn--small recipe__btn"
              href="${this._data.sourceUrl}"
              target="_blank"
            >
              <span>更多資訊...</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>`;
  }
}
export default new RecipeView();
