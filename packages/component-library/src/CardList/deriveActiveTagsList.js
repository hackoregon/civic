export default (filterStatus, categoryNames) => {
  const simpleTagsList = [];
  const categoryTagsList = categoryNames.reduce(
    (accumulator, categoryName) => ({
      [categoryName]: [],
      ...accumulator
    }),
    {}
  );
  categoryNames.forEach(category => {
    const tagNames = Object.keys(filterStatus[category]);
    tagNames.forEach(tag => {
      if (filterStatus[category][tag]) {
        simpleTagsList.push(tag);
        categoryTagsList[category].push(tag);
      }
    });
  });

  return [simpleTagsList, categoryTagsList];
};
