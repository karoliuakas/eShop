import React from 'react';
import data from './data';
import {BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';



function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>
            &#9776;
            </button>
            <Link to="/">KRL.LT</Link>
        </div>
        <div className="header-links">
          <a href="cart.html">Krepšelis</a>
          <a href="signin.html">Prisijungti</a>
        </div>
      </header>
      <aside className="sidebar">
        <h3>Kategorijos</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        <ul>
          <li>
            <a href="indexas.html">Saldainių medžiai</a>
          </li>
          <li>
            <a href="indexas.html">Siūvenyrai</a>
          </li>
          <li>
            <a href="indexas.html">Kita</a>
          </li>
        </ul>
      </aside>
      <main className="main">
        <div className="content">
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
        </div>
      </main>
      <footer className="footer">
        Karolis Žilevičius 2020
    </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
