import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuData } from '../../../redux/slices/menu'; // Adjust the import path as needed

const CreateMenu = () => {
    const dispatch = useDispatch();
    const { menuData, loading } = useSelector((state) => state.menu);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                // Fetch your menu data from the API or service
                const response = await fetch('/api/menu');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Dispatch data to Redux store
                dispatch(setMenuData(data));
            } catch (error) {
                console.error('Failed to fetch menu data:', error);
            }
        };

        fetchMenuData();
    }, [dispatch]);

    return (
        <div>
            <h1>Create Menu</h1>
            {loading ? <p>Loading...</p> : (
                Object.keys(menuData).length > 0 ? (
                    Object.keys(menuData).map((category) => (
                        <div key={category}>
                            <h2>{category}</h2>
                            <ul>
                                {menuData[category].map((item) => (
                                    <li key={item.id}>{item.name}</li>
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
