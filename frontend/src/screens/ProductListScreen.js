import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct, } = productCreate;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;


    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts());
    }, [dispatch, createdProduct, props.history, successCreate, successDelete]);


    const deleteHandler = (product) => {
        if (window.confirm('Tikrai norite ištrinti prekę?')) {
            dispatch(deleteProduct(product._id));
        }

    }

    const createHandler = () => {
        dispatch(createProduct());
    }
    return (
        <div>
            <div className="row">
                <h1>Prekės</h1>
                <button type="button" className="primary" onClick={createHandler}>Sukurti naują prekę</button>
            </div>
            { loadingCreate && <LoadingBox></LoadingBox>}
            { errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

            { loadingDelete && <LoadingBox></LoadingBox>}
            { errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox> :
                    (<table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>PAVADINIMAS</th>
                                <th>KAINA</th>
                                <th>KATEGORIJA</th>
                                <th>KIEKIS</th>
                                <th>VEIKSMAI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.countInStock}</td>
                                    <td>
                                        <button type="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>Keisti</button>
                                        <button type="button" className="small" onClick={() => deleteHandler(product)}>Ištrinti</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>)}
        </div>
    )
}
