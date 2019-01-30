import { Router } from 'express'
import { pollings } from '../fixtures/pollings'
/* import request from 'request-promise'
import { server } from '../server.config'
import { parseToQuery } from '../lib/utils' */

const router = Router()

router.get('/', (req, res, next) => {
	setTimeout(() => {
		res.json(pollings)
	}, 5000)
})

export default router
