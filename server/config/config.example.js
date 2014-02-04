
/**
 * Config file
 */

var path = require('path')
  , rootPath = path.normalize(__dirname + '/../..')
  , serverPath = path.normalize(__dirname + '/..')
  , sharePath = path.normalize(__dirname + '/../../share')
  , clientPath = path.normalize(__dirname + '/../../client')

module.exports = {
    default: {
	db: {
	    mongo: 'mongodb://localhost/czsvi',
	    mongoMaster: 'mongodb://localhost/users',
	    postgres: 'postgres://postgres:postgres@192.168.2.12/Svitavy',
	    redis: '192.168.2.17',
	},
	path: {
	    root: rootPath,
	    server: serverPath,
	    client: clientPath,
	    share: sharePath
	},
	port: 3005,
	app: {
	    name: 'Nordit Business Intelligence Client Server - Svitavy'
	},
	contract: {
           _id: 'czsvi',
      	   port: 3005,
      	   title: 'Svitavy',
      	   groups: ['czsvi']
	},
    },
    development: {
	db: {
	    mongo: 'mongodb://localhost/czsvi_dev',
	    mongoMaster: 'mongodb://localhost/nbims_dev',
	    postgres: 'postgres://postgres:postgres@192.168.2.12/Svitavy',
	    redis: '192.168.2.17',
	},
	app: {
	    name: 'Nordit Business Intelligence Client Server - Svitavy - dev'
	},
    },
    test: {
	db: {
	    mongo: 'mongodb://localhost/czsvi_test',
	},
	app: {
	    name: 'Nordit Business Intelligence Demo Server - Svitavy - test'
	},
    }
}
