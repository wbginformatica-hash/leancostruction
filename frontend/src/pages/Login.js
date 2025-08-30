import React from 'react';

const Login = ({ onLogin }) => {
  const handleLogin = () => {
    // Simulate login with a gestor role
    onLogin({ role: 'gestor', username: 'test' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuário
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue="test.user"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue="password"
            />
          </div>
          <button 
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;