import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';


function HomeScreen(props) {
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(listProducts());
        return () => {

        };
    }, [])

    return loading ? <div>Kraunasi..</div> :
        error ? <div>{error}</div> :
            <ul className="products">
                {
                    products.map((product) =>
                        <li key={product._id}>
                            <div className="product">
                                <div className="product-image">
                                    <Link to={'/product/' + product._id}>
                                        <img src={product.image} alt="Medis" />
                                    </Link>
                                </div>
                                <div className="product-name">
                                    <Link to={'/product/' + product._id}>{product.name}</Link>
                                </div>
                                <div className="product-type">{product.type}</div>
                                <div className="product-price">{product.price}€</div>
                                <div className="product-rating">{product.rating} Žvaigždutės({product.numberReviews}
            atsiliepimas-(i)</div>
                            </div>
                        </li>)
                }
            </ul>
}
export default HomeScreen;