const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const AdminSchema = new Schema( {
	stid: { type: String, required: true, unique: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	mobile: { type: String, required: true },
	avatar: { type: String, required: true },
	idNumber: { type: String, required: true },
}, {
	timestamps: true
} )

module.exports = mongoose.model( 'Admin', AdminSchema )