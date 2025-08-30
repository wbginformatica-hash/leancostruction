import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(null);
  const [packages, setPackages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [sites, setSites] = useState([]);

  const value = {
    project,
    setProject,
    packages,
    setPackages,
    activities,
    setActivities,
    sites,
    setSites,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};