
export const MenuItem = ({ name, description, price, image }) => (
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