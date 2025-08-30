import React from 'react';

const Planejamento = ({ enterprise }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Planejamento</h1>
      <p>Empreendimento: {enterprise?.name}</p>
    </div>
  );
};

export default Planejamento;