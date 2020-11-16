import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search? props.location.search.split('=')[1]:'/';

    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(signin(email, password));
    };
    useEffect(()=>{
        if(userInfo)
        {
            props.history.push(redirect);
        }
    },[userInfo]);
    return (
        <div className="row" id="a">
            <div className="col-4">
<img className="medium" src="/images/loginlogo.png" alt="logo"></img>
            </div>
            <div className="col-1" id="login">
                 <form className="form" onSubmit={submitHandler}>
                <div className="midle">
                <img className="small" src="/images/loginlogoicon.png" alt="icon"></img>
                    <h1>Vartotojo prisijungimas</h1>
                </div>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <input type="email" id="email" placeholder="El. paštas" required onChange={e=> setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <input type="password" id="password" placeholder="Slaptažodis" required onChange={e=> setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label />
                    <button className="primary" type='submit'>Prisijungti</button>
                </div>
                <div>
                    <label />
                    <div id="formText">
                        Neturite paskyros ?{' '}
                        <Link to={`/register?redirect=${redirect}`}>Registruokis</Link>
                    </div>
                </div>
            </form>
            </div>
           
        </div>
    )
}
