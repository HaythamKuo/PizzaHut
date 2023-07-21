import { async } from "regenerator-runtime";
import axios from "axios";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await axios.get(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    if (res.status !== 200) throw new Error(`${data.message} (${res.status})`);
    const { recipe } = res.data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
  } catch (err) {
    alert(err);
  }
};
