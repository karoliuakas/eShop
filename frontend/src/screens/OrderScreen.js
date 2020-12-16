import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants.js';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const {success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {success: successDeliver } = orderDeliver;

    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);

    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo} = userSignin;

    useEffect(() => {
        const addPayseraScript = async () => {
            setSdkReady(true);
        };
        if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET});
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paysera) {
                    addPayseraScript();
                } else {
                    setSdkReady(true);
                }
            }
        }


    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);
    const orderHandler = (paymentResult) => {

        dispatch(payOrder(order, paymentResult));
        window.open("https://www.paysera.com/pay/?data=cHJvamVjdGlkPTE5MzYyOCZvcmRlcmlkPTAmYW1vdW50PTEyMzAwJmN1cnJlbmN5PUVVUiZhY2NlcHR1cmw9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTMwMDAmY2FuY2VsdXJsPWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMDAwJmNhbGxiYWNrdXJsPSZ0ZXN0PTEmdmVyc2lvbj0xLjY=&sign=726ac9d378e8b999fb265f282cb624b5");
    };

    const deliverHandler = () =>{
      dispatch(deliverOrder(order._id));  
    }   

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
                                        {order.isDelivered ? <MessageBox variant="success"><strong>Prekė išsiųsta </strong>{order.deliveredAt}</MessageBox> ://).replace("T", ", ")).slice(0,17)
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
                                        {order.isPaid ? <MessageBox variant="success"><strong> Apmokėta </strong>{order.paidAt}</MessageBox> :
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
                                                        {item.price.toFixed(2)}€ = {(item.qty * item.price).toFixed(2)}€
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
                                    <li>

                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                {!sdkReady ? (<LoadingBox></LoadingBox>) :
                                                    (
                                                            <button type="button" onClick={orderHandler} className="primary block">
                                                                Mokėti
                                                        </button>
                                                       
                                                    )}
                                            </li>
                                        )
                                    }
{userInfo.admin && order.isPaid && !order.isDelivered &&(
    <li>
        <button type="button" className="primary block" onClick={deliverHandler}>
            Išsiųsti užsakymą
        </button>
    </li>
)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}
