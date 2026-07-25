import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

/**
 * AuthFooter Component
 * Renders the guest skip option ("Skip for now →") allowing users to bypass authentication.
 */
export const AuthFooter = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="mt-8 pt-6 border-t border-border/60 text-center">
      <button
        type="button"
        onClick={handleSkip}
        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-primary transition-colors py-1.5 px-3 rounded-full hover:bg-background/80 focus:outline-none cursor-pointer"
      >
        <span>Skip for now</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default AuthFooter;
