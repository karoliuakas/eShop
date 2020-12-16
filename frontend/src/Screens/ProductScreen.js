import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import Fade from "react-reveal/Fade";
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productCreateReview = useSelector((state) => state.productCreateReview);
    const { loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview } = productCreateReview;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (successCreateReview) {
            window.alert('Įvertinimas pateiktas!');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successCreateReview]);
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(createReview(productId, { rating, comment, name: userInfo.nick }));
        } else {
            alert('Pasirinkite įvertinimą ir parašykite komentarą');
        }
    }
    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (<Fade>
                        <div>
                            <Link to="/">Grįžti į pradinį</Link>
                            <div className="row top">
                                <div className="col-2">
                                    <img className="large" src={product.image} alt={product.name}></img>

                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <h1>{product.name}</h1>
                                        </li>
                                        <li>
                                            <Rating rating={product.rating}
                                                numReviews={product.numReviews}></Rating>
                                        </li>
                                        <li>
                                            Kaina: {product.price} €‎
                        </li>
                                        <li>
                                            Aprašymas:<p>
                                                {product.description}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-3">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>
                                                        Kaina:
                                        </div>
                                                    <div className="price">
                                                        {product.price}€‎
                                        </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>
                                                        Būsena:
                                        </div>
                                                    <div className="price">
                                                        {
                                                            product.countInStock > 0 ? (<span className="success">Prekė yra</span>) :
                                                                (<span className="danger"> Prekės nėra</span>)
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                            {
                                                product.countInStock > 0 &&
                                                (
                                                    <>
                                                        <li>
                                                            <div className="row">
                                                                <div> Kiekis </div>
                                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                                            <option key={x + 1} value={x + 1}>
                                                                                {x + 1}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <button onClick={addToCartHandler} className="primary block">Dėti į krepšelį</button>
                                                        </li>
                                                    </>
                                                )
                                            }

                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <div className="center">
                                <h2 id="reviews">Atsiliepimai</h2>
                                {product.reviews.length === 0 && (<MessageBox>Nėra atsiliepimų</MessageBox>)}
                                <ul>
                                    {product.reviews.map((review) => (
                                        <li key={review._id}>

                                            <hr></hr>
                                            <strong>{review.name}</strong>

                                            <p>
                                                {review.createdAt.substring(0, 10)}
                                            </p>

                                            <p>
                                                {review.comment}
                                            </p>
                                            <Rating rating={review.rating} caption=" "></Rating>
                                        </li>

                                    ))}
                                    <li>
                                        {userInfo ? (
                                            <form className="form" onSubmit={submitHandler}>
                                                <div>
                                                    <h2>Rašyti atsiliepimą</h2>
                                                </div>
                                                <div>
                                                    <label htmlFor="rating">Įvertis</label>
                                                    <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                        <option value="">Pasirinkti:</option>
                                                        <option value="1">1 - Labai blogai</option>
                                                        <option value="2">2 - Blogai</option>
                                                        <option value="3">3 - Vidutiniškai</option>
                                                        <option value="4">4 - Gerai</option>
                                                        <option value="5">5 - Labai gerai</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="comment">Komentuoti</label>
                                                    <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                                </div>
                                                <div>
                                                    <label></label>
                                                    <button className="primary" type="submit">Pateikti
                                                </button>
                                                </div>
                                                <div>
                                                    {loadingCreateReview && <LoadingBox></LoadingBox>}
                                                    {errorCreateReview && <MessageBox variant="danger">{errorCreateReview}</MessageBox>}
                                                </div>
                                            </form>
                                        ) : (<MessageBox>Prašome <Link to='/signin'>prisijungti</Link>, kad galėtumėte palikti įvertinimą</MessageBox>

                                            )}
                                    </li>
                                </ul>
                            </div>
                        </div></Fade>)
            }
        </div>

    );
}
