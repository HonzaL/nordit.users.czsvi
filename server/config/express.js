
/**
 * Express Configuration - c1bis
 */

var express = require('express')

module.exports = function (app, config, passport) {
    
    app.set('showStackError', true)
    
    app.use(express.favicon())
    app.use(express.static(config.path.root + '/client'))
    app.use(express.static(config.path.root + '/share'))
    
    // don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
	app.use(express.logger('dev'))
    }

    // set views path, template engine and default layout
    app.engine('hbs', require('ejs').__express);
    app.set('views', config.path.share + '/views')
    app.set('view engine', 'hbs')
    app.enable('trust proxy')

    app.configure(function () {
	// cookieParser should be above session
	app.use(express.cookieParser())
	
	// bodyParser should be above methodOverride
	app.use(express.bodyParser())
	app.use(express.methodOverride())

	// use passport session
	app.use(passport.initialize())
	
	// routes should be at the last
	app.use(app.router)
	
	// assume "not found" in the error msgs
	// is a 404. this is somewhat silly, but
	// valid, you can do whatever you like, set
	// properties, use instanceof etc.
	app.use(function(err, req, res, next){
	    // treat as 404
	    if (err.message
		&& (~err.message.indexOf('not found')
		    || (~err.message.indexOf('Cast to ObjectId failed')))) {
		return next()
	    }
	    
	    // log it
	    // send emails if you want
	    console.error(err.stack)
	    
	    // error page
	    res.status(500).render('500', { error: err.stack })
	})
	
	// assume 404 since no middleware responded
	app.use(function(req, res, next){
	    res.status(404).render('404', {
		url: req.originalUrl,
		error: 'Not found',
		req: req.url
	    })
	})
    })
    
    // development env config
    app.configure('development', function () {
	app.locals.pretty = true
    })
}
