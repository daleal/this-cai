import React, { Component } from 'react';
import DumbInput from './components/DumbInput';
import DumbTextArea from './components/DumbTextArea';
import DumbSelect from './components/DumbSelect';

import { getEntity, getOrganizationList } from '../../services/requests';

export default class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: {
      name: '',
      contactInfo: '',
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
    const { project } = this.state;
    project.userOrganizations = userOrganizations;
    project.organizationId = project.userOrganizations.length ? project.userOrganizations[0] : null;

    this.setState({project: project});
  }

  async fetchEntity(entity, id) {
    const post = await getEntity(entity, id);
    post.organizationId = post.userOrganizations.length ? post.userOrganizations[0] : null;
    this.setState({project: post})
    // console.log(post)
  }

  changeHandler(event) {
    const { project } = this.state;
    project[event.target.name] = event.target.value;
    this.setState({ project })
  }

  submitHandler(event) {
    // console.log(this.state)
    const project = this.state.project;
    let partialErrors = {};
    let failed = false;

    for (let input in project) {
      let value = project[input];
      if (!value && input !== "img") {
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
      project: {name,contactInfo, description, userOrganizations, organizationId},
      edit,
    } = this.state;
    return (
      <div>
      {edit ? (<h1> Editar Proyecto </h1>): (<h1> Nuevo Proyecto </h1>)}
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
          name="contactInfo"
          placeholder="Infor de contacto"
          value={contactInfo}
          onChange={this.changeHandler}
          error={errors.contactInfo}
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
