import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// Global axios defaults
// axios.defaults.baseURL = "https://api.example.com";
// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

// `transformRequest` allows changes to the request data before it is sent to the server
// This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
// The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
// FormData or Stream
// You may modify the headers object.
// axios.defaults.transformRequest = [
//   function(data, headers) {
//     // Do whatever you want to transform the data
//     return data;
//   },
// ];

// `transformResponse` allows changes to the response data to be made before
// it is passed to then/catch
// axios.defaults.transformResponse = [
//   function(data) {
//     // Do whatever you want to transform the data
//     return data;
//   },
// ];

// Add a request interceptor
// axios.interceptors.request.use(
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
// axios.interceptors.response.use(
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

export const APIModel = class {
  static handler = axios;
  static prefix = "models";
  static fieldsMap = [
    // ["frontEndField", "back_end_field"],
    ["uuid", "uuid"],
    ["createdAt", "created_at"],
    ["lastModifiedAt", "last_modified_at"],
    ["isDeleted", "is_deleted"],
  ];

  static translate(target, reverse = false) {
    const [targetIndex, resultIndex] = reverse ? [1, 0] : [0, 1];
    const result = this.fieldsMap.find(
      (entry) => entry[targetIndex] === target
    );
    return result && result[resultIndex];
  }
  static transformData(originData, reverse = false) {
    const dataType = Object.prototype.toString.call(originData);

    if (dataType === "[object Array]") {
      const data = [];
      for (const item of originData)
        data.push(this.transformData(item, reverse));
      return data;
    }

    if (dataType === "[object Object]") {
      const data = {};
      for (const [key, value] of Object.entries(originData)) {
        const translatedKey = this.translate(key, reverse) || key;
        data[translatedKey] = this.transformData(value, reverse);
      }
      return data;
    }

    return originData;
  }

  static request(config) {
    return new Promise((resolve, reject) => {
      config.data = this.transformData(config.data, false);
      this.handler(config)
        .then((response) => {
          const data = this.transformData(response.data, true);
          if (data.error) reject(data.error.message);
          else resolve(data);
        })
        .catch((error) => {
          alert(error);
          reject(error);
        });
    });
  }

  constructor(pk = 0, fields = null) {
    this.pk = pk;
    this.fields = fields || {};
  }

  async fetchList(orderBy = "pk", pageSize = 100, pageNumber = 1) {
    return this.constructor.request({
      method: "get",
      url: `/${this.constructor.prefix}/`,
      params: {
        order_by: orderBy,
        page_size: pageSize,
        page_number: pageNumber,
      },
    });
  }

  async fetchDetail() {
    return this.constructor.request({
      method: "get",
      url: `/${this.constructor.prefix}/${this.pk}/`,
    });
  }

  async create() {
    return this.constructor.request({
      method: "post",
      url: `/${this.constructor.prefix}/${this.pk}/`,
      data: this.fields,
    });
  }

  async update() {
    return this.constructor.request({
      method: "patch",
      url: `/${this.constructor.prefix}/${this.pk}/`,
      data: this.fields,
    });
  }

  async update_or_create() {
    return this.constructor.request({
      method: "put",
      url: `/${this.constructor.prefix}/${this.pk}/`,
      data: this.fields,
    });
  }

  async drop() {
    return this.constructor.request({
      method: "delete",
      url: `/${this.constructor.prefix}/${this.pk}/`,
    });
  }
};
