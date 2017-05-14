/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
// import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import CollectionHero from '@hackoregon/component-library/lib/Hero/CollectionHero';
// import isClient from '@hackoregon/component-library/lib/utils/isClient';
import '@hackoregon/component-library/lib/global.styles.css';
// import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

const currentProjects = {
  housing: {
    title: 'Housing',
    featuredTag: 'housing prices',
  },
  emergency_response: {
    title: 'Emergency Response',
    featuredTag: 'er visits',
  },
};

class Collection extends React.Component {
  constructor() {
    super();
    this.state = { rendered: false, module: '' };
  }

  componentDidMount() {
    // require.ensure([], (require) => {
    //   // const
    //   // const module = require('@hackoregon/civic-housing/src/components/App').default;
    //   this.setState({ rendered: true, module });
    //   // return require('@hackoregon/civic-housing/src/components/App');
    // });
  }

  render() {
    const HousingApp = () => <div>Loading</div>;

    // import('@hackoregon/civic-housing/src/components/App').then((c, v) => {
    //   console.log(c, v);
    // });
    console.log(this.props);
    const key = this.props.params.name;
    // if (isClient) {
    //   require('@hackoregon/component-library/assets/leaflet.css');
    //   HousingApp = require.ensure([], require => require('@hackoregon/civic-housing/src/components/App').default);
    // }
    return (
      <div>
        <CollectionHero
          collectionId={key}
          title={currentProjects[key].title}
          featuredTag={currentProjects[key].featuredTag}
        />
        {/* {isClient ?
          <BrowserRouter>
            <div>
              <h1>HOUSING</h1>
              <Link to={`${this.props.location.pathname}/home`}>{key}</Link>
              <Switch>
                <Route path={`${this.props.location.pathname}/home`} component={this.state.module} />
              </Switch>
            </div>
          </BrowserRouter> : <div>Loading...</div>
        } */}
      </div>
    );
  }
}
export default connect(state => ({ housing: state.housing }))(Collection);
