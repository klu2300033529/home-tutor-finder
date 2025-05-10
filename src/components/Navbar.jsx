import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onOpenModal }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>My Website</div>

      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/contact" style={styles.link}>Contact Us</Link></li>
        <li><Link to="/posts" style={styles.link}>Post</Link></li>
        <li><Link to="/create-post" style={styles.link}>Create Post</Link></li>
        <li>
          <input type="text" placeholder="Search..." style={styles.search} />
        </li>
        <li>
          <button onClick={() => onOpenModal('login')} style={styles.button}>Login</button>
        </li>
        <li>
          <button onClick={() => onOpenModal('signup')} style={styles.button}>Signup</button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
  search: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default Navbar;
