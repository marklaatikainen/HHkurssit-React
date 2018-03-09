import React from "react";
import { Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from "react-simple-dropdown";
import { ToastContainer, toast } from "react-toastify";
import Transition from "react-transition-group/Transition";
// redux
import { history } from "../_helpers";
import { userActions } from "../_actions";
import { alertActions } from "../_actions";
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }
  // close dropdown menu
  handleLinkClick() {
    this.refs.dropdown.hide();
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
    const { alert } = this.props;
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
          {alert.message && this.toastMessage(alert.message)}
          <ToastContainer style={style} transition={ZoomInAndOut} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert, isLoading } = state;
  return {
    alert,
    isLoading
  };
}

const style = {
  width: "100%",
  marginBottom: "0px",
  bottom: 0
};

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
