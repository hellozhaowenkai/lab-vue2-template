import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// Global axios defaults
// axios.defaults.baseURL = "https://api.example.com";
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

// `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
axios.defaults.xsrfCookieName = "XSRF-TOKEN"; // default
// `xsrfHeaderName` is the name of the http header that carries the xsrf token value
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN"; // default

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
  static axios = axios;
  static prefix = "models";
  static fieldsMap = [
    // ["frontEndField", "back_end_field"],
    ["uuid", "uuid"],
    ["createdAt", "created_at"],
    ["lastModifiedAt", "last_modified_at"],
    ["isDeleted", "is_deleted"],
  ];

  static APIError = class extends Error {
    constructor(code = 0, message = "") {
      super(message);
      this.name = "APIError";
      this.code = code;
      this.message = message;
    }
  };

  static errorAPIMap = [
    ["error", "error"],
    ["code", "code"],
    ["message", "message"],
  ];
  static itemAPIMap = [
    ["model", "model"],
    ["pk", "pk"],
    ["fields", "fields"],
    ["result", "result"],
    ...this.errorAPIMap,
  ];
  static collectionAPIMap = [
    ["orderBy", "order_by"],
    ["size", "size"],
    ["page", "page"],
    ["count", "count"],
    ["perPage", "per_page"],
    ["numPages", "num_pages"],
    ["pageRange", "page_range"],
    ["previous", "previous"],
    ["current", "current"],
    ["next", "next"],
    ["startIndex", "start_index"],
    ["endIndex", "end_index"],
    ...this.itemAPIMap,
  ];
  static operationAPIMap = [
    ["createdAt", "created_at"],
    ["lastActionAt", "last_action_at"],
    ["percentComplete", "percent_complete"],
    ["state", "state"],
    ...this.itemAPIMap,
  ];
  static translate(target, dictionary, reverse = false) {
    const [targetIndex, resultIndex] = reverse ? [1, 0] : [0, 1];
    const result = dictionary.find((entry) => entry[targetIndex] === target);
    return result && result[resultIndex];
  }
  static interfaceTranslator(originData, dictionary, reverse = false) {
    const dataType = Object.prototype.toString.call(originData);

    if (dataType === "[object Array]") {
      const data = [];
      for (const item of originData)
        data.push(this.interfaceTranslator(item, dictionary, reverse));
      return data;
    }

    if (dataType === "[object Object]") {
      const data = {};
      for (const [key, value] of Object.entries(originData)) {
        const translatedKey = this.translate(key, dictionary, reverse) || key;
        data[translatedKey] = this.interfaceTranslator(
          value,
          dictionary,
          reverse
        );
      }
      return data;
    }

    return originData;
  }

  static pathResolver(...routes) {
    routes = routes.flat(Infinity);

    const separator = "/";
    const protocolFound = routes[0].match(/^([a-z][a-z\d+\-.]*:)?\/\//gi);
    const protocol = protocolFound ? protocolFound[0] : separator;
    const normalizedPath = routes
      .join(separator)
      .replace(new RegExp(`^(${protocol})+(${separator}*)`), "")
      .replace(new RegExp(`${separator}{2,}`, "g"), separator)
      .replace(new RegExp(`(?<!${separator})$`), separator);

    return protocol + normalizedPath;
  }
  static request(axiosConfig, { translate = false } = {}) {
    return new Promise((resolve, reject) => {
      if (translate) {
        axiosConfig.data = this.interfaceTranslator(
          axiosConfig.data,
          translate
        );
        axiosConfig.params = this.interfaceTranslator(
          axiosConfig.params,
          translate
        );
      }
      this.axios(axiosConfig)
        .then((response) => {
          // console.log("AxiosResponse", response);

          const data = translate
            ? this.interfaceTranslator(response.data, translate, true)
            : response.data;

          if (data.error)
            throw new this.APIError(data.error.code, data.error.message);
          else resolve(data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  constructor(pk = 0, fields = {}) {
    this.pk = pk;
    this.fields = fields;
  }

  async fetchDetail() {
    return this.constructor.request(
      {
        method: "GET",
        url: this.constructor.pathResolver(this.constructor.prefix, this.pk),
      },
      {
        translate: [
          ...this.constructor.fieldsMap,
          ...this.constructor.itemAPIMap,
        ],
      }
    );
  }

  async fetchList(orderBy = "pk", pageSize = 100, pageNumber = 1) {
    return this.constructor.request(
      {
        method: "GET",
        url: this.constructor.pathResolver(this.constructor.prefix),
        params: {
          orderBy,
          pageSize,
          pageNumber,
        },
      },
      {
        translate: [
          ...this.constructor.fieldsMap,
          ...this.constructor.collectionAPIMap,
        ],
      }
    );
  }

  async create() {
    return this.constructor.request(
      {
        method: "POST",
        url: this.constructor.pathResolver(this.constructor.prefix),
        data: this.fields,
      },
      {
        translate: [
          ...this.constructor.fieldsMap,
          ...this.constructor.operationAPIMap,
        ],
      }
    );
  }

  async update() {
    return this.constructor.request(
      {
        method: "PATCH",
        url: this.constructor.pathResolver(this.constructor.prefix, this.pk),
        data: this.fields,
      },
      {
        translate: [
          ...this.constructor.fieldsMap,
          ...this.constructor.operationAPIMap,
        ],
      }
    );
  }

  async updateOrCreate() {
    return this.constructor.request(
      {
        method: "PUT",
        url: this.constructor.pathResolver(this.constructor.prefix, this.pk),
        data: this.fields,
      },
      {
        translate: [
          ...this.constructor.fieldsMap,
          ...this.constructor.operationAPIMap,
        ],
      }
    );
  }

  async drop() {
    return this.constructor.request(
      {
        method: "DELETE",
        url: this.constructor.pathResolver(this.constructor.prefix, this.pk),
      },
      {
        translate: [
          ...this.constructor.fieldsMap,
          ...this.constructor.operationAPIMap,
        ],
      }
    );
  }
};

export const ERROR_STATUS_CODE = Object.freeze({
  // EXAMPLE
  100000: "Example: This is an example error message.",
  100001: "MethodError: Only support GET.",
  100002: "MethodError: Only support POST.",
  // DATABASE
  100100: "NotFound: No target found matching the query.",
  100101:
    "MultipleObjectsReturned: The query returned multiple objects when only one was expected.",
  100102: "IntegrityError: Some kind of problem with a valid index.",
  100103: "FieldError: Some kind of problem with a model field.",
  100104:
    "ValueError: Some fields do not exist in this model or are m2m fields.",
  100105: "ValidationError: Enter a valid value.",
  // AUTHENTICATION
  100200: "UserDoesNotExist: User not found.",
  // PAGINATION
  100300:
    "InvalidPage: The requested page is invalid (i.e. not an integer) or contains no objects.",
});

export const OPERATION_API_STATE = Object.freeze({
  NOT_STARTED: Symbol("NOT_STARTED"),
  RUNNING: Symbol("RUNNING"),
  SUCCEEDED: Symbol("SUCCEEDED"),
  FAILED: Symbol("FAILED"),
});
