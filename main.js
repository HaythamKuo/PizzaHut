import "./style.css";
import "./styles/main.scss";

import * as model from "./components/model.js";
import recipeView from "./components/reciperview.js";

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
    await model.testAxios(id);

    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

["hashchange", "load"].forEach((e) => window.addEventListener(e, showRecipe));
