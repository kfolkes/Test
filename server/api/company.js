import { Router } from 'express'
import { companies, marketplace, getCompany } from '../fixtures/companies'
/* import request from 'request-promise'
import { server } from '../server.config'
import { parseToQuery } from '../lib/utils' */

const router = Router()

router.get('/lending', (req, res, next) => {
	setTimeout(() => {
		res.json(companies)
	}, 5000)
})

router.get('/marketplace', (req, res, next) => {
	setTimeout(() => {
		res.json(marketplace)
	}, 5000)
})

router.get('/marketplace/:id', async (req, res, next) => {
	setTimeout(() => {
		// res.json(getCompany(req.params.id) || {})
		res.json(getCompany(req.params.id))
	}, 5000)
})

export default router
