import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {"|"}
      <Link to="/player" activeClassName="active">Player</Link>
      {"|"}
      <Link to="/host" activeClassName="active">Host</Link>
      {"|"}
      <Link to="/joinGame" activeClassName="active">Join Game</Link>

    </nav>



  );
};

export default Header;
