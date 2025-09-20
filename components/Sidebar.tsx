import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import { ICONS } from '../constants';

const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: ICONS.dashboard },
  { path: '/transactions', label: 'Transactions', icon: ICONS.transactions },
  { path: '/cards', label: 'My Cards', icon: ICONS.cards },
  { path: '/campaigns', label: 'Campaigns', icon: ICONS.campaigns },
  { path: '/profile', label: 'Profile', icon: ICONS.profile },
];

const Sidebar: React.FC = () => {
  const activeLinkClass = 'bg-brand-blue text-white';
  const inactiveLinkClass = 'text-brand-text-secondary hover:bg-gray-100 hover:text-brand-text-primary';

  return (
    <aside className="w-64 bg-brand-surface flex-shrink-0 border-r border-brand-border flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-brand-border">
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-brand-blue">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" opacity="0.6"></path>
              <path d="M12 12l10 5-10 5-10-5 10-5z"></path>
            </svg>
            <h1 className="text-2xl font-bold text-brand-text-primary">Fintech</h1>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
            }
          >
            <Icon path={link.icon} className="w-6 h-6" />
            <span className="font-semibold">{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-brand-border">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
            <h4 className="font-bold text-brand-dark-blue">Need Help?</h4>
            <p className="text-sm text-blue-800 mt-1">Our support team is here for you 24/7.</p>
            <button className="mt-3 bg-brand-blue text-white font-bold py-2 px-4 rounded-lg text-sm w-full hover:bg-brand-blue/90">
                Contact Support
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;