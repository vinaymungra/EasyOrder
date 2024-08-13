import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../../services/middlewares/category';
import { addCategory } from '../../../redux/slices/category';


const CreateCategory = () => {

  const dispatch = useDispatch();
  const {token} = useSelector(state => state.owner);

  const [categoryName, setCategoryName] = useState('');
  const {categoryData} = useSelector(state=>state.category);

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var result=await dispatch(createCategory(token,categoryName));
    dispatch(addCategory(result))
    console.log('Category Name:', categoryName);
  };

  const handleEdit = (categoryId) => {
    // Logic to handle category editing
    console.log('Edit Category ID:', categoryId);
  };

  const handleDelete = (categoryId) => {
    // Logic to handle category deletion
    console.log('Delete Category ID:', categoryId);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Add New Category</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="categoryName">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
              placeholder="Enter category name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full   bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-opacity-50"
          >
            +Add Category
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold text-center mb-6 text-gray-800">Existing Categories</h3>
        <ul className="space-y-4">
          {categoryData.map((category,index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg shadow-md"
            >
              <span className="text-gray-700 font-semibold">{category.name}</span>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(category.id)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateCategory;
