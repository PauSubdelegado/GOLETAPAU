import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://backend-production-8813.up.railway.app/api";
const getToken = () => localStorage.getItem('token');

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/daxkbuyyu/image/upload";
const CLOUDINARY_PRESET = "restaurante_preset";

function AdminPlatos() {
  const [platos, setPlatos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [platoId, setPlatoId] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false); // 👈

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
        headers: { Authorization: `Bearer ${getToken()}` },
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

  // 👇 Nueva función para subir imagen a Cloudinary
  const handleImagenChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSubiendoImagen(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, data);
      setFormData((prev) => ({ ...prev, imagen: res.data.secure_url }));
    } catch (err) {
      console.error("Error subiendo imagen:", err);
      alert("Error al subir la imagen");
    } finally {
      setSubiendoImagen(false);
    }
  };

  const resetForm = () => {
    setFormData({ nombre: "", descripcion: "", precio: "", categoria: "entrante", imagen: "" });
    setEditando(false);
    setPlatoId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${getToken()}` };

    if (editando) {
      axios
        .put(`${API}/platos/${platoId}`, formData, { headers })
        .then(() => { cargarPlatos(); resetForm(); });
    } else {
      axios
        .post(`${API}/platos`, formData, { headers })
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

        {/* 👇 Nuevo campo de imagen */}
        <div className="mb-2">
          <input type="file" accept="image/*" className="form-control"
            onChange={handleImagenChange} />
          {subiendoImagen && <small className="text-muted">Subiendo imagen...</small>}
          {formData.imagen && !subiendoImagen && (
            <img src={formData.imagen} alt="preview" className="mt-2"
              style={{ height: "80px", objectFit: "cover", borderRadius: "6px" }} />
          )}
        </div>

        <button className="btn btn-primary" disabled={subiendoImagen}>
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
                      <li key={plato.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                          {plato.imagen && (
                            <img src={plato.imagen} alt={plato.nombre}
                              style={{ height: "50px", width: "50px", objectFit: "cover", borderRadius: "4px" }} />
                          )}
                          <span>
                            {plato.nombre} -{" "}
                            {Number.isInteger(Number(plato.precio))
                              ? Number(plato.precio)
                              : Number(plato.precio).toFixed(2)}€
                          </span>
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