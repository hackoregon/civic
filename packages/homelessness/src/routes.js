import App from './components/CardCollection';
import NotFoundPage from './components/NotFoundPage';

export default function createRoutes() {
  return [
    {
      path: 'homelessness',
      name: 'homelessness',
      component: App,
      childRoutes: [
        {
          path: 'notfoundpage',
          component: NotFoundPage,
        },
      ],
    },
  ];
}
