import React, { useState } from 'react';

const AuthCustomer = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const validatePhoneNumber = (number) => {
        // Indian phone numbers should start with 7, 8, or 9 and be 10 digits long
        const phoneRegex = /^[789]\d{9}$/;
        return phoneRegex.test(number);
    };

    const handleChange = (e) => {
        setPhoneNumber(e.target.value);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePhoneNumber(phoneNumber)) {
            // Handle the submit logic here
            console.log('Phone number submitted:', phoneNumber);
        } else {
            setError('Please enter a valid Indian phone number');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Enter Your Phone Number</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phone"
                        value={phoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                        pattern="[789][0-9]{9}" // HTML5 validation pattern
                        required
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AuthCustomer;
