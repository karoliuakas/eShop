import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ThankYou from './screens/ThankYou';
function App() {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    }
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">KRL.LT</Link>
                    </div>
                    <div>
                        <Link to="/cart">Krepšelis{cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}</Link>
                        {
                            userInfo ? (
                                <div className="dropdown">
                                    <Link to="#">{userInfo.nick}<i className="fa fa-caret-down"></i></Link>
                                    <ul className="dropdown-content">
                                        <Link to="#signout" onClick={signoutHandler}>Atsijungti</Link>
                                    </ul>
                                </div>) :
                                (<Link to="/signin">Prisijungti</Link>)

                        }
                    </div>
                </header>
                <main>
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen}></Route>
                    <Route path="/signin" component={SigninScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                    <Route path="/shipping" component={ShippingAddressScreen} exact></Route>
                    <Route path="/payment" component={PaymentScreen} exact></Route>
                    <Route path="/placeorder" component={PlaceOrderScreen} exact></Route>
                    <Route path="/new" component={ThankYou} exact></Route>

                </main>

                <footer className="row center">© Karolis Žilevičius 2020</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
