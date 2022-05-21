import axios from "axios";

const clientUtils = {
  auth: "",
  sendRequest({ method, url, data, ignoreAuth }) {
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
          s.json()
            .then((val) => {
              if (val.code === 401) {
                localStorage.clear();
              }
              resolve(val);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          if (e && e.status === 401) {
            localStorage.clear();
          }
          reject(e);
        });
    });
  },
  makeRequest(method, url, headers, data) {
    return new Promise((resolve, reject) => {
      let axiosConfig = {
        method,
        url,
        headers,
      };
      if (method.toLowerCase() !== "get") axiosConfig.data = data;
      return axios(axiosConfig)
        .then((res) => {
          if (!res.ok) reject(res);
          else resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default clientUtils;
