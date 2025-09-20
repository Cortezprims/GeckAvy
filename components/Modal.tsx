import React, { ReactNode } from 'react';
import Icon from './Icon';
import { ICONS } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-brand-surface rounded-2xl shadow-xl w-full max-w-md m-4 border border-brand-border" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-brand-border">
          <h2 className="text-2xl font-bold text-brand-text-primary">{title}</h2>
          <button onClick={onClose} className="text-brand-text-secondary hover:text-brand-text-primary">
            <Icon path={ICONS.close} className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;