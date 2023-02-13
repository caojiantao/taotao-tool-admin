import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

http.interceptors.response.use(
  resp => {
    const apiResp = resp.data;
    if (apiResp.code == -1) {
      // 普通异常
      ElMessage.error(apiResp.msg);
      return Promise.reject(new Error());
    } else if (apiResp.code == -2) {
      // 未登录需要重定向
      let redirectUrl = encodeURI(window.location.href);
      window.location.href = `/login.html?redirectUrl=${redirectUrl}`;
    }
    return apiResp.data;
  },
  error => {

  }
);

export default http;