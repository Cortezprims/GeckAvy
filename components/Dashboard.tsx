import React from 'react';
import Icon from './Icon';
import { ICONS } from '../constants';

const StatCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-surface p-4 md:p-6 rounded-2xl shadow-sm border border-brand-border">
        <h3 className="text-md font-semibold text-brand-text-primary">{title}</h3>
        <div className="mt-4">{children}</div>
    </div>
);

const Dashboard: React.FC = () => {
  const campaignData = [30, 40, 50, 35, 60, 45, 55, 70];
  const conversionData = [
    { value: 55, color: 'text-brand-dark-blue' }, { value: 65, color: 'text-brand-dark-blue' },
    { value: 75, color: 'text-brand-dark-blue' }, { value: 58, color: 'text-brand-dark-blue' },
    { value: 62, color: 'text-brand-blue' }, { value: 72, color: 'text-brand-blue' },
    { value: 59, color: 'text-brand-blue' }, { value: 68, color: 'text-brand-blue' }
  ];
  const clickRateData = "M0,35 L20,30 L40,40 L60,25 L80,28 L100,20 L120,22";
  const conversionRate = 48;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 text-center">
        <Icon path={ICONS.sms} className="w-12 h-12 text-brand-dark-blue mx-auto md:mx-0"/>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-text-primary tracking-tight">MARKETING DASHBOARD</h1>
        <Icon path={ICONS.email} className="w-12 h-12 text-brand-dark-blue mx-auto md:mx-0"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Campaign Performance">
            <div className="h-48 flex items-end justify-between space-x-2">
                {campaignData.map((val, i) => (
                    <div key={i} className="w-full bg-brand-blue rounded-t-md" style={{ height: `${val}%`}}></div>
                ))}
            </div>
        </StatCard>

        <StatCard title="Click Rate">
            <div className="flex items-center">
                <div className="w-2/3">
                    <svg viewBox="0 0 120 60" className="w-full h-auto">
                        <path d={clickRateData} stroke="#3B82F6" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        {clickRateData.match(/(\d+,\d+)/g)?.map((point, i) => {
                            const [cx, cy] = point.split(',');
                            return <circle key={i} cx={cx} cy={cy} r="3" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1" />
                        })}
                    </svg>
                    <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
                        <span>10%</span>
                        <span>30%</span>
                    </div>
                </div>
                <div className="w-1/3 pl-4 space-y-2">
                    {[72431, 12906, 8552, 25436].map((num, i) => (
                        <div key={i} className="flex items-center justify-end gap-2">
                             <div className="h-1.5 w-6 bg-brand-blue rounded-full"></div>
                            <span className="font-semibold text-brand-text-primary">{num.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </StatCard>

        <StatCard title="Conversions">
            <div className="h-48 flex items-end justify-between space-x-2">
                {conversionData.map((bar, i) => (
                    <div key={i} className={`w-full ${bar.color === 'text-brand-dark-blue' ? 'bg-brand-dark-blue' : 'bg-brand-blue'} rounded-t-md`} style={{ height: `${bar.value}%`}}></div>
                ))}
            </div>
        </StatCard>

        <StatCard title="Conversion Rate">
             <div className="flex items-center">
                <div className="w-2/3 relative flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="54" stroke="#E5E7EB" strokeWidth="12" fill="transparent" />
                        <circle cx="64" cy="64" r="54" stroke="#3B82F6" strokeWidth="12" fill="transparent"
                            strokeDasharray={2 * Math.PI * 54}
                            strokeDashoffset={(2 * Math.PI * 54) * (1 - conversionRate / 100)}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-bold text-brand-text-primary">{conversionRate}%</span>
                    </div>
                </div>
                <div className="w-1/3 pl-4 space-y-2">
                    {[25436, 9302, 1843].map((num, i) => (
                        <div key={i} className="flex items-center justify-end gap-2">
                             <div className="h-1.5 w-6 bg-brand-blue rounded-full" style={{width: `${100 - i*25}%`}}></div>
                            <span className="font-semibold text-brand-text-primary">{num.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </StatCard>
      </div>
    </div>
  );
};

export default Dashboard;