const express = require( 'express' )
const router = express.Router()

const { authMiddleware, isAdmin } = require( '../middlewares/AuthMiddleware' )

module.exports = router