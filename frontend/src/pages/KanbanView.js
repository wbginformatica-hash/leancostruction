import React from "react";

export default function KanbanView({ enterprise, onSelectPacote }) {
  return (
    <div className="kanban-view">
      <h1>Kanban</h1>
      <h2>{enterprise?.name}</h2>
      <p>Visão Kanban para {enterprise?.name}</p>
    </div>
  );
}