//能夠在專案中反覆使用的函數
import axios from "axios";
import { TIMEOUT_SEC } from "./config.js";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`讀取時間過長, 已經延遲了${s}秒`));
    }, s * 1000);
  });
};

export const getData = async function (url) {
  try {
    //這裡除了API請求之外也有針對要求延遲做了錯誤處理
    const res = await Promise.race([axios.get(url), timeout(TIMEOUT_SEC)]);

    if (res.statusText !== "OK")
      throw new Error(`${data.message} (${res.status})`);
    return res;
  } catch (error) {
    throw error;
  }
};
