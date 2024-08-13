const Menu = require("../models/Menu");

exports.edit = async (req, res) => {
	try {
		
		const bussinessId= req.user?.bussiness._id
		const items= req.body.items
		const updatedMenu = await Menu.findOneAndUpdate({bussiness:bussinessId},
														{items},
														{new:true});

		return res.status(200).json({
			success: true,
			data: updatedMenu,
			message: "Menu Created Successfully",
		});
		
	} catch (error) {
		
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to update menu",
			error: error.message,
		});
	}
};

exports.get = async (req, res) => {
	try {
		
		const bussinessId= req.user?.bussiness._id
		
		const menu = await Menu.findOne({ bussiness:bussinessId });
		
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


