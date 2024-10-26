import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // console.log('Request Interceptor', config);
    console.log("Request Interceptor run ");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('Response Interceptor', response);
    console.log("Response Interceptor");
    return response;
  },
  (error) => {
    console.log("Error Interceptor", error.response);
    return Promise.reject(error);
  }
);
