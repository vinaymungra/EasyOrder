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
    const { cartData,menuData } = useSelector((state) => state.customer);


    // Log the Razorpay key to verify it's being read correctly
    // console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY);

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
            total += cartData[item].price 
        });
        return total;
    };

    const handlePayButton = async () => {
        const amount = calculateTotalAmount()
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY, 
            amount: amount*100, // Amount in paisa, make sure to multiply by 100 if amount is in rupees
            currency: "INR",
            name: "Easy Order",
            description: "Order food without getting into queue",
            handler: function (response) {
                
                dispatch(paymentSuccessfull(navigate,location,cartData,menuData));
                // alert("Payment Successful");
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
                color: "#3399cc"
            }
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="bg-beige min-h-screen p-8">
            <h1 className="text-4xl font-bold text-brown-800 mb-8">Your Cart</h1>
            {Object.keys(cartData).length > 0 ? (
                <ul className="space-y-4">
                    {Object.keys(cartData).map((itemName) => (
                        <li key={itemName} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
                            <span className="text-lg font-medium text-gray-800">{itemName}</span>
                            <div className="flex items-center space-x-4">
                                <button 
                                    className="text-lg text-green-700"
                                    onClick={() => handleIncrement({ name: itemName })}
                                >
                                    <FaPlus />
                                </button>
                                <span className="text-lg font-medium text-gray-800">{cartData[itemName]}</span>
                                <button 
                                    className="text-lg text-red-700"
                                    onClick={() => handleDecrement({ name: itemName })}
                                >
                                    <FaMinus />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <div className="mt-8 flex justify-between">
                <button 
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleBackToMenu}
                >
                    Back to Menu
                </button>
                <button 
                    className="bg-green-700 text-white py-2 px-4 rounded-lg"
                    onClick={handlePayButton}
                >
                    Pay
                </button>
            </div>
        </div>
    );
};

export default Cart;
