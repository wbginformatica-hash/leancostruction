// Utility functions for the project

export const exportToXLSX = (data: any[], filename: string): void => {
  // Stub implementation for XLSX export
  console.log('Exporting to XLSX:', filename, data);
  alert(`Exportando ${filename} (${data.length} registros)`);
};

export const exportToXML = (data: any[], filename: string): void => {
  // Stub implementation for XML export
  console.log('Exporting to XML:', filename, data);
  alert(`Exportando ${filename} (${data.length} registros)`);
};

export const formatDate = (date: string | Date | null): string => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('pt-BR');
};

export const formatCurrency = (value: number | null): string => {
  if (!value) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};