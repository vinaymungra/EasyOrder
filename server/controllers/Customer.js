const Bussiness = require("../models/Bussiness");
const Customer = require("../models/Customer")
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
var mongoose = require('mongoose');

exports.sendotp = async (req, res) => {
	try {
		const { number } = req.body;

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		
		
		const otpPayload = { number, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};


exports.create=async(req,res)=>{
    try{
        const {number,otp}=req.body
        // console.log(req.body)
        if(!number)
        {
            return res.status(400).json({
                success: false,
                message: "Enter valid Phone Number",
            });
        }
        const response = await OTP.find({ number }).sort({ createdAt: -1 }).limit(1); 
		// console.log(response);
		if (response.length === 0) 
        {       
			return res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
		} 
        else if (otp !== response[0].otp) 
        {
			return res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
		}

        const customer = await Customer.create({
            number
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
        console.log(req.params)
        var  {bussinessId}=req.params;
        
        console.log(bussinessId)
        if(!bussinessId)    
        {
            return res.status(400).json({
                success: false,
                message: "Error",
            });
        }
        bussinessId =new  mongoose.Types.ObjectId(`${bussinessId}`);
        const data = await Bussiness.findById(bussinessId).populate({
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


exports.addItemToCart= async(req,res)=>{
    try{
        
        var  {}=req.body;
        
        console.log(bussinessId)
        if(!bussinessId)    
        {
            return res.status(400).json({
                success: false,
                message: "Error",
            });
        }
        bussinessId =new  mongoose.Types.ObjectId(`${bussinessId}`);
        const data = await Bussiness.findById(bussinessId).populate({
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

