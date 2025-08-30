import React from "react";

export default function Dashboard({ onSelectEnterprise }) {
  const enterprises = [
    { id: 1, name: "Empreendimento A", location: "São Paulo" },
    { id: 2, name: "Empreendimento B", location: "Rio de Janeiro" },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard - Empreendimentos</h1>
      <div className="enterprises-grid">
        {enterprises.map((enterprise) => (
          <div
            key={enterprise.id}
            className="enterprise-card"
            onClick={() => onSelectEnterprise(enterprise)}
          >
            <h3>{enterprise.name}</h3>
            <p>{enterprise.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}