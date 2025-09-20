import React, { useState } from 'react';
import Modal from './Modal';
import { useGeckAvy } from '../hooks/useGeckAvy';
import { TransactionType, Operator } from '../types';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const operators = [Operator.ORANGE, Operator.MTN, Operator.CAMTEL, Operator.NEXTELL];

const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useGeckAvy();
  const [operator, setOperator] = useState<Operator>(Operator.MTN);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !amount || parseInt(amount) <= 0) {
      alert('Please enter a valid phone number and amount.');
      return;
    }
    addTransaction(TransactionType.TOPUP, `${operator} Top-up for ${phone}`, -parseInt(amount));
    onClose();
    setPhone('');
    setAmount('');
  };

  const inputStyles = "mt-1 block w-full p-3 bg-gray-50 border border-brand-border rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue text-brand-text-primary";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mobile Top-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-text-secondary">Operator</label>
          <select value={operator} onChange={e => setOperator(e.target.value as Operator)} className={inputStyles}>
            {operators.map(op => <option key={op} value={op}>{op}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-text-secondary">Phone Number</label>
          <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g., 670000000" className={inputStyles} />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-brand-text-secondary">Amount (XAF)</label>
          <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g., 5000" className={inputStyles} />
        </div>
        <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue/90 transition-colors">
          Proceed to Top-up
        </button>
      </form>
    </Modal>
  );
};

export default TopUpModal;