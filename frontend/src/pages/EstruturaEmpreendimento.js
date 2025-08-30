import React from "react";

export default function EstruturaEmpreendimento({ enterprise }) {
  return (
    <div>
      <h1>Estrutura do Empreendimento</h1>
      <p>Enterprise: {enterprise?.name}</p>
    </div>
  );
}