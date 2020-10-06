import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { useSelector } from 'react-redux';
function App() {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    return ( 
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">KRL.LT</Link>
                    </div>
                    <div>
    <Link to="cart/">Krepšelis{cartItems.length > 0 && (
        <span className="badge">{cartItems.length}</span>
    )}</Link>
                        <Link to="signin/">Prisijungti</Link>
                    </div>
                </header>
                <main>
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen}></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                   
                </main>
                <footer className="row center">© Karolis Žilevičius 2020</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
