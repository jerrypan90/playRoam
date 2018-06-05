import React, { Component } from 'react';

import '../style/logo.css';

class Logo extends Component {
  render() {
    return (
      <div id="logoDiv">
        <img id='logo' src='http://dribbble.s3.amazonaws.com/users/272547/screenshots/915839/rp.jpg' alt='PlayRoam Logo' />
        <h1 id='logoName'>PlayRoam</h1>
      </div>
    )
  }
}

export default Logo;