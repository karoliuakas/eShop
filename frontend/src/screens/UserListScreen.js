import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
        dispatch({type: USER_DETAILS_RESET});
    }, [dispatch, successDelete]);

    const deleteHandler = (user) => {
        if (window.confirm('Tikrai norite ištrinti šį naudotoją?')) {
            dispatch(deleteUser(user._id));
        }
    };

    return (
        <div>
            <h1>Naudotojai</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Naudotojas</th>
                                    <th>El. Paštas</th>
                                    <th>Ar administratorius</th>
                                    <th>Veiksmai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.nick}</td>
                                            <td>{user.email}</td>
                                            <td>{user.admin ? 'Taip' : 'Ne'}</td>
                                            <td>
                                                <button type="button" className="small" onClick={()=> props.history.push(`/user/${user._id}/edit`)}>Keisti</button>
                                                <button type="button" className="small" onClick={() => deleteHandler(user)}>Ištrinti</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )}
        </div>
    )
}
