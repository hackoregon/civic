export const DEMOGRAPHICS = [
  { value: 'Avg. Portland Household', label: 'Avg. Portland Household' },
  { value: '3-Person Extremely Low-Income', label: '3-Person Extremely Low-Income' },
  { value: '3-Person Low-Income', label: '3-Person Low-Income' },
  { value: '3-Person Moderate-Income', label: '3-Person Moderate-Income' },
  { value: 'Couple with Family', label: 'Couple with Family' },
  { value: 'White', label: 'White' },
  { value: 'Black', label: 'Black' },
  { value: 'Latino', label: 'Latino' },
  { value: 'Native American', label: 'Native American' },
  { value: 'Asian', label: 'Asian' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Single Mother', label: 'Single Mother' },
  { value: 'Foreign-Born', label: 'Foreign-Born' },
];

export const HOUSING_TYPES = [
  { value: 'Homeownership', label: 'Homeownership' },
  { value: 'Studio', label: 'Studio' },
  { value: '1-BR', label: '1-Bedroom' },
  { value: '2-BR', label: '2-Bedroom' },
  { value: '3-BR', label: '3-Bedroom' },
];

// making this up, should get income for 'average portlander' from data folks
// also will need min / max
export const DEFAULT_INCOME = 25;
export const MIN_INCOME = 9.75;
export const MAX_INCOME = 75;

export const DEFAULT_NEIGHBORHOOD = {
  id: 25,
  name: 'Portland',
};

export const HOUSING_TEAM_PRIMARY_COLOR = '#3e75ac';
