const Major = require( '../models/Major' )

const getMajors = async ( req, res ) => {
	try {
		const majors = await Major.find( {} ).populate( 'unitList' )
		if ( majors ) {
			res.status( 200 ).json( { majors } )
		}
	} catch ( error ) {
		return res.status( 500 ).json( {
			error,
			message: "Something went wrong, please try again later"
		} )
	}
}

const createMajor = async ( req, res ) => {
	const name = req.body.name
	try {
		const newMajor = new Major( { name } )
		const major = await newMajor.save()
		if ( major ) {
			res.status( 200 ).json( {
				major,
				message: "Major added successfully"
			} )
		}
	} catch ( error ) {
		return res.status( 500 ).json( {
			error,
			message: "Something went wrong, please try again later"
		} )
	}
}

const deleteMajor = async ( req, res ) => {
	const id = req.params.id
	try {
		const major = await Major.findOneAndDelete( { id } )
		if ( major ) {
			res.status( 200 ).json( { major, message: "Major deleted successfully" } )
		}
	} catch ( error ) {
		return res.status( 500 ).json( {
			error,
			message: "Something went wrong, please try again later"
		} )
	}
}

const updateMajor = async ( req, res ) => {
	const id = req.params.id
	try {
		const major = await Major.findOneAndUpdate( { id }, { name } )
		if ( major ) {
			res.status( 200 ).json( { major, message: "Major updated successfully" } )
		}
	} catch ( error ) {
		return res.status( 500 ).json( {
			error,
			message: "Something went wrong, please try again later"
		} )
	}
}

module.exports = {
	getMajors, createMajor, deleteMajor, updateMajor
}