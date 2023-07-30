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

  //渲染頁面按鈕
  _renderhtml() {
    console.log(this._data);
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPage
    );

    //page 1 以及其他頁數
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    }

    // 最後頁數
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1} </span>
        </button>`;
    }

    //中間頁數
    if (currentPage < numPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1} </span>
        </button>
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
         </button>`;
    }

    //page 1 and there are no other pages
    return "";
  }
}

export default new PaginationView();
