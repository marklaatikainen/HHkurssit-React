import React, { Component } from "react";
import { userInfo, updateProfile } from "../services/WebService";
import { loggedIn } from "../components/Functions";
import { FormErrors } from "./FormErrors";
import { ScaleLoader } from "react-spinners";

const isEqual = (value, props, components) => {
  const bothUsed =
    components.password[0].isUsed && components.password2[0].isUsed;
  const bothChanged =
    components.password[0].isChanged && components.password2[0].isChanged;

  if (
    bothChanged &&
    bothUsed &&
    components.password[0].value !== components.password2[0].value
  ) {
    return (
      <span className="form-error is-visible">Salasanat eivät täsmää.</span>
    );
  }
};

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      userInfo: [],
      loggedIn: false,
      userName: "",
      userGroup: "",
      password: "",
      password2: "",
      formErrors: { userName: "", userGroup: "", password: "" },
      userNameValid: true,
      userGroupValid: true,
      password2Valid: true,
      formValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({ loggedIn: this.checkIfLoggedIn() }, () => {
      if (!this.state.loggedIn) {
        window.location.replace("/login");
      } else {
        this.fetchInfo();
      }
    });
  }

  componentWillReceiveProps() {
    this.setState({ loggedIn: this.checkIfLoggedIn() }, () => {
      if (this.state.loggedIn === false) {
        window.location.replace("/login");
      }
    });
  }

  checkIfLoggedIn() {
    return loggedIn();
  }

  fetchInfo = async () => {
    const data = await userInfo();
    this.setState({
      userInfo: data,
      userName: data.username,
      userGroup: data.userGroup,
      loading: false
    });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let userNameValid = this.state.userNameValid;
    let userGroupValid = this.state.userGroupValid;
    let password2Valid = this.state.password2Valid;

    switch (fieldName) {
      case "userName":
        const userRe = /^[a-zA-Z0-9_-]*$/;
        userNameValid = userRe.test(value);
        fieldValidationErrors.userName = userNameValid
          ? ""
          : "Vain kirjaimet, numerot, _ ja - ovat sallittuja";
        break;
      case "userGroup":
        const groupRe = /^[a-zA-Z0-9]*$/;
        userGroupValid = groupRe.test(value);
        fieldValidationErrors.userGroup = userGroupValid
          ? ""
          : "Epäkelpo ryhmätunnus";
        break;
      case "password2":
        password2Valid =
          this.state.password2 === this.state.password &&
          this.state.password !== "";
        fieldValidationErrors.password2 = password2Valid
          ? ""
          : "salasanat eivät täsmää";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        userNameValid: userNameValid,
        userGroupValid: userGroupValid,
        password2Valid: password2Valid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.userNameValid &&
        this.state.userGroupValid &&
        this.state.password2Valid
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.password2) {
      let payload = {
        id: this.state.userInfo.id,
        username: this.state.userName,
        firstName: this.state.userInfo.firstName,
        lastName: this.state.userInfo.lastName,
        passwordHash: this.state.password,
        userGroup: this.state.userGroup
      };
      updateProfile(payload);
    }
  }

  errorClass(error) {
    if (error != null) return error.length === 0 ? "" : "has-error";
  }

  render() {
    return (
      <div>
        <h6>Oma profiili</h6>
        {this.state.userInfo !== [] ? (
          <div>
            <form
              ref={c => {
                this.form = c;
              }}
              method="POST"
              onSubmit={this.handleSubmit}
            >
              <label htmlFor="firstName">Etunimi: </label>
              <input
                type="text"
                className="form-control col-md-12"
                readOnly
                name="firstName"
                value={this.state.userInfo.firstName}
              />
              <br />
              <label htmlFor="lastName">Sukunimi: </label>
              <input
                type="text"
                className="form-control col-md-12"
                readOnly
                name="lastName"
                value={this.state.userInfo.lastName}
              />
              <br />
              <label htmlFor="userName">Käyttäjätunnus: </label>
              <input
                type="text"
                className={`form-control col-md-12 ${this.errorClass(
                  this.state.formErrors.userName
                )}`}
                onChange={this.handleChange}
                name="userName"
                // @TODO: default value
                // value={this.state.userInfo.username}
              />
              <br />
              <label htmlFor="userGroup">Ryhmätunnus: </label>
              <input
                type="text"
                className="form-control col-md-12"
                onChange={this.handleChange}
                name="userGroup"
                // @TODO: default value
                // value={this.state.userInfo.userGroup}
              />
              <br />
              <br />
              <label htmlFor="password">Uusi salasana: </label>
              <input
                type="password"
                onChange={this.handleChange}
                className="form-control col-md-12"
                validations={[isEqual]}
                name="password"
              />
              <br />
              <label htmlFor="password2">Toista salasana: </label>
              <input
                type="password"
                className={`form-control col-md-12 ${this.errorClass(
                  this.state.formErrors.password2
                )}`}
                onChange={this.handleChange}
                name="password2"
              />
              <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              <br />
              <br />
              <button className="grid-2" type="reset">
                Peruuta
              </button>
              <button
                className="grid-2"
                disabled={!this.state.formValid}
                type="submit"
              >
                Tallenna
              </button>
              <br />
              <br />
            </form>
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
      </div>
    );
  }
}
