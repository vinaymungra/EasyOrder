const Bussiness = require("../models/Bussiness");
const Menu = require("../models/Menu");
const Owner = require("../models/Owner");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary")
const QRcode=require('qrcode')

exports.getBussinessCodes = async (req, res) => {
    try {
        const bussiness = req.user?.bussiness;

        if (!bussiness) {
            return res.status(400).json({
                success: false,
                message: "Bussiness not found!!",
            });
        }
        else if(bussiness.qrcode.length!=0)
        {
            return res.status(200).json({ 
                success:true,
                qrLinks:bussiness.qrcode
            });
        }
        const tables = bussiness.tables;

        // Created array of promises for generating and uploading QR codes
        const qrCodePromises = [];

        var codes=[]
        for (let i = 1; i <= tables; i++) {
            const url = `${process.env.FRONTEND}${bussiness._id}/${i}`;

            const qrCodePromise = new Promise((resolve, reject) => {
                QRcode.toDataURL(url, async (err, qrCodeUrl) => {
                    if (err) {
                        reject("Failure in Generating");
                    } else {
                        try {

                            const result = await cloudinary.uploader.upload(qrCodeUrl, {
                                overwrite: true,
                                invalidate: true,
                                width: 810, height: 456, crop: "fill"
                            });
                            codes.push(result.secure_url);
                            resolve();
                        } catch (uploadError) {
                            reject(uploadError);
                        }
                    }
                });
            });

            qrCodePromises.push(qrCodePromise);
        }

        // Wait for all QR code generation and uploads to complete
        await Promise.all(qrCodePromises);

        await Bussiness.findByIdAndUpdate(bussiness._id, { qrcode: codes }, { new: true });

        return res.status(200).json({ 
			success:true,
			qrLinks:codes
		});

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create qr codes",
            error: error.message,
        });
    }
};



exports.create = async (req, res) => {
	try {
		const userId = req.user?.id
        // console.log("User Id ",userId)
        // console.log(req.files)
		let {
			name,
			address,
			tables,
			emergencyNumber,
			billing
		} = req.body;

		const thumbnail =  req.files.file
        
		if (
			!name ||
			!address ||
			!tables ||
			!emergencyNumber ||
			!billing ||
			!thumbnail
			
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		
		const newBussiness = await Bussiness.create({
			name,
			address,
			owner:userId,
			tables,
			thumbnail: thumbnailImage.secure_url,
			billing:true,
			emergencyNumber
		});

        const user=await Owner.findById(userId);
        user.bussiness=newBussiness._id
        user.save()

        const menu=await Menu.create({bussiness:newBussiness._id,category:[]})
		newBussiness.menu=menu
        newBussiness.save()

		return res.status(200).json({
			success: true,
			data: newBussiness,
			message: "Bussiness Created Successfully",
		});

	} catch (error) {
		
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to create bussiness",
			error: error.message,
		});
	}
};


exports.editTables = async (req, res) => {
    try {
        const newTables = req.body?.tables;
        const bussinessId = req.user?.bussinessId;
    
        const bussiness = await Bussiness.findByIdAndUpdate(
            bussinessId,
            { tables: newTables },
            { new: true } 
        );

        if (!bussiness) {
            return res.status(404).json({
                success: false,
                message: "Business not found",
            });
        }

        res.json({
            success: true,
            message: "Updated successfully",
            data: business, 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.editBilling = async (req, res) => {
    try {
        const billingMethod = req.body.billing;
        const bussinessId = req.user?.bussinessId;

        const bussiness = await Bussiness.findByIdAndUpdate(
            bussinessId,
            { billing: billingMethod },
            { new: true } 
        );

        if (!bussiness) {
            return res.status(404).json({
                success: false,
                message: "Business not found",
            });
        }

        res.json({
            success: true,
            message: "Updated successfully",
            data: bussiness,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.getUserBussiness = async(req,res) =>{
    try{
    
        if (!req.user?.bussiness) {
            return res.status(404).json({
                success: false,
                message: "Business not found",
            });
        }

        return res.json({
            success: true,
            message: "Retrived successfully",
            data: req.user.bussiness,
        });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}