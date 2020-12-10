import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
    const { name = 'all' } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts({ name: name !== 'all' ? name : '' }));
    }, [dispatch, name])
    return (
        <div>
            <div className="row top">
                {loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="danger">{error}</MessageBox> :
                        (
                            <div>
                                {products.length} - surasta
                            </div>
                        )}
            </div>
            <div className="row">
                <div className="col-search1">
                    <h3>Dep</h3>
                    <ul>
                        <li>Kategorija</li>
                    </ul>
                </div>
                <div className="col-search2">
                {loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="danger">{error}</MessageBox> :
                        (
                            <div className="row center">
                       
                            {
                                products.map((product) =>
                                    (
                                        <Product key={product._id} product={product}></Product>
                                    ))
                            }  
                        </div>
                        )}
                </div>

            </div>
        </div>

    )
}
