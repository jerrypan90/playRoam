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

class Joined extends Component {
  constructor(){
    super();
    this.state = {
      user_id: jwtDecode(window.localStorage.getItem('jwt')).id,
      userRsvpList: []
    }
  }

  componentDidMount() {
    this.getUserRsvp()
  }

  getUserRsvp(){
    axios.get(`http://localhost:5000/users/${this.state.user_id}/rsvps.json`)
    .then((res) => {
      this.setState({
        userRsvpList: res.data.map((obj) => {
          return <List
            key={obj.id}
            id={obj.id}
            creator={obj.user_id}
            title={obj.title}
            date={obj.date}
            startTime={obj.start_time}
            endTime={obj.end_time}
            venue={obj.venue}
            maxPax={obj.max_pax}
            currentPax={obj.current_pax}
            />;
        })
      })
    })
    .catch((err) => {
      console.log('Error in Getting User Rsvps: ', err.response)
    })
  }

  render() {
    return (
      <div>
        <h2>My Joined Activity</h2>
        <div id='activityListDiv'>
          {this.state.userRsvpList}
        </div>
      </div>
    )
  }
}

export default Joined;