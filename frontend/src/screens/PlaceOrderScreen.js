import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions.js';
import CheckoutSteps from '../components/Checkout.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import { ORDER_CREATE_RESET } from '../constants/orderConstants.js';

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
 const orderCreate = useSelector((state) => state.orderCreate);
 const {loading, success, error, order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.taxPrice = toPrice(0.21 * cart.itemsPrice);
    cart.itemsPriceWihoutTax = cart.itemsPrice - cart.taxPrice;
    cart.shippingPrice = cart.itemsPrice > 30 ? toPrice(0) : toPrice(3);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () =>{
        dispatch(createOrder({...cart, orderItems: cart.cartItems}));
    };
    useEffect(()=>{
if(success){
    props.history.push(`/order/${order._id}`);
    dispatch({type: ORDER_CREATE_RESET});
}
    }, [dispatch, order, props.history,success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Siuntimas</h2>
                                <p>
                                    <strong>Vardas:</strong>{cart.shippingAddress.fullName} <br />
                                    <strong>Adresas:</strong>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postCode}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Apmokėjimas</h2>
                                <p>
                                    <strong>Apmokėjimo būdas:</strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Užsakymo prekės</h2>
                                <ul>
                                    {
                                        cart.cartItems.map((item) => (
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img src={item.image} alt={item.name} className="small">
                                                        </img>
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>

                                                    <div>
                                                        {item.qty} x
                                                        {item.price} € = {item.qty * item.price}€
                                                      </div>

                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>
                                    Užsakymo informacija
                                                </h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Prekės + PVM 21%</div>
                                <div>{cart.itemsPriceWihoutTax.toFixed(2)} + {cart.taxPrice.toFixed(2)}€</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Siuntimas</div>
                                    <div>{cart.shippingPrice.toFixed(2)}€</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Bendra suma</strong></div>
                                    <div>{cart.totalPrice.toFixed(2)}€</div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length ===0}>
                                    Pateikti užsakymą
                                </button>
                            </li>
                            {
                                loading && <LoadingBox></LoadingBox>
                            }
                            {
                                error&&<MessageBox variant="danger">{error}</MessageBox>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
