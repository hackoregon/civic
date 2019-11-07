import MockWrapper from "@hackoregon/mock-wrapper";
import { init } from "@sentry/browser";
import { App, Routes, Reducers } from "./index";
import { getSentryDSNApi } from "./state/settings";

init({ dsn: getSentryDSNApi() });

MockWrapper(App, Reducers, Routes);
