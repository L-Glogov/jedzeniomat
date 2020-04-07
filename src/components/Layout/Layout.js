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
  
  const activeMenuBtn = (props.display === "menu") ? styles.navSideActiveBtn : styles.navSidePassiveBtn;
  const activeRecBtn = (props.display === "recipes") ? styles.navSideActiveBtn : styles.navSidePassiveBtn;
  const activeFridgeBtn = (props.display === "fridge") ? styles.navSideActiveBtn : styles.navSidePassiveBtn;
  const navStylesClass = (props.display === "home") ? styles.navButton : styles.navSide;

  return (
    <div  style={backStyle}>
      <img src={logo} alt="Jedzeniomat - logo" className={styles.logo} onClick={props.layoutDisplay.bind(this, "home")}/>
      <nav className={navStylesClass}>
        <ul>
          <li><button onClick={props.layoutDisplay.bind(this, "menu")} className={activeMenuBtn}>Jadłospis</button></li>
          <li><button onClick={props.layoutDisplay.bind(this, "recipes")} className={activeRecBtn}>Przepisy</button></li>
          <li><button onClick={props.layoutDisplay.bind(this, "fridge")} className={activeFridgeBtn}>Lodówka</button></li>
        </ul>
      </nav>
      {props.children}
      <footer className={styles.copy}>
        <p>&copy; {new Date().getFullYear()} L-Glogov, No Rights Reserved</p>
      </footer>
    </div>
  )
  
}

export default Layout;