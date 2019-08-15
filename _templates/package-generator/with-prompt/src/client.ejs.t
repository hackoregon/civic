---
to: packages/<%=package%>/src/client.js
---
import MockWrapper from "@hackoregon/mock-wrapper";
import { App, Routes, Reducers } from "./index";

MockWrapper(App, Reducers, Routes);
