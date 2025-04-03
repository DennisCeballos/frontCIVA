import { useEffect, useState } from "react";
import { fetchData, BusItem } from "../services/api";

const DataTable = () => {
  const [data, setData] = useState<BusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Obteniendo...</p>;
  if (error) return <p>Se malogro: {error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nro Bus</th>
          <th>Placa</th>
          <th>Fecha Creacion</th>
          <th>Caracteristicas</th>
          <th>Marca Bus</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nro_bus}</td>
            <td>{item.placa}</td>
            <td>{item.fecha_creacion}</td>
            <td>{item.caracteristicas}</td>
            <td>{item.marca_bus}</td>
            <td>{item.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
