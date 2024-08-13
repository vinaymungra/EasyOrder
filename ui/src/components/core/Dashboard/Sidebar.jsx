import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleBussinessData } from '../../../services/middlewares/bussiness'
import {  getItemsData } from '../../../services/middlewares/item';
import { setBussinessData } from '../../../redux/slices/bussiness';
import { setItemData } from '../../../redux/slices/item';
import { setCategoryData } from '../../../redux/slices/category';
import { getAllCatogoryData } from '../../../services/middlewares/category';

const Sidebar = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { bussinessData } = useSelector((state) => state.bussiness)
  const { token } = useSelector(state => state.owner);



  const handleCreateBusiness = () => {
    navigate('/dashboard/create-bussiness');
  };

  {console.log(token)}
  {console.log(bussinessData)}
  useEffect(() => {
    if (token && !bussinessData) {
      (async () => {
        try {
          let result = await dispatch(handleBussinessData(token));
          var ty= await dispatch(setBussinessData(result));
          
          result = await dispatch(getItemsData(token));
          dispatch(setItemData(result));
          
          result = await dispatch(getAllCatogoryData(token));
          dispatch(setCategoryData(result));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      })();
    }
  }, []);
  

  return (
    <div className="p-4 h-full w-56 bg-gray-800 text-white">
      {bussinessData == null ? (
        <div className="flex-grow flex items-center justify-center">
          <button
            onClick={handleCreateBusiness}
            className="px-4 py-2 w-full h-10 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            Create Bussiness
          </button>
        </div>
      ) : (
        <div className="flex flex-col ">

          <nav className="flex flex-col flex-grow mt-5 space-y-2">
            <div className="flex-grow flex items-center justify-center">
              <NavLink
                to="/dashboard/qrcodes"
                className={`px-4 py-2 w-full h-10 bg-blue-500 justify-center flex text-white rounded-md hover:bg-blue-700 transition duration-300
              `}
              >
                QR Codes
              </NavLink>
            </div>
            <NavLink
              to="/dashboard/create-menu"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 bg-gray-900 w-full text-center'
                  : 'block px-4 py-2 hover:bg-gray-700 w-full text-center'
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/dashboard/create-category"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 bg-gray-900 w-full text-center'
                  : 'block px-4 py-2 hover:bg-gray-700 w-full text-center'
              }
            >
              Category
            </NavLink>

            <NavLink
              to="/dashboard/create-item"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 bg-gray-900 w-full text-center'
                  : 'block px-4 py-2 hover:bg-gray-700 w-full text-center'
              }
            >
              Item
            </NavLink>

            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 bg-gray-900 w-full text-center'
                  : 'block px-4 py-2 hover:bg-gray-700 w-full text-center'
              }
            >
              Orders
            </NavLink>

            <NavLink
              to="/setting"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 bg-gray-900 w-full text-center'
                  : 'block px-4 py-2 hover:bg-gray-700 w-full text-center'
              }
            >
              Setting
            </NavLink>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
