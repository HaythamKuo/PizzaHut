import { API_URL } from "../config.js";
import { getData } from "../helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

//此方法封裝一個可以取得食材組成成分API方法並回傳一個空物件當作載體
export const testAxios = async function (id) {
  try {
    //調用封裝的方法取得API, getData本身會回傳一個Promise物件
    const res = await getData(`${API_URL}${id}`);

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
    throw error;
  }
};

//取得所有資料並export到controller
export const loadRecipeResult = async function (query) {
  try {
    state.search.query = query;
    const res = await getData(`${API_URL}?search=${query}`);

    state.search.results = res.data.data.recipes.map((item) => {
      return {
        id: item.id,
        image: item.image_url,
        publisher: item.publisher,
        title: item.title,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
