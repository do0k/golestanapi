const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const MajorSchema = new Schema( {
	name: { type: String, required: true },
	unitList: { type: [ Schema.Types.ObjectId ], ref: "Unit" },
}, {
	timestamps: true
} )

module.exports = mongoose.model( 'Major', MajorSchema )