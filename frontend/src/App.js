import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EstruturaEmpreendimento from "./pages/EstruturaEmpreendimento";
import Planejamento from "./pages/Planejamento";
import GestaoPacotes from "./pages/GestaoPacotes";
import ConsolidacaoMedicao from "./pages/ConsolidacaoMedicao";
import Consolidation from "./pages/Consolidation";
import PlanningStructure from "./pages/PlanningStructure";
import SetupImportacoes from "./pages/SetupImportacoes";
import KanbanView from "./pages/KanbanView";
import "./pages/styles.css";

// Simulação de perfis e navegação
export default function App() {
  const [user, setUser] = useState(null);
  const [enterprise, setEnterprise] = useState(null);
  const [selectedPacote, setSelectedPacote] = useState(null);

  function handleLogin(data) {
    setUser(data);
  }

  // Proteção de rotas
  function PrivateRoute({ children, roles }) {
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
    return children;
  }

  return (
    <ProjectProvider>
      <Router>
        <div className="main-bg">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Dashboard de Empreendimentos */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard onSelectEnterprise={setEnterprise} />
                </PrivateRoute>
              }
            />

            {/* Estrutura do Empreendimento */}
            <Route
              path="/eap"
              element={
                <PrivateRoute>
                  {enterprise ? <EstruturaEmpreendimento enterprise={enterprise} /> : <Navigate to="/" />}
                </PrivateRoute>
              }
            />

            {/* Planejamento */}
            <Route
              path="/planejamento"
              element={
                <PrivateRoute>
                  {enterprise ? <PlanningStructure enterprise={enterprise} /> : <Navigate to="/" />}
                </PrivateRoute>
              }
            />

            {/* Gestão de Pacotes */}
            <Route
              path="/pacotes"
              element={
                <PrivateRoute>
                  {enterprise ? <GestaoPacotes enterprise={enterprise} /> : <Navigate to="/" />}
                </PrivateRoute>
              }
            />

            {/* Consolidação de Pacotes em Medição */}
            <Route
              path="/consolidacao"
              element={
                <PrivateRoute roles={["gestor"]}>
                  {enterprise ? <Consolidation enterprise={enterprise} /> : <Navigate to="/" />}
                </PrivateRoute>
              }
            />

            {/* Setup de Importações */}
            <Route
              path="/importacoes"
              element={
                <PrivateRoute roles={["admin"]}>
                  <SetupImportacoes />
                </PrivateRoute>
              }
            />

            {/* Kanban */}
            <Route
              path="/kanban"
              element={
                <PrivateRoute>
                  {enterprise ? (
                    <KanbanView
                      enterprise={enterprise}
                      onSelectPacote={pacote => {
                        setSelectedPacote(pacote);
                        window.location.href = "/pacotes";
                      }}
                    />
                  ) : (
                    <Navigate to="/" />
                  )}
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
}