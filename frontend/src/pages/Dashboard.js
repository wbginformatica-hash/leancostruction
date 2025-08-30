import React from "react";

export default function Dashboard({ onSelectEnterprise }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => onSelectEnterprise({ name: 'Test Enterprise' })}>
        Select Enterprise
      </button>
    </div>
  );
}