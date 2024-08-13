// Dashboard.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../redux/slices/owner';
// Import the Modal component

const Dashboard = () => {
  const {token} = useSelector(state => state.owner)
 
  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
