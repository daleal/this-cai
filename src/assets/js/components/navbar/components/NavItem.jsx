import React from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';

import formsService from '../../../services/forms';

function NavItem(props) {
  const {
    anchorId, textId, method, formId, notifications, svg, href, linkText,
  } = props;
  return (
    <li className="nav-item">
      <a
        id={anchorId}
        onClick={
          method !== 'get'
            ? formsService.formRequesterGenerator(formId)
            : null
        }
        href={href}
        className="nav-link"
      >
        <div className="nav-link-image">
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: svg }} />
          {!!notifications && (
            <span className="nav-link-notification">{notifications}</span>
          )}
        </div>
        <span id={textId} className="link-text">{linkText}</span>
      </a>
      {method !== 'get' && (
        <form id={formId} action={href} method="post" className="is-hidden">
          <input type="hidden" name="_method" value={method} />
        </form>
      )}
    </li>
  );
}

NavItem.propTypes = {
  anchorId: PropTypes.string,
  textId: PropTypes.string,
  method: PropTypes.string,
  formId: PropTypes.string,
  notifications: PropTypes.number,
  svg: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  anchorId: '',
  formId: '',
  textId: '',
  method: 'get',
  notifications: 0,
};

export default hot(module)(NavItem);
