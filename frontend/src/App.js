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
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import userEditScreen from './screens/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';

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
                        <Link className="brand" to="/">SALDI-DOVANA.LT</Link>
                    </div>
                    <div>
                        <Route render={({history})=> <SearchBox history={history}></SearchBox>}></Route>
                    </div>
                    <div>
                        <Link to="/cart">Krepšelis{cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}</Link>
                         {userInfo && userInfo.admin && (
                            <div className="dropdown">
                                <Link to="#admin">Administruoti{' '} <i className="fa fa-caret-down"></i></Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/productlist">Produktai</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Užsakymai</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Naudotojai</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {
                            userInfo ? (
                                <div className="dropdown">
                                    <Link to="#">{userInfo.nick}<i className="fa fa-caret-down"></i></Link>
                                    <ul className="dropdown-content">
                                        <li>
                                              <Link to="/profile">Profilis</Link>
                                        </li>
                                        <li>
                                              <Link to="/orderhistory">Užsakymai</Link>
                                        </li>
                                        <li>
                                              <Link to="#signout" onClick={signoutHandler}>Atsijungti</Link>
                                        </li>
                                      
                                    </ul>
                                </div>) :
                                (<Link to="/signin">Prisijungti</Link>)

                        }
                       
                    </div>
                </header>
                <main>
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen} exact></Route>
                    <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
                    <Route path="/signin" component={SigninScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                    <Route path="/shipping" component={ShippingAddressScreen}></Route>
                    <Route path="/payment" component={PaymentScreen}></Route>
                    <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
                    <Route path="/order/:id" component={OrderScreen} ></Route>
                    <Route path="/orderhistory" component={OrderHistoryScreen} ></Route>
                    <Route path="/search/name/:name?" component={SearchScreen} exact ></Route>
                    <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
                    <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
                    <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
                    <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
                    <AdminRoute path="/user/:id/edit" component={userEditScreen}></AdminRoute>

                </main>

                <footer className="row center">© Karolis Žilevičius 2020</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
