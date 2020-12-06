import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setCategory(product.category);
            setImage(product.image);
            setPrice(product.price);
            setType(product.type);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }

    }, [product, dispatch, productId, props.history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ _id: productId, name, category, image, price, type, countInStock, description }))
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>
                        Keisti prekę
        </h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="danger">{error}</MessageBox> :
                        <>
                            <div>
                                <label htmlFor="name">Pavadinimas</label>
                                <input id="name" type="text" placeholder="Įveskite pavadinimą" value={name} onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="category">Kategorija</label>
                                <input id="category" type="text" placeholder="Įveskite kategoriją" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="image">Paveikslėlis</label>
                                <input id="image" type="text" placeholder="Įveskite paveikslėlį" value={image} onChange={(e) => setImage(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="price">Kaina</label>
                                <input id="price" type="text" placeholder="Įveskite kainą" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="type">Tipas</label>
                                <input id="type" type="text" placeholder="Įveskite tipą" value={type} onChange={(e) => setType(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="countInStock">Kiekis sandėlyje</label>
                                <input id="countInStock" type="text" placeholder="Įveskite kiekį sandėlyje" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="description">Aprašymas</label>
                                <textarea id="description" type="text" placeholder="Įveskite aprašymą" value={description} onChange={(e) => setDescription(e.target.value)} rows="4"></textarea>
                            </div>
                            <div>
                                <label></label>
                                <button className="primary" type="submit">Atnaujinti</button>
                            </div>
                        </>
                }
            </form>
        </div>
    )
}
