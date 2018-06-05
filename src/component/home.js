import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import axios from 'axios';

import '../style/home.css';

class Background extends Component {
  render() {
    return (
      <div className='backgroundImageDiv'>
        <img src={this.props.image} alt='random user' />
      </div>
    )
  }
}

class List extends Component {
  render() {
    return (
      <Link to={`/activities/${this.props.id}`}>
        <div className='eachActivityDiv'>
          <h3>{this.props.title}</h3>
          <p>Date: {this.props.date}</p>
          <p>Venue: {this.props.venue}</p>
          <p>From: {this.props.startTime} to {this.props.endTime}</p>
          <p>Attendance: {this.props.currentPax} / {this.props.maxPax}</p>
        </div>
      </Link>
    );
  }
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      image: [],
      activityList: []
    }
  }

  componentDidMount() {
    this.getBackground();
    this.getActivity();
  }

  getBackground(){
    axios.get('https://randomuser.me/api/?results=450')
    .then((res) => {
      this.setState({ 
        image: res.data.results.map((obj, i) => {
          return <Background
          key={i}
          image={obj.picture.thumbnail}
          />
        })
      })   
    })
    .catch((err) => {
        console.log('Error in Getting Background', err.response);
    })    
  }

  getActivity(){
    axios.get('http://localhost:5000/activities.json')
    .then((res) => {
      this.setState({
        activityList: res.data.map((obj) => {
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
      console.log('Error in Getting Activities: ', err.response)
    })
  }

  render() {
    return (
      <div>
        <div id='backgroundDiv'>
          {this.state.image}
        </div>
        <div className='spaceDiv'></div>
        <div id='searchBoxDiv'>
          <input id='searchBox' placeholder='Search for your favourite room..' />
        </div>
        <div className='spaceDiv'></div>
        <div id='activityListDiv'>
          {this.state.activityList}          
        </div>
      </div>
    )
  }
}

export default Home;