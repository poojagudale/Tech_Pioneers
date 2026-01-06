import { useLocation, useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts"; // ✅ Import Google Charts
import "../styles/AnalysisPage.css";

const AnalysisPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const readiness = location.state?.readiness ?? 50;
  const skills = location.state?.skills ?? ["JavaScript", "React"];

  const handleGenerateRoadmap = () => {
    navigate("/roadmap", { state: { skills } });
  };

  // ✅ Pie chart for readiness score
  const pieData = [
    ["Status", "Percentage"],
    ["Prepared", readiness],
    ["Gap", 100 - readiness],
  ];

  const pieOptions = {
    title: "Readiness Score",
    pieHole: 0.4,
    colors: ["#4CAF50", "#F44336"],
  };

  // ✅ Bar chart for skills gap
  const barData = [
    ["Skill", "Status"],
    ...skills.map((skill) => [skill, 0]), // missing skills shown as 0
  ];

  const barOptions = {
    title: "Skills Gap",
    chartArea: { width: "60%" },
    hAxis: {
      title: "Proficiency",
      minValue: 0,
    },
    vAxis: {
      title: "Skills",
    },
    colors: ["#F44336"],
  };

  return (
    <div className="analysis-page">
      <h1 className="analysis-title">Resume Analysis Result</h1>

      <div className="analysis-container">
        {/* Pie Chart for Readiness */}
        <div className="analysis-card">
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={pieData}
            options={pieOptions}
          />
        </div>

        {/* Bar Chart for Skills Gap */}
        <div className="analysis-card">
          {skills.length > 0 ? (
            <>
              <Chart
                chartType="BarChart"
                width="100%"
                height="300px"
                data={barData}
                options={barOptions}
              />

              <button className="primary-btn" onClick={handleGenerateRoadmap}>
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