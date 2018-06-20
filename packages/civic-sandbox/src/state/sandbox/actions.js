import fetchAdapter, { fetchAllAdapter } from '../fetch-adapter';
import actionEmitter from '../common-action-emitter';

// Types
export const SANDBOX_START = 'SANDBOX/SANDBOX_START';
export const SANDBOX_SUCCESS = 'SANDBOX/SANDBOX_SUCCESS';
export const SANDBOX_FAILURE = 'SANDBOX/SANDBOX_FAILURE';
export const FOUNDATION_START = 'SANDBOX/FOUNDATION_START';
export const FOUNDATION_SUCCESS = 'SANDBOX/FOUNDATION_SUCCESS';
export const FOUNDATION_FAILURE = 'SANDBOX/FOUNDATION_FAILURE';
export const SET_PACKAGE = 'SANDBOX/SET_PACKAGE';
export const SLIDES_START = 'SANDBOX/SLIDES_START';
export const SLIDES_SUCCESS = 'SANDBOX/SLIDES_SUCCESS';
export const SLIDES_FAILURE = 'SANDBOX/SLIDES_FAILURE';

// Simple actions
export const SandboxStart = actionEmitter(SANDBOX_START);
export const SandboxSuccess = actionEmitter(SANDBOX_SUCCESS);
export const SandboxFailure = actionEmitter(SANDBOX_FAILURE);

export const FoundationStart = actionEmitter(FOUNDATION_START);
export const FoundationSuccess = actionEmitter(FOUNDATION_SUCCESS);
export const FoundationFailure = actionEmitter(FOUNDATION_FAILURE);

export const SlidesStart = actionEmitter(SLIDES_START);
export const SlidesSuccess = actionEmitter(SLIDES_SUCCESS);
export const SlidesFailure = actionEmitter(SLIDES_FAILURE);

// Thunk actions
export const fetchSandbox = fetchAdapter(
  'https://sandbox.civicpdx.org/civic-sandbox',
  {
    start: SandboxStart,
    success: SandboxSuccess,
    failure: SandboxFailure,
  }
);

export const fetchFoundation = endpoint => fetchAdapter(endpoint,
  {
    start: FoundationStart,
    success: FoundationSuccess,
    failure: FoundationFailure,
  }
  );


export const fetchSlides = endpoints => fetchAllAdapter(
  endpoints,
  {
    start: SlidesStart,
    success: SlidesSuccess,
    failure: SlidesFailure,
  }
);

export const setPackage = (selectedPackage = '') => ({
  type: SET_PACKAGE,
  selectedPackage,
});
