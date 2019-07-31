import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

import Chalk from 'chalk'

import { server } from './server'
import { config } from './config'

server.listen(process.env.PORT, () => {
  const { nodeEnv, port } = config
  const mode = nodeEnv.slice(0, 1).toUpperCase() + nodeEnv.slice(1).toLowerCase()

  console.clear()
  console.log(Chalk`{green Compiled successfully!}\n`)
  console.log(Chalk`You can now view {bold erenfest-server-i18n} in the browser\n`)
  console.log(Chalk`  {bold ${mode}}: http://localhost:${port}/\n`)
})
