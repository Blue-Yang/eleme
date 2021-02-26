import axios from 'axios';
const ERR_NO = 0;

export function get(url) {
  return function (params = {}) {
    return axios
      .get(url, {
        params
      })
      .then(res => {
        const { data, errno } = res.data;
        if (errno === ERR_NO) {
          return data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

