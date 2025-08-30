import React from "react";

export default function ConsolidacaoMedicao({ enterprise }) {
  return (
    <div>
      <h1>Consolidação de Medição</h1>
      <p>Enterprise: {enterprise?.name}</p>
    </div>
  );
}