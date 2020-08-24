import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Input, { Movement } from "./components/Input";
import Output from "./components/Output";
import Header, { RecordProvider } from "./components/Header";

export default function App() {
  const [coordinates, setCoordinates] = useState<Movement[]>();
  const playLastRecord = (coordinates: Movement[]) => {
    setCoordinates(coordinates);
  };
  return (
    <div className="App">
      <RecordProvider>
        <Router>
          <Header playLastRecord={playLastRecord} />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Input />
              </Route>
              <Route exact path="/output">
                <Output coordinates={coordinates} />
              </Route>
            </Switch>
          </div>
        </Router>
      </RecordProvider>
    </div>
  );
}
