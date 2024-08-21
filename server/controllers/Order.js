const Order = require("../models/Order");

exports.create = async (req, res) => {
    try {
        const { cartData, menuData, tableNo } = req.body;
        
        let bussinessId;
        for (const category of Object.values(menuData)) {
            if (category.length > 0) {
                console.log(category[0].bussiness)
                bussinessId = category[0].bussiness; 
                break;
            }
        }

        if (!bussinessId) {
            return res.status(400).json({
                success: false,
                message: "Business ID not found in the menu data"
            });
        }

        const orderedItems = [];

        for (const [itemName, quantity] of Object.entries(cartData)) {
            for (const category of Object.values(menuData)) {
                const item = category.find((menuItem) => menuItem.name === itemName);
                if (item) {
                    orderedItems.push({
                        item: item._id,
                        quantity: quantity
                    });
                    break;
                }
            }
        }

        if (orderedItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid items found to place an order"
            });
        }

        const order = await Order.create({
            bussiness: bussinessId,
            orderedItems: orderedItems,
            tableNo: tableNo 
        });

        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            order: order
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message,
        });
    }
};
