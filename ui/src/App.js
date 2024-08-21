import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './components/core/Owner/PrivateRoute';
import CreateBussiness from './components/core/Dashboard/CreateBussiness';
import CreateMenu from './components/core/Dashboard/CreateMenu';
import CreateCategory from './components/core/Dashboard/CreateCategory';
import CreateItem from './components/core/Dashboard/CreateItem';

import Setting from './components/common/Setting';
import QrCodes from './components/core/Dashboard/QrCodes';
import Customer from './pages/Customer';
import Cart from './pages/Cart';
import DisplayOrder from './components/core/Dashboard/DisplayOrder';

function App() {
    const { token } = useSelector((state) => state.owner);
    const dispatch = useDispatch();
    const location = useLocation();

    const [isValidObjectId, setIsValidObjectId] = useState(false);
    const [isValidTableNumber, setIsValidTableNumber] = useState(false);

    useEffect(() => {
        const arr = location.pathname.split("/");
        const objectId = arr[1];
        const tableNumber = arr[2];

        const isValidObjId = /^[0-9a-fA-F]{24}$/.test(objectId);
        const isValidTableNum = !isNaN(tableNumber);

        setIsValidObjectId(isValidObjId);
        setIsValidTableNumber(isValidTableNum);

        console.log(isValidObjId + " " + isValidTableNum);
    }, [location.pathname]);

    return (
        <>
            {(!isValidObjectId || !isValidTableNumber) && (
                <>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {token ? (
                            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                                <Route path="/dashboard/create-menu" element={<CreateMenu />} />
                                <Route path="/dashboard/create-category" element={<CreateCategory />} />
                                <Route path="/dashboard/create-item" element={<CreateItem />} />
                                <Route path="/dashboard/create-bussiness" element={<CreateBussiness />} />
                                <Route path="/dashboard/orders" element={<DisplayOrder />} />
                                <Route path="/dashboard/qrcodes" element={<QrCodes />} />
                            </Route>
                        ) : (
                            <>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/verify-email" element={<VerifyEmail />} />
                            </>
                        )}
                        <Route path="/setting" element={<Setting />} />
                    </Routes>
                </>
            )}
            {(isValidObjectId && isValidTableNumber) && (
                <Routes> 
                    <Route path="/:bussinessId/:table" element={<Customer />} />
                    <Route path="/:bussinessId/:table/cart" element={<Cart />} />
                </Routes>
            )}
        </>
    );
}

export default App;
