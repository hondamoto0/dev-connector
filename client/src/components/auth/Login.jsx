import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions";
import PropTypes from "prop-types";

const actions = { login };

const Login = props => {
  const { login, isAuthenticated } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form
        onSubmit={e => onSubmit(e)}
        className="form"
        action="create-profile.html"
      >
        <div className="form-group">
          <input
            onChange={e => onChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => onChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  actions
)(Login);
