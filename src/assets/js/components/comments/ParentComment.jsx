import React, { Component } from 'react';
import Comment from './components/Comment';
import DumbTextArea from '../form/components/DumbTextArea';

import { getComments, postComment } from '../../services/requests';

export default class ParentComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      inputContent: '',
      eventId: null,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    const pathArray = window.location.pathname.split("/");
    const [entity, eventId, action] = pathArray.slice(pathArray.length - 3);
    this.setState({ eventId });
    this.fetchComments(eventId);
  }

  async fetchComments(id) {
    const post = await getComments(id);
    this.setState({comments: post.comments});
  }

  async submitComment(comment) {
    const post = await postComment(comment, this.state.eventId);
  }

  changeHandler(event) {
    let { inputContent } = this.state;
    inputContent = event.target.value;
    this.setState({ inputContent });
  }

  submitHandler(event) {
    event.preventDefault();
    const comment = {
      content: this.state.inputContent
    }
    this.submitComment(comment)
    this.fetchComments(this.state.eventId)
    this.setState({inputContent: ''})
  }



  render() {
    const {
      comments,
      inputContent,
    } = this.state;
    return (
      <div>
        <h1> COMENTARIOS </h1>
        {(comments.map((c) =>
          <div className= "card is-round" >
            <div className = "card-content">
            <h4 className= "card-header"> {c.author}</h4>
            {c.content}
            </div>
          </div>
        ))}
        <form
        onSubmit={this.submitHandler}
        >
        <textarea
          type="text"
          id="content"
          name="content"
          placeholder="comentario"
          value={inputContent}
          onChange={this.changeHandler}
          readOnly= {false}
          />

          <input type="submit" value="Submit"/>
        </form>
      </div>
      )
    }
  }

// export default hot(module)(FormTemplate);
