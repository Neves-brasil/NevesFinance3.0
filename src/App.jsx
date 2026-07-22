import { useState } from 'react';

const initialTransactions = [
  { id: 1, label: 'Saldo inicial', type: 'Entrada', amount: 0 },
];

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem('nevesfinance_transactions');
    return stored ? JSON.parse(stored) : initialTransactions;
  });

  const balance = transactions.reduce((total, transaction) => (
    transaction.type === 'Entrada'
      ? total + transaction.amount
      : total - transaction.amount
  ), 0);

  const addTransaction = () => {
    const next = [
      ...transactions,
      { id: Date.now(), label: 'Nova transação', type: 'Entrada', amount: 0 },
    ];
    setTransactions(next);
    localStorage.setItem('nevesfinance_transactions', JSON.stringify(next));
  };

  return (
    <main className="app-shell">
      <section className="app-header">
        <p className="eyebrow">Neves Finance</p>
        <h1>Seu dinheiro, em ordem.</h1>
        <p className="subtitle">A base do aplicativo está pronta para receber os módulos financeiros.</p>
      </section>

      <section className="balance-panel" aria-label="Saldo atual">
        <span>Saldo atual</span>
        <strong>{formatCurrency(balance)}</strong>
      </section>

      <section className="transactions-panel" aria-labelledby="transactions-title">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Movimentações</p>
            <h2 id="transactions-title">Transações recentes</h2>
          </div>
          <button type="button" onClick={addTransaction}>Adicionar</button>
        </div>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <span>{transaction.label}</span>
              <strong>{formatCurrency(transaction.amount)}</strong>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
