import React from 'react'

export default function Checkout(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>
                Prisijungimas
            </div>
            <div className={props.step2 ? 'active' : ''}>
                Adresas
            </div>
            <div className={props.step3 ? 'active' : ''}>
                Apmokėjimas
            </div>
            <div className={props.step4 ? 'active' : ''}>
                Užsakymo patvirtinimas
            </div>
        </div>
    );
}
