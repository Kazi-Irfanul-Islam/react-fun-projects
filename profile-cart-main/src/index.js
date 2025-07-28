import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";

const skills = [
  {
    skill: "HTML + CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "beginner",
    color: "#C3DCAF",
  },
  {
    skill: "Git and Github",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "intermediate",
    color: "#60DAFB",
  },
];
function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="coder.jpg" alt="Coder-image" />;
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill
          skill={skill.skill}
          color={skill.color}
          level={skill.level}
        ></Skill>
      ))}
    </div>
  );
}

function Skill({ skill, color, level }) {
  const style = { backgroundColor: color };
  return (
    <div className="skill" style={style}>
      <span>{skill}</span>
      <span>
        {level === "beginner" && "😒"}
        {level === "intermediate" && "😊"}
        {level === "advanced" && "😎"}
      </span>
    </div>
  );
}

function Intro() {
  return (
    <div>
      <h1>Kazi Irfanul Islam</h1>
      <article>
        I operate in the world of React, building scalable and responsive web
        applications. My focus is on writing performant back-end logic and
        dynamic front-end experiences that are both powerful and easy to use.
      </article>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
