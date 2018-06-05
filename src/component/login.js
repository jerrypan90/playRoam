import React, {Component} from 'react';

import '../style/login.css';

class Login extends Component {
  render(){
    return(
      <div>
          <h2>Register</h2>
          <form onSubmit={this.props.handleRegister}>
            <div>
              <input type="username" placeholder="Username" />
              <br />
              <input type="email" placeholder="Email" />
              <br />
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Register" />
          </form>

          <h2>Sign In</h2>
          <form onSubmit={this.props.handleLogin}>
            <div>
              <input type="email" ref="email" placeholder="Email" />
              < br />
              <input type="password" ref="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" />
          </form>
      </div>
    )
  }
}

export default Login;