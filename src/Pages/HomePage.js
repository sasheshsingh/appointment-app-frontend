import NavBar from "../components/NavBar";
import PatientsTable from "../components/PatientsTable";
import Login from "../Login";
import {PatientProvider} from "../PatientContext";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

const HomePage = () => {
    const [userToken, setUserToken] = useState(null)

      useEffect(() => {
          const token = Cookies.get('access_token')
          if (token) {
            setUserToken(token)
          }
      }, [])

    return (
        <PatientProvider>
              <NavBar />
              {userToken ?
                  <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                      <PatientsTable />
                  </div>
                  :
                  <Login />
              }
          </PatientProvider>
    )
}

export default HomePage