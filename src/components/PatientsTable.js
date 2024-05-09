import React, { useState, useContext, useEffect } from "react"; // Corrected import statement

import { Table } from "react-bootstrap";
import { PatientContext } from "../PatientContext";
import PatientRows from "../components/PatientRows";
import { Col, Form, Input, Row, Button, Modal, message } from "antd";
import axios from "axios";

const PatientsTable = () => {
  const [patients, setPatients] = useContext(PatientContext);
  const [addPatient, setAddPatient] = useState(false);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const user = localStorage.getItem("user");

    fetch(`http://13.49.133.63/api/patients?user_id=${user}&search=${search}`)
      .then((resp) => resp.json())
      .then((results) => {
        setPatients({ data: results }); // No need to spread the results array here
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (data) => {
    const user = localStorage.getItem("user");

    data["user"] = user;
    try {
      const resp = await axios.post("http://13.49.133.63/api/patients", data, {
        headers: { "Content-Type": "application/json" },
      });
      setAddPatient(false);
      getData();

      message.success("Patient created successfully.");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  const handleSearch = () => {
    if (search && search?.length > 0) {
      getData();
    }
  };
  useEffect(() => {
    getData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
      <div>
        <Row justify={"space-between"}>
          <Col>
            <Button
              type="primary"
              style={{ marginBottom: "20px" }}
              onClick={() => setAddPatient(true)}
            >
              Add Patient
            </Button>
          </Col>
          <Col>
            <Row>
              <Col>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e?.target?.value)}
                  placeholder="search here"
                />
              </Col>
              <Col>
                <Button
                  type="primary"
                  style={{ marginBottom: "20px" }}
                  onClick={() => handleSearch()}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

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
            {patients.data.map(
              (
                patient // Changed variable name from patients to patient
              ) => (
                <PatientRows
                  key={patient.id} // Added key prop for each PatientRows component
                  id={patient.id}
                  name={patient.name}
                  email={patient.email}
                  phone={patient.phone} // Corrected phone to phone
                  address={patient.address}
                  city={patient.city} // Corrected city to city
                />
              )
            )}
          </tbody>
        </Table>

        <Modal
          onCancel={() => setAddPatient(false)}
          footer={false}
          centered
          open={addPatient}
        >
          <div>
            <p>Add Patient</p>

            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={24}>
                <Col xs={12}>
                  <Form.Item label="Patient name" name="name">
                    <Input placeholder="Enter name" className="w-100" />
                  </Form.Item>
                </Col>{" "}
                <Col xs={12}>
                  <Form.Item label="Patient email" name={"email"}>
                    <Input placeholder="Enter email" className="w-100" />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item label="Patient Phone" name={"phone"}>
                    <Input placeholder="Enter phone number" className="w-100" />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item label="Patient Address" name={"address"}>
                    <Input placeholder="Enter address" className="w-100" />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item label="Patient City" name={"city"}>
                    <Input placeholder="Enter city" className="w-100" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Button htmlType="submit"> Submit</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PatientsTable;
