import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Workers from "./pages/Workers";
import Queues from "./pages/Queues";
import Metrics from "./pages/Metrics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/queues" element={<Queues />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;