import View from "./View.js";
import previewView from "./previewView.js";

class ResultView extends View {
  //這裡的公共API角色更換了
  _parentEl = document.querySelector(".results");

  //錯誤訊息應該要是私有屬性
  _errMessage = "找不到此餐點，請嘗試另外一個 🤓";

  //正確訊息
  _message = "";

  _renderhtml() {
    return (
      //回傳的結果會變成字串
      this._data.map((result) => previewView.render(result, false)).join("")
    );
  }
}
export default new ResultView();
