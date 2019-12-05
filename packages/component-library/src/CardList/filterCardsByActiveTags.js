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
  showAllStories,
  noFiltersSelected,
  categoryNames,
  activeTagsByCategory
) => {
  if (!storyCardTags) return false;
  if (showAllStories) return true;
  if (noFiltersSelected) return true;

  // if at least one filter in a category is active, that category becomes bool true
  const targetActiveCategories = categoryNames.reduce(
    (accumulator, categoryName) => ({
      [categoryName]: activeTagsByCategory[categoryName].length > 0,
      ...accumulator
    }),
    {}
  );

  // sets up an all false init object for tag categories
  const fulfilledActiveCategories = categoryNames.reduce(
    (accumulator, categoryName) => ({
      [categoryName]: false,
      ...accumulator
    }),
    {}
  );

  // determines which of the target categories have been fulfilled by the story card
  storyCardTags.forEach(storyTag => {
    categoryNames.forEach(category => {
      if (activeTagsByCategory[category].includes(storyTag)) {
        fulfilledActiveCategories[category] = true;
      }
    });
  });

  // compares the target object to the result object
  for (let i = 0; i < categoryNames.length; i += 1) {
    if (
      fulfilledActiveCategories[categoryNames[i]] !==
      targetActiveCategories[categoryNames[i]]
    ) {
      return false;
    }
  }
  return true;
};
