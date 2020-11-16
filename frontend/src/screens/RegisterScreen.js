import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword)
        {
             alert("Slaptažodžiai nesutampa!")
        }
        else
        {
            dispatch(register(nick, email, password));
        }
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo]);
    return (
        <div className="row" id="a">
            <div className="col-4">
                <img className="medium" src="/images/loginlogo.png"></img>
            </div>
            <div className="col-1" id="login">
                <form className="form" onSubmit={submitHandler}>
                    <div className="midle">
                        <img className="small" src="/images/loginlogoicon.png"></img>
                        <h1>Vartotojo registracija</h1>
                    </div>
                    {
                        loading && <LoadingBox></LoadingBox>
                    }
                    {
                    error && <MessageBox variant="danger">{error}</MessageBox>
                    }
                    <div>
                        <input type="text" id="nick" placeholder="Vardas Pavardė" required onChange={(e) => setNick(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <input type="email" id="email" placeholder="El. paštas" required onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <input type="password" id="password" placeholder="Slaptažodis" required onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <input type="password" id="confirmPassword" placeholder="Patvirtinkite slaptažodį" required onChange={(e) => setConfirmPassword(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label />
                        <button className="primary" type='submit'>Registruotis</button>
                    </div>
                    <div>
                        <label />
                        <div id="formText">
                            Jau turite paskyrą ?{' '}
                            <Link to={`/signin?redirect=${redirect}`}>Junkitės</Link>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
