import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AnalysisPage.css";

const AnalysisPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ SAFE FALLBACK DATA
  const readiness = location.state?.readiness ?? 50;
  const skills =
    location.state?.skills ?? ["JavaScript", "React"];

  const handleGenerateRoadmap = () => {
    navigate("/roadmap", {
      state: { skills },
    });
  };

  return (
    <div className="analysis-page">
      <h1 className="analysis-title">Resume Analysis Result</h1>

      <div className="analysis-container">
        {/* Readiness Card */}
        <div className="analysis-card">
          <h2>Readiness Score</h2>
          <div className="score-circle">
            <span>{readiness}%</span>
          </div>
          <p className="score-text">
            You are moderately prepared
          </p>
        </div>

        {/* Skills Gap Card */}
        <div className="analysis-card">
          <h2>Skills Gap</h2>

          {skills.length > 0 ? (
            <>
              <ul className="skills-list">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

              <button
                className="primary-btn"
                onClick={handleGenerateRoadmap}
              >
                Generate Roadmap
              </button>
            </>
          ) : (
            <p className="ready-text">You are job-ready 🎯</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
