import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './js/Pages/HomePage';
import reportWebVitals from './js/reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorPage from './js/Pages/DoctorPage';
import PatientRegistration from './js/Pages/PatientRegister';

export default function Rendering(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path="/registro_paciente" element={<PatientRegistration />}></Route>
        <Route path='/pagina_doctor' element={<DoctorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Rendering />,
  document.getElementById('page')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
