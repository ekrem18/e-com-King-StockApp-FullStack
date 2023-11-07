"use strict"
/* -------------------------------------------------------*/
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

// auth:
router.use('/account/auth', require('./auth'))
//route yapımı bozmak istemediğim için burada create metodum bu şekilde çalışsın dedim ve register işlemi için route tanımladım
const {create: userCreate } = require('../controllers/user')
router.post('/account/register', userCreate)


// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))


// brand:
router.use('/brands', require('./brand'))
// category:
router.use('/categories', require('./category'))
// firm:
router.use('/firms', require('./firm'))
// product:
router.use('/products', require('./product'))
// purchase:
router.use('/purchases', require('./purchase'))
// sale:
router.use('/sales', require('./sale'))

// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router