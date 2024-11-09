import React, { Component } from 'react';
import NavbarComp from './components/NavbarComp';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0, // Initialize the progress state
    };
  }

  setProgress = (progress) => {
    this.setState({ progress }); // Method to update progress state
  };

  render() {
    const { progress } = this.state; // Destructure progress from state

    return (
      <Router>
        <div>
          <NavbarComp />
          <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => this.setProgress(0)} // Reset progress to 0
          />
          <Routes>
  <Route path="/" element={<News key="home" pagesize={5} country="in" category="general" />} />
  <Route path="/home" element={<News key="home" pagesize={5} country="in" category="general" />} />
  <Route path="/business" element={<News key="business" pagesize={5} country="in" category="business" />} />
  <Route path="/entertainment" element={<News key="entertainment" pagesize={5} country="in" category="entertainment" />} />
  <Route path="/general" element={<News key="general" pagesize={5} country="in" category="general" />} />
  <Route path="/health" element={<News key="health" pagesize={5} country="in" category="health" />} />
  <Route path="/science" element={<News key="science" pagesize={5} country="in" category="science" />} />
  <Route path="/sports" element={<News key="sports" pagesize={5} country="in" category="sports" />} />
  <Route path="/technology" element={<News key="technology" pagesize={5} country="in" category="technology" />} />
</Routes>

        </div>
      </Router>
    );
  }
}

export default App;
