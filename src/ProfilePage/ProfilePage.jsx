import React, { Component } from "react";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { userActions, snackbarActions } from "../_actions";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      username: "",
      firstName: "",
      lastName: "",
      userGroup: "",
      password: "",
      password2: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(userActions.getUserInfo());
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const {
      id,
      username,
      firstName,
      lastName,
      userGroup,
      password,
      password2
    } = this.state;
    if (password === password2) {
      if (
        id !== "" &&
        username !== "" &&
        firstName !== "" &&
        lastName !== "" &&
        userGroup !== "" &&
        password !== "" &&
        password2 !== ""
      ) {
        dispatch(userActions.updateProfile(this.state));
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

  render() {
    const { user } = this.props.users;
    return (
      <div className="profileForm">
        {user && (
          <MuiThemeProvider>
            <form name="form" onSubmit={this.handleSubmit}>
            {this.state.id === "" &&
                this.setState({ id: user.id })}
              <TextField
                defaultValue={user.username}
                hintText="Syötä käyttäjätunnuksesi"
                floatingLabelText="Käyttäjätunnus"
                onChange={(event, newValue) =>
                  this.setState({ username: newValue })
                }
              />
              {this.state.username === "" &&
                this.setState({ username: user.username })}
              <br />
              <TextField
                defaultValue={user.firstName}
                hintText="Syötä etunimesi"
                floatingLabelText="Etunimi"
                onChange={(event, newValue) =>
                  this.setState({ firstName: newValue })
                }
              />
              {this.state.firstName === "" &&
                this.setState({ firstName: user.firstName })}
              <br />
              <TextField
                defaultValue={user.lastName}
                hintText="Syötä sukunimesi"
                floatingLabelText="Sukunimi"
                onChange={(event, newValue) =>
                  this.setState({ lastName: newValue })
                }
              />
              {this.state.lastName === "" &&
                this.setState({ lastName: user.lastName })}
              <br />
              <TextField
                defaultValue={user.userGroup}
                hintText="Syötä ryhmätunnuksesi"
                floatingLabelText="Ryhmätunnus"
                onChange={(event, newValue) =>
                  this.setState({ userGroup: newValue })
                }
              />
              {this.state.userGroup === "" &&
                this.setState({ userGroup: user.userGroup })}
              <br />
              <TextField
                type="password"
                hintText="Syötä uusi salasana"
                floatingLabelText="Uusi salasana"
                onChange={(event, newValue) =>
                  this.setState({ password: newValue })
                }
              />
              <br />
              <TextField
                type="password"
                hintText="Salasana toiseen kertaan"
                floatingLabelText="Toista uusi salasana"
                onChange={(event, newValue) =>
                  this.setState({ password2: newValue })
                }
              />
              <br />
              <RaisedButton
                label="Tallenna muutokset"
                type="submit"
                primary={true}
                style={buttonStyle}
              />
              <RaisedButton
                label="Peruuta"
                type="reset"
                secondary={true}
                style={buttonStyle}
              />
            </form>
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}
const buttonStyle = {
  marginTop: 20
};

function mapStateToProps(state) {
  const { users } = state;
  return {
    users
  };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
