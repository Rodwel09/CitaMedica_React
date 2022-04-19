import { Fragment } from "react";
import "./UIComponents"
import { GetPatientData } from "./backend_data";
import { Header, TableContent } from "./UIComponents";

function App() {
  var patientData = GetPatientData();
  console.log(patientData);

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

export default App;
