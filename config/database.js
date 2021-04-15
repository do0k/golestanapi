const mongoose = require( 'mongoose' )

module.exports = db = mongoose.connect( "mongodb://localhost:27017/golestanapi", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}, ( err, conn ) => {
	if ( err ) {
		return console.error( err )
	}
	console.log( 'DB connection established' )
} )