import axios from "axios";

const API_PATH = "http://localhost/consulta_medica_php/GetPacientsData.php";

export function GetPatientData(props) {
    return axios.get(API_PATH).then(resp => resp.data);
}