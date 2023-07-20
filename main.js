import "./style.css";
import "./styles/main.scss";

import axios from "axios";
import icons from "./public/img/icons.svg";
//再build application之後路徑可能有所改變
//import icons from "url:./public/img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";

const renderSpinner = function (element) {
  const markup = `
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>
  `;
  element.innerHTML = "";
  element.insertAdjacentHTML("afterbegin", markup);
};

//將主要模板導入進來
const testFetch = async () => {
  try {
    const response = await axios.get("main.html");

    const testEl = document.querySelector("#app");
    testEl.innerHTML = response.data;

    showRecipe();
  } catch (error) {
    console.error("找不到 main.html:", error);
  }
};

// const recipeContainer = document.querySelector(".recipe");
// const timeout = function (second) {
//   return new Promise((_, reject) => {
//     setTimeout(function () {
//       reject(new Error(`獲取資料時間過久，已經過了${second}秒`));
//     }, second * 1000);
//   });
// };

testFetch();

//渲染食譜方法////////////////////
const showRecipe = async function () {
  try {
    //動態取得菜單id
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    const res = await axios.get(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    if (res.status !== 200) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = res.data.data;
    recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    console.log(recipe);
    const recipeContainer = document.querySelector(".recipe");
    renderSpinner(recipeContainer);
    const timeout = function (second) {
      return new Promise((_, reject) => {
        setTimeout(function () {
          reject(new Error(`獲取資料時間過久，已經過了${second}秒`));
        }, second * 1000);
      });
    };

    // 渲染菜單////////////////////////////
    const markup = ` <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
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
    ${recipe.ingredients
      .map((ing) => {
        return ` <li class="recipe__ingredient">
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
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    alert(error);
  }
};

["hashchange", "load"].forEach((e) => window.addEventListener(e, showRecipe));
