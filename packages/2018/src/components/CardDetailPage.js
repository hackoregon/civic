import React from 'react';
import { Link } from 'react-router';
import CardRegistry from '../card-registry';
import { PageLayout } from '@hackoregon/component-library';

const CardDetailPage = ({ params }) => {
  const card = CardRegistry.find(params.slug);

  if (card && card.component) {
    const CardComponent = card.component;
    return (
      <PageLayout>
        <CardComponent />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <h1>Card not found</h1>
      <p>
        The card you are looking for doesn't exist.
        <Link to="/cities/portland">
          View the Portland Collection
        </Link>
      </p>
    </PageLayout>
  );
};

CardDetailPage.displayName = 'CardDetailPage';

export default CardDetailPage;
