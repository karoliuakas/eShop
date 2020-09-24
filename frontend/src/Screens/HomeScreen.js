import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen(props) {
    return <ul className="products">
        {
            data.products.map(product =>
                <li>
                    <div className="product">
                        <div className="product-image">
                              <Link to={'/product/' + product._id}>
                            <img  src={product.image} alt="Medis" />
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