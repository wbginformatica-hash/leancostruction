import React from 'react';

const ConsolidacaoMedicao = ({ enterprise }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Consolidação de Medição</h1>
      <p>Empreendimento: {enterprise?.name}</p>
    </div>
  );
};

export default ConsolidacaoMedicao;