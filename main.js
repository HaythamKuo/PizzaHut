import "./style.css";
import "./styles/main.scss";

import * as model from "./components/model.js";
import recipeView from "./components/reciperview.js";
import searchView from "./components/searchView.js";

//再build application之後路徑可能有所改變
//import icons from "url:./public/img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";
import resultView from "./components/resultView.js";

//渲染食譜方法////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.crossAnimation();
    await model.testAxios(id);

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderErrMes();
  }
};

//import進來的方法
const controlRearchRes = async function () {
  try {
    resultView.crossAnimation();

    //1. 獲取搜尋字串
    const query = searchView.getQuery();
    if (!query) return;

    // 2. 載入讀取結果
    await model.loadRecipeResult(query);

    //3. 搜尋結果
    //resultView.render(model.state.search.results);
    resultView.render(model.getLimitData());
  } catch (err) {
    console.log(err);
  }
};

//subscriber (Publisher-Subscriber design pattern)
const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.handlerSearch(controlRearchRes);
};
init();
