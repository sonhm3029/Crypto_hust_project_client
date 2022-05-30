import clientUtils from "../utils/client-utils";

const userProvider = {
  create(body) {
    let url = "http://localhost:5000/users";
    return new Promise((resolve, reject) => {
      clientUtils
        .sendRequest("post", url, body, true)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  login(body) {
    let url = "http://localhost:5000/users/login";
    return new Promise((resolve, reject) => {
      clientUtils
        .sendRequest("post", url, body, true)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  search() {
    let url = "http://localhost:5000/users";
    return new Promise((resolve, reject) => {
      clientUtils
        .sendRequest("get", url, {}, true)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
};

export default userProvider;
