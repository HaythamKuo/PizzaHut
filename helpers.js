//能夠在專案中反覆使用的第三方函數
import axios from "axios";
import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`讀取時間過長, 已經延遲了${s}秒`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  const axiosPro = uploadData
    ? axios.post(url, uploadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    : axios.get(url);
  const res = await Promise.race([axiosPro, timeout(TIMEOUT_SEC)]);

  if (res.status !== 200 && res.status !== 201)
    throw new Error(`${res.data.message} (${res.status})`);
  return res;
};

// export const getData = async function (url) {
//   try {
//     //這裡除了API請求之外也有針對要求延遲做了錯誤處理
//     const axiosPro = axios.get(url);

//     const res = await Promise.race([axiosPro, timeout(TIMEOUT_SEC)]);

//     if (res.statusText !== "OK")
//       throw new Error(`${data.message} (${res.status})`);
//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

// //對伺服器發出請求
// export const sendData = async function (url, uploadData) {
//   try {
//     const axiosPro = axios.post(url, uploadData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     //這裡除了API請求之外也有針對要求延遲做了錯誤處理
//     const res = await Promise.race([axiosPro, timeout(TIMEOUT_SEC)]);

//     if (res.data.status !== "success")
//       throw new Error(`${data.message} (${res.status})`);
//     return res;
//   } catch (error) {
//     throw error;
//   }
// };
