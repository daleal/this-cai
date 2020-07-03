import React, { Component } from 'react';
import DumbInput from './components/DumbInput';
import { PHONE_NUMBER_REGEX, EMAIL_REGEX } from '../../constants';

export default class SignInForm extends Component {
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
    this.blurHandler = this.blurHandler.bind(this);
  }


  changeHandler(event) {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  blurHandler(event) {
    const partialErrors = this.state.errors;
    const { name } = event.target;
    const { value } = event.target;
    partialErrors[name] = value ? '' : '¡Debes llenar este campo!';

    const { user } = this.state;
    if (name === 'phoneNumber') {
      if (!(PHONE_NUMBER_REGEX.test(user.phoneNumber))) {
        partialErrors.phoneNumber = 'Formato incorrecto. Ejemplo: +56912345678';
      }
    }

    if (name === 'email') {
      if (!(EMAIL_REGEX.test(user.email))) {
        partialErrors.email = 'Dirección de Correo inválida';
      }
    }

    this.setState({ errors: partialErrors });
  }

  submitHandler(event) {
    const partialErrors = {};
    let failed = false;
    const { user } = this.state;
    if (!(PHONE_NUMBER_REGEX.test(user.phoneNumber))) {
      partialErrors.phoneNumber = 'Formato incorrecto. Ejemplo: +56912345678';
      failed = true;
    }
    if (!(EMAIL_REGEX.test(user.email))) {
      partialErrors.email = 'Dirección de Correo inválida';
      failed = true;
    }
    for (const input in user) {
      const value = user[input];
      if (!value) {
        partialErrors[input] = '¡Debes llenar este campo!';
        failed = true;
      }
    }

    this.setState({
      errors: partialErrors,
    });
    if (failed) {
      event.preventDefault();
    }
  }


  render() {
    const {
      errors,
      user: {
        email, firstName, lastName, phoneNumber, password,
      },
    } = this.state;
    return (
      <div>
        <h1 className="title is-1 center">Nuevo Usuario</h1>
        <form method="post" onSubmit={this.submitHandler} encType="multipart/form-data">
          <DumbInput
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.email}
            required
            className="input"
          />

          <DumbInput
            type="text"
            name="firstName"
            placeholder="Primer Nombre"
            value={firstName}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.firstName}
            required
            className="input"
          />

          <DumbInput
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={lastName}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.lastName}
            required
            className="input"
          />

          <DumbInput
            type="text"
            name="phoneNumber"
            placeholder="N° de telefono ej: +56984554785"
            value={phoneNumber}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.phoneNumber}
            required
            className="input"
          />

          <DumbInput
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.password}
            required
            className="input"
          />

          <div className="form-extra-content">
            <label className="form-image-text" htmlFor="img">Imagen</label>
            <input type="file" name="img" />
          </div>

          <input className="form-to-text button form-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
