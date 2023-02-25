import { APIModel } from "@/restful";

const apiConfig = {
  production: {
    host: "/api/",
    prefix: "django-template",
  },
  development: {
    host: "i-need-a-proxy",
    prefix: "django-template",
  },
  test: {
    host: "http://localhost:8000/",
    prefix: "",
  },
  mock: {
    host: "https://mockapi.eolink.com/",
    prefix: "kmLrhCWd76af7b0fc53533d8254c024f3b3b9d0e2e73d0b",
  },
};

// const devFlag = "production";
const devFlag = "development";
// const devFlag = "test";
// const devFlag = "mock";

const baseAPIConfig =
  process.env.NODE_ENV === "production"
    ? apiConfig["production"]
    : apiConfig[devFlag];

// Full config:  https://github.com/axios/axios#request-config
// Custom instance defaults
// Set config defaults when creating the instance
const axiosInstance = APIModel.axios.create({
  baseURL: APIModel.pathResolver(baseAPIConfig.host, baseAPIConfig.prefix),
});

// Alter defaults after instance has been created
// axiosInstance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Do something before request is sent
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   (error) => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export const APILike = class extends APIModel {
  static axios = axiosInstance;
  static prefix = "likes";
  static fieldsMap = [
    // ["frontEndField", "back_end_field"],
    ["totalCount", "total_count"],
    ["lastAddBy", "last_add_by"],
    ["lastModifiedBy", "last_modified_by"],
    ["lastModifiedFrom", "last_modified_from"],
    ...super.fieldsMap,
  ];

  constructor(pk = 0, fields = {}) {
    super(pk, fields);
  }
};
