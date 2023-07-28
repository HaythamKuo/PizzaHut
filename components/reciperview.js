import icons from "../public/img/icons.svg";

class RecipeView {
  #parentEl = document.querySelector(".recipe");
  #data;

  //錯誤訊息應該要是私有屬性
  #errMessage = "找不到此菜單，請嘗試另外一個 🤓";

  //正確訊息
  #message = "";

  //公共API 能讓每一個view被渲染的方法
  render(data) {
    this.#data = data;
    const markup = this.#renderhtml();
    this.#clear();
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentEl.innerHTML = "";
  }

  //單獨行使return html的方法
  #renderhtml() {
    return ` <figure class="recipe__fig">
            <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${this.#data.title}</span>
            </h1>
          </figure>
  
          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
                this.#data.cookingTime
              }</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${
                this.#data.servings
              }</span>
              <span class="recipe__info-text">servings</span>
  
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="recipe__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
              <svg class="">
                <use href="${icons}#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>
  
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${this.#data.ingredients
              .map((ing) => {
                return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
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
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
                this.#data.publisher
              }</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${this.#data.sourceUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>`;
  }

  //公共API 過場特效
  crossAnimation() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="src/img/icons.svg#icon-loader"></use>
      </svg>
    </div>`;
    this.#clear();
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //公共API 顯示錯誤資訊到view上
  renderErrMes(mes = this.#errMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${mes}</p>
      </div>`;

    this.#clear();
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //公共API 顯示資訊到view上
  renderMes(mes = this.#message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${mes}</p>
    </div>`;

    this.#clear();
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //publisher (Publisher-Subscriber design pattern)
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, handler));
  }
}
export default new RecipeView();
