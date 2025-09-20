export enum TransactionType {
  TOPUP = 'Mobile Top-up',
  BILL = 'Bill Payment',
  CARD_CREATION = 'Card Creation',
  INCOMING = 'Incoming Transfer',
  CREDIT_PURCHASE = 'Credit Purchase',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: Date;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Card {
  id: string;
  brand: 'Visa' | 'MasterCard';
  last4: string;
  alias: string;
  exp: string;
  balance: number;
  primary: boolean;
}

export enum Operator {
    ORANGE = 'Orange',
    MTN = 'MTN',
    CAMTEL = 'Camtel',
    NEXTELL = 'Nextell',
}

export enum BillProvider {
    ENEO = 'Eneo',
    CAMWATER = 'Camwater',
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}