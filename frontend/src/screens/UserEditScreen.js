import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
    const userId = props.match.params.id;

    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading:loadingUpdate, error:errorUpdate, success: successUpdate } = userUpdate;


    const dispatch = useDispatch();

    useEffect(() => {
if(successUpdate){
    dispatch({type: USER_UPDATE_RESET});
    props.history.push('/userlist');
}

        if (!user) {
            dispatch(detailsUser(userId));
        }
        else {
            setNick(user.nick);
            setEmail(user.email);
            setAdmin(user.admin);
          }
    }, [dispatch, user, userId, props.history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        //update;
        dispatch(updateUser({_id: userId, nick, email, admin }));
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1> Keisti vartotoją {nick}</h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger"> {errorUpdate}</MessageBox>}
                </div>
                {
                    loading ? <LoadingBox></LoadingBox> :
                        error ? <MessageBox variant="danger">{error}</MessageBox> :
                            (
                                <>
                                    <div>
                                        <label htmlFor="nick">VardasPavardė</label>
                                        <input id="nick" type="text" value={nick} onChange={(e) => setNick(e.target.value)}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="email">El. paštas</label>
                                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="admin">Ar administratorius</label>
                                        <input id="admin" type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)}></input>
                                    </div>
                                    <button type="submit" className="primary">
                                        Atnaujinti
                        </button>
                                </>
                            )}
            </form>
        </div>
    )
}
