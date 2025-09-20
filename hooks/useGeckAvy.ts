import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Card, Transaction, TransactionType, Operator, BillProvider } from '../types';

interface User {
    name: string;
    avatarUrl: string;
}

interface MarketingState {
    smsMarketing: boolean;
    emailMarketing: boolean;
    smsCredits: number;
    emailCredits: number;
}

interface GeckAvyContextType {
  user: User;
  balance: number;
  cards: Card[];
  transactions: Transaction[];
  marketing: MarketingState;
  addCard: (alias: string) => void;
  addTransaction: (type: TransactionType, description: string, amount: number) => void;
  updateAvatar: (newAvatarUrl: string) => void;
  toggleMarketingSubscription: (type: 'sms' | 'email') => void;
  buyCredits: (type: 'sms' | 'email', amount: number, cost: number) => void;
}

const initialCards: Card[] = [
    { id: 'c1', brand: 'Visa', last4: '4242', alias: 'Main Card', exp: '12/28', balance: 150000, primary: true },
    { id: 'c2', brand: 'MasterCard', last4: '5555', alias: 'Online Shopping', exp: '08/26', balance: 75000, primary: false },
];

const initialTransactions: Transaction[] = [
    { id: 't1', type: TransactionType.INCOMING, description: 'Salary Deposit', amount: 500000, date: new Date(Date.now() - 86400000 * 2), status: 'Completed' },
    { id: 't2', type: TransactionType.BILL, description: 'Eneo Electricity Bill', amount: -12500, date: new Date(Date.now() - 86400000 * 3), status: 'Completed' },
    { id: 't3', type: TransactionType.TOPUP, description: 'MTN Mobile Top-up', amount: -5000, date: new Date(Date.now() - 86400000 * 4), status: 'Completed' },
];

const GeckAvyContext = createContext<GeckAvyContextType | undefined>(undefined);

export const GeckAvyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: 'John Doe', avatarUrl: 'https://picsum.photos/100' });
  const [balance, setBalance] = useState(237500); // in XAF
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [marketing, setMarketing] = useState<MarketingState>({
      smsMarketing: true,
      emailMarketing: false,
      smsCredits: 1500,
      emailCredits: 5000,
  });

  const updateAvatar = useCallback((newAvatarUrl: string) => {
    setUser(prevUser => ({ ...prevUser, avatarUrl: newAvatarUrl }));
  }, []);

  const addTransaction = useCallback((type: TransactionType, description: string, amount: number) => {
    if(balance + amount < 0) {
        alert("Insufficient balance!");
        return false;
    }

    const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        type,
        description,
        amount,
        date: new Date(),
        status: 'Completed',
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + amount);
    return true;
  }, [balance]);

  const addCard = useCallback((alias: string) => {
    const newCard: Card = {
        id: `c${Date.now()}`,
        brand: Math.random() > 0.5 ? 'Visa' : 'MasterCard',
        last4: Math.floor(1000 + Math.random() * 9000).toString(),
        alias,
        exp: `12/${new Date().getFullYear() + 3 - 2000}`,
        balance: 0,
        primary: false,
    };
    setCards(prev => [...prev, newCard]);
    addTransaction(TransactionType.CARD_CREATION, `New ${newCard.brand} card '${alias}'`, 0);
  }, [addTransaction]);

  const toggleMarketingSubscription = useCallback((type: 'sms' | 'email') => {
    setMarketing(prev => {
        if (type === 'sms') return { ...prev, smsMarketing: !prev.smsMarketing };
        return { ...prev, emailMarketing: !prev.emailMarketing };
    });
  }, []);

  const buyCredits = useCallback((type: 'sms' | 'email', amount: number, cost: number) => {
    const success = addTransaction(TransactionType.CREDIT_PURCHASE, `Purchase of ${amount} ${type} credits`, -cost);
    if(success) {
        setMarketing(prev => {
            if (type === 'sms') return { ...prev, smsCredits: prev.smsCredits + amount };
            return { ...prev, emailCredits: prev.emailCredits + amount };
        });
    }
  }, [addTransaction]);

  const value = { user, balance, cards, transactions, marketing, addCard, addTransaction, updateAvatar, toggleMarketingSubscription, buyCredits };

  return React.createElement(GeckAvyContext.Provider, { value: value }, children);
};

export const useGeckAvy = (): GeckAvyContextType => {
  const context = useContext(GeckAvyContext);
  if (context === undefined) {
    throw new Error('useGeckAvy must be used within a GeckAvyProvider');
  }
  return context;
};