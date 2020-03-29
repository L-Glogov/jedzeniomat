import React, { Component, Fragment } from 'react';
import styles from './Layout.module.css';

const Layout = ( props ) => {
  
  return (
    <Fragment>
      <h1 className={styles.head}>Jedzeniomat</h1>
      <nav>
        <ul>
          <li><button onClick={props.layoutToggle.bind(this, "menu")}>Jadłospis</button></li>
          <li><button onClick={props.layoutToggle.bind(this, "recipes")}>Przepisy</button></li>
          <li><button onClick={props.layoutToggle.bind(this, "fridge")}>Lodówka</button></li>
        </ul>
      </nav>
      <main>{props.children}</main>
    </Fragment>
  )
  
}

export default Layout;