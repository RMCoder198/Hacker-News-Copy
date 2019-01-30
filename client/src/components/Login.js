import React, { Component } from "react";
import axios from "axios";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const self = this;
    if(localStorage.getItem('jwtToken') != null){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

     axios.get('/api/users/current')
     .then(function(response){
      if(response.data.status === true){
         delete axios.defaults.headers.common["Authorization"];
   
       self.props.history.push("/dashboard");

      }
             
                 delete axios.defaults.headers.common["Authorization"];

     })
     .catch( function(error){
                  delete axios.defaults.headers.common["Authorization"];

     }
      );
   }
  }


  handleClick(e) {
    const payload = {
      email: this.state.email,
      password: this.state.password
    };

    const self = this;

    axios
      .post("/api/users/login", payload)
      .then(function(response) {
        if (response.status === 200) {
          
          const  token  = response.data.token;
           
           localStorage.setItem("jwtToken", token);
          
          self.props.history.push("/dashboard");
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
          <div id="legend">
            <legend className="">Login</legend>
          </div>

          <div className="control-group">
            <label className="control-label" for="email">
              E-mail
            </label>
            <div className="controls">
              <input
                type="text"
                id="login-email"
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
                id="login-password"
                name="password"
                placeholder=""
                className="input-xlarge"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
          </div>


        </fieldset>
  </div>
  <div className="panel-footer pull-right">
                      <a href="/" >Want to register? Register here.</a>

            <button className="btn btn-success" onClick={this.handleClick}>
            Login
          </button>
  </div>
</div>

      </div>
    );
  }
}

export default Login;
