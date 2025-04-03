import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, BusItem } from "../services/api";
import "./BusTablaFull.css"; // Import CSS

const BusTablaFull = () => {
  const [buses, setBuses] = useState<BusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    fetchData()
      .then(setBuses)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Obteniendo datos...</p>;
  if (error) return <p className="error">Se malogró: {error}</p>;

  return (
    <div className="container">
      <h1 className="title">Buses Disponibles</h1>
      <table className="bus-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nro Bus</th>
            <th>Placa</th>
            <th>Fecha Creación</th>
            <th>Características</th>
            <th>Marca Bus</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => (
            <tr key={bus.id}>
              <td>{bus.id}</td>
              <td>{bus.nro_bus || "N/A"}</td>
              <td>{bus.placa || "N/A"}</td>
              <td>{bus.fecha_creacion || "N/A"}</td>
              <td>{bus.caracteristicas || "N/A"}</td>
              <td>{bus.marca_bus || "N/A"}</td>
              <td>{bus.estado ? "Activo" : "Inactivo"}</td>
              <td>
                <button className="view-button" onClick={() => navigate(`/bus/${bus.id}`)}>
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusTablaFull;
