import axios from "axios";
import XMLData from "../DummyData.xml";
import XMLParser from 'react-xml-parser';
import {useState, useEffect} from "react";

export function GetPatientData(props) {
    const [data, setData] = useState(null);
    const [doctorData, setDoctorData] = useState(null);
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        axios.get(XMLData, { "Content-Type": "application/xml; charset=utf-8" })
            .then(resp => {
                // Patient Data
                var xmlNote = new XMLParser().parseFromString(resp.data).getElementsByTagName("note")[0];
                var name = xmlNote.getElementsByTagName("client_name")[0].value;
                var patient_diagnostics = xmlNote.getElementsByTagName("diagnostico")[0].value;
                setData({ client_name: name, client_diagnostics: patient_diagnostics });
                // Doctor Data
                var xmlDoctor = new XMLParser().parseFromString(resp.data).getElementsByTagName("doctor_info")[0];
                var name = xmlDoctor.getElementsByTagName("doctor_name")[0].value;
                var notificationCount = xmlDoctor.getElementsByTagName("notification_amount")[0].value;
                setDoctorData({doctor_name: name, notfication_count: notificationCount});
                // Client Data
                var xmlClient = new XMLParser().parseFromString(resp.data).getElementsByTagName("client")[0];
                var name = xmlClient.getElementsByTagName("name")[0].value;
                var tipoAtender = xmlClient.getElementsByTagName("tipo_atender")[0].value;
                var diagnostico = xmlClient.getElementsByTagName("diagnostico")[0].value;
                setClientData({patient_name: name, type_visit: tipoAtender, patient_diagnostic: diagnostico});
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return {data, doctorData, clientData};
}