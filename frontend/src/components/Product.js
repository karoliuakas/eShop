import React from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom';


export default function Product(props) {
    const { product } = props;
    return (
        <div key={product._id} className="card-mainProduct">

            <Link to={`/product/${product._id}`}>
                <img className="medium"
                    src={product.image}
                    alt={product.name} />
            </Link>
            <div className="card-body-mainProduct">
                <Link to={`/product/${product._id}`}>
                    <h2 >{product.name}</h2>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                <br></br>
                <hr></hr>
                <div className="price">
                    <strong>{product.price.toFixed(2)}</strong> €‎
                </div>
            </div>
        </div>

    );
}
