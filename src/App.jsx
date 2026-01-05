import { Routes, Route } from "react-router-dom";
import InputPage from "./pages/InputPage";
import AnalysisPage from "./pages/AnalysisPage";
import RoadmapPage from "./pages/RoadmapPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InputPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
  
    </Routes>
  );
}

export default App;
