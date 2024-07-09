import React from 'react';
import './ProjectList.css';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <div key={index} className="project-item">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
