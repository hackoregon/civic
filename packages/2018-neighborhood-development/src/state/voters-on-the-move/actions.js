import apiAdapter from '../fetch-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START =
'VOTERS_ON_THE_MOVE/START';
export const API_SUCCESS =
'VOTERS_ON_THE_MOVE/SUCCESS';
export const API_ERROR =
'VOTERS_ON_THE_MOVE/ERROR';
export const AWAY_API_START =
'VOTERS_ON_THE_MOVE/AWAY_START';
export const AWAY_API_SUCCESS =
'VOTERS_ON_THE_MOVE/AWAY_SUCCESS';
export const AWAY_API_ERROR =
'VOTERS_ON_THE_MOVE/AWAY_ERROR';

export const VotersOnTheMoveStart = actionEmitter(API_START);
export const VotersOnTheMoveSuccess = actionEmitter(API_SUCCESS);
export const VotersOnTheMoveError = actionEmitter(API_ERROR);
export const AwayVotersOnTheMoveStart = actionEmitter(AWAY_API_START);
export const AwayVotersOnTheMoveSuccess = actionEmitter(AWAY_API_SUCCESS);
export const AwayVotersOnTheMoveError = actionEmitter(AWAY_API_ERROR);

const endpoint = 'api/voter_movement_points?limit=1000&direction=center&format=json';
const awayEndpoint = 'api/voter_movement_points?limit=1000&direction=away&format=json';

export const fetchVotersOnTheMove = apiAdapter(
  endpoint,
  {
    start: VotersOnTheMoveStart,
    success: VotersOnTheMoveSuccess,
    failure: VotersOnTheMoveError,
  }
);

export const fetchAwayVotersOnTheMove = apiAdapter(
  awayEndpoint,
  {
    start: AwayVotersOnTheMoveStart,
    success: AwayVotersOnTheMoveSuccess,
    failure: AwayVotersOnTheMoveError,
  }
);
