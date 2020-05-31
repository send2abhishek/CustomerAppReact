import React, { Component } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import axios from "../axios-instance";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        password: "",
      },
      error: "",
    };
  }
  formHandler = (e, name) => {
    const formData = { ...this.state.form };
    formData[name] = e.target.value.trim();
    this.setState({
      form: formData,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      error: "",
    });
    axios
      .post("login", this.state.form)
      .then(async (response) => {
        console.log("response is", response);
        await window.localStorage.setItem("x-auth-token", response.data.token);
        await window.localStorage.setItem(
          "x-auth-username",
          response.data.username
        );
        await window.localStorage.setItem(
          "x-auth-userId",
          response.data.userId
        );
        this.props.history.replace("/home");
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };
  render() {
    return (
      <div>
        <p className="text-center-bold">Login</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={(event) => this.formHandler(event, "email")}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={this.state.password}
              onChange={(e) => this.formHandler(e, "password")}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <Link
          to="/"
          className="register-link"
          onClick={() => this.props.changeRoute(Register)}
        >
          Don't Have An Account ?
        </Link>
        <p className="text-danger">{this.state.error}</p>
      </div>
    );
  }
}

export default Login;
