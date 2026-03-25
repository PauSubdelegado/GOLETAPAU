const BASE_URL = 'https://backend-production-8813.up.railway.app/api';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`,
});

// ── Platos públicos ──────────────────────────────────────
export const getPlatos = async () => {
  const res = await fetch(`${BASE_URL}/platos`);
  return res.json();
};

export const getPlatoById = async (id) => {
  const res = await fetch(`${BASE_URL}/platos/${id}`);
  return res.json();
};

// ── Platos protegidos (requieren login) ──────────────────
export const crearPlato = async (plato) => {
  const res = await fetch(`${BASE_URL}/platos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(plato),
  });
  return res.json();
};

export const actualizarPlato = async (id, plato) => {
  const res = await fetch(`${BASE_URL}/platos/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(plato),
  });
  return res.json();
};

export const eliminarPlato = async (id) => {
  const res = await fetch(`${BASE_URL}/platos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
};