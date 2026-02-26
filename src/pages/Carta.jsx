import { useEffect, useState } from "react";
import axios from "axios";
import ModalPlatos from "./ModalPlatos";

function Carta() {
  const [platos, setPlatos] = useState([]);
  const entrantes = platos.filter((plato) => plato.categoria === "entrante");
  const principales = platos.filter((plato) => plato.categoria === "principal");
  const postres = platos.filter((plato) => plato.categoria === "postre");
  const bebidas = platos.filter((plato) => plato.categoria === "bebida");
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/platos")
      .then((res) => setPlatos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="row">
        <div className="accordion my-4" id="accordionEntrantes">
          <div className="accordion-item">
            <h3 className="accordion-header ">
              <button
                className="accordion-button collapsed text-center justify-content-center fw-bold fondoH"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEntrantes"
              >
                ENTRANTES
              </button>
            </h3>

            <div
              id="collapseEntrantes"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionEntrantes"
            >
              <div className="accordion-body">
                <div className="row">
                  {entrantes.map((plato) => (
                    <div
                      className="col-12 col-md-6 my-2 text-center"
                      key={plato.id}
                    >
                      <div
                        className="h-100 d-flex flex-column p-3 mx-auto border border-0"
                        style={{ maxWidth: "500px" }}
                      >
                        <h5>{plato.nombre}</h5>
                        <p>{plato.descripcion}</p>
                        <p>
                          {Number.isInteger(Number(plato.precio))
                            ? Number(plato.precio)
                            : Number(plato.precio).toFixed(2)} €
                        </p>
                        <i className="bi bi-info-circle fs-5" onClick={() => setPlatoSeleccionado(plato)}></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {platoSeleccionado && (
        <ModalPlatos
          plato={platoSeleccionado}
          onClose={() => setPlatoSeleccionado(null)}
        />
      )}
      <div className="row">
        <div className="accordion my-2" id="accordionEntrantes">
          <div className="accordion-item">
            <h3 className="accordion-header ">
              <button
                className="accordion-button collapsed text-center justify-content-center fw-bold fondoH"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseArroces"
              >
                ARROCES
              </button>
            </h3>

            <div
              id="collapseArroces"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionEntrantes"
            >
              <div className="accordion-body">
                <div className="row">
                  {principales.map((plato) => (
                    <div
                      className="col-12 col-md-6 my-4 text-center"
                      key={plato.id}
                    >
                      <div
                        className="h-100 d-flex flex-column p-3 mx-auto border border-0"
                        style={{ maxWidth: "500px" }}
                      >
                        <h5>{plato.nombre}</h5>
                        <p>{plato.descripcion}</p>
                        <p>
                          {Number.isInteger(Number(plato.precio))
                            ? Number(plato.precio)
                            : Number(plato.precio).toFixed(2)} €
                        </p>
                        <i className="bi bi-info-circle fs-5" onClick={() => setPlatoSeleccionado(plato)}></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {platoSeleccionado && (
        <ModalPlatos
          plato={platoSeleccionado}
          onClose={() => setPlatoSeleccionado(null)}
        />
      )}
    </>
  );
}

export default Carta;
