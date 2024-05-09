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
        localStorage.setItem("token", access);
        localStorage.setItem("user", userId);
        window.location.reload();
      }
}