import React, { Component } from 'react';
import DumbInput from './components/DumbInput';
import DumbTextArea from './components/DumbTextArea';
import DumbSelect from './components/DumbSelect';

import { getEntity, getOrganizationList } from '../../services/requests';

export default class InventoryItemForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      lostItem: {
      description: '',
      locationFound: '',
      organizationId: '',
      userOrganizations: [],
    },
      errors: {},
    };

    this.state = this.initialState;
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.fetchEntity = this.fetchEntity.bind(this);
    this.fetchOrganizationList = this.fetchOrganizationList.bind(this);

  }

  componentDidMount() {
    const pathArray = window.location.pathname.split("/");
    const [entity, id, action] = pathArray.slice(pathArray.length - 3);
    // console.log("!", pathArray)
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
    const { lostItem } = this.state;
    lostItem.userOrganizations = userOrganizations;
    lostItem.organizationId = lostItem.userOrganizations.length ? lostItem.userOrganizations[0] : null;

    this.setState({lostItem: lostItem});
  }

  async fetchEntity(entity, id) {
    const post = await getEntity(entity, id);
    post.organizationId = post.userOrganizations.length ? post.userOrganizations[0] : null;
    this.setState({lostItem: post})
    // console.log(post)
  }

  changeHandler(event) {
    const { lostItem } = this.state;
    lostItem[event.target.name] = event.target.value;
    this.setState({ lostItem })
  }

  submitHandler(event) {
    const lostItem = this.state.lostItem;
    let partialErrors = {};
    let failed = false;

    for (let input in this.initialState.lostItem) {
      let value = lostItem[input];
      if (!value && input !== "img" && input !== "organizationId" ) {
        // console.log(input)
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
      lostItem: {description, locationFound, userOrganizations, organizationId},
      edit,
    } = this.state;
    return (
      <div>
      {edit ? (<h1> Editar Objeto </h1>): (<h1> Nuevo Objeto  </h1>)}
      <form method= "post" onSubmit={this.submitHandler} encType="multipart/form-data">

      {edit? (<input type="hidden" name="_method" value="patch"/>) : null}

        <DumbTextArea
          type="text"
          name="description"
          placeholder="Descripción"
          value={description}
          onChange={this.changeHandler}
          error={errors.description}
          className = "textarea"
          />

        <DumbTextArea
          type="text"
          name="locationFound"
          placeholder="Lugar donde se encontró"
          value={locationFound}
          onChange={this.changeHandler}
          error={errors.locationFound}
          className = "textarea"
          />

          <div class="field">
            <label for="img">Imagen</label>
            <input type="file" name="img"/>
          </div>

        <input type="submit" value="Submit"/>
      </form>
      </div>
      )
    }
  }

// export default hot(module)(FormTemplate);
