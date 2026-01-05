import { useState } from "react";

const roleSkills = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
  "Backend Developer": ["Node", "Express", "MongoDB", "SQL"],
  "Data Analyst": ["Python", "SQL", "Excel", "Power BI"],
  "AI / ML Engineer": ["Python", "Machine Learning", "Deep Learning", "TensorFlow"],
};

export default function PlacementApp() {
  const [role, setRole] = useState("Frontend Developer");
  const [resume, setResume] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [roadmap, setRoadmap] = useState([]);

  const analyzeResume = () => {
    const requiredSkills = roleSkills[role];
    const resumeText = resume.toLowerCase();

    const strongSkills = requiredSkills.filter(skill =>
      resumeText.includes(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(skill =>
      !resumeText.includes(skill.toLowerCase())
    );

    const generatedRoadmap = missingSkills.map((skill, index) => ({
      week: index + 1,
      description: `Learn ${skill} fundamentals and build a small project`,
    }));

    setAnalysis({
      strong: strongSkills,
      missing: missingSkills,
    });

    setRoadmap(generatedRoadmap);
  };

  return (
    <div className="page">
      <h1>AI Placement Readiness Analyzer 🚀</h1>
      <p className="subtitle">
        Analyze your resume and get a personalized preparation roadmap
      </p>

      {/* INPUT CARD */}
      <div className="card">
        <label>Target Role</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          {Object.keys(roleSkills).map(r => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <label>Paste Your Resume</label>
        <textarea
          placeholder="Paste your resume here..."
          value={resume}
          onChange={e => setResume(e.target.value)}
        />

        <button onClick={analyzeResume}>Analyze Resume</button>
      </div>

      {/* ANALYSIS RESULT */}
      {analysis && (
        <div className="card" style={{ marginTop: "30px" }}>
          <h3>Skill Analysis</h3>

          <p><strong>Strong Skills</strong></p>
          <ul>
            {analysis.strong.length > 0 ? (
              analysis.strong.map(skill => <li key={skill}>{skill}</li>)
            ) : (
              <li>No matching skills found</li>
            )}
          </ul>

          <p><strong>Skills to Improve</strong></p>
          <ul>
            {analysis.missing.map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ROADMAP */}
      {roadmap.length > 0 && (
        <div className="card" style={{ marginTop: "30px" }}>
          <h3>Personalized Learning Roadmap</h3>
          <ul>
            {roadmap.map(step => (
              <li key={step.week}>
                <strong>Week {step.week}:</strong> {step.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
