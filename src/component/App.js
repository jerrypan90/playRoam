import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import Modal from 'react-modal';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import Logo from './logo';
import Login from './login';
import Home from './home';
import Profile from './profile';
import Activity from './activity';
import Joined from './joinedActivity';
import Created from './createdActivity';
import Footer from './footer';

import '../style/app.css';

Modal.setAppElement('#root')

class App extends Component {
  constructor(){
    super();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      showModal: false,
      isLoggedIn: false,
      username: '',
      user_id: ''
    }
  }

  componentDidMount() {
    if(window.localStorage.getItem('jwt') != null) {
      let userKey = jwtDecode(window.localStorage.getItem('jwt'));
      this.setState({
        isLoggedIn: true,
        username: userKey.username,
        user_id: userKey.id
      })
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleRegister(e) {
    e.preventDefault();
    this.handleCloseModal();

    axios.post('http://localhost:5000/users', {
      user: {
        username: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
      }
    })
    .then((res) => {
      let userKey = jwtDecode(res.data.jwt);
      (this.setState({username: userKey.username, user_id: userKey.id, isLoggedIn: true}), window.localStorage.setItem('jwt', res.data.jwt))
    })
    .catch((err) => {
      console.log('Error in Registeration: ', err.response)
    });
  }

  handleLogin(e){
    e.preventDefault();
    this.handleCloseModal();
    
    axios.post('http://localhost:5000/tokens', {
      email: e.target[0].value,
      password: e.target[1].value
    })
    .then((res) => {
      let userKey = jwtDecode(res.data.jwt);
      (this.setState({username: userKey.username, user_id: userKey.id, isLoggedIn: true}), window.localStorage.setItem('jwt', res.data.jwt))
    })
    .catch((err) => {
      console.log('Error in Login: ', err.response)
    });
  }

  handleLogout() {
    window.localStorage.removeItem('jwt');
    this.setState({ 
      isLoggedIn: false, 
      username: '',
      user_id: ''
    })
  }

  render() {
    return (
      <Router basename={'/playRoam'}>
        <div>
          <div id="navBar">
            <Logo />
            <div id="navSpacing"></div>
            {this.state.isLoggedIn ? (
              <div>
                <Link to={`/`} className="navButton">Home</Link>
                <Link to={`/created`} className="navButton">Host</Link>
                <Link to={`/joined`} className="navButton">Join</Link>
                <button onClick={this.handleLogout} className="navButton" id="logoutButton">Logout</button>
              </div>
            ) : (
              <div>
                <button onClick={this.handleOpenModal} className="navButton" id="loginButton">Register/Login</button>
              </div>
            )}
          </div>
          
          <Modal
          isOpen={this.state.showModal}
          className='modal'
          overlayClassName='overlay'
          >
            <p onClick={this.handleCloseModal}>X</p>
            <Login handleRegister={this.handleRegister} handleLogin={this.handleLogin} />
          </Modal>

          <Route exact path={`/`} component={Home} />
          <PrivateRoute path={`/profile`} component={Profile} />
          <PrivateRoute path={`/activities/:id`} component={Activity} />
          <Route path={`/joined`} component={Joined} />
          <Route path={`/created`} component={Created} />
          <Footer />
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    window.localStorage.getItem('jwt') != null ? (
      <Component {...props}/>
    ) : (
      alert('Please login'),
      <Redirect to='/' />
    )
  )}/>
)

export default App;