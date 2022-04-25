import axios from "axios";
import {React, Fragment} from "react";
import { useEffect, useState } from "react";
import CloseButton from 'react-bootstrap/CloseButton'
import { Accordion, Button, Card, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_PATH = "http://localhost/consulta_medica_php/GetPacientsData.php";

// export function Header(props) {
//     const handleShow = () => setShow(true);
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);

//     return <div className="row">
//         <div className="col-sm-10">
//             <h1 className="fs-1" id="headerName">Bienvenido Dr {props.doctor_name}</h1>
//         </div>
//         <div className="col-sm-2">
//             <Button variant="primary" onClick={handleShow}>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
//                     <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
//                 </svg>
//             </Button>

//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Nombre de cliente: {props.client_name}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {props.client_diagnostics}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>Rechazar solicitud</Button>
//                     <Button variant="primary" onClick={handleClose}>Approvar solicitud</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     </div>;
// }

export default function DoctorPage(props) {
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [post, setPost] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get(API_PATH).then(resp => {
            setPost(resp.data);
        });
    }, []);

    if (post == null) return null;

    var pacientData = [];
    var notificationData = [];

    for (let index = 0; index < post.length; index++) {
        if (post[index].StatusPaciente == 0) {
            notificationData.push(
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
        if (post[index].StatusPaciente == 1) {
            pacientData.push(<td className="inline-flex"><Card>
                    <Card.Body>
                        <Card.Title>Nombre de cliente: {post[index].nombre_paciente}</Card.Title>
                        <Card.Text>Diagnostico: {post[index].padecimiento_paciente}</Card.Text>
                    </Card.Body>
                </Card></td>);
        }
    }

    return (
        <div className="row">
            <div className="col-sm-10">
                <h1 className="fs-1" id="headerName">Bienvenido Dr Martinez</h1>
            </div>
            <div className="col-sm-2">
                <Button variant="primary" onClick={handleShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                    </svg>
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <ModalHeader closeButton>
                        <ModalTitle>Notificaciones de pacientes</ModalTitle>
                    </ModalHeader>
                    <Modal.Body>
                        {notificationData}
                    </Modal.Body>
                </Modal>
            </div>

            <table className="table">
                    <thead>
                        <tr></tr>
                    </thead>
                    <tbody>
                        <tr>
                            {pacientData}
                        </tr>
                    </tbody>
            </table>
        </div>
    );
}