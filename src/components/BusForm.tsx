import { useState } from "react";
import { BusItem } from "../services/api"; // If you want to reuse BusItem interface for data
import "./BusForm.css"; // Import CSS if necessary

const BusForm = () => {
  const [newBus, setNewBus] = useState<string>(""); // Manage the text input state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBus(e.target.value); // Update state on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error on each attempt
    setSuccess(false); // Reset success message

    const busData: BusItem = {
      id: Math.floor(Math.random() * 1000), // Just a dummy ID for now
      nro_bus: parseInt(newBus), // Assume the input is the bus number
      placa: "", // You can add more fields here based on your model
      fecha_creacion: new Date().toISOString(),
      caracteristicas: "",
      marca_bus: "",
      estado: true,
    };

    try {
      const response = await fetch("http://localhost:8080/bus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(busData), // Send the new bus data
      });

      if (!response.ok) throw new Error("Failed to add new bus.");

      setSuccess(true); // Show success message if the request is successful
      setNewBus(""); // Reset input field
    } catch (err) {
      setError("Error"); // Set error message if the request fails
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="form-container">
      <h2>Añadir Nuevo Bus</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nro_bus">Nro Bus:</label>
          <input
            type="text"
            id="nro_bus"
            value={newBus}
            onChange={handleChange}
            placeholder="Escribe el Nro de Bus"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "POST"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">¡Bus añadido exitosamente!</p>}
    </div>
  );
};

export default BusForm;
