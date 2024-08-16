import './App.css';
import React, { useEffect,useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import Customer from  './pages/Customer';
// import SouthIndianMenu from './components/core/Dashboard/SouthIndianMenu';
// const ObjectId = require('mongodb').ObjectId
function App() {

    const { token } = useSelector((state) => state.owner);
    const dispatch = useDispatch()
    const { bussiness } = useSelector(state => state.bussiness)
    const location = useLocation();
    const [client, useClient] = useState(true);
    const [bussinessId,setBussinessId]=useState(null);
    const [table,setTable]=useState(null);
    
    useEffect(() => {
        const arr = location.pathname.split("/")
        setBussinessId(arr[1])
        setTable(arr[2]);
    }, [])
    return (
        <>
        {!client &&<>
            <Navbar />
            {/* <SouthIndianMenu/> */}
            
                <Routes>
                    <Route path="/" element={<Home />} />
                    {
                        token ? (
                            <>
                                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                                    <Route path="/dashboard/create-menu" element={<CreateMenu />} />
                                    <Route path="/dashboard/create-category" element={<CreateCategory />} />
                                    <Route path="/dashboard/create-item" element={<CreateItem />} />
                                    <Route path="/dashboard/create-bussiness" element={<CreateBussiness />} />
                                    <Route path="/dashboard/orders" element={<DisplayOrders />} />
                                    <Route path="/dashboard/qrcodes" element={<QrCodes />} />
                                </Route>
                            </>
                        ) : (
                            <>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/verify-email" element={<VerifyEmail />} />
                            </>
                        )
                    }
                    <Route path="/setting" element={<Setting />} />
                </Routes>
                </>
        }
        {
            client&&<>
                <Customer bussinessId={bussinessId} table={table}/>
            
            </>

        }
        </>
    );
}

export default App;
