const Bussiness = require("../models/Bussiness");
const Category = require("../models/Category");
const Menu = require("../models/Menu");


exports.editMenu = async (req, res) => {
	try {
		const businessId = req.user?.bussiness._id;
		const menuId = req.user?.bussiness.menu;
		const itemRemoveId = req.body.itemRemove;
		const itemAddId = req.body.itemAdd;

		// console.log(`Item to add: ${itemAddId}, Item to remove: ${itemRemoveId}`);

		if (!businessId) {
			return res.status(400).json({
				success: false,
				message: "It's compulsory to create a business first.",
			});
		}

		if (!itemRemoveId && !itemAddId) {
			return res.status(400).json({
				success: false,
				message: "It's necessary to select the item.",
			});
		}

		if (itemRemoveId) {
			var category= itemRemoveId.category
			await Category.findByIdAndUpdate(category,{$pull:{items:itemRemoveId}},{new:true})
			
		} else if (itemAddId) {
			
			var category= itemAddId.category
			await Category.findByIdAndUpdate(category,{$push:{items:itemAddId}},{new:true})
		}
	
		let menu=await Menu.findById(menuId).populate({
			path: 'category',
			populate: {
				path: 'items',
				model: 'Item'
			}
		});

		return res.status(200).json({
			success: true,
			data: menu,
			message: "Menu Edited.",
		});

	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to edit menu.",
			error: error.message,
		});
	}
};
exports.get = async (req, res) => {
	try {
		const bussinessId = req.user?.bussiness._id;
		if (!bussinessId) {
			return res.status(500).json({
				success: false,
				message: "It's compulsory to create bussiness first",
				error: "Business ID is missing", // Fix for undefined error
			});
		}

		const menu = await Menu.findOne({ bussiness: bussinessId })
		.populate({
			path: 'category',
			populate: {
				path: 'items',
				model: 'Item'
			}
		});

		return res.status(200).json({
			success: true,
			data: menu,
			message: "Got your menu",
		});

	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to get Menu",
			error: error.message,
		});
	}
};
