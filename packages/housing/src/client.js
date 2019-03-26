import MockWrapper from '@hackoregon/mock-wrapper';
import { App, Routes, Reducers } from './index';
import { hot } from 'react-hot-loader/root';

const HotApp = hot(App);

MockWrapper(HotApp, Reducers, Routes);