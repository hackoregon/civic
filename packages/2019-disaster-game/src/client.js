import MockWrapper from "@hackoregon/mock-wrapper";
import { init } from "@sentry/browser";
import { App, Routes, Reducers } from "./index";
import env from "./constants/env";

if (env.SENTRYDSN) {
  init({ dsn: env.SENTRYDSN });
}

MockWrapper(App, Reducers, Routes);
