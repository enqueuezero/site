import React  from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Home = () => (
  <div className="App">
    <p>Hello World</p>
  </div>
);

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
    </div>
  </Router>
);

export default App;
