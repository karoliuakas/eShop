import React, { useState } from 'react';
import CheckoutSteps from '../components/Checkout.js';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import '../styles/shippingAddress.css';
import { Link } from 'react-router-dom';

export default function PaymentScreen(props) {
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;
    if(!shippingAddress.address)
    {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Paysera');
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <Link to="/shipping">Grįžti į naudotojo informaciją</Link>
            <form className="formShipping" onSubmit={submitHandler}>
                <div>
                    <h1>Apmokėjimas</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paysera" value="Paysera" name="paymentMethod" required checked onChange={(e)=> setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paysera">Paysera</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="PayPal" name="paymentMethod" required onChange={(e)=> setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Tęsti</button>
                </div>
            </form>
        </div>
    )
}
