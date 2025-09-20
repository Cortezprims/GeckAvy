import React from 'react';
import { Transaction, TransactionType } from '../types';
import Icon from './Icon';
import { ICONS } from '../constants';

interface TransactionItemProps {
  transaction: Transaction;
}

const getTransactionIcon = (type: TransactionType) => {
  switch (type) {
    case TransactionType.TOPUP:
      return { icon: ICONS.topup, color: 'bg-cyan-100 text-cyan-600' };
    case TransactionType.BILL:
      return { icon: ICONS.bill, color: 'bg-amber-100 text-amber-600' };
    case TransactionType.INCOMING:
      return { icon: ICONS.incoming, color: 'bg-green-100 text-green-600' };
    case TransactionType.CARD_CREATION:
        return { icon: ICONS.cards, color: 'bg-indigo-100 text-indigo-600' };
    case TransactionType.CREDIT_PURCHASE:
        return { icon: ICONS.campaigns, color: 'bg-blue-100 text-blue-600' };
    default:
      return { icon: ICONS.transactions, color: 'bg-gray-100 text-gray-600' };
  }
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { icon, color } = getTransactionIcon(transaction.type);
  const isDebit = transaction.amount < 0;
  
  const formatCurrency = (amount: number) => {
    const options = { style: 'currency', currency: 'XAF', signDisplay: 'never' } as Intl.NumberFormatOptions;
    return new Intl.NumberFormat('fr-CM', options).format(Math.abs(amount));
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon path={icon} className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-brand-text-primary">{transaction.description}</p>
          <p className="text-sm text-brand-text-secondary">{transaction.date.toLocaleDateString()}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${isDebit ? 'text-red-500' : 'text-green-500'}`}>
          {isDebit ? '-' : '+'} {formatCurrency(transaction.amount)}
        </p>
        <p className={`text-sm ${transaction.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
            {transaction.status}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;