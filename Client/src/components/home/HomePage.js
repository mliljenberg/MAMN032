import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Spel</h1>
        <p>Bla Bla Bla.......</p>
        <Link to="host" className="btn btn-primary btn-lg">Create Game</Link>
        <Link to="player" className="btn btn-primary btn-lg">Join Game</Link>
      </div>

    );
  }
}

export default HomePage;
