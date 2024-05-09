import react, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import { PatientProvider} from "./PatientContext";
import PatientsTable from "./components/PatientsTable";
import Login from "./Login";
import Callback from "./components/Callback";
import CallbackPage from "./components/Callback";
import Cookies from "js-cookie";
import HomePage from "./Pages/HomePage";

function App() {

  return (
      <div>
          <Router>
              <Switch>
                  <Route path={'/'} exact={true}>
                    <HomePage />
                  </Route>
                  <Route path={'/callback'} exact={true}>
                      <CallbackPage />
                  </Route>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
