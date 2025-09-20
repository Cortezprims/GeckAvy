import React, { useState } from 'react';
import { useGeckAvy } from '../hooks/useGeckAvy';
import CreditPurchaseModal from './CreditPurchaseModal';
import Icon from './Icon';
import { ICONS } from '../constants';

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => {
  return (
    <div
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ease-in-out ${
        enabled ? 'bg-brand-blue' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </div>
  );
};

const Campaigns: React.FC = () => {
    const { marketing, toggleMarketingSubscription } = useGeckAvy();
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-brand-text-primary">Campaigns & Subscriptions</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-brand-surface p-6 rounded-2xl border border-brand-border shadow-sm">
                    <h2 className="text-xl font-bold text-brand-text-primary mb-4">Manage Subscriptions</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-semibold text-brand-text-primary">SMS Marketing</h3>
                                <p className="text-sm text-brand-text-secondary">Receive updates and offers via SMS.</p>
                            </div>
                            <ToggleSwitch enabled={marketing.smsMarketing} onChange={() => toggleMarketingSubscription('sms')} />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-semibold text-brand-text-primary">Email Marketing</h3>
                                <p className="text-sm text-brand-text-secondary">Receive newsletters and promotions via email.</p>
                            </div>
                            <ToggleSwitch enabled={marketing.emailMarketing} onChange={() => toggleMarketingSubscription('email')} />
                        </div>
                    </div>
                </div>

                <div className="bg-brand-surface p-6 rounded-2xl border border-brand-border shadow-sm">
                    <h2 className="text-xl font-bold text-brand-text-primary mb-4">Your Credits</h2>
                    <div className="space-y-4">
                       <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Icon path={ICONS.sms} className="w-8 h-8 text-brand-blue mr-4"/>
                            <div>
                                <h3 className="text-2xl font-bold text-brand-text-primary">{marketing.smsCredits.toLocaleString()}</h3>
                                <p className="text-sm text-brand-text-secondary">SMS Credits Remaining</p>
                            </div>
                       </div>
                       <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Icon path={ICONS.email} className="w-8 h-8 text-brand-blue mr-4"/>
                            <div>
                                <h3 className="text-2xl font-bold text-brand-text-primary">{marketing.emailCredits.toLocaleString()}</h3>
                                <p className="text-sm text-brand-text-secondary">Email Credits Remaining</p>
                            </div>
                       </div>
                    </div>
                     <button 
                        onClick={() => setModalOpen(true)}
                        className="mt-4 w-full flex items-center justify-center space-x-2 bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue/90 transition-colors"
                    >
                        <Icon path={ICONS.plus} className="w-5 h-5"/>
                        <span>Buy More Credits</span>
                    </button>
                </div>
            </div>
            <CreditPurchaseModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
};

export default Campaigns;
