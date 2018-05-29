import React from 'react';
import { shallow } from 'enzyme';
import PackageSelectorBox from './PackageSelectorBox';

describe('PackageSelctorBox', () => {
  const testTitle = 'Schools';
  const testDescription = 'A short description of the sorts of things you can explore with this package. Data Sources?';
  const wrapper = shallow(<PackageSelectorBox title={testTitle} description={testDescription} />);
  it('should render a link', () => {
    expect(wrapper.find('a')).to.have.length(1);
  });
  it('should have the appropriate child text', () => {
    expect(wrapper.text()).to.eql(testTitle);
  });
});
