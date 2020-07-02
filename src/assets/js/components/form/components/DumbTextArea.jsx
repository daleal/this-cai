import React from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';


function DumbTextArea(props) {
  const {
    name,
    type,
    placeholder,
    onChange,
    value,
    error,
    onBlur,
  } = props;
  return (
    <>
      <div className={`card is-round input-card ${error ? 'error' : ''}`}>
        <textarea
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form-input textarea"
        />
      </div>
      {error && <p className="input-error-text">{ error }</p>}
    </>
  );
}

DumbTextArea.defaultProps = {
  type: 'text',
  placeholder: '',
  error: false,
};
DumbTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,

};


export default hot(module)(DumbTextArea);
