import React, { useState, useEffect } from 'react';
import { useProjectContext } from '../contexts/ProjectContext';
import { exportToXLSX, exportToXML } from '../utils/exportUtils';

const PlanningStructure = ({ enterprise }) => {
  const { activities, setActivities, sites, setSites, packages, setPackages } = useProjectContext();
  const [activeTab, setActiveTab] = useState('activities');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  // Mock data structure for planning
  useEffect(() => {
    const mockActivities = [
      {
        id: 1,
        code: 'ATV001',
        name: 'Fundação',
        description: 'Execução da fundação do edifício',
        unit: 'm³',
        productivity: 2.5,
        duration: 10,
        cost: 150.00
      },
      {
        id: 2,
        code: 'ATV002', 
        name: 'Estrutura',
        description: 'Execução da estrutura de concreto',
        unit: 'm³',
        productivity: 1.8,
        duration: 15,
        cost: 220.00
      },
      {
        id: 3,
        code: 'ATV003',
        name: 'Alvenaria',
        description: 'Execução de alvenaria de vedação',
        unit: 'm²',
        productivity: 8.0,
        duration: 12,
        cost: 35.00
      }
    ];

    const mockSites = [
      {
        id: 1,
        code: 'SITE001',
        name: 'Bloco A - Térreo',
        description: 'Área térrea do bloco A',
        area: 500.0,
        type: 'Construção'
      },
      {
        id: 2,
        code: 'SITE002',
        name: 'Bloco A - 1º Andar',
        description: 'Primeiro andar do bloco A',
        area: 480.0,
        type: 'Construção'
      },
      {
        id: 3,
        code: 'SITE003',
        name: 'Área Externa',
        description: 'Paisagismo e área externa',
        area: 1200.0,
        type: 'Paisagismo'
      }
    ];

    const mockPackages = [
      {
        id: 1,
        code: 'PKG001',
        name: 'Pacote Estrutural',
        description: 'Pacote de atividades estruturais',
        activityIds: [1, 2],
        siteIds: [1],
        startDate: '2024-01-15',
        endDate: '2024-02-28',
        status: 'active'
      },
      {
        id: 2,
        code: 'PKG002',
        name: 'Pacote Acabamento',
        description: 'Pacote de atividades de acabamento',
        activityIds: [3],
        siteIds: [1, 2],
        startDate: '2024-03-01',
        endDate: '2024-04-15',
        status: 'planned'
      }
    ];

    setActivities(mockActivities);
    setSites(mockSites);
    setPackages(mockPackages);
  }, [setActivities, setSites, setPackages]);

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type });
  };

  const handleSave = (updatedItem: any) => {
    const { type, ...item } = updatedItem;
    
    if (type === 'activity') {
      setActivities(prev => prev.map(a => a.id === item.id ? item : a));
    } else if (type === 'site') {
      setSites(prev => prev.map(s => s.id === item.id ? item : s));
    } else if (type === 'package') {
      setPackages(prev => prev.map(p => p.id === item.id ? item : p));
    }
    
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowNewForm(false);
  };

  const handleCreateNew = (type: string) => {
    const newItem = {
      id: Date.now(),
      code: '',
      name: '',
      description: '',
      type
    };

    if (type === 'activity') {
      newItem.unit = '';
      newItem.productivity = 0;
      newItem.duration = 0;
      newItem.cost = 0;
    } else if (type === 'site') {
      newItem.area = 0;
      newItem.type = 'Construção';
    } else if (type === 'package') {
      newItem.activityIds = [];
      newItem.siteIds = [];
      newItem.startDate = '';
      newItem.endDate = '';
      newItem.status = 'planned';
    }

    setEditingItem(newItem);
    setShowNewForm(true);
  };

  const handleAddNew = (newItem: any) => {
    const { type, ...item } = newItem;
    
    if (type === 'activity') {
      setActivities(prev => [...prev, item]);
    } else if (type === 'site') {
      setSites(prev => [...prev, item]);
    } else if (type === 'package') {
      setPackages(prev => [...prev, item]);
    }
    
    setEditingItem(null);
    setShowNewForm(false);
  };

  const handleExportExcel = () => {
    const data = activeTab === 'activities' ? activities : 
                 activeTab === 'sites' ? sites : packages;
    exportToXLSX(data, `${activeTab}_${enterprise?.name || 'projeto'}.xlsx`);
  };

  const handleExportXML = () => {
    const data = activeTab === 'activities' ? activities : 
                 activeTab === 'sites' ? sites : packages;
    exportToXML(data, `${activeTab}_${enterprise?.name || 'projeto'}.xml`);
  };

  const renderEditForm = (item: any) => {
    if (item.type === 'activity') {
      return (
        <tr className="bg-blue-50">
          <td colSpan="7" className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Código"
                value={item.code}
                onChange={(e) => setEditingItem({...item, code: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Nome"
                value={item.name}
                onChange={(e) => setEditingItem({...item, name: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Unidade"
                value={item.unit}
                onChange={(e) => setEditingItem({...item, unit: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Produtividade"
                value={item.productivity}
                onChange={(e) => setEditingItem({...item, productivity: parseFloat(e.target.value) || 0})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Duração (dias)"
                value={item.duration}
                onChange={(e) => setEditingItem({...item, duration: parseInt(e.target.value) || 0})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Custo"
                value={item.cost}
                onChange={(e) => setEditingItem({...item, cost: parseFloat(e.target.value) || 0})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <div className="md:col-span-2 lg:col-span-3">
                <textarea
                  placeholder="Descrição"
                  value={item.description}
                  onChange={(e) => setEditingItem({...item, description: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  rows="2"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => showNewForm ? handleAddNew(item) : handleSave(item)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                >
                  {showNewForm ? 'Criar' : 'Salvar'}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
    } else if (item.type === 'site') {
      return (
        <tr className="bg-blue-50">
          <td colSpan="5" className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Código"
                value={item.code}
                onChange={(e) => setEditingItem({...item, code: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Nome"
                value={item.name}
                onChange={(e) => setEditingItem({...item, name: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <select
                value={item.type}
                onChange={(e) => setEditingItem({...item, type: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="Construção">Construção</option>
                <option value="Paisagismo">Paisagismo</option>
                <option value="Infraestrutura">Infraestrutura</option>
              </select>
              <input
                type="number"
                step="0.01"
                placeholder="Área (m²)"
                value={item.area}
                onChange={(e) => setEditingItem({...item, area: parseFloat(e.target.value) || 0})}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <div className="md:col-span-2">
                <textarea
                  placeholder="Descrição"
                  value={item.description}
                  onChange={(e) => setEditingItem({...item, description: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  rows="2"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => showNewForm ? handleAddNew(item) : handleSave(item)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                >
                  {showNewForm ? 'Criar' : 'Salvar'}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
    }
  };

  const renderActivities = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Atividades</h2>
          <button
            onClick={() => handleCreateNew('activity')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Nova Atividade
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produtividade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duração</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity) => (
              <React.Fragment key={activity.id}>
                {editingItem && editingItem.id === activity.id ? (
                  renderEditForm(editingItem)
                ) : (
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.productivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.duration} dias
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(activity.cost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(activity, 'activity')}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {showNewForm && editingItem && editingItem.type === 'activity' && renderEditForm(editingItem)}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSites = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Sites de Execução</h2>
          <button
            onClick={() => handleCreateNew('site')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Novo Site
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sites.map((site) => (
              <React.Fragment key={site.id}>
                {editingItem && editingItem.id === site.id ? (
                  renderEditForm(editingItem)
                ) : (
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {site.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {site.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {site.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {site.area} m²
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(site, 'site')}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {showNewForm && editingItem && editingItem.type === 'site' && renderEditForm(editingItem)}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPackages = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Pacotes</h2>
          <button
            onClick={() => handleCreateNew('package')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Novo Pacote
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atividades</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sites</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {packages.map((pkg) => (
              <React.Fragment key={pkg.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pkg.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pkg.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {pkg.activityIds.length} atividades
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {pkg.siteIds.length} sites
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pkg.startDate} até {pkg.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      pkg.status === 'active' ? 'bg-green-100 text-green-800' :
                      pkg.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {pkg.status === 'active' ? 'Ativo' : 
                       pkg.status === 'planned' ? 'Planejado' : pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(pkg, 'package')}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Estrutura de Planejamento
          </h1>
          <p className="text-gray-600">
            Empreendimento: {enterprise?.name || 'Não selecionado'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'activities', label: 'Atividades' },
              { id: 'sites', label: 'Sites de Execução' },
              { id: 'packages', label: 'Pacotes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Export Actions */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={handleExportExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Exportar Excel
          </button>
          <button
            onClick={handleExportXML}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Exportar XML
          </button>
        </div>

        {/* Content */}
        {activeTab === 'activities' && renderActivities()}
        {activeTab === 'sites' && renderSites()}
        {activeTab === 'packages' && renderPackages()}
      </div>
    </div>
  );
};

export default PlanningStructure;