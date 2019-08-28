// eslint-disable-next-line import/no-extraneous-dependencies
import MockWrapper from "@hackoregon/mock-wrapper";
import { App, Routes, Reducers, CardRegistry } from "./index";

MockWrapper(App, Reducers, Routes, CardRegistry);
