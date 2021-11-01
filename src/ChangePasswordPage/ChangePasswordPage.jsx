import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";

class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        oldPassword: "",
        password: "",
        password2: "",
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validation = this.validation.bind(this);
  }

  validation(pw) {
    if (pw.length <= 10 && pw.length >= 4 && pw.match(/[A-Z]/g)) {
      return true;
    } else {
      return false;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (
      user.oldPassword &&
      user.password &&
      this.validation(user.password) &&
      user.oldPassword === this.props.user.password &&
      user.password === user.password2
    ) {
      console.log(this.props.user);
      let changedUser = {
        ...this.props.user,
        password: user.password,
      };
      this.props.changePassword(changedUser);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    const { validation } = this;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>ChangePassword</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" +
              (submitted &&
              (!user.oldPassword ||
                user.oldPassword != this.props.user.password)
                ? " has-error"
                : "")
            }
          >
            <label htmlFor="password">Old Password</label>
            <input
              type="password"
              className="form-control"
              name="oldPassword"
              value={user.oldPassword}
              onChange={this.handleChange}
            />
            {submitted &&
              (!user.oldPassword ||
                user.oldPassword != this.props.user.password) && (
                <div className="help-block">Old password is incorrect</div>
              )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && (!user.password || !validation(user.password))
                ? " has-error"
                : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className="help-block">Password is required</div>
            )}
            {submitted && !validation(user.password) ? (
              <div className="help-block">
                Password must consist of between 4 and 10 characters and contain
                a capital letter
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && user.password != user.password2 ? " has-error" : "")
            }
          >
            <label htmlFor="password">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              value={user.password2}
              onChange={this.handleChange}
            />
            {submitted && user.password != user.password2 && (
              <div className="help-block">Password must match</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Update</button>
            {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
            <Link to="/" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  const { registering } = state.registration;
  return { registering, user, users };
}

const actionCreators = {
  changePassword: userActions.changePassword,
};

const connectedChangePasswordPage = connect(
  mapState,
  actionCreators
)(ChangePasswordPage);
export { connectedChangePasswordPage as ChangePasswordPage };
