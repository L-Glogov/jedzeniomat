import React from 'react';
import styles from './Layout.module.css';
import logo from '../../assets/logo.png';
import background from '../../assets/background.jpg';

const Layout = ( props ) => {

  const backStyle = {
    minWidth: "100vw",
    minHeight: "100vh",
    backgroundImage: "url(" + background + ")",
    position: "fixed",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPositiomn: "center"

  }

  return (
    <div  style={backStyle}>
      <img src={logo} alt="Jedzeniomat - logo" className={styles.logo} />
      <nav className={styles.navButton}>
        <ul>
          <li><button onClick={props.layoutDisplay.bind(this, "menu")}>Jadłospis</button></li>
          <li><button onClick={props.layoutDisplay.bind(this, "recipes")}>Przepisy</button></li>
          <li><button onClick={props.layoutDisplay.bind(this, "fridge")}>Lodówka</button></li>
        </ul>
      </nav>
      <main>{props.children}</main>
      <footer className={styles.copy}>
        <p>&copy; {new Date().getFullYear()} L-Glogov, No Rights Reserved</p>
      </footer>
    </div>
  )
  
}

export default Layout;