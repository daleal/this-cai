import React, { Component } from 'react';
import DumbInput from './components/DumbInput';
import DumbTextArea from './components/DumbTextArea';
import DumbSelect from './components/DumbSelect';

import { getEntity, getOrganizationList } from '../../services/requests';

export default class OrganizationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organization: {
      name: '',
      description: '',
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
    const { organization } = this.state;
    organization.userOrganizations = userOrganizations;
    organization.organizationId = organization.userOrganizations.length ? organization.userOrganizations[0] : null;

    this.setState({organization: organization});
  }

  async fetchEntity(entity, id) {
    const post = await getEntity(entity, id);
    post.organizationId = post.userOrganizations.length ? post.userOrganizations[0] : null;
    this.setState({organization: post})
  }

  changeHandler(event) {
    const { organization } = this.state;
    organization[event.target.name] = event.target.value;
    this.setState({ organization })
  }

  submitHandler(event) {

    const organization = this.state.organization;
    let partialErrors = {};
    let failed = false;

    for (let input in organization) {
      let value = organization[input];
      if (!value && input !== "img" && input !== "organizationId") {
        // console.log(input, value)
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
      organization: {name, description, userOrganizations, organizationId},
      edit,
    } = this.state;
    return (
      <div>
      {edit ? (<h1> Editar Organización </h1>): (<h1> Nueva Organización </h1>)}
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

        <DumbTextArea
          type="text"
          name="description"
          placeholder="Descripción"
          value={description}
          onChange={this.changeHandler}
          error={errors.description}
          className = "textarea"
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
