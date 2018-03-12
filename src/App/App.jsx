import React from "react";
import { Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from "react-simple-dropdown";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Snackbar from "material-ui/Snackbar";
// redux
import { history } from "../_helpers";
import { userActions, snackbarActions } from "../_actions";
import { PrivateRoute } from "../_components";
// pages
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { ShowAllPage } from "../ShowAllPage";
import { OwnCoursesPage } from "../OwnCoursesPage";
import { ProfilePage } from "../ProfilePage";
import { TimetablesPage } from "../TimetablesPage";

import logo from "../logo.png";
import "../App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }
  // close dropdown menu
  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  render() {
    const { snackbar, dispatch } = this.props;
    return (
      <Router history={history}>
        <div className="App">
          <header className="App-header">
            <a href="/">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
            <Dropdown className="main_menu-dropdown" ref="dropdown">
              <DropdownTrigger>
                <i className="main_menu-dropdown__avatar fa fa-bars" />
              </DropdownTrigger>
              <DropdownContent>
                {userActions.loggedIn() ? (
                  <ul className="main_menu-dropdown__quick-links main_menu-dropdown__segment">
                    <li className="main_menu-dropdown__link">
                      <Link
                        className="main_menu-dropdown__link__anchor"
                        to="/"
                        onClick={this.handleLinkClick}
                      >
                        Pääsivu
                      </Link>
                    </li>
                    <hr />
                    <li className="main_menu-dropdown__link">
                      <Link
                        className="main_menu-dropdown__link__anchor"
                        to="/courses"
                        onClick={this.handleLinkClick}
                      >
                        Kurssit
                      </Link>
                    </li>
                    <hr />
                    <li className="main_menu-dropdown__link">
                      <Link
                        className="main_menu-dropdown__link__anchor"
                        to="/timetables"
                        onClick={this.handleLinkClick}
                      >
                        Aikataulut
                      </Link>
                    </li>
                    <hr />
                    <li className="main_menu-dropdown__link">
                      <Link
                        className="main_menu-dropdown__link__anchor"
                        to="/own"
                        onClick={this.handleLinkClick}
                      >
                        Omat kurssit
                      </Link>
                    </li>
                    <hr />
                    <li className="main_menu-dropdown__link">
                      <Link
                        className="main_menu-dropdown__link__anchor"
                        to="/profile"
                        onClick={this.handleLinkClick}
                      >
                        Profiili
                      </Link>
                    </li>
                    <li className="main_menu-dropdown__link">
                      <Link
                        className="main_menu-dropdown__link__anchor"
                        to="/logout"
                        onClick={this.handleLinkClick}
                      >
                        Kirjaudu ulos
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="main_menu-dropdown__quick-links main_menu-dropdown__segment">
                    <li className="main_menu-dropdown__link">
                      <Link
                        className="main_menu-dropdown__link__anchor"
                        to="/"
                        onClick={this.handleLinkClick}
                      >
                        Pääsivu
                      </Link>
                    </li>
                    <li className="main_menu-dropdown__link">
                      <Link
                        className="main_menu-dropdown__link__anchor"
                        to="/login"
                        onClick={this.handleLinkClick}
                      >
                        Kirjaudu sisään
                      </Link>
                    </li>
                  </ul>
                )}
              </DropdownContent>
            </Dropdown>
          </header>
          <div className="content">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              {/* Login page logs out if opened while logged in */}
              <Route path="/logout" component={LoginPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <PrivateRoute path="/courses" component={ShowAllPage} />
              <PrivateRoute path="/timetables" component={TimetablesPage} />
              <PrivateRoute path="/own" component={OwnCoursesPage} />
              <Redirect to="/" />
            </Switch>
          </div>
          <MuiThemeProvider>
            <Snackbar
              open={snackbar.open}
              message={snackbar.message}
              autoHideDuration={snackbar.duration}
              bodyStyle={{
                backgroundColor: snackbar ? snackbar.type : "grey"
              }}
              contentStyle={{ color: snackbar ? snackbar.color : "white" }}
              onRequestClose={() => dispatch(snackbarActions.closeSnackbar())}
            />
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { snackbar } = state;
  return {
    snackbar
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
