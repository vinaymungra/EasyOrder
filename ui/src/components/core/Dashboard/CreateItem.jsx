import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem } from '../../../services/middlewares/item';
import { addItemToMenu } from '../../../redux/slices/menu'; // Adjust the import path as needed
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa'; // Icons
import { addItem } from '../../../redux/slices/item';
const CreateItem = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.owner);
  const { itemData } = useSelector(state => state.item);
  const { categoryData } = useSelector(state => state.category);

  const [formData, setFormData] = useState({
    category: '',
    price: '',
    name: '',
    available: true,
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("thumbnail", selectedFile);
    data.append("name", formData.name);
    data.append("categoryId", formData.category);
    data.append("available", formData.available);
    data.append("price", formData.price);
    const result = await dispatch(createItem(data, token));
    dispatch(addItem(result));
  };

  const handleAddToMenu = (item) => {
    dispatch(addItemToMenu({ item }));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Item</h2>
      <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter item name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="" disabled>Select a category</option>
            {categoryData && categoryData.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="thumbnail">
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="available">
            Available
          </label>
          <select
            id="available"
            name="available"
            value={formData.available}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Item
        </button>
      </form>

      <div>
        <h3 className="text-xl font-bold mb-4">Created Items</h3>
        <ul className="space-y-4 flex flex-wrap gap-4">
          {itemData && itemData.map((item) => (
            <li key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden w-80">
              <div className="relative">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200">
                    <FaEdit className="text-blue-500" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200">
                    <FaTrashAlt className="text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-bold mb-2">{item.name}</h4>
                <p className="text-gray-600 mb-1">Price: ${item.price}</p>
                <p className="text-gray-600 mb-4">Available: {item.available ? 'Yes' : 'No'}</p>
                <button
                  onClick={() => handleAddToMenu(item)}
                  className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
                >
                  <FaPlusCircle className="mr-2" /> Add to Menu
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateItem;
