import View from "./View.js";
import previewView from "./previewView.js";

class BookmarkView extends View {
  //這裡的公共API角色更換了
  _parentEl = document.querySelector(".bookmarks__list");

  //錯誤訊息應該要是私有屬性
  _errMessage = "目前沒有任何書籤，找到一個您喜歡的餐點並點擊加入它 :)";

  //正確訊息
  _message = "";

  //publisher (Publisher-Subscriber design pattern)
  handlerBookMark(handler) {
    window.addEventListener("load", handler);
  }

  _renderhtml() {
    return (
      //回傳的結果會變成字串
      this._data.map((bookmark) => previewView.render(bookmark, false)).join("")
    );
  }
}
export default new BookmarkView();
