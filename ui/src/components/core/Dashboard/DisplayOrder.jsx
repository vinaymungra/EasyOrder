import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const DisplayOrder = () => {
    const { order } = useSelector((state) => state.owner);

    useEffect(() => {
        console.log(order);
    }, [order]);

    if (!order || order.length === 0) {
        return <div className="text-center text-gray-500">No orders to display</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
            {order.map((tableOrder, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Table Number: {tableOrder.tableNo}</h2>
                    <p className="text-sm text-gray-500 mb-4">Date: {new Date(tableOrder.date).toLocaleString()}</p>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Item Name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Quantity</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableOrder.orderedItems.map((orderedItem, index) => (
                                <tr key={index} className="text-gray-700">
                                    <td className="text-left py-3 px-4">{orderedItem.item.name}</td>
                                    <td className="text-left py-3 px-4">{orderedItem.quantity}</td>
                                    <td className="text-left py-3 px-4">₹{orderedItem.item.price*orderedItem.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default DisplayOrder;
