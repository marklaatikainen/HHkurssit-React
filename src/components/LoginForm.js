import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { login } from "../services/WebService";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import Transition from "react-transition-group/Transition";

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

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false
    };
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ loading: true });
    var payload = {
      username: this.state.username,
      password: this.state.password
    };

    login(payload).then(
      () => {
        this.setState({
          loading: false
        });
      },
      err => {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error("Kirjautuminen epäonnistui!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            className: "toastMessage",
            closeButton: false,
            transition: ZoomInAndOut
          });
        }
        this.setState({
          loading: false
        });
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.loading === false ? (
          <div className="loginForm">
            <MuiThemeProvider>
              <div>
                <form onSubmit={event => this.handleClick(event)}>
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
              </div>
            </MuiThemeProvider>
          </div>
        ) : (
          <div className="sweet-loading">
            <ScaleLoader
              color={"#0056b3"}
              size={100}
              loading={this.state.loading}
            />
          </div>
        )}
        <ToastContainer style={style} transition={ZoomInAndOut} />
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
