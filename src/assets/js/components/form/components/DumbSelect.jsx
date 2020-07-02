import React from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';


function DumbSelect(props) {
  const {
    name,
    onChange,
    className,
    value,
    error,
    optionsArray,
    onBlur,
  } = props;
  return (
    <React.Fragment>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={error ? "form-input-error" : "form-input"}
      >
      {optionsArray.map(option => <option value={option.id}> {option.name} </option>)}
    </select>
    { error && <p className= "error-text">{ error }</p>}
    </React.Fragment>

  );
}

DumbSelect.defaultProps = {
  className: "",
}
DumbSelect.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  optionsArray: PropTypes.array,

};


export default hot(module)(DumbSelect);
