import React, { Component } from 'react';
import DumbInput from './components/DumbInput';
import DumbTextArea from './components/DumbTextArea';
import DumbSelect from './components/DumbSelect';

import { getEntity, getOrganizationList } from '../../services/requests';

export default class InventoryItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventoryItem: {
      name: '',
      description: '',
      maxStock: 1,
      currentStock: 1,
      maxReservations: 1,
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
    const { inventoryItem } = this.state;
    inventoryItem.userOrganizations = userOrganizations;
    inventoryItem.organizationId = inventoryItem.userOrganizations.length ? inventoryItem.userOrganizations[0] : null;

    this.setState({inventoryItem: inventoryItem});
  }

  async fetchEntity(entity, id) {
    const post = await getEntity(entity, id);
    post.organizationId = post.userOrganizations.length ? post.userOrganizations[0] : null;
    this.setState({inventoryItem: post})
    // console.log(post)
  }

  changeHandler(event) {
    const { inventoryItem } = this.state;
    inventoryItem[event.target.name] = event.target.value;
    this.setState({ inventoryItem })
  }

  submitHandler(event) {
    const inventoryItem = this.state.inventoryItem;
    let partialErrors = {};
    let failed = false;

    for (let input in inventoryItem) {
      let value = inventoryItem[input];
      if (!value && input !== "img" && input !== "organizationId") {
        partialErrors[input] = "¡Debes llenar este campo!";
        failed = true
      }
    }
    if (inventoryItem.maxStock < 0 || inventoryItem.currentStock < 0 || inventoryItem.maxStock < inventoryItem.currentStock) {
      partialErrors.maxStock = partialErrors.currentStock = "Valores de Stock inválidos";
      failed = true;
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
      inventoryItem: {name, description, maxStock, currentStock, maxReservations, userOrganizations, organizationId},
      edit,
    } = this.state;
    return (
      <div>
      {edit ? (<h1> Editar Objeto </h1>): (<h1> Nuevo Objeto  </h1>)}
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

          <h3> Stock Máximo </h3>
          <DumbInput
            type="number"
            name="maxStock"
            placeholder="Unidades Existentes"
            value={maxStock}
            onChange={this.changeHandler}
            error={errors.maxStock}
            required
            className = "input"
          />

          <h3> Stock Actual </h3>
          <DumbInput
            type="number"
            name="currentStock"
            placeholder="Unidades Disponibles"
            value={currentStock}
            onChange={this.changeHandler}
            error={errors.currentStock}
            required
            className = "input"
          />

          <h3> Máximo de reservas por persona </h3>
          <DumbInput
            type="number"
            name="maxReservations"
            placeholder="Máximo de reservas"
            value={maxReservations}
            onChange={this.changeHandler}
            error={errors.maxReservations}
            required
            className = "input"
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
