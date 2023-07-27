import { API_URL } from "../config.js";
import { getData } from "../helpers.js";

export const state = {
  recipe: {},
};

export const testAxios = async function (id) {
  try {
    //調用封裝的方法取得API
    const res = await getData(`${API_URL}/${id}`);

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
  } catch (error) {
    console.error(error);
  }
};
