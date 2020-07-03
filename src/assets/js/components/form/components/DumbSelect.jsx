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
    <>
      <div className={`card is-round input-card ${error ? 'error' : ''}`}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form-input"
        >
          {optionsArray.map((option) => (
            <option value={option.id}>
              {' '}
              {option.name}
              {' '}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="input-error-text">{ error }</p>}
    </>

  );
}

DumbSelect.defaultProps = {
  className: '',
};
DumbSelect.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  optionsArray: PropTypes.array,

};


export default hot(module)(DumbSelect);
