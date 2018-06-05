import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import '../style/activity.css';

class Activity extends Component {
  constructor(props) {
    super(props);
    console.log('props from activity', props);
    this.handleJoin = this.handleJoin.bind(this);
    this.state = {
      activityId: this.props.match.params.id,
      user_id: jwtDecode(window.localStorage.getItem('jwt')).id,
      hostId: '',
      title: '',
      genre: '',
      date: '',
      startTime: '',
      endTime: '',
      venue: '',
      maxPax: '',
      currentPax: ''
    }
  }

  componentDidMount() {
    this.getEachActivity()
  }

  getEachActivity() {
    axios.get(`http://localhost:5000/activities/${this.state.activityId}.json`)
    .then((res) => {
      this.setState({
        hostId: res.data.user_id,
        title: res.data.title,
        genre: res.data.genre,
        date: res.data.date,
        startTime: res.data.start_time,
        endTime: res.data.end_time,
        venue: res.data.venue,
        maxPax: res.data.max_pax,
        currentPax: res.data.current_pax,
      })
    })
    .catch((err) => {
      console.log('Error in Getting Each Activities: ', err.response)
    })
  }

  handleJoin(e){
    axios.post('http://localhost:5000/rsvps', {
      user_id: this.state.user_id,
      activity_id: e.target.value,
      attendance: 'true'
    })
    .catch((err) => {
      console.log('Error in Joining Activity: ', err.response);
    });
    
    axios.patch(`http://localhost:5000/activities/${e.target.value}`).catch((err) => {
      console.log('Error in Updating Activity Current Pax: ', err.response);
    });

    alert('Yea! You are in!');
  }

  render() {
    return (
      <div>
        <h5>Title: {this.state.title}</h5>
        <h5>Date: {this.state.date}</h5>
        <h5>Venue: {this.state.venue}</h5>
        <h5>From: {this.state.startTime} to {this.state.endTime}</h5>
        <h5>Attendance: {this.state.currentPax} / {this.state.maxPax}</h5>
        <button value={this.state.activityId} onClick={this.handleJoin}>Join</button>
      </div>
    )
  }
}

export default Activity;