// src/utils/http.ts
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Global function to handle token expiry
const handleTokenExpiry = () => {
  // Clear authentication data immediately
  localStorage.removeItem("authToken");

  // Dispatch token expired event for React components to handle
  window.dispatchEvent(new CustomEvent('tokenExpired'));
};

// 创建 axios 实例
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // ✅ 用 set 方法，避免 TS 类型错误
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("✅ HTTP Response:", {
      url: response.config.url,   // 请求路径
      method: response.config.method, // 请求方法
      status: response.status,    // 响应状态码
      data: response.data         // 响应数据
    });
    return response.data; // 返回 data 给调用者
  },
  (error) => {
    console.error("❌ HTTP Error:", error);

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401) {
      console.log("Token expired, logging out...");

      // Handle token expiry and notify React components
      handleTokenExpiry();

      // Create a user-friendly error message
      const errorMessage = "Your session has expired. Please log in again.";
      return Promise.reject(new Error(errorMessage));
    }

    return Promise.reject(error);
  }
);


export default http;
