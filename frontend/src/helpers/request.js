import axios from "axios";

const Request = {
  put: async function (url, body = {}, header = {}) {
    const { data } = await axios.put(`${url}`, body, header);
    return data;
  },
  post: async function (url, body = {}, header = {}) {
    debugger;
    const { data } = await axios.post(`${url}`, body, header);
    return data;
  },
  delete: async function (url, body = {}, header = {}) {
    const { data } = await axios.delete(`${url}`, body, header);
    return data;
  },
  get: async function (url, header = {}, body = {}) {
    const { data } = await axios.get(`${url}`, body, header);
    return data;
  },
};

export { Request };
