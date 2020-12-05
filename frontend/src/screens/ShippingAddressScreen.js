import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions.js';
import CheckoutSteps from '../components/Checkout.js'
import '../styles/shippingAddress.css';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo){
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postCode, setPostCode] = useState(shippingAddress.postCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address,city, postCode, phoneNumber}));
        //dispatch save shipping addres action
     props.history.push('/payment');
    }; 
   
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            
            <Link to="/cart">Grįžti į krepšelį</Link>
            <form className="formShipping" onSubmit={submitHandler}>
                <div>
                    <h1>Užsakymo informacija</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Vardas ir pavardė</label>
                    <input type="text" id="fullName" placeholder="Vardenis Pavardenis" value={fullName} onChange={(e) => setFullName(e.target.value)} required ></input>
                </div>
                <div>
                    <label htmlFor="address">Adresas</label>
                    <input type="text" id="address" placeholder="Adresas" value={address} onChange={(e) => setAddress(e.target.value)} required ></input>
                </div>
                <div>
                    <label htmlFor="city">Miestas</label>
                    <input type="text" id="city" placeholder="Miestas" value={city} onChange={(e) => setCity(e.target.value)} required ></input>
                </div>
                <div>
                    <label htmlFor="postCode">Pašto kodas</label>
                    <input type="text" id="postCode" placeholder="Pašto kodas" value={postCode} onChange={(e) => setPostCode(e.target.value)} required ></input>
                </div>
                <div>
                    <label htmlFor="phoneNumber">Telefono numeris</label>
                    <input type="text" id="phoneNumber" placeholder="Tel. nr." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required></input>
                </div>
                <div>
                    <label>
                      <button className="primary" type="submit">
                          TĘSTI
                          </button>  
                    </label>
                </div>
            </form>
        </div>
    );
}
