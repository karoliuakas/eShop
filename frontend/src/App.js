import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <div className="grid-container">
    <header className="header">
        <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
            <a href="indexas.html">KRL.LT</a>
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
            <ul className="products">
                <li>
                    <div className="product">
                    <img className="product-image"
                            src="/img/saldainiu-medis.jpg"
                            alt="Medis"/>
                        <div className="product-name">
                            <a href="product.html">Saldainių medis su
                                miglėmis </a>
                        </div>
                        <div className="product-type">Saldainių medis</div>
                        <div className="product-price">30€</div>
                        <div className="product-rating">5 Žvaigždutės(1
                            atsiliepimas)</div>
                    </div>
                </li>
                <li>
                    <div className="product">
                        <img className="product-image"
                            src="/img/saldainiu-medis.jpg"
                            alt="Medis"/>
                        <div className="product-name">
                            <a href="product.html">Saldainių medis su
                                miglėmis </a>
                        </div>
                        <div className="product-type">Saldainių medis</div>
                        <div className="product-price">30€</div>
                        <div className="product-rating">5 Žvaigždutės(1
                            atsiliepimas)</div>
                    </div>
                </li>
                <li>
                    <div className="product">
                        <img className="product-image"
                            src="/img/saldainiu-medis.jpg"
                            alt="Medis"/>
                        <div className="product-name">
                            <a href="product.html">Saldainių medis su
                                miglėmis </a>
                        </div>
                        <div className="product-type">Saldainių medis</div>
                        <div className="product-price">30€</div>
                        <div className="product-rating">5 Žvaigždutės(1
                            atsiliepimas)</div>
                    </div>
                </li>
                <li>
                    <div className="product">
                        <img className="product-image"
                            src="/img/saldainiu-medis.jpg"
                            alt="Medis"/>
                        <div className="product-name">
                            <a href="product.html">Saldainių medis su
                                miglėmis </a>
                        </div>
                        <div className="product-type">Saldainių medis</div>
                        <div className="product-price">30€</div>
                        <div className="product-rating">5 Žvaigždutės(1
                            atsiliepimas)</div>
                    </div>
                </li>
                <li>
                    <div className="product">
                        <img className="product-image"
                            src="/img/saldainiu-medis.jpg"
                            alt="Medis"/>
                        <div className="product-name">
                            <a href="product.html">Saldainių medis su
                                miglėmis </a>
                        </div>
                        <div className="product-type">Saldainių medis</div>
                        <div className="product-price">30€</div>
                        <div className="product-rating">5 Žvaigždutės(1
                            atsiliepimas)</div>
                    </div>
                </li>
                <li>
                    <div className="product">
                        <img className="product-image"
                            src="/img/saldainiu-medis.jpg"
                            alt="Medis"/>
                        <div className="product-name">
                            <a href="product.html">Saldainių medis su
                                miglėmis </a>
                        </div>
                        <div className="product-type">Saldainių medis</div>
                        <div className="product-price">30€</div>
                        <div className="product-rating">5 Žvaigždutės(1
                            atsiliepimas)</div>
                    </div>
                </li>
            </ul>
        </div>
    </main>
    <footer className="footer">
        Karolis Žilevičius 2020
    </footer>
</div>
  );
}

export default App;
