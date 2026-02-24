import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import AdminPlatos from "./pages/AdminPlatos";


function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPlatos />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;