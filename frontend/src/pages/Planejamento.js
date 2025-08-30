import React from "react";

export default function Planejamento({ enterprise }) {
  return (
    <div className="planejamento">
      <h1>Planejamento</h1>
      <h2>{enterprise?.name}</h2>
      <p>Módulo de planejamento para {enterprise?.name}</p>
    </div>
  );
}