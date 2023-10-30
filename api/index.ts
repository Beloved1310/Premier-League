import { config } from './config'
import {log, Log} from './utilis/logger'

import app from './app'

import { dbConnection } from './startup/db'

dbConnection()

app.listen(config.PORT, () => {
  log(Log.bg.blue, `Web server is running ${config.PORT}`)
})
