import React from "react";
import { connect } from "react-redux";
import { ScaleLoader } from "react-spinners";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { history } from "../_helpers";
import { snackbarActions } from "../_actions";
import { userActions } from "../_actions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false
    };

    // reset login status
    const { dispatch } = this.props;

    dispatch(userActions.logout());

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;

    if (username && password) {
      dispatch(userActions.login(username, password));
    } else {
      dispatch(
        snackbarActions.openSnackbar(
          "Syötä käyttäjätunnus ja salasana",
          "yellow",
          "black"
        )
      );
    }
  }

  register(e) {
    e.preventDefault();
    history.push("/register");
  }

  render() {
    const { loggingIn } = this.props;
    return (
      <div>
        <div className="login-content">
          <h3>Kirjautuminen</h3>
          <div>
            {!loggingIn ? (
              <div className="loginForm">
                <MuiThemeProvider>
                  <div>
                    <form onSubmit={event => this.handleSubmit(event)}>
                      <TextField
                        hintText="Syötä käyttäjätunnuksesi"
                        floatingLabelText="Käyttäjätunnus"
                        onChange={(event, newValue) =>
                          this.setState({ username: newValue })
                        }
                      />
                      <br />
                      <TextField
                        type="password"
                        hintText="Syötä salasanasi"
                        floatingLabelText="Salasana"
                        onChange={(event, newValue) =>
                          this.setState({ password: newValue })
                        }
                      />
                      <br />
                      <RaisedButton
                        label="Kirjaudu"
                        type="submit"
                        primary={true}
                        style={buttonStyle}
                      />
                    </form>
                    <form name="register" onSubmit={e => this.register(e)}>
                      <RaisedButton
                        label="Rekisteröidy"
                        type="submit"
                        primary={false}
                        style={registerButtonStyle}
                      />
                    </form>
                  </div>
                </MuiThemeProvider>
              </div>
            ) : (
              <div className="sweet-loading">
                <ScaleLoader color={"#0056b3"} size={100} loading={loggingIn} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { snackbar } = state;
  return {
    loggingIn,
    snackbar
  };
}

const buttonStyle = {
  marginTop: 20
};

const registerButtonStyle = {
  width: "100%",
  marginTop: 100
};

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
