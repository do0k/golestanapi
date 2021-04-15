const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const UserSchema = new Schema( {
	stid: { type: String, required: true, unique: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	terms: { type: [ Schema.Types.ObjectId ], ref: "Term" },
	// major: { type: String, required: true },
	major: { type: Schema.Types.ObjectId, required: true, ref: "Major" },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	mobile: { type: String, required: true },
	avatar: { type: String, required: true },
	idNumber: { type: String, required: true },
	address: { type: String, required: true },
	postcode: { type: String, required: true },
	fatherName: { type: String, required: true },
	birthDate: { type: Date, required: true }
}, {
	timestamps: true
} )

module.exports = mongoose.model( 'User', UserSchema )