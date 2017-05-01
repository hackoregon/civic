import React from 'react';
import isClient from '@hackoregon/civic-server/lib/utils/isClient';
// import emergencyRoutes from 'hackoregon-frontend-starter/src/index';
// import housingRoutes from '@hackoregon/civic-housing';
// import HousingApp from '@hackoregon/civic-housing';
import consumeRoutes from '@hackoregon/civic-server/lib/router/consumeRoutes';
import Shell from '../client/Shell';
import Collection from './Collection';
// import configureStore from './configureStore';

// import About from './pages/About';
// import Explore from './pages/Explore';
// import Collections from './pages/Collections';
import Home from './Home';
import About from './About';

// import AppA from '../housingApp';
// import AppB from '../emergencyApp';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

const NotFoundRoute = {
  path: isClient ? '*' : '.*',
  getComponent(location, cb) {
    cb(null, require('../universal/NotFound').default);
  },
};

// const housingRoute = require('@hackoregon/civic-housing').default;
// const HousingRoutes = {
//   path: '/dev/housing',
//
//   // getComponent(location, cb) {
//   //   cb(null, require('@hackoregon/civic-housing').default);
//   // },
// };

const items = [{ collectionId: 'emergency' }, { collectionId: 'housing' }];
const makePaths = path => ({ path: `/collections/${path}`, name: path });
// const WithPaths = () => <Collections items={items.map(({ collectionId }) => makePaths(collectionId))} />;

// console.log(emergencyRoutes);

const routes = [
  { path: '/',
    name: 'root',
    // component: createAsyncComponent({ resolve: () => import('./HomePage') }),
    // component: import('./HomePage'),
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./Home').default);
      });
    },
    childRoutes: [
      {
        path: '/collections/:name',
        getComponent(location, cb) {
          cb(null, require('./Collection').default);
        },
      },
      // {
      //   path: '/collection/housing',
      //   getComponent(location, cb) {
      //     cb(null, require('@hackoregon/civic-housing').default);
      //   },
      // },
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
// const items = [{ collectionId: 'emergency' }, { collectionId: 'housing' }];
// const makePaths = path => ({ path: `/civic/${path}`, name: path });
const WithPaths = () => <Collection items={items.map(({ collectionId }) => makePaths(collectionId))} />;
// const routes = createRoutes(store);
// const rootRoute = {
//   component: AppPage,
//   childRoutes: routes,
// };
const civicRoutes = [
  { path: '/',
    name: 'root',
    component: Home,
  },
  {
    path: 'collections/:name',
    component: Collection,
    // },
    // childRoutes: [
    //   { ...makePaths('collections'),
    //     component: WithPaths,
    //   },
    //   // { ...makePaths('explore'),
    //   //   component: Explore,
    //   // },
    //
    // ],
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
];

export default consumeRoutes({
  component: Shell,
  childRoutes: [
    // routes,
    civicRoutes,
    // housingRoute,
    NotFoundRoute,
  ],
});
