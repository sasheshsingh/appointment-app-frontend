import react, { useState, createContext } from 'react'
export const PatientContext = createContext();

export const PatientProvider = (props) => {
    const [patient, setPatient] = useState({'data': []});
    return (
        <PatientContext.Provider value={[patient, setPatient]}>
            {props.children}
        </PatientContext.Provider>
    )
}