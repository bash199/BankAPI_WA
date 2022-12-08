import express from 'express'  
import { indexRoute } from './Routes/routes.js'


const PORT = process.env.PORT || 5001
const app = express()

app.use(express.json());
app.use('/api', indexRoute)

app.listen(PORT, ()=>{console.log('Server is on port: ', PORT)})