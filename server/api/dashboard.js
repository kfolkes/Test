import { Router } from 'express'
import { general } from '../fixtures/globalDashboard'
import { current, paymentDelay, exposure } from '../fixtures/charts'
/* import request from 'request-promise'
import { server } from '../server.config'
import { parseToQuery } from '../lib/utils' */

const router = Router()

router.get('/', (req, res, next) => {
	setTimeout(() => {
		res.json(general)
	}, 5000)
})

router.get('/chart/payment', (req, res, next) => {
	setTimeout(() => {
		res.json(paymentDelay)
	}, 5000)
})

router.get('/chart/current', (req, res, next) => {
	setTimeout(() => {
		res.json(current)
	}, 5000)
})

router.get('/chart/exposure', (req, res, next) => {
	setTimeout(() => {
		res.json(exposure)
	}, 5000)
})

export default router
