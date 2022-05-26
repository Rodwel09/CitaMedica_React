import axios from "axios";
import moment from "moment";
import {React} from "react";
import { useEffect, useState } from "react";
import { Button, Card, Form, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";

const GET_NOTIFICATION_API_PATH = "http://localhost:5000/get_all_notifications";
const DELETE_NOTIFICATION_API_PATH = "http://localhost:5000/delete_notification/";
const GET_PACIENT_API_PATH = "http://localhost/consulta_medica_php/GetPacientsData.php";
const SET_PACIENT_STATUS_PATH = "http://localhost/consulta_medica_php/ChangeStatus.php";
const CREATE_PACIENT_PATH = "http://localhost/consulta_medica_php/CreatePacientData.php";

var option = 0;
var count_hours = 8;

function SetNotificationData(){
    let allData = [];

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [post, setPost] = useState(false);
    const [hora, setHora] = useState(false);

    useEffect(() => {
        axios.get(GET_NOTIFICATION_API_PATH).then(resp => {
            setPost(resp.data);
        });
    }, []);

    if (post == null) return null;

    var jsonPost = JSON.parse(post);

    var all_patient_data = [];

    for (let index = 0; index < jsonPost.length; index++) {
        if (jsonPost[index].status_paciente == 0) {
            // var data_paciente_form = new FormData();

            // data_paciente_form.append("nombre_paciente", jsonPost[index].nombre_paciente);
            // data_paciente_form.append("apellido_paciente", jsonPost[index].apellido_paciente);
            // data_paciente_form.append("edad_paciente", jsonPost[index].edad_paciente);
            // data_paciente_form.append("fecha_nacimiento", jsonPost[index].fecha_de_nacimiento);
            // data_paciente_form.append("tipo_sangre", jsonPost[index].tipo_sangre);
            // data_paciente_form.append("sexo_paciente", jsonPost[index].sexo_paciente);
            // data_paciente_form.append("estado_civil", jsonPost[index].estado_civil);
            // data_paciente_form.append("alergias_paciente", jsonPost[index].alergias_paciente);
            // data_paciente_form.append("fecha_atencion", jsonPost[index].fecha_de_atencion);
            // data_paciente_form.append("padecimiento_paciente", jsonPost[index].padecimiento_paciente);
            // data_paciente_form.append("status_paciente", jsonPost[index].status_paciente);

            let data_paciente_form =  {
                "nombre_paciente": jsonPost[index].nombre_paciente,
                "apellido_paciente": jsonPost[index].apellido_paciente,
                "edad_paciente": jsonPost[index].edad_paciente,
                "fecha_nacimiento": jsonPost[index].fecha_de_nacimiento,
                "tipo_sangre": jsonPost[index].tipo_sangre,
                "sexo_paciente": jsonPost[index].sexo_paciente,
                "estado_civil": jsonPost[index].estado_civil,
                "alergias_paciente": jsonPost[index].alergias_paciente,
                "fecha_atencion": jsonPost[index].fecha_de_atencion,
                "padecimiento_paciente": jsonPost[index].padecimiento_paciente,
                "status_paciente": 1 // Adding one to transform it in an active patient once is updated
            };

            all_patient_data.push(data_paciente_form);

            allData.push(
                <Card>
                    <Card.Body>
                        <Card.Title>{jsonPost[index].nombre_paciente + " " + jsonPost[index].apellido_paciente}</Card.Title>
                        <Card.Text>
                            Fecha de disponibilidad: {jsonPost[index].fecha_de_atencion}<br></br>
                            Diagnostico: {jsonPost[index].padecimiento_paciente}
                        </Card.Text>
                        <Form.Select onChange={(e) => setHora(e.target.value)} value={hora}>
                            <option>Disponga el horario de atencion</option>
                            <option value={8}>8 AM</option>
                            <option value={9}>9 AM</option>
                            <option value={10}>10 AM</option>
                            <option value={11}>11 AM</option>
                            <option value={12}>12 AM</option>
                            <option value={14}>1 PM</option>
                            <option value={15}>2 PM</option>
                            <option value={16}>3 PM</option>
                            <option value={17}>4 PM</option>
                            <option value={18}>5 PM</option>
                        </Form.Select>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={() => AddAppointment(all_patient_data[index], jsonPost[index]._id, hora)}>Acceptar Solictud</Button>{' '}
                        <Button variant="secondary" onClick={handleClose}>Rechazar Solicitud</Button>{' '}
                    </Card.Footer>
                </Card>
            )
        }
    }
    return allData;
}

function formatTimeShow(h_24) {
    var h = h_24 % 12;
    return (h < 10 ? '0' : '') + h + ':00';
}

function AddAppointment(paciente_json, id, hora_de_venir){
    paciente_json.hora_atencion = hora_de_venir;
    axios({
        method: "post",
        url: CREATE_PACIENT_PATH,
        data: JSON.stringify(paciente_json),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
    }).then(resp => {
        console.log(resp);
    });

    fetch(DELETE_NOTIFICATION_API_PATH + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(paciente_json)
    }).then(() => { alert("Paciente, añadido en la zona de espera"); window.location.reload(); } );
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

    var allData = new FormData();
    allData.append('id_paciente', id);
    allData.append('status_paciente_updated', status_updated);

    axios({
        method: "post",
        url: SET_PACIENT_STATUS_PATH,
        data: allData,
        headers: { "Content-Type": "application/json" }
    }).then(resp => {
        window.location.reload();
    })
}

function EndAppointment(id, current_status){
    // const [post, setPost] = useState(false);
    var status_updated;

    if (current_status == 1) {
        status_updated = 3;
    }
    else {
        status_updated = 1;
    }

    var allData = new FormData();
    allData.append('id_paciente', id);
    allData.append('status_paciente_updated', status_updated);

    axios({
        method: "post",
        url: SET_PACIENT_STATUS_PATH,
        data: allData,
        headers: { "Content-Type": "application/json" }
    }).then(resp => {
        window.location.reload();
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
        if (post[index].status_pac == 1 && post[index].atencion_fecha == moment().format("YYYY-MM-DD")) {
            allData.push(
                <tr>
                    <th scope="row"><h2>{formatTimeShow(post[index].hora_de_atencion)}</h2></th>
                    <td className="d-block">
                        <Card>
                            <Card.Body>
                                <Card.Title>Nombre de cliente: {post[index].nombre}</Card.Title>
                                <Card.Text>Diagnostico: {post[index].padecimiento}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="primary" onClick={() => FinishAppointment(post[index].id_paciente, post[index].status_pac)}>Termino Consulta</Button>{' '}
                                <Button variant="secondary" onClick={() => EndAppointment(post[index].id_paciente, post[index].status_pac)}>Mover Consulta</Button>{' '}
                            </Card.Footer>
                        </Card>
                    </td>
                </tr>
            );
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
                    {patientData}
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