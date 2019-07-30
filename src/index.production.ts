import { server } from './server'

server.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT} port`)
})
