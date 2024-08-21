import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/customer';
import { FaPlus, FaMinus } from 'react-icons/fa'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { paymentSuccessfull } from '../services/middlewares/order';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { cartData, menuData } = useSelector((state) => state.customer);

    const handleIncrement = (item) => {
        dispatch(addToCart({ item }));
    };

    const handleDecrement = (item) => {
        dispatch(removeFromCart({ item }));
    };

    const handleBackToMenu = () => {
        const arr = location.pathname.split("/");
        const businessId = arr[1];
        const table = arr[2];
        navigate(`/${businessId}/${table}`);
    };

    const calculateTotalAmount = () => {
        let total = 0;
        Object.keys(cartData).forEach(item => {
            total += cartData[item].price * cartData[item].quantity; 
        });
        return total;
    };

    const handlePayButton = async () => {
        const amount = calculateTotalAmount();
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY, 
            amount: amount * 100, // Amount in paisa
            currency: "INR",
            name: "Easy Order",
            description: "Order food without getting into queue",
            handler: function (response) {
                dispatch(paymentSuccessfull(navigate, location, cartData, menuData));
            },
            prefill: {
                name: "Customer Name",
                email: "vinaymungra03@gmail.com",
                contact: "7203062183"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#ff6600"
            }
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="bg-black min-h-screen p-8">
            <h1 className="text-4xl font-bold text-yellow-500 mb-8">Your Cart</h1>
            {Object.keys(cartData).length > 0 ? (
                <ul className="space-y-4">
                    {Object.keys(cartData).map((itemName) => (
                        <li key={itemName} className="flex items-center p-4 bg-gray-800 rounded-lg shadow-lg">
                            <img src={cartData[itemName].thumbnail} alt={itemName} className="w-16 h-16 object-cover rounded-lg mr-4" />
                            <div className="flex-1">
                                <h2 className="text-lg font-medium text-white">{itemName}</h2>
                                <p className="text-yellow-400 text-lg font-semibold">Rs. {cartData[itemName].price}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button 
                                    className="text-lg text-green-400 hover:text-green-500 transition"
                                    onClick={() => handleIncrement({ name: itemName })}
                                >
                                    <FaPlus />
                                </button>
                                <span className="text-lg font-medium text-white">{cartData[itemName].quantity}</span>
                                <button 
                                    className="text-lg text-red-500 hover:text-red-600 transition"
                                    onClick={() => handleDecrement({ name: itemName })}
                                >
                                    <FaMinus />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-white">Your cart is empty.</p>
            )}
            <div className="mt-8 flex justify-between">
                <button 
                    className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                    onClick={handleBackToMenu}
                >
                    Back to Menu
                </button>
                <button 
                    className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                    onClick={handlePayButton}
                >
                    Pay
                </button>
            </div>
        </div>
    );
};

export default Cart;
