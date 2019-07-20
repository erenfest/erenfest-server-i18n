import dotenv from 'dotenv'

dotenv.config()

import Express from 'express'

const app = Express()

app.use('/i18n', Express.static('i18n'))

app.listen(process.env.PORT, () => console.log(`::: RUNNING i18n delivery server on ${process.env.PORT} port :::`))
