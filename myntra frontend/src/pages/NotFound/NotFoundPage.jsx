import React from 'react';
import { Compass, Home } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import { ROUTES } from '../../constants/routes';
import { Link } from 'react-router-dom';

/**
 * Editorial 404 Page component
 */
export const NotFoundPage = () => {
  return (
    <PageContainer maxWidth="max-w-xl" padding="py-20">
      <div className="text-center space-y-6 bg-surface border border-border/80 rounded-3xl p-10 shadow-card">
        <div className="w-16 h-16 bg-primary-light/60 text-primary rounded-2xl flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-primary">
            404 — Page Not Found
          </span>
          <h1 className="text-3xl font-editorial font-bold text-text-primary">
            Lost in Fashion Exploration
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">
            The regional fashion destination or store page you are searching for might have moved or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <Link to={ROUTES.HOME}>
            <Button variant="primary" leftIcon={Home}>
              Return to Discovery Home
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default NotFoundPage;
