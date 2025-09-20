import React from 'react';
import { useGeckAvy } from '../hooks/useGeckAvy';
import Icon from './Icon';
import { ICONS } from '../constants';

const Header: React.FC = () => {
    const { user } = useGeckAvy();

    return (
        <header className="flex-shrink-0 bg-brand-surface border-b border-brand-border">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                     <h1 className="text-2xl font-bold text-brand-text-primary">Welcome back, {user.name.split(' ')[0]}!</h1>
                </div>
                <div className="flex items-center space-x-4">
                     <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Icon path={ICONS.notification} className="w-6 h-6 text-brand-text-secondary" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold text-brand-text-primary">{user.name}</p>
                            <p className="text-sm text-brand-text-secondary">Personal Account</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;