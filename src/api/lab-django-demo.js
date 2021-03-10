import { APIModel } from "@/restful";

// Full config:  https://github.com/axios/axios#request-config
// Custom instance defaults
// Set config defaults when creating the instance
const axiosInstance = APIModel.handler.create({
  baseURL: "https://lailai.link/api/" + "django-demo",
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
  static handler = axiosInstance;
  static prefix = "likes";
  static fieldsMap = [
    ["totalCount", "total_count"],
    ["lastAddBy", "last_add_by"],
    ["lastModifiedBy", "last_modified_by"],
    ["lastModifiedFrom", "last_modified_from"],
    ...super.fieldsMap,
  ];

  constructor(pk = 0, fields = null) {
    super(pk, fields);
  }
};
