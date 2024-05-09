import React from 'react';

const PatientRows = ({ id, name, email, phone, address, city }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>{city}</td>
        </tr>
    );
}

export default PatientRows;
