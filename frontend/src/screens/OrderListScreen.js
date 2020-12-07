import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderListScreen(props) {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);

const deleteHandler = (order) =>{

};
    return (
        <div>
            <div>
                <h1>Užsakymai</h1>
                {loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="danger">{error}</MessageBox> : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Naudotojas</th>
                                    <th>DATA</th>
                                    <th>IŠ VISO</th>
                                    <th>Ar apmokėta</th>
                                    <th>Ar išsiųsta</th>
                                    <th>Veiksmai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.nick}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)} €</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Ne'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Ne'}</td>
                                        <td>
                                            <button type="button" className="small" onClick={() => { props.history.push(`/order/${order._id}`) }}>
                                                Išsamiau
                        </button>
                        <button type="button" className="small" onClick={() => deleteHandler(order)}>
Ištrinti
                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            </div>
        </div>
    )
}
