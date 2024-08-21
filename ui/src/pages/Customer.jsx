import React, { useEffect } from 'react';
import { addToCart, removeFromCart, setData } from '../redux/slices/customer';
import { useDispatch, useSelector } from 'react-redux';
import { getMenu } from '../services/middlewares/customer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Customer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { menuData, cartData, loading } = useSelector((state) => state.customer);

    useEffect(() => {
        console.log("Customer route")
        const arr = location.pathname.split("/");
        (
            async () => {
                const data = {
                    bussinessId: arr[1],
                };
                let result = await dispatch(getMenu(data));
                dispatch(setData(result));
            }
        )();
    }, [location.pathname, dispatch]);

    const handleAddToCart = (event, item) => {
        dispatch(addToCart({ item }));
    };

    const handleRemovefromCart = (event, item) => {
        dispatch(removeFromCart({ item }));
    };

    const handleNavigateToCart = () => {
        const arr = location.pathname.split("/");
        const businessId = arr[1];
        const table = arr[2];
        navigate(`/${businessId}/${table}/cart`);
    };

    return (
        <div className="bg-beige min-h-screen bg-orange-300 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-brown-800">Menu</h1>
                <button 
                    className="text-3xl text-brown-800"
                    onClick={handleNavigateToCart}
                >
                    <FaShoppingCart />
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                Object.keys(menuData).length > 0 ? (
                    Object.keys(menuData).map((category, index) => (
                        <div key={index} className="mb-8">
                            <ul className="space-y-4">
                                <h2 className="text-2xl font-bold text-red-800 mb-4">{category}</h2>
                                {menuData[category].map((item) => (
                                    <li key={item._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
                                        <img src={item.thumbnail} className="w-40 h-40 object-cover rounded-lg" alt="" />
                                        <span className="text-lg font-medium text-gray-800">{item.name}</span>
                                        <span className="text-lg font-semibold text-green-700">Rs.{item.price}</span>
                                        <div>
                                            {cartData[item.name] 
                                                ? <button onClick={(e) => handleRemovefromCart(e, item)}>Remove from Cart</button>
                                                : <button onClick={(e) => handleAddToCart(e, item)}>Add to Cart</button>
                                            }
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No menu items found.</p>
                )
            )}
        </div>
    );
};

export default Customer;
