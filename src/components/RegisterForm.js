import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { register } from "../services/WebService";
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

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: "",
      fistName: "",
      lastName: "",
      userGroup: "",
      password: "",
      password2: ""
    };
  }

  handleClick(event) {
    event.preventDefault();

    if (
      this.state.username !== "" &&
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.userGroup !== "" &&
      this.state.password !== "" &&
      this.state.password === this.state.password2
    ) {
      this.setState({ loading: true });

      var payload = {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userGroup: this.state.userGroup,
        passwordHash: this.state.password
      };

      register(payload).then(
        res => {
          this.setState({
            loading: false
          });
        },
        err => {
          if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(err.message, {
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
    } else {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.warn("Täytä kaikki kentät", {
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
          className: "toastMessage",
          closeButton: false,
          transition: ZoomInAndOut
        });
      }
    }
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
                    hintText="Syötä etunimesi"
                    floatingLabelText="Etunimi"
                    onChange={(event, newValue) =>
                      this.setState({ firstName: newValue })
                    }
                  />
                  <br />
                  <TextField
                    hintText="Syötä sukunimesi"
                    floatingLabelText="Sukunimi"
                    onChange={(event, newValue) =>
                      this.setState({ lastName: newValue })
                    }
                  />
                  <br />
                  <TextField
                    hintText="Syötä ryhmätunnuksesi"
                    floatingLabelText="Ryhmätunnus"
                    onChange={(event, newValue) =>
                      this.setState({ userGroup: newValue })
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
                  <TextField
                    type="password"
                    hintText="Salasana toiseen kertaan"
                    floatingLabelText="Toista salasana"
                    onChange={(event, newValue) =>
                      this.setState({ password2: newValue })
                    }
                  />
                  <br />
                  <RaisedButton
                    label="Rekisteröidy"
                    type="submit"
                    primary={true}
                    style={buttonStyle}
                  />
                </form>
                <br />
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
