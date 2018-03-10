import React, { Component } from "react";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { userActions } from "../_actions";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      fistName: "",
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

    // @TODO: submit update
  }

  render() {
    const { user } = this.props.users;
    return (
      <div className="profileForm">
        {user && (
          <MuiThemeProvider>
            <form name="form" onSubmit={this.handleSubmit}>
              <TextField
                defaultValue={user.username}
                hintText="Syötä käyttäjätunnuksesi"
                floatingLabelText="Käyttäjätunnus"
                onChange={(event, newValue) =>
                  this.setState({ username: newValue })
                }
              />
              <br />
              <TextField
                defaultValue={user.firstName}
                hintText="Syötä etunimesi"
                floatingLabelText="Etunimi"
                onChange={(event, newValue) =>
                  this.setState({ firstName: newValue })
                }
              />
              <br />
              <TextField
                defaultValue={user.lastName}
                hintText="Syötä sukunimesi"
                floatingLabelText="Sukunimi"
                onChange={(event, newValue) =>
                  this.setState({ lastName: newValue })
                }
              />
              <br />
              <TextField
                defaultValue={user.userGroup}
                hintText="Syötä ryhmätunnuksesi"
                floatingLabelText="Ryhmätunnus"
                onChange={(event, newValue) =>
                  this.setState({ userGroup: newValue })
                }
              />
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
