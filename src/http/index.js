import axios from 'axios'
import { createDiscreteApi } from 'naive-ui'
import { toLogin } from '@/util/SSOUtils.js'

const { message } = createDiscreteApi(['message'])

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

http.interceptors.response.use(
  resp => {
    const apiResp = resp.data;
    if (apiResp.code == -1) {
      // 普通异常
      message.error(apiResp.msg);
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