import React, { useState } from "react";
import { login, signUp } from "./api";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useGoogleLogin } from "@react-oauth/google";
import { message } from "antd";

const MicrosoftClientId = process.env.REACT_APP_ENV_ClIENT_ID;
const MicrosoftTenantId = process.env.REACT_APP_ENV_TENANT_ID;
const MicrosoftCallbackURL = process.env.REACT_APP_ENV_CALLBACK_URL;

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signup, setSignUp] = useState(false);

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => console.log(codeResponse),
  //   flow: "auth-code",
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signup) {
        const data = await signUp(email, password);
        message.success("You have successfully create your account.");
        window.location.reload();
      } else {
        const data = await login(email, password);
        console.log(data);
        if (data?.access_token) {
          localStorage.setItem("token", data?.access_token);
          localStorage.setItem("user", data?.user);

          window.location.reload();
          setToken(data?.access_token);
        }
      }
    } catch (error) {
      setError("Incorrect email or password");
    }
  };

  const MicrosoftLogin = () => {
    window.location.href = `https://login.microsoftonline.com/${MicrosoftTenantId}/oauth2/v2.0/authorize?client_id=${MicrosoftClientId}&redirect_uri=${MicrosoftCallbackURL}&scope=User.Read+openid&response_type=code&state=pdCBLpj6YU6n`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const handleGoogleLogin = async (token) => {
    try {
      // const response = await API_MANAGER.googleSignUp({
      //   idToken: token,
      // });
      // setGoogleLoading(false);
      console.log(token);
    } catch (error) {
      // setGoogleLoading(false);

      message.error("Something went wrong, please try again.");
    }
  };
  if (localStorage.getItem("token")) {
    return (
      <div>
        <p>You are already logged in!</p>
        <Button onClick={handleLogout} variant="primary">
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2>{signup ? "Sign up" : "Login"}</h2>
      {error && <p>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {signup ? "Sign up" : "Login"}
        </Button>
        <br />
        <br />
        {!signup && (
          <Button variant="primary" type="submit" onClick={MicrosoftLogin}>
            Microsoft
          </Button>
        )}

        <br />
        <br />
        {signup ? (
          <p>
            Wants to{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setSignUp(false)}
            >
              Login?
            </span>
          </p>
        ) : (
          <p>
            Don't have account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setSignUp(true)}
            >
              Sign up
            </span>
          </p>
        )}

        {/* <Button variant="primary" type="button" onClick={() => login()}>
          Login With Google
        </Button> */}
      </Form>
    </div>
  );
};

export default Login;
