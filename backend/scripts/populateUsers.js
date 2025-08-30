const db = require('../src/database');

const users = [
  { username: 'gustavo.aquino', password: 'Orion040192@', role: 'admin' },
  { username: 'lorena.noely', password: 'Orion040192@', role: 'gestor' },
  { username: 'aquino.sousa', password: 'Orion040192@', role: 'usuario' },
];

users.forEach(u => {
  db.run(
    'INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)',
    [u.username, u.password, u.role],
    err => {
      if (err) console.error(`Erro ao inserir usuário ${u.username}:`, err);
      else console.log(`Usuário ${u.username} inserido ou já existente.`);
    }
  );
});