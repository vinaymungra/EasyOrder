import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './redux/slices/owner';
import PrivateRoute from './components/core/Owner/PrivateRoute';
import CreateBussiness from './components/core/Dashboard/CreateBussiness';
import CreateMenu from './components/core/Dashboard/CreateMenu';
import CreateCategory from './components/core/Dashboard/CreateCategory';
import CreateItem from './components/core/Dashboard/CreateItem';
import DisplayOrders from './components/core/Dashboard/DisplayOrders';
import Setting from './components/common/Setting';
import QrCodes from './components/core/Dashboard/QrCodes';

function App() {

    const { token } = useSelector((state) => state.owner);
    const dispatch = useDispatch()
    const {bussiness} = useSelector(state=>state.bussiness)
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                {
                    token!="null" ?
                        <>
                            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                                <Route path="/dashboard/create-menu" element={<CreateMenu/>} />
                                <Route path="/dashboard/create-category" element={<CreateCategory/>} />
                                <Route path="/dashboard/create-item" element={<CreateItem/>} />
                                <Route path="/dashboard/create-bussiness" element={<CreateBussiness/>} />
                                <Route path="/dashboard/orders" element={<DisplayOrders/>} />
                                <Route path="/dashboard/qrcodes" element={<QrCodes/>} />
                            </Route>
                        </>
                        :
                        <>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/verify-email" element={<VerifyEmail />} />
                        </>

                }
                <Route path="/setting" element={<Setting/>} />
                
            </Routes>
        </>
    );
}

export default App;
