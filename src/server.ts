import { EnvironmentError } from './Error'

if (!process.env.NODE_ENV) {
  throw new EnvironmentError()
}

import Express from 'express'
import CORS from 'cors'

const app = Express()

app.use(CORS())
app.use(Express.static('i18n'))

export const server = app
