import cors from 'cors'
import express from 'express'
import templateRoutes from "./routes/templateRoutes"

import "dotenv/config";

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


const app = express()
app.use(cors())

app.use(express.json())
//////////////////////////////////SA TENTE DES DOUILLES
app.use(express.urlencoded({extended:true}))
/////////////////////////////////////DANGER


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}...`)
})

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'TEMPLATE API',
            description: 'TEMPLATE',
            contact: {
                name: 'Best front-end dev EUW'
            },
            // servers: [{ url: '/api' }]
            servers: [{
                url:`http://localhost:5000`,
                description: 'localhost'
            },],
        },
    },
    apis: [`./routes/*.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/templates', templateRoutes)