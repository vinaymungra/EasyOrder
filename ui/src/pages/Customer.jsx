import React, { useEffect } from 'react';
import { addToCart, removeFromCart, setData } from '../redux/slices/customer';
import { useDispatch, useSelector } from 'react-redux';
import { getMenu } from '../services/middlewares/customer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import MenuItem from '../components/core/Customer/MenuItem'; // Ensure you import MenuItem

const Customer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { menuData, cartData, loading } = useSelector((state) => state.customer);

    useEffect(() => {
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

    const handleAddToCart = (item) => {
        dispatch(addToCart({ item }));
    };

    const handleRemovefromCart = (item) => {
        dispatch(removeFromCart({ item }));
    };

    const handleNavigateToCart = () => {
        const arr = location.pathname.split("/");
        const businessId = arr[1];
        const table = arr[2];
        navigate(`/${businessId}/${table}/cart`);
    };

    return (
        <div className="bg-black min-h-screen p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Menu</h1>
                <button 
                    className="text-3xl text-white"
                    onClick={handleNavigateToCart}
                >
                    <FaShoppingCart />
                </button>
            </div>
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                Object.keys(menuData).length > 0 ? (
                    Object.keys(menuData).map((category, index) => (
                        <div key={index} className="mb-8">
                            <h2 className="text-2xl font-bold text-yellow-500 mb-4">{category}</h2>
                            <div className="flex flex-col gap-6">
                                {menuData[category].map((item) => (
                                    <MenuItem 
                                        key={item._id} 
                                        name={item.name} 
                                        price={item.price} 
                                        thumbnail={item.thumbnail} 
                                        cartData={cartData} 
                                        handleAddToCart={() => handleAddToCart(item)} 
                                        handleRemovefromCart={() => handleRemovefromCart(item)} 
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No menu items found.</p>
                )
            )}
        </div>
    );
};

export default Customer;
