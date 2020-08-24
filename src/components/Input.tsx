import React, { Component } from "react";
import socketio from "socket.io-client";
import { Keys } from "../config";
import { RecordContext } from "./Header";

export interface Movement {
  x: number;
  y: number;
}

interface InputComponentProps {}

export default class Input extends Component<
  InputComponentProps,
  {
    isRecording: boolean;
    movements: Movement[];
  }
> {
  private ref: React.RefObject<HTMLDivElement>;
  constructor(props: InputComponentProps) {
    super(props);
    this.ref = React.createRef<HTMLDivElement>();
    this.state = {
      isRecording: false,
      movements: [],
    };
  }

  static contextType = RecordContext;

  componentDidMount() {
    const io = socketio(Keys.apiEnpoint);
    io.on("connect", () => {
      console.log(`Socket is connected successfully`);
    });
    document.querySelector(".screen")!.addEventListener("mousemove", (e) => {
      if (this.context.isRecording) {
        this.handleMouseMove(e);
      }
    });
  }

  static getDerivedStateFromProps(props: InputComponentProps) {
    return null;
  }

  handleMouseMove = ({ clientX: x, clientY: y }: any) => {
    this.state.movements.push({ x, y });
    this.context.onSetMoveMent(this.state.movements);
    this.context.onSaveRecordClick();
    socketio(Keys.apiEnpoint + "/output").emit("movements", { data: { x, y } });
  };

  render() {
    return <div className="screen" ref={this.ref}></div>;
  }
}
