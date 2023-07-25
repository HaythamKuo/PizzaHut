import "./style.css";
import "./styles/main.scss";

import axios from "axios";
import * as model from "./components/model.js";
import recipeViews from "./components/reciperview.js";

//再build application之後路徑可能有所改變
//import icons from "url:./public/img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";

let recipeView;

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
    if (!id) return;

    //ajax取得資料////////////////////////
    await model.loadRecipe(id);
    console.log(model);

    //const recipeContainer = document.querySelector(".recipe");
    //recipeView.renderSpinner();
    const timeout = function (second) {
      return new Promise((_, reject) => {
        setTimeout(function () {
          reject(new Error(`獲取資料時間過久，已經過了${second}秒`));
        }, second * 1000);
      });
    };
    recipeView = new recipeViews();
    recipeView.render(model.state.recipe);
    recipeView.render(model.state.recipe);
    console.log(recipeView);
  } catch (error) {
    console.error(error);
  }
};

["hashchange", "load"].forEach((e) => window.addEventListener(e, showRecipe));
