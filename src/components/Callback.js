import { useContext, useEffect } from "react";
import queryString from 'query-string'
import {useHistory, useLocation, useParams} from "react-router-dom";
import {HELPERS} from "../utils/helper";
import API_MANAGER from "../API/index.js";
// import { LoginSuccess } from "../../context/AuthActions";
// import { AuthContext } from "../../context/AuthContext";

const CallbackPage = () => {
  // const { user, dispatch } = useContext(AuthContext);
  const {search} = useLocation();
  const values = queryString.parse(search)
  const history = useHistory();
  const callbackURL = process.env.REACT_APP_ENV_CALLBACK_URL;

  useEffect(() => {
    if (values?.code) ssoLogin();
  }, [search]);

  const ssoLogin = async () => {
    const reqParams = {
      code: values?.code,
      redirect_uri: callbackURL,
    };
    try {
      const response = await API_MANAGER.MicrosoftSsoLogin(reqParams);
      if (response?.data?.access_token) {
        HELPERS.setAuthorizationTokens(
          response?.data?.access_token,
          response?.data?.user
        );
        // await UserProfile();
      } else {
        throw new Error("tokens not present");
      }
    } catch (err) {
      console.log(err)
    }
    history.push("/");
  };

  // const UserProfile = async () => {
  //   try {
  //     const response = await API_MANAGER.getUser();
  //     dispatch(LoginSuccess({ ...response?.data }));
  //     localStorage.setItem("role", response?.data?.groups[0]?.name);
  //     if (response?.data?.groups?.length > 0) {
  //       history(`/dashboard`);
  //     } else {
  //       history("/");
  //     }
  //   } catch (err) {
  //     message.warn("Something went wrong");
  //   }
  // };

  return (
    <div className={"h-100vh"}>
      Loading...
    </div>
  );
};

export default CallbackPage;
