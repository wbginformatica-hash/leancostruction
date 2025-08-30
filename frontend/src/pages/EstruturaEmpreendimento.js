import React from "react";

export default function EstruturaEmpreendimento({ enterprise }) {
  return (
    <div className="estrutura-empreendimento">
      <h1>Estrutura do Empreendimento</h1>
      <h2>{enterprise?.name}</h2>
      <p>Estrutura analítica do projeto (EAP) para {enterprise?.name}</p>
    </div>
  );
}