const Bussiness = require("../models/Bussiness");
const Category = require("../models/Category");
exports.createCategory = async (req, res) => {
	try {
		const bussinessId = req.user?.bussiness._id;
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({
				success: false,
				message: "Category name is mandatory",
			});
		}

		// Create the new category
		const category = await Category.create({ bussiness: bussinessId, name });

		// Update the business by pushing the new category ID into the category array
		const updatedBussiness = await Bussiness.findByIdAndUpdate(
			bussinessId,
			{ $push: { category: category._id } },
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			data: category,
			message: "Category Created Successfully"
		});

	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to create category",
			error: error.message,
		});
	}
};


exports.editCategory = async (req, res) => {
	try {
		
		const {name}= req.body
		const bussinessId = req.user?.bussiness._id;

		const updatedCategory = await Category.findOneAndUpdate({bussiness:bussinessId},
			{   
				category:category,
			},
			{new:true}
		);
		
		return res.status(200).json({
			success: true,
			data: updatedCategory,
			message: "Category Updated Successfully",
		});
		
	} catch (error) {
		
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to update category",
			error: error.message,
		});
	}
};

// exports.deleteCategory = async (req, res) => {
// 	try {
// 		const {name} = req.body
// 		const bussinessId = req.user?.bussiness._id;

// 		const deletedCategory = await Category.findOneAndDelete({bussiness:bussinessId});
		
// 		return res.status(200).json({
// 			success: true,
// 			data: deletedCategory,
// 			message: "Category deleted Successfully",
// 		});
		
// 	} catch (error) {
		
// 		console.error(error);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Failed to delete category",
// 			error: error.message,
// 		});
// 	}
// };

exports.getAllCategories = async (req, res) => {
    try {
        const bussinessId = req.user?.bussiness._id;
        if (!bussinessId) {
            return res.status(400).json({
                success: false,
                message: "Create Business First",
            });
        }

        // Find the business by its ID and populate the category array
        const bussiness = await Bussiness.findById(bussinessId).populate("category");

        if (!bussiness) {
            return res.status(404).json({
                success: false,
                message: "Business not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: bussiness.category, // Return only the populated categories
            message: "Categories retrieved successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get categories",
            error: error.message,
        });
    }
};
