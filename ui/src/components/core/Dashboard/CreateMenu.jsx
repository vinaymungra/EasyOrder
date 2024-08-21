import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuData } from '../../../redux/slices/menu'; // Adjust the import path as needed
import { getMenu } from '../../../services/middlewares/menu';



const CreateMenu = () => {
    const dispatch = useDispatch();
    const { menuData, loading } = useSelector((state) => state.menu);
    const {token} = useSelector(state=>state.owner)
    useEffect(() => {
        const fetchData = async () => {
          try {
              var result = await dispatch(getMenu(token));
              dispatch(setMenuData(result));
            
             
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    
    // console.log(menuData)
    return (
        <div className="bg-beige min-h-screen bg-orange-300 p-8">
            <h1 className="text-4xl font-bold text-brown-800 mb-8">Menu</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                Object.keys(menuData).length > 0 ? (
                    Object.keys(menuData).map(( category, index) => (
                        <div key={index} className="mb-8">
                            <ul className="space-y-4">
                                <h2 className="text-2xl font-bold text-red-800 mb-4">{category}</h2>
                                {menuData[category].map((item) => (
                                    <div>
                                    <li key={item._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
                                        <img src={item.thumbnail}  className="w-40 h-40 object-cover  rounded-lg" alt="" />
                                        <span className="text-lg font-medium text-gray-800">{item.name}</span>
                                        <span className="text-lg font-semibold text-green-700">Rs.{item.price}</span>
                                    </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No menu items found.</p>
                )
            )}
        </div>
    );
};

export default CreateMenu;
