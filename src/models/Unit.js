const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const UnitSchema = new Schema( {
	name: { type: String, required: true },
	unitNumber: { type: Number, required: true },
	major: { type: Schema.Types.ObjectId, required: true, ref: "Major" },
	master: { type: String, required: true }
}, {
	timestamps: true
} )

module.exports = mongoose.model( 'Unit', UnitSchema )