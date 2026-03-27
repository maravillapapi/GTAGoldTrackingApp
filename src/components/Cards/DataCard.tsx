import React from 'react';

interface DataCardProps {
  title: string;
  value: string | number;
  trend?: { value: string; isPositive: boolean };
  icon?: React.ReactNode;
  variant?: 'highest' | 'low';
}

const DataCard: React.FC<DataCardProps> = ({ title, value, trend, icon, variant = 'low' }) => {
  const cn = variant === 'highest' ? 'card-highest' : 'card-low';
  return (
    <div className={cn} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
      <div className="flex-row justify-between">
        <span className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>{title}</span>
        {icon && <div style={{ color: 'var(--primary)' }}>{icon}</div>}
      </div>
      <div className="display-md" style={{ color: 'var(--on-surface)', marginTop: 'var(--spacing-2)' }}>
        {value}
      </div>
      {trend && (
        <div className="flex-row gap-2 mt-2">
          <span className={`status-badge ${trend.isPositive ? 'status-positive' : 'status-negative'}`}>
            {trend.value}
          </span>
          <span className="label-sm" style={{ textTransform: 'none', color: 'var(--on-surface-variant)' }}>
            vs last period
          </span>
        </div>
      )}
    </div>
  );
};

export default DataCard;
