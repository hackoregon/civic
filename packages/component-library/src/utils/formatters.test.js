import { numeric, percentage, dollars } from './formatters';

describe.only('formatters', () => {
  it('should format numbers correctly', () => {
    expect(numeric(0.1)).to.eql('0');
    expect(numeric(0.5)).to.eql('1');
    expect(numeric(1000)).to.eql('1,000');
    expect(numeric(1500)).to.eql('1,500');
    expect(numeric(1000000)).to.eql('1 million');
    expect(numeric(7300000)).to.eql('7.3 million');
    expect(numeric(-7300000)).to.eql('-7.3 million');
    expect(numeric(73000000000)).to.eql('73 billion');
  });

  it('should format percentages correctly', () => {
    expect(percentage(0.75)).to.eql('75%');
    expect(percentage(0.2379)).to.eql('24%');
  });

  it('should format dollars correctly', () => {
    expect(dollars(12)).to.eql('$12');
    expect(dollars(230.5)).to.eql('$230.5');
  });
});
