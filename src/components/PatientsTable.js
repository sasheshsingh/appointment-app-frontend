import React, {useState, useContext, useEffect} from 'react'; // Corrected import statement

import {Table} from "react-bootstrap";
import {PatientContext} from "../PatientContext";
import PatientRows from "../components/PatientRows";
import {baseURL} from "../API/index";
import Cookies from "js-cookie";

const PatientsTable =  () => {
    const [patients, setPatients] = useContext(PatientContext);

    const getData = async (userId) => {
        fetch(`${baseURL}/api/patients?user_id=${userId}`)
            .then(resp => resp.json())
            .then(results => {
                if (results?.data?.length > 0) setPatients({data: results});
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        const userId = Cookies.get('user')
        getData(userId)
    }, []); // Empty dependency array to ensure useEffect runs only once

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        <th>Patient Email</th>
                        <th>Patient Phone</th>
                        <th>Patient Address</th>
                        <th>Patient City</th>
                    </tr>
                </thead>
                <tbody>
                    {patients?.data?.map(patient => ( // Changed variable name from patients to patient
                        <PatientRows
                            key={patient.id} // Added key prop for each PatientRows component
                            id={patient.id}
                            name={patient.name}
                            email={patient.email}
                            phone={patient.phone} // Corrected phone to phone
                            address={patient.address}
                            city={patient.city} // Corrected city to city
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default PatientsTable;
