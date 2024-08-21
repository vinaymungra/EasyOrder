const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../templates/emailVerificationTemplate");
const { sendSMS } = require("../utils/smsSend");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
	},
	number:{
		type:String,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5,
	},
});

OTPSchema.pre("save", async function (next) {

	try {
		if(this.email){
		const mailResponse = await mailSender(
			this.email,
			"Verification Email",
			emailTemplate(this.otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
		next();
	}
	else if(this.number){
		const responseSMS=await sendSMS(this.number,this.otp)
		next()
	}
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
});


const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;