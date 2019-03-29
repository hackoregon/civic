import MockWrapper from '@hackoregon/mock-wrapper';
import { hot } from 'react-hot-loader/root';
import { App, Routes, Reducers } from './index';

const HotApp = hot(App);

MockWrapper(HotApp, Reducers, Routes);
