    import React, { useState,useEffect } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { Link, useNavigate } from 'react-router-dom';
    import { setSignupData, setToken } from '../../redux/slices/owner';

    const Navbar = () => {
      
        var { token } = useSelector(state => state.owner)
       
        const dispatch = useDispatch();
        const navigate=useNavigate();
        
        const logout=(e)=>{
            dispatch(setSignupData(null));
            dispatch(setToken(null));
            localStorage.setItem("token",null)
            navigate("/");
        }
        return (
            <div className='w-full border-2 border-red-700'>
                <div className="mx-auto  px-2 bg-gray-600  text-white sm:px-6 lg:px-16 ">
                    <div className="flex relative border-2 border-red-700 items-center justify-between h-16">

                        <div className="flex-shrink-0">
                            <Link to="/" className="text-2xl font-bold">
                                Easy Order
                            </Link>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <Link
                                to="/"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                About
                            </Link>
                            <Link
                                to="/contactus"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Contact Us
                            </Link>
                            <Link
                                to="/dashboard"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Dashboard
                            </Link>

                        </div>
                        
                            <div className='flex justify-center'>
                            { (token=="null"||token==undefined)&&<Link
                                    to="/login"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>}
                                { token=="null"&&<Link
                                    to="/signup"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Signup
                                </Link>}
                            </div>
                        
                        {(token!="null")&&
                            <div className='flex justify-center' onClick={(e)=>logout(e)}>
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </Link>
                            </div>
                        }
                    </div>
                </div>
                
            </div>
        );
    };

    export default Navbar;
