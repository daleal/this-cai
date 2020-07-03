import React from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';


function DumbInput(props) {
  const {
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    onBlur,
  } = props;
  return (
    <>
      <div className={`card is-round input-card ${error ? 'error' : ''}`}>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form-input"
        />
      </div>
      {error && <p className="input-error-text">{ error }</p>}
    </>

  );
}

DumbInput.defaultProps = {
  type: 'text',
  className: '',
};
DumbInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,

};


export default hot(module)(DumbInput);
