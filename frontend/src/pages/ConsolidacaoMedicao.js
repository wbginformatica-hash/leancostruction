import React from "react";

export default function ConsolidacaoMedicao({ enterprise }) {
  return (
    <div className="consolidacao-medicao">
      <h1>Consolidação de Medição</h1>
      <h2>{enterprise?.name}</h2>
      <p>Consolidação de pacotes em medição para {enterprise?.name}</p>
    </div>
  );
}