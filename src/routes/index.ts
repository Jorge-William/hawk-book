import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { response } from "express";

export async function routesBook(app: FastifyInstance) {
    try {
        app.post("/inserir-candidato", async (request, response) => {
            const candidatoData = z.object({
                nome: z.string(),
                cpf_num: z.string(),
                data_nascimento: z.date().nullable(),
                nome_da_mae: z.string(),
                nome_do_pai: z.string(),
                cnh_categoria: z.string(),
                cnv_status: z.boolean(),
                telefone: z.string(),
                peso: z.number(),
                altura: z.number(),
                endereco: z.string(),
                bairro: z.string(),
                cep: z.number(),
                img_frente: z.string(),
                img_perfil: z.string(),
                cursos: z.array(z.string()).nullable(),
            });

            const {
                nome,
                cpf_num,
                data_nascimento,
                nome_da_mae,
                nome_do_pai,
                cnh_categoria,
                cnv_status,
                telefone,
                peso,
                altura,
                endereco,
                bairro,
                cep,
                img_frente,
                img_perfil,
                cursos,
            } = candidatoData.parse(request.body);

            const criarCandidato = await prisma.candidato.create({
                data: {
                    nome,
                    cpf_num,
                    data_nascimento,
                    nome_da_mae,
                    nome_do_pai,
                    cnh_categoria,
                    cnv_status,
                    telefone,
                    peso,
                    altura,
                    endereco,
                    bairro,
                    cep,
                    img_frente,
                    img_perfil,
                }
            })
        
            console.log(criarCandidato);
            
            response.send({ 'msg': 'Candidato salvo!!!' })
        });
    } catch (error) { response.send({ 'msg': error }) }
}
