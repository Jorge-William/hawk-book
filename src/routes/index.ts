import {FastifyInstance} from 'fastify'
// import prisma from '../lib/prisma'

export async function  routesBook(app: FastifyInstance) {
    app.get('/home', async (request, response) => {
        response.send('Olá mundo')
    })
}