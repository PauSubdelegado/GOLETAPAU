import React from "react";

function ModalPlatos({ plato, onClose }) {
  if (!plato) return null;

  return (
    <>
      {/* Fons semi-transparent que bloqueja la resta de la pàgina */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

      {/* Modal centrat */}
      <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{plato.nombre}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>{plato.descripcion}</p>
              {plato.imagen && (
                <img
                  src={plato.imagen} // 👈 solo cambia esto
                  alt={plato.nombre}
                  className="img-fluid"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalPlatos;
