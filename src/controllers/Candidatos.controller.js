import { prisma } from "../lib/prisma";

const CandidatoController = {
    async index(req, res) {
        try {
            const candidatos = await prisma.candidato.findMany({ include: { curso: true } })
            console.log(req.body)
            res.send(candidatos)
        } catch (error) {
            throw new Error(error)
        }

    },
    async candidato(req, res) {

    }
}

export default CandidatoController