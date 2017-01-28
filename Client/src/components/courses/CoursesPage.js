import React, {PropTypes} from 'react';
import $ from 'jquery';


class CoursesPage extends React.Component{
  render(){
    return(
      <div>
        <div>
        <h1>Courses</h1>
        <button className="btn crossRotate" onClick={doIt}>irriterande css</button>
      </div>
      </div>

    );
  }
}

const doIt = () => {
alert("you clicked!");

};



export default CoursesPage;
