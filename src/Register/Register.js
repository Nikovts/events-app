import React from "react";
import * as yup from "yup";
import "./Register.css";
import withForm from "../share/hoks/form";
import { post } from "../servises/requester";

class Register extends React.Component {
  usernameOnchangeHandler = this.props.changeHandlerFactory("username");
  passwordOnchangeHandler = this.props.changeHandlerFactory("password");
  rePasswordOnchangeHandler = this.props.changeHandlerFactory("rePassword");
  submitHandler = (e) => {
    this.props.runValidations().then((formData) => {
      if (!formData) {
        return;
      }
      const { username, password } = formData;
      post("user", "", { username, password }, "Basic")
        .then((userdata) => {
          this.props.history.push("/login");
        })
        .catch((err) => console.log(err));
    });
  };
  getFirstInputError = (name) => {
    const errorState = this.props.getFormErrorState();
    return errorState && errorState[name] && errorState[name][0];
  };

  render() {
    const usernameError = this.getFirstInputError("username");
    const passwordError = this.getFirstInputError("password");
    const rePasswordError = this.getFirstInputError("rePassword");
    return (
      <form className="Login">
        <h1>Register</h1>
        <div className="form-control">
          <label>UserName</label>
          <input type="text" onChange={this.usernameOnchangeHandler} />
          {usernameError && <div className="error">{usernameError}</div>}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" onChange={this.passwordOnchangeHandler} />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <div className="form-control">
          <label>Re-Password</label>
          <input type="password" onChange={this.rePasswordOnchangeHandler} />
          {rePasswordError && <div className="error">{rePasswordError}</div>}
        </div>
        <div className="form-control">
          <button type="button" onClick={this.submitHandler}>
            Register
          </button>
        </div>
      </form>
    );
  }
}
const initialState = {
  username: "",
  password: "",
  rePassword: "",
};
const schema = yup.object({
  username: yup
    .string("Username should be a string")
    .required("Username is required")
    .min(4, "Username must be more than 4 chars"),

  password: yup
    .string("Password should be a string")
    .required("Password is required")
    .min(3, "Password must be more than 2 chars"),

  rePassword: yup
    .string("Password should be a string")
    .oneOf([yup.ref("password"), null], "Passwords don`t match")
    .required("Password is required")
    .min(3, "Password must be more than 2 chars"),
});

export default withForm(Register, initialState, schema);
