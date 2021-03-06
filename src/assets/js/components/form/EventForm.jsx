import React, { Component } from 'react';
import DumbInput from './components/DumbInput';
import DumbTextArea from './components/DumbTextArea';
import DumbSelect from './components/DumbSelect';
import { getEntity, getOrganizationList, getWeather } from '../../services/requests';
import { EVENT_CATEGORIES } from '../../constants';

const MAPPED_CATEGORIES = [];
EVENT_CATEGORIES.forEach((x) => {
  const dict = { id: x, name: x };
  MAPPED_CATEGORIES.push(dict);
});

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    const mapped = [];


    this.state = {
      event: {
        name: '',
        location: '',
        dateAndTime: '',
        category: '',
        organizationId: '',
        userOrganizations: [],
      },
      errors: {},
      loading: false,
      weather: { error: true },
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.fetchEntity = this.fetchEntity.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.fetchOrganizationList = this.fetchOrganizationList.bind(this);
  }

  componentDidMount() {
    const pathArray = window.location.pathname.split('/');
    const [entity, id, action] = pathArray.slice(pathArray.length - 3);
    if (action === 'edit') {
      this.setState({ edit: true });
      this.fetchEntity(entity, id);
    } else {
      this.fetchOrganizationList();
    }
  }

  async fetchOrganizationList() {
    const { userOrganizations } = await getOrganizationList();
    const { event } = this.state;
    event.userOrganizations = userOrganizations;
    event.organizationId = event.userOrganizations.length ? event.userOrganizations[0] : null;

    this.setState({ event });
  }

  async fetchEntity(entity, id) {
    const post = await getEntity(entity, id);
    post.organizationId = post.userOrganizations.length ? post.userOrganizations[0] : null;
    post.dateAndTime = post.dateAndTime.replace('Z', '');
    this.setState({ event: post });
  }

  async fetchWeather(event) {
    const date = event.target.value;
    if (!date) return;
    this.setState({ loading: true });
    const response = await getWeather(date);
    this.setState({
      loading: false,
      weather: response,
    });
  }

  changeHandler(e) {
    const { event } = this.state;
    event[e.target.name] = e.target.value;
    this.setState({ event });
  }

  blurHandler(event) {
    const partialErrors = this.state.errors;
    const { name } = event.target;
    const { value } = event.target;
    partialErrors[name] = value ? '' : '¡Debes llenar este campo!';
    this.setState({ errors: partialErrors });
    if (name === "dateAndTime") {
      this.fetchWeather(event);
    }
  }

  submitHandler(e) {
    const { event } = this.state;
    const partialErrors = {};
    let failed = false;

    for (const input in event) {
      const value = event[input];
      if (!value && input !== 'img') {
        partialErrors[input] = '¡Debes llenar este campo!';
        failed = true;
      }
    }

    this.setState({
      errors: partialErrors,
    });
    if (failed) {
      e.preventDefault();
    }
  }


  render() {
    const {
      errors,
      event: {
        name, location, dateAndTime, category, userOrganizations, organizationId,
      },
      edit,
      weather,
    } = this.state;
    return (
      <div>
        <h1 className="title is-1 center">
          {edit ? 'Editar Evento' : 'Nuevo Evento'}
        </h1>
        <form method="post" onSubmit={this.submitHandler} encType="multipart/form-data">

          {edit ? (<input type="hidden" name="_method" value="patch" />) : null}

          <DumbInput
            type="text"
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.name}
            required
            className="input"
          />
          <DumbInput
            type="text"
            name="location"
            placeholder="Ubicación donde el evento tendrá lugar"
            value={location}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.location}
            required
            className="input"
          />

          <DumbInput
            type="datetime-local"
            name="dateAndTime"
            placeholder=""
            value={dateAndTime}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.dateAndTime}
            required
            className="input"
          />
          <div className ="form-extra-content">
            {weather.error ? null : <h3 className="subtitle"> Pronóstico del clima: </h3>}
            {weather.error ? (<p className= "subtitle is-6"> No hay información sobre el clima </p>):
            (<h4 className="subtitle is-6"> Max: {weather.max} °C  Min: {weather.min}°C </h4>)}
            {weather.error ? null : (<img src= {weather.condition.icon}/> )}
          </div>
          <DumbSelect
            name="category"
            value={category}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            className="select"
            error={errors.category}
            optionsArray={MAPPED_CATEGORIES}
          />


          <DumbSelect
            name="organizationId"
            value={organizationId}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            className="select"
            error={errors.organizationId}
            optionsArray={userOrganizations}
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

// export default hot(module)(FormTemplate);
