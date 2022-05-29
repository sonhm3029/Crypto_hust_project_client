import clientUtils from "../utils/client-utils";

const emailProvider = {
  searchById({ page = 0, size = 10, ...param }) {
    let url =
      `http://localhost:5000/emails/${param?.typeEmail}?id=${param?.id}` +
      `&page=${page}&size=${size}`;
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

export default emailProvider;
