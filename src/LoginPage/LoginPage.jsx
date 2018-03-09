import React from "react";
import { connect } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import Transition from "react-transition-group/Transition";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { userActions } from "../_actions";

const ZoomInAndOut = ({ children, position, ...props }) => (
  <Transition
    {...props}
    timeout={500}
    onEnter={node => node.classList.add("zoomIn", "animate")}
    onExit={node => {
      node.classList.remove("zoomIn", "animate");
      node.classList.add("zoomOut", "animate");
    }}
  >
    {children}
  </Transition>
);

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      un: "",
      pwd: "",
      submitted: false
    };

    // reset login status
    const { dispatch } = this.props;

    dispatch(userActions.logout());
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillReceiveProps(nextState) {
  //   if (nextState.authentication !== undefined) {
  //     console.log(nextState.authentication.message);
  //   }
  // }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { un, pwd } = this.state;
    const { dispatch } = this.props;

    if (un && pwd) {
      dispatch(userActions.login(un, pwd));
    } else {
      this.toastMessage("Syötä käyttäjätunnus ja salasana");
    }
  }

  register(e) {
    e.preventDefault();
    history.push("/register");
  }

  toastMessage(alert) {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.error(alert, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        className: "toastMessage",
        closeButton: false,
        transition: ZoomInAndOut
      });
    }
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
                        name="un"
                        hintText="Syötä käyttäjätunnuksesi"
                        floatingLabelText="Käyttäjätunnus"
                        onChange={this.handleChange}
                      />
                      <br />
                      <TextField
                        name="pwd"
                        type="password"
                        hintText="Syötä salasanasi"
                        floatingLabelText="Salasana"
                        onChange={this.handleChange}
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
                <ScaleLoader
                  color={"#0056b3"}
                  size={100}
                  loading={loggingIn}
                />
              </div>
            )}
            <ToastContainer style={style} transition={ZoomInAndOut} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const buttonStyle = {
  marginTop: 20
};

const registerButtonStyle = {
  width: "100%",
  marginTop: 100
};

const style = {
  width: "100%",
  marginBottom: "0px",
  bottom: 0
};

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
