import React, { useState, useEffect } from 'react';
import { useProjectContext } from '../contexts/ProjectContext';
import { exportToXLSX } from '../utils/exportUtils';

const Consolidation = ({ enterprise }) => {
  const { packages } = useProjectContext();
  const [consolidationData, setConsolidationData] = useState([]);
  const [selectedWorkforce, setSelectedWorkforce] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data structure for consolidation
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        packageName: 'Pacote A - Estrutura',
        workforce: 'Equipe Alpha',
        status: 'pending',
        progress: 75,
        value: 25000,
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        activities: [
          { name: 'Fundação', progress: 100, value: 10000 },
          { name: 'Pilares', progress: 50, value: 15000 }
        ]
      },
      {
        id: 2,
        packageName: 'Pacote B - Instalações',
        workforce: 'Equipe Beta',
        status: 'approved',
        progress: 90,
        value: 30000,
        startDate: '2024-02-01',
        endDate: '2024-03-01',
        activities: [
          { name: 'Elétrica', progress: 95, value: 18000 },
          { name: 'Hidráulica', progress: 85, value: 12000 }
        ]
      },
      {
        id: 3,
        packageName: 'Pacote C - Acabamento',
        workforce: 'Equipe Alpha',
        status: 'rejected',
        progress: 60,
        value: 20000,
        startDate: '2024-03-01',
        endDate: '2024-04-01',
        activities: [
          { name: 'Pintura', progress: 70, value: 8000 },
          { name: 'Piso', progress: 50, value: 12000 }
        ]
      }
    ];
    setConsolidationData(mockData);
  }, []);

  const handleApprove = (packageId) => {
    setConsolidationData(prev => 
      prev.map(pkg => 
        pkg.id === packageId ? { ...pkg, status: 'approved' } : pkg
      )
    );
  };

  const handleReject = (packageId) => {
    setConsolidationData(prev => 
      prev.map(pkg => 
        pkg.id === packageId ? { ...pkg, status: 'rejected' } : pkg
      )
    );
  };

  const handleExportXLSX = () => {
    const filteredData = getFilteredData();
    exportToXLSX(filteredData, `consolidacao_medicao_${enterprise?.name || 'projeto'}.xlsx`);
  };

  const getFilteredData = () => {
    return consolidationData.filter(pkg => {
      const workforceMatch = selectedWorkforce === 'all' || pkg.workforce === selectedWorkforce;
      const statusMatch = filterStatus === 'all' || pkg.status === filterStatus;
      return workforceMatch && statusMatch;
    });
  };

  const getWorkforces = () => {
    const workforces = [...new Set(consolidationData.map(pkg => pkg.workforce))];
    return workforces;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Reprovado';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  const filteredData = getFilteredData();
  const totalValue = filteredData.reduce((sum, pkg) => sum + pkg.value, 0);
  const approvedValue = filteredData.filter(pkg => pkg.status === 'approved').reduce((sum, pkg) => sum + pkg.value, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consolidação de Pacotes em Medição
          </h1>
          <p className="text-gray-600">
            Empreendimento: {enterprise?.name || 'Não selecionado'}
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              {/* Workforce Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipe:
                </label>
                <select
                  value={selectedWorkforce}
                  onChange={(e) => setSelectedWorkforce(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">Todas as Equipes</option>
                  {getWorkforces().map(workforce => (
                    <option key={workforce} value={workforce}>
                      {workforce}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status:
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">Todos os Status</option>
                  <option value="pending">Pendente</option>
                  <option value="approved">Aprovado</option>
                  <option value="rejected">Reprovado</option>
                </select>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportXLSX}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Exportar XLSX
            </button>
          </div>

          {/* Summary */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total de Pacotes</p>
              <p className="text-2xl font-bold text-blue-900">{filteredData.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Valor Aprovado</p>
              <p className="text-2xl font-bold text-green-900">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(approvedValue)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Valor Total</p>
              <p className="text-2xl font-bold text-purple-900">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
              </p>
            </div>
          </div>
        </div>

        {/* Packages Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pacote
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progresso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{pkg.packageName}</div>
                      <div className="text-sm text-gray-500">
                        {pkg.startDate} até {pkg.endDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pkg.workforce}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${pkg.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{pkg.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pkg.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                        {getStatusText(pkg.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {pkg.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(pkg.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleReject(pkg.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Reprovar
                          </button>
                        </div>
                      )}
                      {pkg.status !== 'pending' && (
                        <span className="text-gray-400 text-xs">
                          {pkg.status === 'approved' ? 'Aprovado' : 'Reprovado'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum pacote encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>

        {/* Activities Detail */}
        {filteredData.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Detalhes das Atividades
            </h2>
            <div className="space-y-6">
              {filteredData.map((pkg) => (
                <div key={pkg.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                  <h3 className="font-medium text-gray-900 mb-3">{pkg.packageName}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pkg.activities.map((activity, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">{activity.name}</span>
                          <span className="text-sm text-gray-500">{activity.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${activity.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(activity.value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consolidation;