import React, { useState, useContext, useEffect } from "react"; // Corrected import statement

import { Table } from "react-bootstrap";
import { PatientContext } from "../PatientContext";
import PatientRows from "../components/PatientRows";
import {
  Col,
  Form,
  Input,
  Row,
  Button,
  Modal,
  message,
  DatePicker,
  Select,
} from "antd";
import axios from "axios";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import dayjs from "dayjs";

const PatientDetail = () => {
  const [patients, setPatients] = useContext(PatientContext);
  const [appointMents, setAppointments] = useState([]);
  const [addPatient, setAddPatient] = useState(false);
  const [search, setSearch] = useState(null);
  const [paymentSuccess, setPaymentSucess] = useState(false);
  const [paymentFail, setPaymentFail] = useState(false);

  const params = useParams();
  const searchParams = useLocation();
  console.log(params, "params", searchParams);

  const getAppointments = async (id) => {
    fetch(`https://appointment-backend.sasheshsingh.com/api/appointment?patient_id=${id}`)
      .then((resp) => resp.json())
      .then((results) => {
        console.log(results, "results");
        setAppointments(results);
        // No need to spread the results array here
      })
      .catch((err) => console.log(err));
  };
  const getData = async (status) => {
    const user = localStorage.getItem("user");
    fetch(
      `https://appointment-backend.sasheshsingh.com/api/patients/${params?.id}?user_id=${user}&status=${
        status ? status : ""
      }`
    )
      .then((resp) => resp.json())
      .then((results) => {
        let id = results?.id;
        // No need to spread the results array here
        getAppointments(id);
        setPatients({ data: [{ ...results }] });
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (data) => {
    const date = dayjs(data?.date).format("YYYY-MM-DD");
    const time = dayjs(data?.date).format("HH:MM");
    try {
      const resp = await axios.post(
        "https://appointment-backend.sasheshsingh.com/api/appointment",
        {
          date,
          time,
          status: "pending",
          patient: params?.id,
          amount: data?.amount,
          success_url: `https://appointment.sasheshsingh.com/patient/${params?.id}?success=true`,
          failure_url: `https://appointment.sasheshsingh.com/patient/${params?.id}?success=false`,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(resp, resp?.data);
      window.location.replace(resp?.data?.sessionId);
      setAddPatient(false);
      getData();

      message.success("Patient created successfully.");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  const handleSearch = () => {
    if (search && search?.length > 0 && params?.id) {
      getData();
    }
  };
  useEffect(() => {
    if (params?.id) getData();
  }, [params?.id]);
  useEffect(() => {
    console.log(searchParams, searchParams?.search);
    if (searchParams?.search === "?success=true") {
      setPaymentSucess(true);
    } else if (searchParams?.search === "?success=false") {
      setPaymentFail(true);
    }
  }, [searchParams]);
  return (
    <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
      <div>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => setAddPatient(true)}
        >
          Add Appointment
        </Button>

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
            {patients?.data?.map(
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

        <h3>Appointments</h3>
        <Row justify={"end"}>
          <Col>
            <Row>
              <Col>
                <Select
                  placeholder="Select Status"
                  value={search}
                  onChange={(e) => {
                    setSearch(e);
                    getData(e);
                  }}
                >
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="completed">Completed</Select.Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment Status</th>
              <th>Transaction Id</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {appointMents?.map(
              (
                appointment // Changed variable name from patients to patient
              ) => (
                <tr>
                  <td>{appointment?.id}</td>
                  <td>{appointment?.date}</td>
                  <td>{appointment?.time}</td>
                  <td
                    style={{
                      color:
                        appointment?.status === "pending"
                          ? "red"
                          : appointment?.status === "completed"
                          ? "green"
                          : "",
                    }}
                  >
                    {appointment.status}
                  </td>
                  <td>{appointment?.transaction_id}</td>
                  <td>{appointment?.amount}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>

        <Modal
          footer={false}
          centered
          open={addPatient}
          onCancel={() => setAddPatient(false)}
        >
          <div>
            <p>Add Appointment</p>

            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={24}>
                <Col xs={12}>
                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Please enter date",
                      },
                    ]}
                  >
                    <DatePicker showTime needConfirm={false} />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please enter amount",
                      },
                    ]}
                    label="Amount"
                    name="amount"
                  >
                    <Input placeholder="Enter Amount" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Button htmlType="submit"> Submit</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
        <Modal
          footer={false}
          centered
          open={paymentFail}
          onCancel={() => setPaymentFail(false)}
        >
          <h2>Oppps! your payment is failed.</h2>
        </Modal>
        <Modal
          footer={false}
          centered
          open={paymentSuccess}
          onCancel={() => setPaymentSucess(false)}
        >
          <h2>Your payment is successful.</h2>
        </Modal>
      </div>
    </div>
  );
};

export default PatientDetail;
