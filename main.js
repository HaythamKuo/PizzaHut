import "./style.css";
import "./styles/main.scss";

import * as model from "./components/model.js";
import recipeView from "./components/reciperview.js";
import searchView from "./components/searchView.js";
import resultView from "./components/resultView.js";
import paginationView from "./components/paginationView.js";
import bookmarkView from "./components/bookmarkView.js";

//再build application之後路徑可能有所改變
//import icons from "url:./public/img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";

//渲染食譜方法////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.crossAnimation();

    //更新sidebar資料讓被選擇的選項有css特效
    //0
    resultView.update(model.getLimitData());

    //1
    bookmarkView.update(model.state.bookMarks);

    //2
    await model.testAxios(id);

    //3
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

    // 3. 搜尋結果
    resultView.render(model.getLimitData());

    // 4. 渲染起始頁面按鈕
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

//依據條件渲染出想要的結果頁面
const switchPagination = function (pageNum) {
  console.log(pageNum);

  //1. 依據條件重新渲染搜尋結果
  /** getLimitData()這個方法跑出來的結果是陣列
   * 再放到resultView.render() 這個方法裡渲染出模板
   */
  resultView.render(model.getLimitData(pageNum));

  //2. 依據條件重新渲染起始頁面按鈕
  paginationView.render(model.state.search);
};

//調整餐點原料所需數量
const contorlServings = function (serving) {
  //update the recipe servings (in state)
  model.updateServings(serving);

  //update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//書籤功能
const bookmark = function () {
  //新增/移除書籤
  if (!model.state.recipe.bookMarked) model.addBookMark(model.state.recipe);
  else model.rmBookMark(model.state.recipe.id);

  //重新渲染書籤按鈕
  recipeView.update(model.state.recipe);

  //渲染書籤總覽
  bookmarkView.render(model.state.bookMarks);
};

const loadBookMark = function () {
  bookmarkView.render(model.state.bookMarks);
};

//subscriber (Publisher-Subscriber design pattern)
const init = function () {
  bookmarkView.handlerBookMark(loadBookMark);
  recipeView.addHandlerRender(showRecipe);
  recipeView.handlerUpdateServing(contorlServings);
  recipeView.handlerBookMarked(bookmark);
  searchView.handlerSearch(controlRearchRes);
  paginationView.handlerClick(switchPagination);
};
init();
