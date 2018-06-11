import React from 'react';
import { shallow } from 'enzyme';
import HorizontalBarChart from './HorizontalBarChart';

describe('HorizontalBarChart', () => {
  const data = [
    {sortOrder: 1, population: 2000, label: 'Labrador Retriever'},
    {sortOrder: 2, population: 8000, label: 'Standard Poodle'},
    {sortOrder: 3, population: 6000, label: 'French Bulldog'},
    {sortOrder: 4, population: 3000, label: 'Afghan Hound'},
    {sortOrder: 5, population: 1000, label: 'Jack Russell Terrier'}
  ];
  const defaultProps ={
    data,
    dataKey: 'sortOrder',
    dataValue: 'population',
    dataKeyLabel: 'label',
  };

  it('should render a VictoryChart inside two container divs', () => {
    const wrapper = shallow(<HorizontalBarChart {...defaultProps} />)
    expect(wrapper.find('VictoryChart')).to.have.length(1);
    expect(wrapper.find('VictoryChart').parent().is('div')).to.equal(true);
    expect(wrapper.find('VictoryChart').parent().parent().is('div')).to.equal(true);
  });

  it('conditionally renders title', () => {
    const sampleTitle = 'Hey there';
    const titlelessWrapper = shallow(<HorizontalBarChart {...defaultProps} />);
    const titledWrapper = shallow(<HorizontalBarChart {...defaultProps} title={sampleTitle} />);
    expect(titlelessWrapper.find('div').children().find('h3')).to.have.length(0);
    expect(titledWrapper.find('div').children().find('h3').text()).to.equal(sampleTitle);
  });

  it('conditionally renders subtitle', () => {
    const sampleSubtitle = 'Almost as good as a title!';
    const noSubtitleWrapper = shallow(<HorizontalBarChart {...defaultProps} />);
    const subtitleWrapper = shallow(<HorizontalBarChart {...defaultProps} subtitle={sampleSubtitle} />);
    expect(noSubtitleWrapper.find('div').children().find('span')).to.have.length(0);
    expect(subtitleWrapper.find('div').children().find('span').text()).to.equal(sampleSubtitle);
  });

  it('renders two axis and a VictoryBar within VictoryChart', () => {
    const wrapper = shallow(<HorizontalBarChart {...defaultProps} />);
    const victoryComponents = wrapper.find('VictoryChart').children();
    expect(victoryComponents.find('VictoryAxis')).to.have.length(2);
    expect(victoryComponents.find('VictoryBar')).to.have.length(1);
  });

  it('sends in data in usable format', () => {
    const wrapper = shallow(<HorizontalBarChart {...defaultProps} />);
    const dataProp = wrapper.find('VictoryBar').prop('data');
    expect(dataProp).to.have.length(5);
    const firstDataProp = dataProp[0];
    expect(firstDataProp).to.have.property('x');
    expect(firstDataProp).to.have.property('y');
    expect(firstDataProp).to.have.property('label');
  });
});
