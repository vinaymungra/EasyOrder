const Menu = require("../models/Menu");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Item = require("../models/Item");
const Bussiness = require("../models/Bussiness");
const Category = require("../models/Category");

const { default: mongoose } = require("mongoose");

exports.add = async (req, res) => {
	try {
		const userId = req.user?.id;
		
		let {
			categoryId,
			price,
			name,
			available,
		} = req.body;

		const thumbnail = req.files?.thumbnail;
		console.log(thumbnail)

		if (
			!name ||
			!categoryId ||
			!price ||
			!available ||
			!thumbnail
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		categoryId=new mongoose.Types.ObjectId(categoryId)
		const business = await Bussiness.findOne({ owner: userId });

		if (!business) {
			return res.status(404).json({
				success: false,
				message: "Business not found",
			});
		}

		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);

		const newItem = await Item.create({
			name,
			category:categoryId,
			price,
			available,
			thumbnail: thumbnailImage.secure_url,
			bussiness: business._id,
		});

		await Category.findByIdAndUpdate(categoryId, { $push: { items: newItem._id } });


		return res.status(200).json({
			success: true,
			data: newItem,
			message: "Item Created Successfully",
		});

	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to create item",
			error: error.message,
		});
	}
};


exports.editTextData = async (req, res) => {
	try {
		
		const {name,category,price,available,id}= req.body

		const updatedMenu = await Item.findByIdAndUpdate(id,
			{   name:name,
				category:category,
				price:price,
				available:available
			},
			{new:true}
		);
		
		return res.status(200).json({
			success: true,
			data: updatedMenu,
			message: "Menu Updated Successfully",
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

exports.editThumbnail = async (req, res) => {
	try {
		const id = req.body.id
		const image= req.files.thumbnail
        var updatedMenu=null
        if(image){

            const thumbnailImage = await uploadImageToCloudinary(
                image,
                process.env.FOLDER_NAME
            );
            updatedMenu = await Item.findByIdAndUpdate(id,
            {
                thumbnail: thumbnailImage.secure_url,   
            },{new:true});
            
        }
		return res.status(200).json({
			success: true,
			data: updatedMenu,
			message: "Item Updated Successfully",
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

exports.deleteItem = async (req, res) => {
	try {
		const itemId=req.body.id
		
		const itemDeleted = await Menu.findByIdAndDelete(itemId);
		
		return res.status(200).json({
			success: true,
			data: itemDeleted,
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

exports.getAllItems = async (req, res) => {
    try {
		// console.log(req.user)
        const bussinessId = req.user?.bussiness._id;

        if (!bussinessId) {
            return res.status(400).json({
                success: false,
                message: "Bussiness ID not provided",
            });
        }

        const items = await Item.find({ bussiness: bussinessId });

        return res.status(200).json({
            success: true,
            data: items,
            message: "Got your items",
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
