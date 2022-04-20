import {React, Fragment} from 'react';

export default function PatientRegistration(){
    return <form>
            <div className='form-group'>
                <h1 className=''>Ingrese sus datos para ser atendido: </h1>
            </div>
            <div className="form-group">
                <label htmlFor="">Ingrese su nombre:</label>
                <input type="text" className="form-control" placeholder='Entre su nombre'></input>
            </div>
            <div className='form-group'>
                <label htmlFor="">Ingrese su apellido:</label>
                <input type="text" className="form-control" placeholder='Entre su apellido'></input>
            </div>
            <div className='form-group'>
                <label htmlFor="">Ingrese su edad:</label>
                <input type="text" className="form-control" placeholder='Entre su edad'></input>
            </div>
            <div className='form-group'>
                <label htmlFor="">Ingrese su fecha de nacimiento:</label>
                <input type="text" className="form-control" placeholder='Entre su fecha de nacimiento'></input>
            </div>
            <div className='form-group'>
                <label htmlFor="">Tipo de Sangre:</label>
                <select name="tipo_sangre" id="" className='form-control'>
                    <option value="A Pos">A+</option>
                    <option value="A Neg">A-</option>
                    <option value="B Pos">B+</option>
                    <option value="B Neg">B-</option>
                    <option value="AB Pos">AB+</option>
                    <option value="AB Pos">AB+</option>
                    <option value="O Pos">O+</option>
                    <option value="O Neg">O-</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='form-label'>Sexo:</label>
                <div className="form-check">
                    <input type="radio" name='sexo' className='form-check-input' value="Masculino" />
                    <label htmlFor="" className='form-check-label'>Masculino</label>
                </div>
                <div className='form-check'>
                    <input type="radio" name='sexo' className='form-check-input' value="Femenino" />
                    <label htmlFor="" className='form-check-label'>Femenino</label>
                </div>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='form-label fs-3'>Ingrese sus datos medicos</label>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='form-label'>Estado Civil</label>
                <select name="estado_civil" id="" className='form-control'>
                    <option value="Soltero">Soltero</option>
                    <option value="Casado">Casado</option>
                    <option value="Viudo">Viudo</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='form-label'>Sufre de algunas alergias? </label>
                <div className='form-check'>
                    <input type="radio" className='form-check-input' name='alergias' value='Si'/>
                    <label htmlFor="" className='form-check-label'>Si</label>
                </div>
                <div className='form-check'>
                    <input type="radio" name='alergias' className='form-check-input' value='No' />
                    <label htmlFor="" className='form-check-label'>No</label>
                </div>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='form-label'>Padece de una enfermedad hereditaria?</label>
                <div className='form-check'>
                    <input type="radio" name='enfermedad-hereditaria' className='form-check-input' value='Si' />
                    <label htmlFor="" className='form-check-label'>Si</label>
                </div>
                <div className='form-check'>
                    <input type="radio" name='enfermedad-hereditaria' className='form-check-input' value='No'/>
                    <label htmlFor="" className='form-check-label'>No</label>
                </div>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='form-label'>Fechas en la que desea ser atendido: </label>
                <input type="date" className='form-control' name='fecha_visita'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='form-label'>Horario disponible por el doctor: </label>
                <select name="" id="" className="form-control">
                    <option value="">Seleccione una fecha</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="" className='form-label'>Describa con detalle lo que padece: </label>
                <textarea name="padecimiento" id="" cols="30" rows="10" className='form-control'></textarea>
            </div>
            <div className="form-group">
                <button className='btn btn-close' type='close'>Cancelar</button>
                <button className='btn btn-primary' type='submit'>Enviar Registro</button>
            </div>
        </form>;
}