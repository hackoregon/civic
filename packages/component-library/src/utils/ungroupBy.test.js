import ungroupBy from './ungroupBy';

const SAMPLE_DATA = [
  {
    id: 1,
    neighborhood: 'ROSE CITY PARK',
    pct_18_25: 0.11,
    pct_26_32: 0.27,
    year: 2006,
  },
  {
    id: 2,
    neighborhood: 'ROSE CITY PARK',
    pct_18_25: 0.12,
    pct_26_32: 0.27,
    year: 2007,
  },
];

const FORMATTED_DATA = [
  {
    id: 1,
    neighborhood: 'ROSE CITY PARK',
    type: 'pct_18_25',
    year: 2006,
    value: 0.11,
  },
  {
    id: 2,
    neighborhood: 'ROSE CITY PARK',
    type: 'pct_18_25',
    year: 2007,
    value: 0.12,
  },
  {
    id: 1,
    neighborhood: 'ROSE CITY PARK',
    type: 'pct_26_32',
    year: 2006,
    value: 0.27,
  },
  {
    id: 2,
    neighborhood: 'ROSE CITY PARK',
    type: 'pct_26_32',
    year: 2007,
    value: 0.27,
  },
];

const FORMATTED_DATA_LABELS = [
  {
    id: 1,
    neighborhood: 'ROSE CITY PARK',
    type: '18-25',
    year: 2006,
    value: 0.11,
  },
  {
    id: 2,
    neighborhood: 'ROSE CITY PARK',
    type: '18-25',
    year: 2007,
    value: 0.12,
  },
  {
    id: 1,
    neighborhood: 'ROSE CITY PARK',
    type: '26-32',
    year: 2006,
    value: 0.27,
  },
  {
    id: 2,
    neighborhood: 'ROSE CITY PARK',
    type: '26-32',
    year: 2007,
    value: 0.27,
  },
];

describe('ungroupBy', () => {
  it('should format data properly', () => {
    expect(ungroupBy(SAMPLE_DATA, ['pct_18_25', 'pct_26_32'])).to.eql(
      FORMATTED_DATA
    );
  });
  it('should format data properly and apply labels', () => {
    expect(
      ungroupBy(SAMPLE_DATA, ['pct_18_25', 'pct_26_32'], ['18-25', '26-32'])
    ).to.eql(FORMATTED_DATA_LABELS);
  });
  it('should handle an improper labels array', () => {
    expect(
      ungroupBy(SAMPLE_DATA, ['pct_18_25', 'pct_26_32'], ['18-25'])
    ).to.eql(FORMATTED_DATA);
  });
});
