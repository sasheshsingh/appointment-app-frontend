import {HELPERS} from "../utils/helper";

export const baseURL = process.env.REACT_APP_ENV_SNOWFIG;

const API_MANAGER = {
    MicrosoftSsoLogin: (params) => {
        return HELPERS.request({
          baseURL,
          url: `/api/microsoft_login`,
          method: "POST",
          params,
          headers: { "Content-Type": "application/json" },
        });
    }
}

export default API_MANAGER