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
  } = props;
  return (
    <React.Fragment>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      style= {error && {border: "solid 3px red"}}
      />
    { error && <p>{ error }</p>}
    </React.Fragment>

  );
}

DumbInput.defaultProps = {
  type: "text",
  className: "",
}
DumbInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,

};


export default hot(module)(DumbInput);
