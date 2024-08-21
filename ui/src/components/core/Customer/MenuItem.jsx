import React from 'react';

const MenuItem = ({ name, price, thumbnail, cartData, handleAddToCart, handleRemoveFromCart }) => (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg p-6 flex flex-col md:flex-row md:justify-between w-full max-w-sm mx-auto">
        <img src={thumbnail} alt={name} className="w-32 h-32 object-cover rounded-full border-4 border-gray-700 mb-4 md:mb-0" />
        <div className="flex flex-col justify-between md:ml-6 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <p className="text-yellow-400 text-lg font-semibold mb-4">Rs. {price}</p>
            <div className="flex justify-between gap-4">
                {cartData[name] 
                    ? <button onClick={handleRemoveFromCart} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Remove from Cart</button>
                    : <button onClick={handleAddToCart} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Add to Cart</button>
                }
            </div>
        </div>
    </div>
);

export default MenuItem;
