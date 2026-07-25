import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import SectionContainer from '../../components/layout/SectionContainer';
import SectionHeader from '../../components/common/SectionHeader';
import { useShortlist } from '../../hooks/useShortlist';

/**
 * Placeholder Saved Shortlist Page component
 */
export const ShortlistPage = () => {
  const { shortlist, totalSavedCount } = useShortlist();

  return (
    <PageContainer>
      <SectionContainer>
        <SectionHeader
          tagline="Saved Discoveries"
          title={`Saved Items (${totalSavedCount})`}
          subtitle="Saved products and local fashion retailers bookmarked for future online purchase or offline store visits."
        />

        <div className="p-8 bg-surface border border-dashed border-border rounded-3xl text-center text-text-muted space-y-2">
          <p className="text-sm font-semibold">Shortlist Page Placeholder</p>
          <p className="text-xs text-text-muted/80">
            Currently tracking {shortlist.products.length} saved products and {shortlist.stores.length} saved stores.
          </p>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

export default ShortlistPage;
