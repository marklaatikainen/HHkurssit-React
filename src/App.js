import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from "react-simple-dropdown";
import { Route, Link, Switch, Redirect } from "react-router-dom";

// components
import Home from "./components/HomePage";
import Login from "./components/LoginPage";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/LogoutPage";
import Profile from "./components/Profile";
import FindAllCourses from "./components/FindAllCourses";
import Timetables from "./components/Timetables";
import SearchForCourses from "./components/SearchForCourses";
import OwnCourses from "./components/OwnCourses";

// functions
import { loggedIn } from "./components/Functions";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  state = {
    loggedIn: false
  };

  componentDidMount() {
    this.setState({ loggedIn: this.checkIfLoggedIn() });
  }

  componentWillReceiveProps() {
    this.setState({ loggedIn: this.checkIfLoggedIn() });
  }

  checkIfLoggedIn() {
    return loggedIn();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          {
          }
          <Dropdown className="main_menu-dropdown" ref="dropdown">
            <DropdownTrigger>
              <i className="main_menu-dropdown__avatar fa fa-bars" />
            </DropdownTrigger>
            <DropdownContent>
              {this.state.loggedIn ? (
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
                      to="/all"
                      onClick={this.handleLinkClick}
                    >
                      Näytä kaikki kurssit
                    </Link>
                  </li>
                  <li className="main_menu-dropdown__link">
                    <Link
                      className="main_menu-dropdown__link__anchor"
                      to="/search"
                      onClick={this.handleLinkClick}
                    >
                      Etsi kursseja
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
            <Route exact path="/" component={Home} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/profile" component={Profile} />
            <Route path="/all" component={FindAllCourses} />
            <Route path="/timetables" component={Timetables} />
            <Route path="/search" component={SearchForCourses} />
            <Route path="/own" component={OwnCourses} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}
