//    Necessary Imports
//----------x----------x---------
import React, { Component } from "react";
//    Store Actions
//----------x----------x---------
import { loginSuccess } from "../actions/auth";
import { connect } from "react-redux";
//    UI Components
//----------x----------x---------
import { FormGroup, TextField, Button } from "@material-ui/core";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "No errors yet:D",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };

    fetch("http://localhost:3001/auth", reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            email: "",
            password: "",
            error: "Invalid Username or password",
          });
        } else {
          localStorage.setItem("token", data.token);
          this.props.loginSuccess(data);
          this.props.history.push("/search");
        }
      });
  };

  render() {
    const textfieldStyle = { paddingBottom: 20 };

    return (
      <FormGroup style={{ textAlign: "center" }}>
        <TextField
          autoFocus
          value={this.state.email}
          error={this.state.error === "Invalid Username or password"}
          type="text"
          name="email"
          label="Email"
          variant="outlined"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <TextField
          error={this.state.error === "Invalid Username or password"}
          helperText={
            this.state.error === "Invalid Username or password"
              ? "Invalid Username or Password"
              : null
          }
          value={this.state.password}
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          onChange={this.handleChange}
          style={textfieldStyle}
        />

        <Button
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          onClick={this.handleSubmit}
          style={{ backgroundColor: "#4CAF50" }}
        >
          Log in
        </Button>
      </FormGroup>
    );
  }
}

export default connect(null, { loginSuccess })(LoginForm);
