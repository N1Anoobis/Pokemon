import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './MainLayout.module.scss';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};