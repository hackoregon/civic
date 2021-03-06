/*
  function compares the tags on each story card to see if they match the
  selected filter checkboxes. For a card to be shown it must have ONE tag that
  matches a checkbox IN EACH CATEGORY.

  Example: If "Race", "Portland", and "Oregon" are active filters, cards will pass that contain
  "Race" and either "Portland", or "Oregon".

  Passing Results: ["Race", "Portland"], ["Race", "Oregon"], ["Race", "Portland", "Oregon", "Banana"]
*/

export default (
  storyCardTags,
  categories,
  activeFilters,
  showAllStories,
  numberOfFiltersSelected
) => {
  if (!storyCardTags) return false;
  if (!storyCardTags.length) return false;
  if (showAllStories) return true;
  if (numberOfFiltersSelected === 0) return true;

  // flat array containing all categories that have filters selected
  const targetCategories = categories.reduce((accumulator, category) => {
    if (activeFilters[category].length > 0) {
      return [...accumulator, category];
    }
    return accumulator;
  }, []);

  // returns false if there is no matching tag on a story card within any one target category
  for (let i = 0; i < targetCategories.length; i += 1) {
    let fulfillsTargetCategory = false;
    activeFilters[targetCategories[i]].forEach(tag => {
      if (storyCardTags.includes(tag)) {
        fulfillsTargetCategory = true;
      }
    });
    if (!fulfillsTargetCategory) return false;
  }

  return true;
};
