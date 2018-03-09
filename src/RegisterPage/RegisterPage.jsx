import React from "react";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { userActions } from "../_actions";
import { ToastContainer, toast } from "react-toastify";
import Transition from "react-transition-group/Transition";
import { history } from "../_helpers";
import { ScaleLoader } from "react-spinners";

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

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userName: "",
        firstName: "",
        lastName: "",
        userGroup: "",
        password: "",
        password2: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
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

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.password === user.password2) {
      if (
        user.userName &&
        user.firstName &&
        user.lastName &&
        user.userGroup &&
        user.password &&
        user.password2
      ) {
        dispatch(userActions.register(user));
      }
    } else {
      this.toastMessage("Salasanat eivät täsmää!");
    }
  }

  cancel(e) {
    e.preventDefault();
    history.push("/login");
  }

  render() {
    const { registering } = this.props;
    return (
      <div>
        <h3>Rekisteröinti</h3>
        {!registering ? (
          <div className="loginForm">
            <MuiThemeProvider>
              <div>
                <form name="form" onSubmit={this.handleSubmit}>
                  <TextField
                    hintText="Syötä käyttäjätunnuksesi"
                    name="userName"
                    floatingLabelText="Käyttäjätunnus"
                    onChange={this.handleChange}
                  />
                  <br />
                  <TextField
                    hintText="Syötä etunimesi"
                    name="firstName"
                    floatingLabelText="Etunimi"
                    onChange={this.handleChange}
                  />
                  <br />
                  <TextField
                    hintText="Syötä sukunimesi"
                    name="lastName"
                    floatingLabelText="Sukunimi"
                    onChange={this.handleChange}
                  />
                  <br />
                  <TextField
                    hintText="Syötä ryhmätunnuksesi"
                    name="userGroup"
                    floatingLabelText="Ryhmätunnus"
                    onChange={this.handleChange}
                  />
                  <br />
                  <TextField
                    type="password"
                    name="password"
                    hintText="Syötä salasanasi"
                    floatingLabelText="Salasana"
                    onChange={this.handleChange}
                  />
                  <br />
                  <TextField
                    type="password"
                    name="password2"
                    hintText="Salasana toiseen kertaan"
                    floatingLabelText="Toista salasana"
                    onChange={this.handleChange}
                  />
                  <br />
                  <RaisedButton
                    label="Rekisteröidy"
                    type="submit"
                    primary={true}
                    style={buttonStyle}
                  />
                </form>
                <form name="cancel" onSubmit={e => this.cancel(e)}>
                  <RaisedButton
                    label="Peruuta"
                    type="submit"
                    primary={false}
                    style={cancelButtonStyle}
                  />
                </form>
              </div>
            </MuiThemeProvider>
            <ToastContainer style={style} transition={ZoomInAndOut} />
          </div>
        ) : (
          <div className="sweet-loading">
            <ScaleLoader color={"#0056b3"} size={100} loading={registering} />
          </div>
        )}
      </div>
    );
  }
}

const buttonStyle = {
  marginTop: 20
};

const style = {
  width: "100%",
  marginBottom: "0px",
  bottom: 0
};

const cancelButtonStyle = {
  width: "100%",
  marginTop: 50,
  marginBottom: 20
};

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
