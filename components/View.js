import icons from "../public/img/icons.svg";
export default class View {
  _data;

  //公共API 能讓每一個view被渲染的方法
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrMes();
    this._data = data;
    const markup = this._renderhtml();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //可以重構
  update(data) {
    this._data = data;

    /**這裡的方法是要創建新的文字模板並與當前的模板做比較
     * 並且只更改會更動的文本屬性
     */
    const markup = this._renderhtml();

    //能將文字模板轉換成內存裡的DOM Object的方法
    const newDom = document.createRange().createContextualFragment(markup);

    // 這是虛擬的 並不會顯示在畫面上 但是在資料上會與目前的dom不一樣
    const newEls = Array.from(newDom.querySelectorAll("*"));

    //這是當前dom的資料
    const curEls = Array.from(this._parentEl.querySelectorAll("*"));

    newEls.forEach((newEl, i) => {
      const curEl = curEls[i];
      //console.log(curEl, newEl.isEqualNode(curEl));
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      )
        curEl.textContent = newEl.textContent;

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((e) =>
          curEl.setAttribute(e.name, e.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  //公共API 過場特效
  crossAnimation() {
    const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //公共API 顯示錯誤資訊到view上
  renderErrMes(mes = this._errMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${mes}</p>
    </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //公共API 顯示資訊到view上
  renderMes(mes = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${mes}</p>
        </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
