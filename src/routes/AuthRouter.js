const express = require( 'express' )
const router = express.Router()
const path = require( 'path' )
const multer = require( 'multer' )
const storage = multer.diskStorage( {
	destination: function ( req, file, cb ) {
		cb( null, path.join( path.dirname( __dirname ), "../public/uploads/avatars" ) )
	},
	filename: function ( req, file, cb ) {
		cb( null, 'avatar-image-' + Date.now() + '-' + file.originalname )
	},
} )
const upload = multer( { storage } )

const { authMiddleware, isAdmin } = require( '../middlewares/AuthMiddleware' )

const { register, login, me, registerAdmin, loginAdmin, getUsers } = require( '../controllers/AuthController' )

router.post( '/admin', upload.single( 'avatar' ), registerAdmin )
router.post( '/', authMiddleware, isAdmin, upload.single( 'avatar' ), register )
router.post( '/login', login )
router.post( '/admin/login', loginAdmin )
router.get( '/', authMiddleware, me )
router.get( '/admin', authMiddleware, isAdmin, getUsers )

module.exports = router