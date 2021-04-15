const express = require( 'express' )
const router = express.Router()
const path = require( 'path' )
const multer = require( 'multer' )
const storage = multer.diskStorage( {
	destination: function ( req, file, cb ) {
		cb( null, path.join( path.dirname( __dirname ), "../public/uploads/reports" ) )
	},
	filename: function ( req, file, cb ) {
		cb( null, 'report-image-' + Date.now() + '-' + file.originalname )
	},
} )
const upload = multer( { storage } )

const { authMiddleware, isAdmin } = require( '../middlewares/AuthMiddleware' )
const { createTerm, deleteTerm, getTerms, updateTerm } = require( '../controllers/TermController' )

router.post( '/', authMiddleware, isAdmin, createTerm )
router.delete( '/:id', authMiddleware, isAdmin, deleteTerm )
router.put( '/:id', authMiddleware, isAdmin, upload.single( 'report' ), updateTerm )
router.get( '/', authMiddleware, getTerms )

module.exports = router