import React from 'react';
import isClient from '@hackoregon/civic-server/lib/utils/isClient';
// import emergencyRoutes from 'hackoregon-frontend-starter/src/index';
import housingRoutes from '@hackoregon/civic-housing';
import consumeRoutes from '@hackoregon/civic-server/lib/router/consumeRoutes';
import Shell from '../client/Shell';

// import configureStore from './configureStore';

// import About from './pages/About';
// import Explore from './pages/Explore';
// import Collections from './pages/Collections';
import CivicApp from './HomePage';

// import AppA from '../housingApp';
// import AppB from '../emergencyApp';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

const NotFoundRoute = {
  path: isClient ? '*' : '.*',
  getComponent(location, cb) {
    cb(null, require('../universal/NotFound').default);
  },
};

const items = [{ collectionId: 'emergency' }, { collectionId: 'housing' }];
const makePaths = path => ({ path: `/civic/${path}`, name: path });
// const WithPaths = () => <Collections items={items.map(({ collectionId }) => makePaths(collectionId))} />;

// console.log(emergencyRoutes);

const routes = [
  { path: '/',
    name: 'root',
    // component: createAsyncComponent({ resolve: () => import('./HomePage') }),
    // component: import('./HomePage'),
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./HomePage').default);
      });
    },
    childRoutes: [
      {
        path: '/collections/:name',
        getComponent(location, cb) {
          cb(null, require('./Collection').default);
        },
      },
      {
        path: '/story/:id',
        name: 'story',
        getComponent(location, cb) {
          cb(null, require('./Collection').default);
        },
      },
        // ],
      // },
        // getChildRoutes(location, cb) {
        //   require.ensure([], (require) => {
        //     const storyChild = {
        //       path: ':storyId',
        //       getComponent(getChildLocation, getChildCb) {
        //         // getChildCb(null, require('../assets/StoryPage'));
        //       },
        //     };
        //
        //     cb(null, [storyChild]);
        //   }, 'story');
        // },
      // },
    ],
    // childRoutes: [
    //   { ...makePaths('collections'),
    //     // component: WithPaths,
    //   },
    //   { ...makePaths('about'),
    //     component: About,
    //   },
    //   { ...makePaths('explore'),
    //     component: Explore,
    //   },
    //   { ...makePaths('emergency'),
    //     component: AppB,
    //   },
    //   { ...makePaths('housing'),
    //     component: AppA,
    //   },
    // ],
  },
];


// console.log();

export default consumeRoutes({
  component: Shell,
  childRoutes: [
    routes,
    housingRoutes,
    NotFoundRoute,
  ],
});
