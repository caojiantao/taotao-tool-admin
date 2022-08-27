import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: 'http://localhost:8080/',
})

http.interceptors.response.use(
  resp => {
    const apiResp = resp.data;
    if (apiResp.code == -1) {
      ElMessage.error(apiResp.msg);
      return Promise.reject(new Error());
    }
    return apiResp.data;
  },
  error => {

  }
);

export default http;