import React from 'react';

const GestaoPacotes = ({ enterprise }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Gestão de Pacotes</h1>
      <p>Empreendimento: {enterprise?.name}</p>
    </div>
  );
};

export default GestaoPacotes;