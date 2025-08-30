import React from "react";

export default function KanbanView({ enterprise, onSelectPacote }) {
  return (
    <div>
      <h1>Kanban View</h1>
      <p>Enterprise: {enterprise?.name}</p>
      <button onClick={() => onSelectPacote({ name: 'Test Package' })}>
        Select Package
      </button>
    </div>
  );
}