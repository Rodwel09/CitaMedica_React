import axios from "axios";
import moment from "moment";
import {React} from "react";
import { useEffect, useState } from "react";
import { Button, Card, Form, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";

const GET_PACIENT_API_PATH = "http://localhost/consulta_medica_php/GetPacientsData.php";
const SET_PACIENT_STATUS_PATH = "http://localhost/consulta_medica_php/ChangeStatus.php";

var option = 0;

function SetNotificationData(){
    let allData = [];

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [post, setPost] = useState(false);

    useEffect(() => {
        axios.get(GET_PACIENT_API_PATH).then(resp => {
            setPost(resp.data);
        });
    }, []);

    if (post == null) return null;

    for (let index = 0; index < post.length; index++) {
        if (post[index].StatusPaciente == 0) {
            allData.push(
                <Card>
                    <Card.Body>
                        <Card.Title>{post[index].nombre_paciente + " " + post[index].apellido_paciente}</Card.Title>
                        <Card.Text>Diagnostico: {post[index].padecimiento_paciente}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary">Acceptar Solictud</Button>{' '}
                        <Button variant="secondary" onClick={handleClose}>Rechazar Solicitud</Button>{' '}
                    </Card.Footer>
                </Card>
            )
        }
    }
    return allData;
}

function RenderHeaderPage(){
    var notificationData = [];

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);

    const [currentValue, setCurrentValue] = useState("Dia");

    notificationData = SetNotificationData();
    option = currentValue;

    return <div className="row">
        <nav className="navbar col-md-9">
            <div className="container-fluid">
                <div className="navbar-header">
                    <h1 className="fs-1 navbar-brand" id="headerName">Bienvenido Dr Martinez</h1>
                </div>
            </div>
        </nav>

        <div className="d-flex flex-row-reverse align-items-center">
            <div className="p-2">
                <Button variant="primary" onClick={handleShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                    </svg>
                </Button>
            </div>

            <div className="p-2">
                <select onClick={(e) => {console.log("CurrentValue", currentValue); setCurrentValue(e.target.value)}}>
                    <option value={"Dia"}>Dia</option>
                    <option value={"Semana"}>Semana</option>
                </select>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Notificaciones de pacientes</ModalTitle>
            </ModalHeader>
            <Modal.Body>
                {notificationData}
            </Modal.Body>
        </Modal>
    </div>;
}

function FinishAppointment(id, current_status){
    // const [post, setPost] = useState(false);
    var status_updated;

    if (current_status == 1) {
        status_updated = 2;
    }
    else {
        status_updated = 1;
    }
    
    const data = {
        id_paciente: id,
        status_paciente_updated: status_updated
    };

    var allData = new FormData();
    allData.append('id_paciente', id);
    allData.append('status_paciente_updated', status_updated);

    axios({
        method: "post",
        url: SET_PACIENT_STATUS_PATH,
        data: allData,
        headers: { "Content-Type": "application/json" }
    }).then(resp => {
        console.log(resp);
    })
}

function SetPacientData(){
    let allData = [];

    const [post, setPost] = useState(false);

    useEffect(() => {
        axios.get(GET_PACIENT_API_PATH).then(resp => {
            setPost(resp.data);
        });
    }, []);

    if (post == null) return null;

    for (let index = 0; index < post.length; index++) {
        if (post[index].StatusPaciente == 1) {
            allData.push(<td className="d-block"><Card>
                <Card.Body>
                    <Card.Title>Nombre de cliente: {post[index].nombre_paciente}</Card.Title>
                    <Card.Text>Diagnostico: {post[index].padecimiento_paciente}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={() => FinishAppointment(post[index].id_paciente, post[index].StatusPaciente)}>Termino Consulta</Button>{' '}
                    <Button variant="secondary">Mover Consulta</Button>{' '}
                </Card.Footer>
            </Card></td>);
        }
    }

    return allData;
}

function DisplayPatientData(){
    var patientData = SetPacientData();
    if (option === "Dia") {
        return (
            <table className="table">
                <thead>
                    <tr><h2>{moment().format("MMM Do YY")}</h2></tr>
                </thead>

                <tbody>
                    <tr>
                        {patientData}
                    </tr>
                </tbody>
            </table>
        );
    }
    else {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Horas</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miercoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>8:00AM</td>
                        {patientData}
                    </tr>
                </tbody>
            </table>
        );
    }

}

export default function DoctorPage() {
    return [RenderHeaderPage(), DisplayPatientData()];
}