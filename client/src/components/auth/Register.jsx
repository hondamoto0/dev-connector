import React, { Fragment, useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { setAlert, registerUser } from "../../actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const actions = { setAlert, registerUser };

const Register = props => {
  const { isAuthenticated } = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = formData;
  const { setAlert, registerUser } = props;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      registerUser({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        onSubmit={e => onSubmit(e)}
        className="form"
        action="create-profile.html"
      >
        <div className="form-group">
          <input
            onChange={e => onChange(e)}
            type="text"
            placeholder="Name"
            name="name"
            value={name}
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => onChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
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
        <div className="form-group">
          <input
            onChange={e => onChange(e)}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link href="login.html">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  actions
)(Register);
