import React from 'react';
import { Card } from '../types';

interface VirtualCardProps {
  card: Card;
}

const VirtualCard: React.FC<VirtualCardProps> = ({ card }) => {
  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-2xl bg-brand-surface border border-brand-border text-brand-text-primary shadow-sm relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-blue-100 rounded-full opacity-30"></div>
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-lg font-semibold">{card.alias}</p>
                    <p className="text-sm text-brand-text-secondary">Virtual Card</p>
                </div>
                <div className={`font-bold text-2xl italic ${card.brand === 'Visa' ? 'text-blue-600' : 'text-orange-500'}`}>{card.brand}</div>
            </div>

            <div className="text-center my-8">
                <p className="text-sm text-brand-text-secondary tracking-widest">Card Number</p>
                <p className="text-2xl md:text-3xl font-mono tracking-wider text-brand-text-primary">
                    •••• •••• •••• {card.last4}
                </p>
            </div>
            
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-xs text-brand-text-secondary">Expires</p>
                    <p className="font-medium text-lg">{card.exp}</p>
                </div>
                <div>
                    <p className="text-xs text-brand-text-secondary text-right">Balance</p>
                    <p className="font-bold text-xl text-brand-dark-blue">{new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(card.balance)}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default VirtualCard;