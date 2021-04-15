const express = require( 'express' )
const app = express()
const cors = require( 'cors' )
const AuthRouter = require( './src/routes/AuthRouter' )
const MajorRouter = require( './src/routes/MajorRouter' )
const UnitRouter = require( './src/routes/UnitRouter' )
const TermRouter = require( './src/routes/TermRouter' )
const db = require( './config/database' )
global.config = require( './config' )

app.use( cors() )
app.use( express.urlencoded( { extended: true } ) )
app.use( express.json() )

app.use( express.static( 'public' ) )

app.use( "/api/auth", AuthRouter )
app.use( "/api/major", MajorRouter )
app.use( "/api/term", TermRouter )
app.use( "/api/unit", UnitRouter )

app.listen( 3000, () => console.log( "Server running on http://localhost:3000" ) )