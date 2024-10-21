//arranca la aplicacion 

import app from './app.js'
import { connectDB } from './mongo.js'

connectDB();
app.listen(4000)
console.log('Servidor puerto', 4000)
