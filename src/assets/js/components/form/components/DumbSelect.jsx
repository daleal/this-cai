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
  } = props;
  return (
    <React.Fragment>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      style= {error && {border: "solid 3px red"}}
      >
      {optionsArray.map(option => <option value={option.id}> {option.name} </option>)}
    </select>
    { error && <p>{ error }</p>}
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
  optionsArray: PropTypes.array,

};


export default hot(module)(DumbSelect);
