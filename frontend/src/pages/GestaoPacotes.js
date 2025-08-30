import React from "react";

export default function GestaoPacotes({ enterprise }) {
  return (
    <div>
      <h1>Gestão de Pacotes</h1>
      <p>Enterprise: {enterprise?.name}</p>
    </div>
  );
}