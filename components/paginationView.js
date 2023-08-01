import View from "./View.js";
import icons from "../public/img/icons.svg";

class PaginationView extends View {
  //這裡的公共API角色更換了
  _parentEl = document.querySelector(".pagination");

  // publisher (Publisher-Subscriber design pattern)
  handlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const pageNum = +btn.dataset.goto;

      handler(pageNum);
    });
  }

  //渲染頁面按鈕/ 根據不同頁面渲染新相對應的按鈕
  _renderhtml() {
    //這裡的page預設是1
    const { page, results } = this._data;
    const numPages = Math.ceil(results.length / this._data.resultPage);

    // 判斷是否需要顯示上一頁按鈕
    const prevButton =
      page > 1
        ? `<button data-goto="${
            page - 1
          }" class="btn--inline pagination__btn--prev">
           <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
           </svg>
           <span>Page ${page - 1} </span>
       </button>`
        : "";

    // 判斷是否需要顯示下一頁按鈕
    const nextButton =
      page < numPages
        ? `<button data-goto="${
            page + 1
          }" class="btn--inline pagination__btn--next">
           <span>Page ${page + 1}</span>
           <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
           </svg>
        </button>`
        : "";

    return prevButton + nextButton;
  }
}

export default new PaginationView();
