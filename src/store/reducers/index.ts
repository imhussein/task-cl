import { Actions } from "../@types/Actions";
import { Movement } from "../../components/Input";

interface RecordState {
  isRecording: boolean;
  playLive: boolean;
  movements: Movement[];
  saved: boolean;
}

const initialState: RecordState = {
  isRecording: false,
  playLive: false,
  movements: [],
  saved: false,
};

export const recordReducer = (
  state: RecordState = initialState,
  action: any
): RecordState => {
  switch (action.type) {
    case Actions.START_RECORDING:
      return {
        ...state,
        isRecording: true,
      };
    case Actions.STOP_RECORDING:
      return {
        ...state,
        isRecording: false,
      };
    case Actions.PLAY_LIVE:
      return {
        ...state,
        playLive: true,
      };
    case Actions.SAVE_RECORD:
      return {
        ...state,
        saved: true,
      };
    case Actions.SET_MOVEMENTS:
      return {
        ...state,
        movements: action.movements,
      };
    case Actions.SET_LIVE_OFF:
      return {
        ...state,
        playLive: false,
      };
    default:
      return state;
  }
};
