import Cookies from "js-cookie";
import axios from "axios";

export const HELPERS = {
    request: (config) => {
    config.headers = config.headers ? config.headers : {};
    // const csrfTokenEl = document.querySelector("[name=csrfmiddlewaretoken]");
    // const csrfToken =
    //   HELPERS.getCookie("csrftoken") || (csrfTokenEl && csrfTokenEl.value);
    // if (csrfToken) {
    //   config.headers["X-CSRFToken"] = csrfToken;
    // }
    return axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
    setAuthorizationTokens: (access, userId) => {
        let expireTime = new Date().getTime() + 4 * 3600 * 1000;
        localStorage.setItem("expireTime", expireTime);
        Cookies.set("access_token", access, { expires: 1 / 24 });
        Cookies.set("user", userId, { expires: 1 / 24 });
        // Cookies.set("refresh_token", refresh, {
        //   expires: 4 / 24,
        // });
      }
}