const jwt = require( 'jsonwebtoken' )
const Admin = require( "../models/Admin" )

const authMiddleware = async ( req, res, next ) => {
	const token = req.headers.authorization.split( ' ' )[ 1 ]
	if ( !token ) {
		return res.status( 403 ).json( {
			error: 'User not authorized'
		} )
	}
	const valid = await jwt.verify( token, config.jwt_secret )
	if ( !valid ) return res.status( 403 ).json( {
		error: 'User not authorized'
	} )
	req.user = valid
	next()
}

const hasRole = role => {
	return async ( req, res, next ) => {
		if ( req.user.role !== role ) {
			return res.status( 400 ).json( {
				error: "Permission denied!"
			} )
		}
		next()
	}
}

const isAdmin = async ( req, res, next ) => {
	const stid = req.user.user
	const user = await Admin.findOne( { stid } )
	if ( !user ) return res.status( 404 ).json( {
		error: "Permission denied!"
	} )
	req.role = 'admin'
	next()
}

module.exports = {
	authMiddleware,
	hasRole,
	isAdmin
}