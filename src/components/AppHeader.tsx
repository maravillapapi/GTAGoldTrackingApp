import React from 'react';
import { Icon } from './Icon';
import { useAppContext } from '../contexts/AppContext';

interface AppHeaderProps {
  title: string;
  rightIcon?: string;
  rightIconClass?: string;
  showBack?: boolean;
  onBack?: () => void;
}

/**
 * Shared header component used across all pages.
 * Includes the burger menu button (connected to global AppContext),
 * a page title, and an optional right-side icon.
 */
const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  rightIcon,
  rightIconClass = 'text-on-surface-variant',
  showBack = false,
  onBack,
}) => {
  const { setIsMenuOpen } = useAppContext();

  return (
    <header className="bg-surface/90 font-headline font-bold uppercase sticky top-0 z-50 backdrop-blur-md border-b border-outline-variant/10">
      <div className="flex justify-between items-center w-full px-5 py-4">
        <div className="flex items-center gap-4">
          {showBack ? (
            <button
              onClick={onBack}
              className="text-on-surface-variant hover:text-primary transition-colors -ml-1"
            >
              <Icon name="arrow_back_ios_new" className="text-base" />
            </button>
          ) : (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <Icon name="menu" className="text-2xl" />
            </button>
          )}
          <h1 className="text-sm tracking-[0.15em] text-on-surface">{title}</h1>
        </div>
        {rightIcon && (
          <Icon name={rightIcon} className={`${rightIconClass} text-xl`} />
        )}
      </div>
    </header>
  );
};

export default AppHeader;
