import React, { useState } from 'react';
import Modal from '../../common/Modal';
import {createBussiness} from '../../../services/middlewares/bussiness'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateBussiness = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    tables: "",
    emergencyNumber: "",
    billing: "",
  });
  const [selectedFile, setSelectedFile] = useState([])


  const dispatch= useDispatch();
  const navigate= useNavigate();


  const { name, address, tables, emergencyNumber, billing } = formData;
  const {token} = useSelector((state)=>state.owner) 
  
  

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file",selectedFile);
    data.append("name",formData.name);
    data.append("address",formData.address);
    data.append("tables",formData.tables);
    data.append("emergencyNumber",formData.emergencyNumber);
    data.append("billing",formData.billing);
    console.log(token)
    await dispatch(createBussiness(closeModal,data,token,navigate))
    
    
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} closeModal={closeModal} url={"/dashboard"}>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">

          <label htmlFor='name'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
              Bussiness Name <sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Enter Bussiness Name"
              className="w-full rounded-[0.5rem] bg-gray-200 p-[12px] text-gray-800"
            />
          </label>

          <label htmlFor='address'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
              Address <sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="text"
              name="address"
              value={address}
              onChange={handleOnChange}
              placeholder="Enter Address"
              className="w-full rounded-[0.5rem] bg-gray-200 p-[12px] text-gray-800"
            />
          </label>

          <label htmlFor='tables'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
              Number of Tables <sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="number"
              name="tables"
              value={tables}
              onChange={handleOnChange}
              placeholder="Enter Number of Tables"
              className="w-full rounded-[0.5rem] bg-gray-200 p-[12px] text-gray-800"
            />
          </label>

          <label htmlFor='emergencyNumber'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
              Emergency Number <sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="number"
              name="emergencyNumber"
              value={emergencyNumber}
              onChange={handleOnChange}
              placeholder="Enter Emergency Number"
              className="w-full rounded-[0.5rem] bg-gray-200 p-[12px] text-gray-800"
            />
          </label>

          <label htmlFor='billing'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
              Billing Type <sup className="text-red-600">*</sup>
            </p>
            <select
              required      
              name="billing"
              value={billing}
              onChange={handleOnChange}
              className="w-full rounded-[0.5rem] bg-gray-200 p-[12px] text-gray-800"
            >
              <option value="" disabled>Select Billing Type</option>
              <option value="prepaid">Prepaid</option>
              <option value="postpaid">Postpaid</option>
            </select>
          </label>

          <label htmlFor='file'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
                Bussiness Thumbnail <sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="file" 
              name="file"
              value={selectedFile[0]}
              onChange={(e)=>{setSelectedFile(e.target.files[0])}}
              className="w-full rounded-[0.5rem] bg-gray-200 p-[12px] text-gray-800"
            />
          </label>

          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-medium text-gray-900"
          >
            Create Bussiness  
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateBussiness;