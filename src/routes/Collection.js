import React from 'react';
import { connect } from 'react-redux';
// import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import CollectionHero from '@hackoregon/component-library/lib/Hero/CollectionHero';
import isClient from '@hackoregon/component-library/lib/utils/isClient';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

// import ReactDOMServer from 'react-dom/server'

// const html = ReactDOMServer.renderToString(
//
//   )
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

// const boundsMapProps = {
//   width: 400,
//   height: 300,
//   bounds: [
//     [45.654527, -122.464291],
//     [45.431897, -122.836892],
//   ],
// };
// const portland = [45.54362, -122.676482];

class Collection extends React.Component {
  constructor() {
    super();
    this.state = { rendered: false, module: '' };
  }

  componentDidMount() {
    require.ensure([], (require) => {
      console.log('consoled', this.props.location.pathname);
      const module = require('@hackoregon/civic-housing/src/components/App').default;
      this.setState({ rendered: true, module });
      // return require('@hackoregon/civic-housing/src/components/App');
    });
  }

  render() {
    console.log(this.props, this.state, this.context);
    const key = this.props.params.name;
    console.log('is it fun yet', isClient);
    console.log(key);
    let HousingApp = '';
    if (isClient) {
      require('@hackoregon/component-library/assets/leaflet.css');
      HousingApp = require.ensure([], (require) => {
        console.log('consoled', this.props.location.pathname);
        return require('@hackoregon/civic-housing/src/components/App').default;
      });
    }
    console.log(HousingApp);
    return (
      <div>
        <CollectionHero
          collectionId={key}
          title={currentProjects[key].title}
          featuredTag={currentProjects[key].featuredTag}
        />

        <div> An app for {key}</div>

        {isClient ?
          <BrowserRouter>
            <div>
              <h1>HOUSING</h1>
              <Link to={`${this.props.location.pathname}/home`}>{key}</Link>
              <Switch>
                <Route path={`${this.props.location.pathname}/home`} component={this.state.module} />
              </Switch>
            </div>
          </BrowserRouter> : <div>Loading...</div>}
      </div>
    );
  }
}
export default connect((state) => {
  console.log(state);
  return { housing: state.housing };
})(Collection);
