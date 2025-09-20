import React, { useState } from 'react';
import Modal from './Modal';
import { useGeckAvy } from '../hooks/useGeckAvy';
import { TransactionType, BillProvider } from '../types';

interface BillPayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const providers = [BillProvider.ENEO, BillProvider.CAMWATER];

const BillPayModal: React.FC<BillPayModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useGeckAvy();
  const [provider, setProvider] = useState<BillProvider>(BillProvider.ENEO);
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !amount || parseInt(amount) <= 0) {
      alert('Please enter a valid account number and amount.');
      return;
    }
    addTransaction(TransactionType.BILL, `${provider} bill for ${account}`, -parseInt(amount));
    onClose();
    setAccount('');
    setAmount('');
  };
  
  const inputStyles = "mt-1 block w-full p-3 bg-gray-50 border border-brand-border rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue text-brand-text-primary";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pay a Bill">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-text-secondary">Bill Provider</label>
          <select value={provider} onChange={e => setProvider(e.target.value as BillProvider)} className={inputStyles}>
            {providers.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="account" className="block text-sm font-medium text-brand-text-secondary">Account / Meter Number</label>
          <input type="text" id="account" value={account} onChange={e => setAccount(e.target.value)} placeholder="Enter your account number" className={inputStyles} />
        </div>
        <div>
          <label htmlFor="bill_amount" className="block text-sm font-medium text-brand-text-secondary">Amount to Pay (XAF)</label>
          <input type="number" id="bill_amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g., 12500" className={inputStyles} />
        </div>
        <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue/90 transition-colors">
          Pay Bill
        </button>
      </form>
    </Modal>
  );
};

export default BillPayModal;