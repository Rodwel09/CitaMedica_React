import {React, Fragment} from "react";
import { useEffect, useState } from "react";
import { GetPatientData } from "../backend_data";
import { Button, Card, Modal } from "react-bootstrap";

export function Header(props) {
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return <div className="row">
        <div className="col-sm-10">
            <h1 className="fs-1" id="headerName">Bienvenido Dr {props.doctor_name}</h1>
        </div>
        <div className="col-sm-2">
            <Button variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nombre de cliente: {props.client_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.client_diagnostics}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Rechazar solicitud</Button>
                    <Button variant="primary" onClick={handleClose}>Approvar solicitud</Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>;
}

export function TableContent(props){
    return <div className="row">
        <div className="col">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Horas</th>
                        <th scope="col">Lunes</th>
                        <th scope="col">Martes</th>
                        <th scope="col">Miercoles</th>
                        <th scope="col">Jueves</th>
                        <th scope="col">Viernes</th>
                        <th scope="col">Sabado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>8: 00 PM</td>
                        <td>
                            <Card style={{width: '15rem'}}>
                                <Card.Body>
                                    <Card.Title>Nombre de cliente: {props.patient_name}</Card.Title>
                                    <Card.Text>
                                        Diagnostico: {props.patient_diagnostic}
                                    </Card.Text>
                                </Card.Body>
                            </Card>     
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>;
}

export default function DoctorPage() {
    var patientData = GetPatientData();
    return (
        <Fragment>
            <Header client_name={patientData.data.client_name} 
            client_diagnostics={patientData.data.client_diagnostics} 
            doctor_name={patientData.doctorData.doctor_name}/>,
            <TableContent patient_name={patientData.clientData.patient_name}
            patient_diagnostic={patientData.clientData.patient_diagnostic}/>,
        </Fragment>
    );
}