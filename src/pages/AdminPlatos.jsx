import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://backend-production-8813.up.railway.app/api";
const getToken = () => localStorage.getItem('token');

function AdminPlatos() {
  const [platos, setPlatos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [platoId, setPlatoId] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "entrante",
    imagen: "",
  });

  const cargarPlatos = () => {
    axios
      .get(`${API}/platos`)
      .then((res) => setPlatos(res.data))
      .catch((err) => console.error(err));
  };

  const editarPlato = (plato) => {
    setFormData(plato);
    setPlatoId(plato.id);
    setEditando(true);
  };

  const borrarPlato = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar este plato?");
    if (!confirmacion) return;

    axios
      .delete(`${API}/platos/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` } // 👈
      })
      .then(() => cargarPlatos())
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    cargarPlatos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ nombre: "", descripcion: "", precio: "", categoria: "entrante", imagen: "" });
    setEditando(false);
    setPlatoId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${getToken()}` }; // 👈

    if (editando) {
      axios
        .put(`${API}/platos/${platoId}`, formData, { headers }) // 👈
        .then(() => { cargarPlatos(); resetForm(); });
    } else {
      axios
        .post(`${API}/platos`, formData, { headers }) // 👈
        .then(() => { cargarPlatos(); resetForm(); });
    }
  };

  const categorias = ["entrante", "principal", "postre", "bebida"];

  return (
    <div className="container mt-5">
      <h2>Panel Admin - Crear Plato</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="nombre" placeholder="Nombre" className="form-control mb-2"
          value={formData.nombre} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" className="form-control mb-2"
          value={formData.descripcion} onChange={handleChange} />
        <input type="number" name="precio" placeholder="Precio" className="form-control mb-2"
          value={formData.precio} onChange={handleChange} required />
        <select name="categoria" className="form-control mb-2"
          value={formData.categoria} onChange={handleChange}>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        <input type="text" name="imagen" placeholder="Nombre imagen" className="form-control mb-2"
          value={formData.imagen} onChange={handleChange} />
        <button className="btn btn-primary">
          {editando ? "Editar Plato" : "Crear Plato"}
        </button>
        {editando && ( 
          <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>


      <hr />
      <h3>Platos actuales por categoría</h3>

      <div className="accordion" id="accordionPlatos">
        {categorias.map((cat, idx) => {
          const platosCat = platos.filter((p) => p.categoria === cat);
          return (
            <div className="accordion-item" key={cat}>
              <h2 className="accordion-header" id={`heading-${idx}`}>
                <button className="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target={`#collapse-${idx}`}
                  aria-expanded="false" aria-controls={`collapse-${idx}`}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)} ({platosCat.length})
                </button>
              </h2>
              <div id={`collapse-${idx}`} className="accordion-collapse collapse"
                aria-labelledby={`heading-${idx}`} data-bs-parent="#accordionPlatos">
                <div className="accordion-body">
                  <ul className="list-group">
                    {platosCat.map((plato) => (
                      <li key={plato.id} className="list-group-item d-flex justify-content-between">
                        <div>
                          {plato.nombre} -{" "}
                          {Number.isInteger(Number(plato.precio))
                            ? Number(plato.precio)
                            : Number(plato.precio).toFixed(2)}€
                        </div>
                        <div>
                          <button className="btn btn-warning btn-sm me-2" onClick={() => editarPlato(plato)}>Editar</button>
                          <button className="btn btn-danger btn-sm" onClick={() => borrarPlato(plato.id)}>Borrar</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPlatos;