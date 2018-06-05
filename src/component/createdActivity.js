import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import '../style/home.css';
import '../style/createActivity.css';

class List extends Component {
  render() {
    return (
        <div className='eachActivityDiv'>
          <h3>{this.props.title}</h3>
          <p>Date: {this.props.date}</p>
          <p>Venue: {this.props.venue}</p>
          <p>From: {this.props.startTime} to {this.props.endTime}</p>
          <p>Attendance: {this.props.currentPax} / {this.props.maxPax}</p>
        </div>
    );
  }
}

class Created extends Component {
  constructor() {
    super();
    this.state = {
      user_id: jwtDecode(window.localStorage.getItem('jwt')).id,
      userActivityList: []
    }
  }

  componentDidMount() {
    this.getUserActivity();
  }

  getUserActivity(){
    axios.get('http://localhost:5000/activities.json')
    .then((res) => {
      this.setState({
        userActivityList: res.data.filter((obj) => {
          if(obj.user_id === this.state.user_id.toString()) {
            return obj;
          }
        })
      });
    })
    .catch((err) => {
      console.log('Error in Getting User Activities: ', err.response)
    })
  }

  render() {
    const t = this.state.userActivityList;
    return (
      <div>
        <h2>My Created Activity</h2>
        <div id='activityListDiv'>
          {this.state.userActivityList.length > 0 && this.state.userActivityList.map(a => <List {...a} />)}
        </div>
      </div>
    )
  }
}

export default Created;