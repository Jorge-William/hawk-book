import Fastify from 'fastify'
import cors from  '@fastify/cors'
import { routesBook } from './routes'
const app = Fastify()

app.register(cors)
app.register(routesBook)


app.listen({port: 3000}, () => {
    console.log('Server running!!!');
})
 