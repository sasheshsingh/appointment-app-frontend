import react, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import { PatientProvider } from "./PatientContext";
import PatientsTable from "./components/PatientsTable";
import Login from "./Login";
import PatientDetail from "./components/PatientDetail";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CallbackPage from "./components/Callback";

function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <GoogleOAuthProvider clientId="833088833303-nsf9ltcceeb13s3g2vjs2hu2kbc46u60.apps.googleusercontent.com">
            <PatientProvider>
              <NavBar />
              <Route
                exact
                path="/"
                component={userToken ? PatientsTable : Login}
              />
              <Route
                path="/patient/:id"
                component={userToken ? PatientDetail : Login}
              />
              <Route path={'/callback'} exact>
                  <CallbackPage />
              </Route>
            </PatientProvider>
          </GoogleOAuthProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
