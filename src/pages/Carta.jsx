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
        <div className="fondoH">
          <p className="fs-3 text-center my-3">ENTRANTES</p>
        </div>
        {entrantes.map((plato) => (
          <div className=" col-12 col-md-6 my-4 text-center" key={plato.id}>
            <div
              className="h-100 d-flex flex-column p-3 text-center mx-auto "
              style={{ maxWidth: "500px" }}
            >
              <h5>{plato.nombre}</h5>
              <p>{plato.descripcion}</p>
              <p className="">
                {Number.isInteger(Number(plato.precio))
                  ? Number(plato.precio)
                  : Number(plato.precio).toFixed(2)}
              </p>
              <button onClick={() => setPlatoSeleccionado(plato)}>ℹ️</button>
            </div>
          </div>
        ))}
       
      </div>
       {platoSeleccionado && (
          <ModalPlatos
            plato={platoSeleccionado}
            onClose={() => setPlatoSeleccionado(null)}
          />
        )}
      <div className="row">
        <div className="fondoH">
          <h3 className="text-center my-3">Principales</h3>
        </div>
        {principales.map((plato) => (
          <div
            className=" col-12 col-md-4 my-4 mx-4 text-center"
            key={plato.id}
          >
            <h5>{plato.nombre}</h5>
            <p className="">{plato.descripcion}</p>
            <p className="">
              {Number.isInteger(Number(plato.precio))
                ? Number(plato.precio)
                : Number(plato.precio).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Carta;
