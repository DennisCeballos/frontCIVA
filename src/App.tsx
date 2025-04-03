import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BusTablaFull from "./pages/BusTablaFull";
import BusDetalle from "./pages/BusDetalle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BusTablaFull />} />
        <Route path="/bus/:id" element={<BusDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
