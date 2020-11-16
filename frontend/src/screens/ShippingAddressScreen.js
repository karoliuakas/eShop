import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions.js';
import CheckoutSteps from '../components/Checkout.js'

export default function ShippingAddressScreen() {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address,city, postCode, phoneNumber}));
        //dispatch save shipping addres action
    };
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
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
