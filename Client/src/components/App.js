// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import GameTitle from './common/GameTitle';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <GameTitle/>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
