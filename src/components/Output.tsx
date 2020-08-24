import React, { Component } from "react";
import socketio from "socket.io-client";
import { Keys } from "../config";
import cursor from "../assets/images/iconfinder_mouse-pointer_1608561.png";
import { RecordContext } from "./Header";
import { Movement } from "./Input";

interface OutputComponentProps {
  coordinates: Movement[] | undefined;
}

export default class Output extends Component<OutputComponentProps> {
  public image: React.RefObject<HTMLImageElement>;
  constructor(props: OutputComponentProps) {
    super(props);
    this.image = React.createRef();
  }

  static contextType = RecordContext;

  componentDidMount() {
    const io = socketio(Keys.apiEnpoint + "/output");
    io.on("connect", () => {
      console.log(`Connected successfully to output socket`);
      io.on("movementsLoad", (data: any) => {
        if (this.context && this.context.playLive && this.image.current) {
          this.image.current.style.left = data.data.x + "px";
          this.image.current.style.top = data.data.y + "px";
        }
      });
    });
  }

  componentDidUpdate() {
    if (this.props.coordinates && this.image.current != null) {
      for (let coordinate of this.props.coordinates) {
        setTimeout(() => {
          this.image.current!.style.transform = `translate(${coordinate.x}px, ${coordinate.y}px)`;
        }, 30);
      }
    }
  }

  render() {
    return (
      <img
        src={cursor}
        ref={this.image}
        className={!this.context.playLive ? "cursor-img" : ""}
        style={{
          position: "relative",
        }}
      />
    );
  }
}
