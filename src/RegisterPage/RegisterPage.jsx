import React from "react";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { userActions, snackbarActions } from "../_actions";
import { history } from "../_helpers";
import { ScaleLoader } from "react-spinners";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      userGroup: "",
      password: "",
      password2: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const {
      username,
      firstName,
      lastName,
      userGroup,
      password,
      password2
    } = this.state;
    if (password === password2) {
      if (
        username !== "" &&
        firstName !== "" &&
        lastName !== "" &&
        userGroup !== "" &&
        password !== "" &&
        password2 !== ""
      ) {
        dispatch(userActions.register(this.state));
      } else {
        dispatch(
          snackbarActions.openSnackbar(
            "Täytä kaikki kentät!",
            "yellow",
            "black"
          )
        );
      }
    } else {
      dispatch(
        snackbarActions.openSnackbar(
          "Salasanat eivät täsmää!",
          "yellow",
          "black"
        )
      );
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
          <div className="registerForm">
            <MuiThemeProvider>
              <div>
                <form name="form" onSubmit={this.handleSubmit}>
                  <TextField
                    hintText="Syötä käyttäjätunnuksesi"
                    name="userName"
                    floatingLabelText="Käyttäjätunnus"
                    onChange={(event, newValue) =>
                      this.setState({ username: newValue })
                    }
                  />
                  <br />
                  <TextField
                    hintText="Syötä etunimesi"
                    name="firstName"
                    floatingLabelText="Etunimi"
                    onChange={(event, newValue) =>
                      this.setState({ firstName: newValue })
                    }
                  />
                  <br />
                  <TextField
                    hintText="Syötä sukunimesi"
                    name="lastName"
                    floatingLabelText="Sukunimi"
                    onChange={(event, newValue) =>
                      this.setState({ lastName: newValue })
                    }
                  />
                  <br />
                  <TextField
                    hintText="Syötä ryhmätunnuksesi"
                    name="userGroup"
                    floatingLabelText="Ryhmätunnus"
                    onChange={(event, newValue) =>
                      this.setState({ userGroup: newValue })
                    }
                  />
                  <br />
                  <TextField
                    type="password"
                    name="password"
                    hintText="Syötä salasanasi"
                    floatingLabelText="Salasana"
                    onChange={(event, newValue) =>
                      this.setState({ password: newValue })
                    }
                  />
                  <br />
                  <TextField
                    type="password"
                    name="password2"
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
                <form name="cancel" onSubmit={e => this.cancel(e)}>
                  <RaisedButton
                    label="Peruuta"
                    type="submit"
                    secondary={true}
                    style={buttonStyle}
                  />
                </form>
              </div>
            </MuiThemeProvider>
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
  marginTop: 20,
  marginRight: 12,
  marginBottom: 25,
};

function mapStateToProps(state) {
  const { registering, snackbar } = state.registration;
  return {
    registering,
    snackbar
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
