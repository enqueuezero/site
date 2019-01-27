import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Index = () => (
  <div className="App">
    <p>Hello World</p>
  </div>
);

const NotFound = () => (
  <div className="App">
    <p>Not Found</p>
  </div>
)

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Index} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
