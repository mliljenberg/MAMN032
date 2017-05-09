/**
 * Created by JoelBuhrman on 2017-03-24.
 */
import React from 'react';
import {Link} from 'react-router';


const LoginForm = () => {
  return (
    <form>

      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="text" className="form-control" id="roomKey" placeholder="RoomKey"/>
      </div>


      <button type="submit" className="btn btn-default col-xs-12">Join</button>
      <Link to="CreateGame" className="btn btn-success col-xs-12">Create Game</Link>

    </form>

  );
};

LoginForm.propTypes = {

};

export default LoginForm;
