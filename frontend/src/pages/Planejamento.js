import React from "react";

export default function Planejamento({ enterprise }) {
  return (
    <div>
      <h1>Planejamento</h1>
      <p>Enterprise: {enterprise?.name}</p>
    </div>
  );
}