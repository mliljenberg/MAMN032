import React from 'react';
import {Link} from 'react-router';
import LoginForm from './LoginForm';

class HomePage extends React.Component {
  render() {
    return (
  <div>
      <div className="jumbotron">
        <h1>Spel</h1>

    </div>
    <LoginForm/>


  </div>




  );
  }
}

export default HomePage;
