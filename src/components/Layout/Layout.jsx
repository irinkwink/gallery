import React from 'react';
import style from './Layout.module.css';
import PropTypes from 'prop-types';

export const Layout = ({children}) => {
  console.log();
  return (
    <div className={style.container}>
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};
