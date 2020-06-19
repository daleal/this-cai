import React, { Component } from 'react';
import DumbInput from './components/DumbInput';
import DumbTextArea from './components/DumbTextArea';
import DumbSelect from './components/DumbSelect';
import { getEntity, getOrganizationList } from '../../services/requests';
import {EVENT_CATEGORIES} from '../../constants';

const MAPPED_CATEGORIES = [];
EVENT_CATEGORIES.forEach((x) => {
  let dict = {id: x, name: x};
  MAPPED_CATEGORIES.push(dict);
})

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
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.fetchEntity = this.fetchEntity.bind(this);
    this.fetchOrganizationList = this.fetchOrganizationList.bind(this);

  }

  componentDidMount() {
    const pathArray = window.location.pathname.split("/");
    const [entity, id, action] = pathArray.slice(pathArray.length - 3);
    if (action === "edit") {
      this.setState({edit: true});
      this.fetchEntity(entity, id);
    }
    else {
      this.fetchOrganizationList();
    }
  }

  async fetchOrganizationList() {
    const { userOrganizations } = await getOrganizationList();
    const { event } = this.state;
    event.userOrganizations = userOrganizations;
    event.organizationId = event.userOrganizations.length ? event.userOrganizations[0] : null;

    this.setState({event: event});
  }

  async fetchEntity(entity, id) {
    const post = await getEntity(entity, id);
    post.organizationId = post.userOrganizations.length ? post.userOrganizations[0] : null;
    // console.log(post.dateAndTime)
    post.dateAndTime = post.dateAndTime.replace("Z","");
    this.setState({event: post})
    // console.log(post)
  }

  changeHandler(e) {
    const { event } = this.state;
    event[e.target.name] = e.target.value;
    this.setState({ event })
  }

  submitHandler(e) {
    // console.log(this.state)
    const event = this.state.event;
    let partialErrors = {};
    let failed = false;

    for (let input in event) {
      let value = event[input];
      if (!value && input !== "img") {
        partialErrors[input] = "¡Debes llenar este campo!";
        failed = true
      }
    }

    this.setState({
      errors: partialErrors
      });
    if (failed){
      e.preventDefault();
    }

  }



  render() {
    const {
      errors,
      event: {name, location, dateAndTime, category, userOrganizations, organizationId},
      edit,
      mapped,
    } = this.state;
    return (
      <div>
      {edit ? (<h1> Editar Evento </h1>): (<h1> Nuevo Evento </h1>)}
      <form method= "post" onSubmit={this.submitHandler} encType="multipart/form-data">

      {edit? (<input type="hidden" name="_method" value="patch"/>) : null}

        <DumbInput
          type="text"
          name="name"
          placeholder="Nombre"
          value={name}
          onChange={this.changeHandler}
          error={errors.name}
          required
          className = "input"
        />
        <DumbInput
          type="text"
          name="location"
          placeholder="Ubicación donde el evento tendrá lugar"
          value={location}
          onChange={this.changeHandler}
          error={errors.location}
          required
          className = "input"
        />

        <DumbInput
          type="datetime-local"
          name="dateAndTime"
          placeholder="Ubicación donde el evento tendrá lugar"
          value={dateAndTime}
          onChange={this.changeHandler}
          error={errors.dateAndTime}
          required
          className = "input"
        />

        <DumbSelect
          name="category"
          value={category}
          onChange={this.changeHandler}
          className="select"
          error={errors.category}
          optionsArray={MAPPED_CATEGORIES}
        />


        <DumbSelect
          name="organizationId"
          value={organizationId}
          onChange={this.changeHandler}
          className="select"
          error={errors.organizationId}
          optionsArray={userOrganizations}
        />
        <label htmlFor="img">Imagen</label>
        <input type="file" name="img" />

        <input type="submit" value="Submit"/>
      </form>
      </div>
      )
    }
  }

// export default hot(module)(FormTemplate);
