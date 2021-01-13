import axios from "@/plugins/axios";

export default {
  example() {
    return axios.request({
      url: "https://api.example.com/",
      method: "get",
    });
  },
};
