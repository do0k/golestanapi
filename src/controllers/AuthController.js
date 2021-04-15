const bcrypt = require( 'bcryptjs' )
const moment = require( 'moment-jalaali' )
const jwt = require( 'jsonwebtoken' )
const User = require( '../models/User' )
const Admin = require( '../models/Admin' )

const register = async ( req, res ) => {
	const {
		stid,
		firstname,
		lastname,
		email,
		mobile,
		password,
		birthdate,
		fathername,
		major,
		idnumber,
		address,
		postcode
	} = req.body
	const avatar = req.file
	try {
		let hashedPassword = null
		if ( password ) hashedPassword = await bcrypt.hashSync( password, 10 )
		const newUser = new User( {
			avatar: `${ config.siteUrl }/uploads/avatars/${ avatar.filename }`,
			stid,
			firstname,
			lastname,
			email,
			mobile,
			major,
			password: hashedPassword,
			birthDate: moment( birthdate, "jD-jM-jYYYY" ),
			fatherName: fathername,
			idNumber: idnumber,
			address,
			postcode,
			role: 'student'
		} )

		const user = await newUser.save()

		if ( user ) {
			res.status( 200 ).json( {
				user,
				message: "User registered successfully"
			} )
		}
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				message: "Something went wrong, Please try again later!",
				error
			} )
		}
	}
}

const registerAdmin = async ( req, res ) => {
	const {
		stid,
		email,
		password,
		firstname,
		lastname,
		idnumber,
		mobile
	} = req.body
	const avatar = req.file
	try {
		let hashedPassword = null
		if ( password ) hashedPassword = bcrypt.hashSync( password, 10 )
		const newAdmin = new Admin( {
			avatar: `${ config.siteUrl }/uploads/avatars/${ avatar.filename }`,
			stid,
			email,
			firstname,
			lastname,
			idNumber: idnumber,
			mobile,
			password: hashedPassword
		} )

		const admin = await newAdmin.save()
		res.status( 200 ).json( {
			admin,
			message: "Admin registered successfully"
		} )
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				message: "Something went wrong, Please try again later!",
				error
			} )
		}
	}
}

const loginAdmin = async ( req, res ) => {
	const { stid, password } = req.body
	try {
		const user = await Admin.findOne( { stid } )
		if ( !user ) return res.status( 404 ).json( { error: "Admin not found!" } )
		const valid = await bcrypt.compareSync( password, user.password )
		if ( !valid ) return res.status( 403 ).json( { error: "Incorrect password" } )
		const token = await jwt.sign( { user: user.stid }, config.jwt_secret )
		res.status( 200 ).json( {
			user,
			token,
			message: "Login successful"
		} )
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				message: "Something went wrong, Please try again later!",
				error
			} )
		}
	}

}

const login = async ( req, res ) => {
	const { stid, password } = req.body
	try {
		const user = await User.findOne( { stid } )
		if ( !user ) return res.status( 404 ).json( { error: "User not found!" } )
		const valid = await bcrypt.compareSync( password, user.password )
		if ( !valid ) return res.status( 403 ).json( { error: "Incorrect password" } )
		const token = await jwt.sign( { user: user.stid }, config.jwt_secret )
		res.status( 200 ).json( {
			user,
			token,
			message: "Login successful"
		} )
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				message: "Something went wrong, Please try again later!",
				error
			} )
		}
	}

}

const me = async ( req, res ) => {
	const stid = req.user.user
	let user = null
	try {
		if ( req.role && req.role === 'admin' ) {
			user = await Admin.findOne( { stid } )
		} else {
			user = await User.findOne( { stid } ).populate( 'terms' ).populate( 'major' )
		}

		user.password = "***"
		res.status( 200 ).json( { user } )
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				message: "Something went wrong, Please try again later!",
				error
			} )
		}
	}
}

const getUsers = async ( req, res ) => {
	try {
		const users = await User.find( {} ).populate( 'major' )
		if ( !users ) {
			return res.status( 404 ).json( {
				message: "No users found"
			} )
		}
	} catch ( error ) {
		if ( error ) {
			return res.status( 500 ).json( {
				message: "Something went wrong, Please try again later!",
				error
			} )
		}
	}
}

module.exports = { register, login, me, registerAdmin, loginAdmin, getUsers }
