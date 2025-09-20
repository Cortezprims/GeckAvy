import React from 'react';
import { useGeckAvy } from '../hooks/useGeckAvy';
import TransactionItem from './TransactionItem';

const Transactions: React.FC = () => {
  const { transactions } = useGeckAvy();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-primary">All Transactions</h1>
      <div className="bg-brand-surface p-4 md:p-6 rounded-2xl border border-brand-border shadow-sm">
        <div className="space-y-2">
          {transactions.length > 0 ? (
            transactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
          ) : (
            <p className="text-brand-text-secondary">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;