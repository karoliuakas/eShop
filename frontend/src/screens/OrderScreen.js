import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(orderId));

    }, [dispatch, orderId]);
    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant="danger">TOKIO UŽSAKYMO NĖRA</MessageBox>) :
            (
                <div>
                    <h1>Užsakymo nr.: {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Siuntimas</h2>
                                        <p>
                                            <strong>Asmuo: </strong>{order.shippingAddress.fullName} <br />
                                            <strong>Adresas: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postCode}
                                        </p>
                                        {order.isDelivered ? <MessageBox variant="success"><strong>Prekė išsiųsta </strong>{order.deliveredAt}</MessageBox>:
                                        <MessageBox variant="danger"><strong>Prekė dar neišsiųsta</strong></MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Apmokėjimas</h2>
                                        <p>
                                            <strong>Apmokėjimo būdas:</strong>{order.paymentMethod}
                                        </p>
                                        {order.isPaid ? <MessageBox variant="success"><strong> Apmokėta </strong>{order.paidAt}</MessageBox>:
                                        <MessageBox variant="danger"><strong>Nesumokėta</strong></MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Užsakymo prekės</h2>
                                        <ul>
                                            {
                                                order.orderItems.map((item) => (
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
                                            <div>{order.itemsPrice}€</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Siuntimas</div>
                                            <div>{order.shippingPrice.toFixed(2)}€</div>
                                        </div>
                                    </li>
                                    <hr />
                                    <li>
                                        <div className="row">
                                            <div><strong>Bendra suma</strong></div>
                                            <div><strong>{order.totalPrice.toFixed(2)}€</strong></div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}
