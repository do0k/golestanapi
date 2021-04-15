const Term = require( '../models/Term' )
const User = require( '../models/User' )

const getTerms = async ( req, res ) => {
	try {
		const terms = await Term.find( {} )
		if ( terms ) {
			res.status( 200 ).json( {
				terms
			} )
		} else {
			res.status( 404 ).json( {
				error: "No Terms Found!"
			} )
		}
	} catch ( error ) {
		if ( error ) return res.status( 500 ).json( {
			error,
			message: "Something went wrong, please try again later"
		} )
	}
}

const getTerm = async ( req, res ) => {
	const id = req.params.id
	try {
		const terms = await Term.find( { id } )
		if ( terms ) {
			res.status( 200 ).json( {
				terms
			} )
		} else {
			res.status( 404 ).json( {
				error: "No Terms Found!"
			} )
		}
	} catch ( error ) {
		if ( error ) return res.status( 500 ).json( {
			error,
			message: "Something went wrong, please try again later"
		} )
	}
}

const createTerm = async ( req, res ) => {
	const { student, unitlist, year, termnumber } = req.body
	try {
		const newTerm = new Term( {
			student, unitList: unitlist, year, termNumber: termnumber
		} )

		const studentObject = User.findOne( { id: student } )
		if ( !studentObject ) {
			return res.status( 404 ).json( {
				error: "Error student id not found"
			} )
		}

		const term = await newTerm.save()

		if ( term ) {
			await studentObject.terms.push( term.id )
			const studentResult = await studentObject.save()

			if ( studentResult ) {
				res.status( 200 ).json( {
					term,
					message: "Term was added successfully"
				} )
			}
		}
	} catch ( error ) {
		if ( error ) return res.status( 500 ).json( {
			error,
			message: "Something went wrong, please try again later"
		} )
	}
}

const deleteTerm = async ( req, res ) => {
	const id = req.params.id
	try {
		const term = await Term.findOneAndDelete( { id } )
		if ( term ) res.status( 200 ).json( {
			term,
			message: "Term was deleted successfully"
		} )
	} catch ( error ) {
		if ( error ) return res.status( 500 ).json( {
			error,
			message: "Something went wrong, please try again later"
		} )
	}
}

const updateTerm = async ( req, res ) => {
	const id = req.params.id
	const report = req.file.filename
	try {
		const { student, year, termnumber, unitlist } = req.body
		const oldTerm = Term.findOne( { id } )
		if ( oldTerm.student !== student ) {
			oldTerm.student = student
		}

		if ( oldTerm.year !== year ) {
			oldTerm.year = year
		}
		if ( oldTerm.termNumber !== termnumber ) {
			oldTerm.termNumber = termnumber
		}
		if ( oldTerm.unitList !== unitlist ) {
			oldTerm.unitList = unitlist
		}
		oldTerm.report = `${ config.siteUrl }/uploads/reports/${ report }`
		const term = await oldTerm.save()

		if ( term ) res.status( 200 ).json( {
			term,
			message: "Term was updated successfully"
		} )
	} catch ( error ) {
		if ( error ) return res.status( 500 ).json( {
			error,
			message: "Something went wrong, please try again later"
		} )
	}
}

module.exports = { getTerms, createTerm, deleteTerm, updateTerm }