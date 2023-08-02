import { API_URL, LIMIT_TEN, KEY } from "../config.js";
import { AJAX } from "../helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    //設置環境變數
    resultPage: LIMIT_TEN,
  },
  bookMarks: [],
};

//重構程式碼
const recipeObj = function (res) {
  const { recipe } = res.data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    /**如果沒有key 不會發生任何事(解構)
     * 如果有 會執行第二部分 也就是這個物件會被返回 並且會被展開*/
    ...(recipe.key && { key: recipe.key }),
  };
};

//此方法封裝一個可以取得食材組成成分API方法並回傳一個空物件當作載體
export const testAxios = async function (id) {
  try {
    //調用封裝的方法取得API, AJAX本身會回傳一個Promise物件
    const res = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = recipeObj(res);

    //判斷點擊的菜單書籤id 是否與每一次載入菜單id一樣
    if (state.bookMarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookMarked = true;
    else state.recipe.bookMarked = false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//取得所有資料並export到controller
export const loadRecipeResult = async function (query) {
  try {
    state.search.query = query;
    const res = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = res.data.data.recipes.map((item) => {
      return {
        id: item.id,
        image: item.image_url,
        publisher: item.publisher,
        title: item.title,
        ...(item.key && { key: item.key }),
      };
    });

    //這裡設置1是為了在每次搜尋時 都能夠重返第一頁
    state.search.page = 1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//限制資料顯示 一頁僅能有10筆資料
export const getLimitData = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPage;
  const end = page * state.search.resultPage;

  //根據不同參數切割出不同的資料集
  return state.search.results.slice(start, end);
};

//publisher (Publisher-Subscriber design pattern)
export const updateServings = function (serving) {
  state.recipe.ingredients.forEach((ing) => {
    //newQt = oldQt * newServings / oldServings   2 * 8 / 4 = 4
    ing.quantity = (ing.quantity * serving) / state.recipe.servings;
  });
  state.recipe.servings = serving;
};

const setLocal = function () {
  localStorage.setItem("bookmark", JSON.stringify(state.bookMarks));
};

//我是書籤功能
export const addBookMark = function (recipe) {
  state.bookMarks.push(recipe);

  //判斷菜單id是否相同 如果是的話就新增屬性bookMarked並設為true
  if (state.recipe.id === recipe.id) state.recipe.bookMarked = true;

  setLocal();
};

//移除書籤功能
export const rmBookMark = function (id) {
  const index = state.bookMarks.findIndex((el) => el.id === id);
  state.bookMarks.splice(index, 1);
  if (state.recipe.id === id) state.recipe.bookMarked = false;
  setLocal();
};

//從儲存庫將資料移出
const init = function () {
  const storage = localStorage.getItem("bookmark");
  if (storage) state.bookMarks = JSON.parse(storage);
};
init();

//清除儲存庫
const remove = function () {
  localStorage.clear("bookmark");
};
//remove();

export const modelUploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      //使用filter過濾出entry[0]為'ingredient'的屬性而且entry[1]不能是空字串
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        //const ingArr = ing[1].replaceAll(" ", "").split(",");
        const ingArr = ing[1].split(",").map((el) => el.trim());
        if (ingArr.length !== 3) throw new Error("格式錯誤！請重新輸入");
        //解構賦值給三個變數
        const [quantity, unit, description] = ingArr;

        //ingredients裡面應該要有三個物件
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      cooking_time: +newRecipe.cookingTime,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    state.recipe = recipeObj(data);

    //同時增加書籤
    addBookMark(state.recipe);
  } catch (error) {
    throw error;
  }
};
