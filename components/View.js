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
