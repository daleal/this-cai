import React, { Component } from 'react';
import DumbInput from './components/DumbInput';
import DumbTextArea from './components/DumbTextArea';
import DumbSelect from './components/DumbSelect';

import { getEntity, getOrganizationList } from '../../services/requests';

export default class ArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {
        title: '',
        content: '',
        organizationId: '',
        userOrganizations: [],
      },
      errors: {},
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.fetchEntity = this.fetchEntity.bind(this);
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
    const { article } = this.state;
    article.userOrganizations = userOrganizations;
    article.organizationId = article.userOrganizations.length ? article.userOrganizations[0] : null;

    this.setState({ article });
  }

  async fetchEntity(entity, id) {
    const post = await getEntity(entity, id);
    post.organizationId = post.userOrganizations.length ? post.userOrganizations[0] : null;
    this.setState({ article: post });
  }

  changeHandler(event) {
    const { article } = this.state;
    article[event.target.name] = event.target.value;
    this.setState({ article });
  }

  blurHandler(event) {
    const partialErrors = this.state.errors;
    const { name } = event.target;
    const { value } = event.target;
    partialErrors[name] = value ? '' : '¡Debes llenar este campo!';
    this.setState({ errors: partialErrors });
  }

  submitHandler(event) {
    const { article } = this.state;
    const partialErrors = {};
    let failed = false;

    for (const input in article) {
      const value = article[input];
      if (!value && input !== 'img') {
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
      article: {
        title, content, userOrganizations, organizationId,
      },
      edit,
    } = this.state;
    return (
      <div>
        <h1 className="title is-1 center">
          {edit ? 'Editar Noticia' : 'Nuevo Noticia'}
        </h1>
        <form method="post" onSubmit={this.submitHandler} encType="multipart/form-data">

          {edit ? (<input type="hidden" name="_method" value="patch" />) : null}

          <DumbInput
            type="text"
            name="title"
            placeholder="Título"
            value={title}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.title}
            required
            className="input"
          />


          <DumbTextArea
            type="text"
            name="content"
            placeholder="Contenido"
            value={content}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            error={errors.content}
            className="textarea"
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
