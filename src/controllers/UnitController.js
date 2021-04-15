const Unit = require( '../models/Unit' )
const Major = require( '../models/Major' )

const getUnits = async ( req, res ) => {
	try {
		const units = await Unit.find( {} )
		if ( units ) res.status( 200 ).json( {
			units
		} )
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				error,
				message: "Something went wrong, please try again later"
			} )
		}
	}
}

const createUnit = async ( req, res ) => {
	const { name, unitnumber, major, master } = req.body
	try {
		const newUnit = new Unit( {
			name,
			unitNumber: unitnumber,
			major,
			master
		} )
		const majorObject = await Major.findOne( { id: major } )
		if ( !majorObject ) {
			return res.status( 404 ).json( {
				error: "Major not found"
			} )
		}
		const unit = await newUnit.save()
		if ( unit ) {
			await majorObject.unitList.push( unit.id )
			const majorResult = await majorObject.save()
			if ( majorResult ) {
				res.status( 200 ).json( {
					unit,
					message: "Unit created successfully"
				} )
			}
		}
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				error,
				message: "Something went wrong, please try again later"
			} )
		}
	}
}

const deleteUnit = async ( req, res ) => {
	const id = req.params.id
	try {
		const unit = await Unit.findOneAndDelete( { id } )
		if ( unit ) {
			res.status( 200 ).json( {
				unit,
				message: "Unit removed successfully"
			} )
		}
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				error,
				message: "Something went wrong, please try again later"
			} )
		}
	}
}

const updateUnit = async ( req, res ) => {
	const id = req.params.id
	const { major, unitnumber, master, name } = req.body
	try {
		const oldUnit = await Unit.findOne( { id } )
		if ( oldUnit && oldUnit.major !== major ) {
			oldUnit.major = major
		}
		if ( oldUnit && oldUnit.unitNumber !== unitnumber ) {
			oldUnit.unitNumber = unitnumber
		}
		if ( oldUnit && oldUnit.master !== master ) {
			oldUnit.master = master
		}
		if ( oldUnit && oldUnit.name !== name ) {
			oldUnit.name = name
		}
		const unit = await oldUnit.save()
		if ( unit ) res.status( 200 ).json( {
			unit,
			message: "Unit updated successfully"
		} )
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				error,
				message: "Something went wrong, please try again later"
			} )
		}
	}
}

module.exports = { getUnits, createUnit, deleteUnit, updateUnit }
