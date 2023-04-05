import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function routesBook(app: FastifyInstance) {
  app.post("/inserir-candidato", async (request, response) => {
    try {
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

	  const registroJaExiste = await prisma.candidato.findFirst({
        where: {
          cpf_num: {
            equals: cpf_num,
          },
        },
      });
	   if(registroJaExiste){
        	response.send({ status: false, msg: "Registro já existe no sistema" });
	   }

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
        },
      });

      console.log(criarCandidato);

      response.send({ "status": true, msg: "Candidato salvo!!!" });
    } catch (error) {
      response.send({ msg: error });
    }
  });

  // ---------------------------- Insere um Curso ---------------------------------

  app.post("/inserir-curso", async (request, response) => {
    const cursoData = z.object({
      nome_curso: z.string(),
      descricao_curso: z.string(),
    });

    const { nome_curso, descricao_curso } = cursoData.parse(request.body);

    try {
      const registroJaExiste = await prisma.curso.findFirst({
        where: {
          nome_curso: {
            equals: nome_curso,
          },
        },
      });

      if (registroJaExiste) {
        response.send({ status: false, "msg": "Registro já existe no sistema" });
      }
      const criarCurso = await prisma.curso.create({
        data: {
          nome_curso,
          descricao_curso,
        },
      });
      response.status(200).send({ status: true , "msg": "Registro salvo."});
    } catch (error) {
      console.error(error);
      response.send({ msg: error });
    }
  });

}
