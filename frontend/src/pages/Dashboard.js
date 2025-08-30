import React from 'react';

const Dashboard = ({ onSelectEnterprise }) => {
  const handleSelectEnterprise = () => {
    onSelectEnterprise({ id: 1, name: 'Empreendimento Teste' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <button 
        onClick={handleSelectEnterprise}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Selecionar Empreendimento
      </button>
    </div>
  );
};

export default Dashboard;