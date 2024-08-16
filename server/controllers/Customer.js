const { model } = require("mongoose");
const Bussiness = require("../models/Bussiness");
const Customer = require("../models/Customer")

exports.create=async(req,res)=>{
    try{
        const phoneNum=req.body.number
        if(!phoneNum)
        {
            return res.status(400).json({
                success: false,
                message: "Enter valid Phone Number",
            });
        }
        const customer = await Customer.create({
            phoneNumber:phoneNum
        })
        return res.status(200).json({ 
			success:true,
            message:"Customer created successfully",
            data:customer
		});

    } catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create customer",
            error: error.message,
        });
    }
}

exports.getMenu= async(req,res)=>{
    try{
        const { bussinessId}=req.body
        
        if(!bussinessId)
        {
            return res.status(400).json({
                success: false,
                message: "Error",
            });
        }
        const data = await Bussiness.findById(bussinessId)
        .populate({
            path:'category',
            populate:{
                path:'items',
                model:'Item'
            }
        })
        return res.status(200).json({ 
			success:true,
            message:"",
            data
		});
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to detect QR",
            error: error.message,
        });
    }
}


