import React from "react";
import { Link } from "react-router-dom";

const PatientRows = ({ id, name, email, phone, address, city }) => {
  return (
    <tr>
      <td>
        <a href={`/patient/${id}`}>{id}</a>
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>{city}</td>
    </tr>
  );
};

export default PatientRows;
