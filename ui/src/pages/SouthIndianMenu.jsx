import React from 'react';

const MenuItem = ({ name, description, price, image }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-gray-400 mb-2">{description}</p>
      <p className="text-yellow-500 font-bold mb-4">Rs. {price}</p>
      <div className="flex justify-between">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          Order
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

const SouthIndianMenu = () => {
  const menuItems = [
    {
      name: 'Dosa',
      description: 'A thin, savory crepe in South Indian cuisine',
      price: 126,
      image: 'path_to_dosa_image.jpg'
    },
    {
      name: 'Idli',
      description: 'A type of rice cake, originated from South India',
      price: 100,
      image: 'path_to_idli_image.jpg'
    }
  ];

  return (
    <div className="bg-black p-8">
      <h2 className="text-3xl font-bold text-white mb-6">South Indian</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SouthIndianMenu;