import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleClick(e) {
    let self = this;
    const payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/api/users/register", payload)
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          console.log("success");
           self.props.history.push('/login');
        } 


      })
      .catch(function(error) {
        alert(error.response.data.data);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      
      <div className="center">
      
       
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
          <div id="legend" >
            <legend className="">Register</legend>
          </div>
          <div className="control-group">
            <label className="control-label" for="username">
              Username
            </label>
            <div className="controls">
              <input
                type="text"
                id="username"
                name="name"
                className="input-xlarge"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label" for="email">
              E-mail
            </label>
            <div className="controls">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=""
                className="input-xlarge"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label" for="password">
              Password
            </label>
            <div className="controls">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Must be more than 6 character"
                className="input-xlarge"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
          </div>


        </fieldset>
          </div>
          <div classNamee="panel-footer">
          <button className="btn btn-primary  pull-right" onClick={this.handleClick}>
            Register
          </button>
          <a href="/login" >Already registered? Log in here.</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
