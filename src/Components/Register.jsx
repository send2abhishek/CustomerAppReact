import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../axios-instance";
import Login from "./Login";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        email: "",
        password: "",
        country: "",
        phone: null,
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
      .post("register", this.state.form)
      .then((response) => {
        console.log("response is", response);
        this.setState({
          error: "Account Register !",
        });
        setTimeout(() => {
          this.props.changeRoute(Login);
        }, 1000);
      })
      .catch((err) => {
        console.log("response is", err);
        this.setState({
          error: err.message,
        });
      });
  };
  render() {
    return (
      <div>
        <p className="text-center-bold">Register</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event) => this.formHandler(event, "name")}
              value={this.state.form.name}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(event) => this.formHandler(event, "email")}
              value={this.state.form.email}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => this.formHandler(event, "password")}
              value={this.state.form.password}
              required
            />
          </div>

          <div className="form-group">
            <label>Country:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter country"
              onChange={(event) => this.formHandler(event, "country")}
              value={this.state.form.country}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter phone number"
              onChange={(event) => this.formHandler(event, "phone")}
              value={this.state.form.phone}
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
          onClick={() => this.props.changeRoute(Login)}
        >
          Already An Account ?
        </Link>
        <p className="text-danger">{this.state.error}</p>
      </div>
    );
  }
}

export default Register;
