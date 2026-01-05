import { useLocation, useNavigate } from "react-router-dom";
import "../styles/RoadmapPage.css";

const roadmapContent = {
  JavaScript: [
    "Basics (variables, loops, functions)",
    "ES6+ features",
    "Async JS (Promises, async/await)",
    "DOM manipulation",
    "Mini projects",
  ],
  React: [
    "JSX & Components",
    "Props & State",
    "Hooks (useState, useEffect)",
    "Routing",
    "Build a full project",
  ],
};

const RoadmapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const skills = location.state?.skills || [];

  return (
    <div className="roadmap-page">
      <h1>Your Personalized Roadmap</h1>

      {skills.length === 0 ? (
        <>
          <p className="ready-text">You are job-ready 🎯</p>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Go Home
          </button>
        </>
      ) : (
        <div className="roadmap-container">
          {skills.map((skill, index) => (
            <div className="roadmap-card" key={index}>
              <h2>{skill}</h2>
              <ul>
                {(roadmapContent[skill] || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
