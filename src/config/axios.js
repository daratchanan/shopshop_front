import axios from "axios";
import LocalStorageService from "../services/localStorage";
import { BASE_BACKEND_URL } from "./constants";


axios.defaults.baseURL = BASE_BACKEND_URL;

axios.interceptors.request.use(
   config => {
      if (config.url.includes("/login") || config.url.includes("/register")) {
         return config;
      }

      const token = LocalStorageService.getToken();
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
   },
   err => {
      Promise.reject(err);
   }
);

axios.interceptors.response.use(
   (response) => {
      return response;
   },
   (err) => {
      if (err.response?.status === 401) {
         LocalStorageService.clearToken();

         alert("Please login again")
         // notification.error({
         //   message: "กรุณาเข้าสู่ระบบใหม่",
         //   placement: "topRight"
         // });
         window.location.reload();

         return Promise.reject(err);
      }

      return Promise.reject(err);
   }
);

export default axios;