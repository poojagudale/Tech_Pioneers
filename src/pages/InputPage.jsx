import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/InputPage.css";

const InputPage = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Frontend Developer");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume) {
      alert("Please upload resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("role", role);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/upload-resume",
        formData
      );

      navigate("/analysis", {
        state: {
          readiness: res.data.readiness,
          skills: res.data.skills,
        },
      });
    } catch (err) {
      alert("Resume analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-page">
      <h1 className="app-title">
        Placement Analyzer <span>🚀</span>
      </h1>

      <div className="input-card">
        <div className="form-group">
          <label>Target Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>Data Analyst</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Resume</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>

        <button className="primary-btn" onClick={handleAnalyze}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
};

export default InputPage;
