import React from 'react'
import restarunteLogo from '../assets/GolaFondo.png';
import './index.css';


const Header = () => {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 fondo px-0'>
                <div className='fondoH d-flex justify-content-between align-items-center px-4'>
                    <img src={restarunteLogo} alt="Restaurante" className="d-flex" id='logo' width={230} />
                    <button className='btn  reserva fs-5'><i className="bi bi-journal-text pe-2"></i>Reservar</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header