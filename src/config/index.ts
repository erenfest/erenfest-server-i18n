import { EnvironmentError } from '../Error'

const ENVIRONMENT_LIST = ['NODE_ENV', 'PORT', 'TS_NODE_PROJECT']
if (!ENVIRONMENT_LIST.every(env => !!process.env[env])) {
  throw new EnvironmentError()
}

export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isLocal: process.env.NODE_ENV === 'local',
  nodeEnv: process.env.NODE_ENV!,

  port: process.env.PORT!
}
