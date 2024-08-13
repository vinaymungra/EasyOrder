const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
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
		const mailResponse = await mailSender(
			this.email,
			"Verification Email",
			emailTemplate(this.otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
		next();
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
});


const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;