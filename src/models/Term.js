const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const TermSchema = new Schema( {
	student: { type: Schema.Types.ObjectId, required: true },
	unitList: { type: [ Schema.Types.ObjectId ], required: true, ref: "Unit" },
	year: { type: Number, required: true },
	termNumber: { type: Number, required: true, enum: [ 1, 2, 3, 4 ] },
	report: { type: String }
}, {
	timestamps: true
} )

module.exports = mongoose.model( 'Term', TermSchema )