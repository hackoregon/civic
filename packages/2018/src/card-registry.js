import { CardRegistry as FarmersMarketsRegistry } from '@hackoregon/2018-example-farmers-markets';

const registry = []
  .concat(FarmersMarketsRegistry.map(c => ({ ...c, project: '@hackoregon/2018-example-farmers-markets' })));

const cardSlugs = new Set();
const duplicateCards = [];

registry.forEach((card) => {
  if (cardSlugs.has(card.slug)) {
    duplicateCards.push(card.slug);
  }
  cardSlugs.add(card.slug);
});

duplicateCards.forEach((duplicate) => {
  const labels = registry
    .filter(card => card.slug === duplicate)
    .map(card => `${card.slug} (${card.component}) in ${card.project}`);
  throw new Error(`Duplicate slugs found. All card slugs must be unique\n\n${labels.join('\n')}`);
});

export default registry;
