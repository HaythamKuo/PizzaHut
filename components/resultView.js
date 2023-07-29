import icons from "../public/img/icons.svg";
import View from "./View.js";

class ResultView extends View {
  //這裡的公共API角色更換了
  _parentEl = document.querySelector(".results");

  //錯誤訊息應該要是私有屬性
  _errMessage = "找不到此披薩，請嘗試另外一個 🤓";

  //正確訊息
  _message = "";

  //與class View相配合 渲染結果
  _renderhtml() {
    return this._data.map(this._previousHtml).join("");
  }

  _previousHtml(res) {
    return `  
    <li class="preview">
        <a class="preview__link " href="#${res.id}">
        <figure class="preview__fig">
            <img src="${res.image}" alt="${res.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${res.title}</h4>
            <p class="preview__publisher">${res.publisher}</p>
        </div>
        </a>
    </li>`;
  }
}
export default new ResultView();
