import React from "react";

export default function GestaoPacotes({ enterprise }) {
  return (
    <div className="gestao-pacotes">
      <h1>Gestão de Pacotes</h1>
      <h2>{enterprise?.name}</h2>
      <p>Gestão de pacotes de trabalho para {enterprise?.name}</p>
    </div>
  );
}