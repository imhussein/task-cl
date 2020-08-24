import React, { useEffect, useState, useContext } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import contextCreation from "../context/context";
import { recordReducer } from "../store/reducers";
import {
  onStartClick,
  onPlayLiveClick,
  onPlayRecordClick,
  onSaveRecordClick,
  onStopClick,
  onSetMoveMent,
  setPlayLiveOff,
} from "../store/actions";
import Axios from "axios";
import { Keys } from "../config";

interface HeaderComponentProps extends RouteComponentProps {
  playLastRecord: Function;
}

const { Context, Provider: RecordProvider } = contextCreation(
  recordReducer,
  {
    onStartClick,
    onStopClick,
    onPlayLiveClick,
    onPlayRecordClick,
    onSaveRecordClick,
    onSetMoveMent,
    setPlayLiveOff,
  },
  { isRecording: false, playLive: false, saved: false, movements: [] }
);

function Header({
  location: { pathname },
  playLastRecord,
}: HeaderComponentProps) {
  const context: any = useContext(Context);
  const [isHome, setPage] = useState(true);

  const onStartClickFn = () => {
    context.onStartClick();
  };

  const onStopClick = () => {
    context.onStopClick();
  };

  const onSaveRecordClick = async () => {
    await Axios.post(Keys.apiEnpoint, {
      movements: context.movements,
    });
    context.onSetMoveMent([]);
  };

  const onPlayLiveClick = () => {
    context.onPlayLiveClick();
  };

  const onPlayRecordClick = async () => {
    context.onPlayRecordClick();
    context.setPlayLiveOff();
    try {
      const res = await Axios.get(Keys.apiEnpoint);
      playLastRecord(res.data.movements);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      setPage(true);
    } else if (pathname === "/output") {
      setPage(false);
    }
  }, [pathname]);

  return (
    <div className="header">
      <ul className="header__btns">
        {isHome ? (
          <>
            <li className="header__btn">
              <button
                className={`btn ${context.isRecording ? "disabled" : ""}`}
                onClick={onStartClickFn}
              >
                Start
              </button>
            </li>
            <li className="header__btn">
              <button
                className={`btn ${!context.isRecording ? "disabled" : ""}`}
                onClick={onStopClick}
              >
                Stop
              </button>
            </li>
            <li className="header__btn">
              <button className="btn" onClick={onSaveRecordClick}>
                Record
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="header__btn">
              <button className="btn" onClick={onPlayLiveClick}>
                Play Live
              </button>
            </li>
            <li className="header__btn">
              <button className="btn" onClick={onPlayRecordClick}>
                Play Recording
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Header);
export { RecordProvider, Context as RecordContext };
