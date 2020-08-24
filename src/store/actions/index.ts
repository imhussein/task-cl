import { Actions } from "../@types/Actions";
import { Movement } from "../../components/Input";

export const onStartClick = (dispatch: Function) => () => {
  dispatch({
    type: Actions.START_RECORDING,
  });
};

export const onStopClick = (dispatch: Function) => () => {
  dispatch({
    type: Actions.STOP_RECORDING,
  });
};

export const onSaveRecordClick = (dispatch: Function) => () => {
  dispatch({
    type: Actions.SAVE_RECORD,
  });
};

export const onPlayLiveClick = (dispatch: Function) => () => {
  dispatch({
    type: Actions.PLAY_LIVE,
  });
};

export const onPlayRecordClick = (dispatch: Function) => () => {
  dispatch({
    type: Actions.PLAY_RECORD,
  });
};

export const onSetMoveMent = (dispatch: Function) => (
  movements: Movement[]
) => {
  dispatch({
    type: Actions.SET_MOVEMENTS,
    movements,
  });
};

export const setPlayLiveOff = (dispatch: Function) => () => {
  dispatch({
    type: Actions.SET_LIVE_OFF,
  });
};
