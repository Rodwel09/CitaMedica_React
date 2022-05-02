import React from "react";

const HomePage = () => {
    return <div className="row">
        <div className="col-12">
            <h1>Hospital Sagrado Corazon de Jesus</h1>
        </div>
        <div className="col-md-12"><br /><br /><br /></div>
        <div className="col-sm-6 mx-auto">
            <div className="col-md-12">
                <a href="./pagina_doctor" className="btn btn-primary nav-link">Consultorio</a><br />
                <a href="./registro_paciente" className="btn btn-primary nav-link">Registro Paciente</a>
            </div>
        </div>

    </div>;
}

export default HomePage;
