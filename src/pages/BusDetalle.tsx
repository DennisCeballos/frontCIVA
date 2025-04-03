import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData, BusItem } from "../services/api";
import "./BusDetalle.css"; // Import CSS

const BusDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bus, setBus] = useState<BusItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        const selectedBus = data.find((item) => item.id === Number(id));
        if (!selectedBus) throw new Error("Bus no encontrado");
        setBus(selectedBus);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading">Cargando detalles...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="details-container">
      <h1 className="title">Detalles de Bus</h1>
      {bus && (
        <div className="details-card">
          <p><strong>ID:</strong> {bus.id}</p>
          <p><strong>Nro Bus:</strong> {bus.nro_bus || "N/A"}</p>
          <p><strong>Placa:</strong> {bus.placa || "N/A"}</p>
          <p><strong>Fecha Creación:</strong> {bus.fecha_creacion || "N/A"}</p>
          <p><strong>Características:</strong> {bus.caracteristicas || "N/A"}</p>
          <p><strong>Marca Bus:</strong> {bus.marca_bus || "N/A"}</p>
          <p><strong>Estado:</strong> {bus.estado ? "Activo" : "Inactivo"}</p>
          {/* Botón para volver a la lista */}
          <button className="back-button" onClick={() => navigate("/")}>
            Volver a la Lista
          </button>
        </div>
      )}    
    </div>
  );
};

export default BusDetalle;
