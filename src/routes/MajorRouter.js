const express = require( 'express' )
const router = express.Router()

const { authMiddleware, isAdmin } = require( '../middlewares/AuthMiddleware' )

const { createMajor, getMajors, deleteMajor, updateMajor } = require( '../controllers/MajorController' )

router.post( '/', authMiddleware, isAdmin, createMajor )
router.delete( '/:id', authMiddleware, isAdmin, deleteMajor )
router.put( '/:id', authMiddleware, isAdmin, updateMajor )
router.get( '/', authMiddleware, getMajors )

module.exports = router