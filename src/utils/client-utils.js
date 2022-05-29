import axios from "axios";

const clientUtils = {
  auth: "",
  sendRequest(method, url, data, ignoreAuth) {
    return new Promise((resolve, reject) => {
      if (!data) data = {};
      if (method.toLowerCase() !== "get") data = JSON.stringify(data);
      this.makeRequest(
        method,
        url,
        data,
        ignoreAuth
          ? {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          : {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: this.auth,
            }
      )
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          if (e && e.status === 401) {
            localStorage.clear();
          }
          reject(e);
        });
    });
  },
  makeRequest(method, url, data,headers) {
    return new Promise((resolve, reject) => {
      let axiosConfig = {
        method,
        url,
        headers,
      };
      if (method.toLowerCase() !== "get") axiosConfig.data = data;
      return axios(axiosConfig)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default clientUtils;
