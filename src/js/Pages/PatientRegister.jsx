import axios from 'axios';
import {React, Fragment, useState} from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';

const pacientRegistrationUrl = "http://localhost:5000/new_pacients";

export default function PatientRegistration(){
    const [nombre, setName] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [fecha, setFecha] = useState('');
    const [sangre, setSangre] = useState('');
    const [sexo, setSexo] = useState('');
    const [est_civil, setEstadoCivil] = useState('');
    const [alergias, setAlergiasPaciente] = useState('');
    const [fecha_atencion, setFechaAtencion] = useState('');
    const [padecimiento_paciente, setPadecimiento] = useState('');

    var allData = {
        nombre_paciente: nombre,
        apellido_paciente: apellido,
        edad_paciente: edad,
        fecha_nacimiento: fecha,
        tipo_sangre: sangre,
        sexo_paciente: sexo,
        estado_civil: est_civil,
        alergias_paciente: alergias,
        fecha_atencion_paciente: fecha_atencion,
        padecimiento_paciente: padecimiento_paciente
    }

    const insertPacients = () => {

        return fetch(pacientRegistrationUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allData)
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        insertPacients()
        setName('')
        setApellido('')
        setEdad('')
        setFecha('')
        setSangre('')
        setSexo('')
        setEstadoCivil('')
        setAlergiasPaciente('')
        setFechaAtencion('')
        setPadecimiento('')
    }

    return <div className='container-fluid'>
        <div className='header'><h1>Registro de Paciente</h1></div>
        <Form onSubmit={handleSubmit}>
            <FormGroup className='mb-3'>
                <Form.Label>Nombre de Paciente</Form.Label>
                <Form.Control type='text' placeholder='Introduzca su nombre' name='nombre_paciente' value={nombre} onChange={(e) => setName(e.target.value)}/>
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Label>Apellido de Paciente</Form.Label>
                <Form.Control type='text' placeholder='Introduzca su apellido' name='apellido_paciente' value={apellido} onChange={(e) => setApellido(e.target.value)}/>
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Label>Edad del paciente</Form.Label>
                <Form.Control type='text' placeholder='Introduzca su edad' name='edad_paciente' value={edad} onChange={(e) => setEdad(e.target.value)}/>
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type='date' placeholder='Introduzca su fecha de nacimiento' name='fecha_nacimiento' value={fecha} onChange={(e) => setFecha(e.target.value)}/>
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Label>Tipo de Sangre</Form.Label>{' '}
                <Form.Select aria-label="Tipo de Sangre" onChange={(e) => setSangre(e.target.value)} value={sangre}>
                    <option>Seleccione el tipo de sangre</option>
                    <option value={"A Positivo"}>A+</option>
                    <option value={"A Negativo"}>A-</option>
                    <option value={"O Positivo"}>O+</option>
                    <option value={"O Negativo"}>O-</option>
                    <option value={"AB Positivo"}>AB+</option>
                    <option value={"AB Negativo"}>AB-</option>
                    <option value={"B Positivo"}>B+</option>
                    <option value={"B Negativo"}>B-</option>
                </Form.Select>
                {/* <Form.Control type='text' placeholder='Introduzca su tipo de sangre' name='tipo_sangre' value={sangre} onChange={(e) => setSangre(e.target.value)}/> */}
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Label>Sexo del paciente</Form.Label>
                <Form.Control type='text' placeholder='Introduzca su sexo de paciente' name='sexo_paciente' value={sexo} onChange={(e) => setSexo(e.target.value)}/>
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Label>Estado Civil Paciente</Form.Label>
                <Form.Control type='text' placeholder='Introduzca su estado civil' name='estado_civil_paciente' value={est_civil} onChange={(e) => setEstadoCivil(e.target.value)}/>
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Label>Alergias del paciente</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Tiene alergias? Diga cuales?" name='alergias_paciente' value={alergias} onChange={(e) => setAlergiasPaciente(e.target.value)}/>
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Label>Fecha de atencion del paciente</Form.Label>
                <Form.Control type='date' placeholder='Introduzca su fecha de atencion' name='fecha_atencion_paciente' value={fecha_atencion} onChange={(e) => setFechaAtencion(e.target.value)} />
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Label>Padecimiento Paciente</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Diga sus sintomas, que siente?" name='padecimiento_paciente' value={padecimiento_paciente} onChange={(e) => setPadecimiento(e.target.value)}/>
            </FormGroup>
            <Button variant="primary" type="submit">Guardar informacion</Button>
        </Form>
    </div>
}