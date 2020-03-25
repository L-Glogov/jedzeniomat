import React, { Component, Fragment } from 'react';
import styles from './Layout.module.css';

class Layout extends Component {
  
  
  render() {
    return (
      <Fragment>
        <h1 className={styles.head}>Jedzeniomat</h1>
        <main>{this.props.children}</main>
      </Fragment>
      
    )
  }
}

export default Layout;