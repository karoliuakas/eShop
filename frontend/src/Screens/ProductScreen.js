import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';


function ProductScreen(props) {
    // const product = data.products.find(x => x._id === props.match.params.id);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {

        };
    }, [])
    return <div>
        <div className="back-to-result">
            <Link to="/"> Grįžti</Link>
        </div>
        {loading ? ( <div> Kraunasi...</div>) :
            error ? (<div>{error}</div>) :
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt="product"></img>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    {product.rating} Žvaigždės ({product.numberReviews} Atsiliepimai)
                    </li>
                                <li>
                                    <b>{product.price}</b>
                                </li>
                                <li>
                                    Aprašymas:
                        <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Kaina: <b>{product.price}€</b>
                                </li>
                                <li>
                                    Būsena: {product.status}
                                </li>
                                <li>
                                    Dydis: <select>
                                        <option>Mažas</option>
                                        <option>Vidutinis</option>
                                        <option>Didelis</option>
                                    </select>
                                </li>
                                <li>
                                    <button className="button">
                                        Pridėti į krepšelį
                        </button>
                                </li>
                            </ul>

                        </div>
                    </div>
                )}


    </div>
}
export default ProductScreen;