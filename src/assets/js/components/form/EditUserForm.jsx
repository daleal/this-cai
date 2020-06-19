import React, { Component } from 'react';
import DumbInput from './components/DumbInput';
import {PHONE_NUMBER_REGEX, EMAIL_REGEX} from '../../constants';

import { getUser } from '../../services/requests';

export default class EditUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      },
      errors: {},
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.fetchEntity = this.fetchEntity.bind(this);

  }

  componentDidMount() {
    this.fetchEntity();
  }

  async fetchEntity() {
    const post = await getUser();
    this.setState({user: post})
  }

  changeHandler(event) {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user })
    console.log(this.state)
  }

  submitHandler(event) {
    let partialErrors = {};
    let failed = false;
    const { user } = this.state;
    if (!(PHONE_NUMBER_REGEX.test(user.phoneNumber))) {
      partialErrors.phoneNumber = "Formato incorrecto. Ejemplo: +56912345678";
      failed = true;
    }
    if (!(EMAIL_REGEX.test(user.email))) {
      // console.log("BAD EMAIL", EMAIL_REGEX)
      partialErrors.email = 'Dirección de Correo inválida';
      failed = true;
    }
    for (let input in user) {
      let value = user[input];
      if (!value) {
        partialErrors[input] = "¡Debes llenar este campo!";
        failed = true
      }
    }

    this.setState({
      errors: partialErrors
      });
    if (failed){
      event.preventDefault();
    }

  }



  render() {
    const {
      errors,
      user: {email, firstName, lastName, phoneNumber, password}
    } = this.state;
    return (
        <div>
        <h1>Editar Usuario</h1>
        <form method="post" onSubmit={this.submitHandler} encType="multipart/form-data">
        <input type="hidden" name="_method" value="patch"/>
        <DumbInput
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.changeHandler}
          error={errors.email}
          required
          className = "input"
        />

        <DumbInput
          type="text"
          name="firstName"
          placeholder="Primer Nombre"
          value={firstName}
          onChange={this.changeHandler}
          error={errors.firstName}
          required
          className = "input"
        />

        <DumbInput
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={lastName}
          onChange={this.changeHandler}
          error={errors.lastName}
          required
          className = "input"
        />

        <DumbInput
          type="text"
          name="phoneNumber"
          placeholder="N° de telefono ej: +56984554785"
          value={phoneNumber}
          onChange={this.changeHandler}
          error={errors.phoneNumber}
          required
          className = "input"
        />


        <div className ="field">
          <label htmlFor="img">Imagen</label>
          <input type="file" name="img"/>
        </div>

        <input type="submit" value="Submit"/>
        </form>
        </div>
      )
    }
  }
