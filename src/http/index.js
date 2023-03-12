import axios from 'axios'
import { ElMessage } from 'element-plus'
import { toLogin } from '@/util/SSOUtils.js'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
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
      toLogin();
    }
    return apiResp.data;
  },
  error => {

  }
);

export default http;