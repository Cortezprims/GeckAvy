import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import { useGeckAvy } from '../hooks/useGeckAvy';

interface CreditPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CREDIT_COST = {
    sms: 30, // 30 XAF per SMS
    email: 5, // 5 XAF per Email
};

const CreditPurchaseModal: React.FC<CreditPurchaseModalProps> = ({ isOpen, onClose }) => {
  const { buyCredits } = useGeckAvy();
  const [creditType, setCreditType] = useState<'sms' | 'email'>('sms');
  const [amount, setAmount] = useState('');

  const totalCost = useMemo(() => {
      const numAmount = parseInt(amount);
      if(isNaN(numAmount) || numAmount <= 0) return 0;
      return numAmount * CREDIT_COST[creditType];
  }, [amount, creditType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount);
    if (!amount || numAmount <= 0) {
      alert('Please enter a valid amount of credits to purchase.');
      return;
    }
    buyCredits(creditType, numAmount, totalCost);
    onClose();
    setAmount('');
  };

  const inputStyles = "mt-1 block w-full p-3 bg-gray-50 border border-brand-border rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue text-brand-text-primary";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Purchase Marketing Credits">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-text-secondary">Credit Type</label>
          <select value={creditType} onChange={e => setCreditType(e.target.value as 'sms' | 'email')} className={inputStyles}>
            <option value="sms">SMS Credits</option>
            <option value="email">Email Credits</option>
          </select>
        </div>
        <div>
          <label htmlFor="credit_amount" className="block text-sm font-medium text-brand-text-secondary">Number of Credits</label>
          <input 
            type="number" 
            id="credit_amount" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            placeholder="e.g., 1000" 
            className={inputStyles} 
            min="1"
            />
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-sm font-medium text-brand-text-secondary">Total Cost</p>
            <p className="text-2xl font-bold text-brand-dark-blue">
                {new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(totalCost)}
            </p>
        </div>

        <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue/90 transition-colors disabled:opacity-50" disabled={totalCost <= 0}>
          Purchase Credits
        </button>
      </form>
    </Modal>
  );
};

export default CreditPurchaseModal;
